import request from "supertest";
import app from "../app.js";
import conexionBaseDatos from "../config/db.js";
import Reporte from "../models/reporte.model.js";
import { beforeAll, afterAll, describe, test, expect } from "vitest";

beforeAll(async () => {
    await conexionBaseDatos.authenticate();
});

afterAll(async () => {
    await Reporte.destroy({ where: { titulo: "Incendio de prueba" } });
    await conexionBaseDatos.close();
});

describe("Controlador de reportes", () => {
    describe("El post crea un reporte", () => {
        test("Debe crear todo bien", async () => {
            const response = await request(app)
                .post("/reportes")
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
                .post("/reportes")
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
            const response = await request(app).get("/reportes");

            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty("exito", true);

            expect(Array.isArray(response.body.datos)).toBe(true);
        });
    });

    describe("PUT /reportes/:id", () => {
        test("Debe actualizar un reporte existente", async () => {
            // Creamos uno primero para tener un ID real
            const original = await request(app).post("/reportes").send({
                titulo: "Reporte Original",
                descripcion: "Sin cambios",
                latitud: -33.5100,
                longitud: -70.7600
            });
            const id = original.body.datos.id;

            const response = await request(app)
                .put(`/reportes/${id}`)
                .send({
                    titulo: "Reporte Modificado",
                    latitud: -33.6000
                });
            expect(response.statusCode).toBe(200);
            expect(response.body.datos.titulo).toBe("Reporte Modificado");
            expect(response.body.datos.ubicacion.coordinates[1]).toBe(-33.6000); // Latitud cambiada
        });
        test("Debe dar 404 si el reporte no existe", async () => {
            const response = await request(app)
                .put("/reportes/9999")
                .send({ titulo: "Nadie me va a encontrar" });

            expect(response.statusCode).toBe(404);
        });
    });

    describe("DELETE /reportes/:id", () => {
        test("Debe eliminar un reporte correctamente", async () => {
            const provisional = await request(app).post("/reportes").send({
                titulo: "Para Borrar",
                descripcion: "Chao",
                latitud: -33.5100,
                longitud: -70.7600
            });
            const id = provisional.body.datos.id;

            const response = await request(app).delete(`/reportes/${id}`);
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty("exito", true);

            const verificar = await request(app).get("/reportes");
            const existe = verificar.body.datos.some(r => r.id === id);
            expect(existe).toBe(false);
        });
    });
});
