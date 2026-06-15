import { default as request } from "supertest";
import app from "../app.js";
import conexionBaseDatos from "../config/db.js";
import Reporte from "../models/reporte.model.js";

beforeAll(async () =>  {
    await conexionBaseDatos.authenticate();
});

afterAll(async () => {
    await Reporte.destroy({where: {titulo: "Incendio de prueba"}});
    await conexionBaseDatos.close();
});

describe("Controlador de reportes", () => {
    describe("El post crea un reporte", () => {

        test("Debe crear todo bien", async () => {
            const response = await request(app)
                .post("/api/reportes")
                .send({
                    titulo: "Incendio de prueba",
                    descripcion: "MI CASA TIO",
                    latitud: -33.5100,
                    longitud: -70.7600
                });

            expect(response.statusCode).toBe(201);

            expect(response.body).toHaveProperty("exito", true);
            expect(response.body.datos).toHaveProperty("id");
            expect(response.body.datos.titulo).toBe("Incendio de prueba");

            expect(response.body.datos.ubicacion).toHaveProperty("type", "Point");
            expect(response.body.datos.ubicacion.coordinates).toEqual([-70.7600, -33.5100]);
         });

        test("Debe responder que esta mal si faltan datos", async () => {
            const response = await request(app)
                .post("/api/reportes")
                .send({
                    titulo: "Incendio Invalido",
                    descripcion: "No mando cordenadas a proposito"
                });

            expect(response.statusCode).toBe(500);
            expect(response.body).toHaveProperty("exito", false);
        });
    });

    describe("Get tiene que obtener todos los datos", () => {
        test("Debe de listar los reportes", async () => {
            const response = await request(app).get("/api/reportes");

            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty("exito", true);

            expect(Array.isArray(response.body.datos)).toBe(true);
        });
    });
});
