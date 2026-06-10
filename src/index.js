import app from './app.js';
import conexionBaseDatos from './config/db.js';

const PUERTO = process.env.PORT || 3000;

async function arrancarServidor() {
    try {
        await conexionBaseDatos.sync({ alter: true });
        console.log('se conecto bien con el postgre y el render ouyea');

        app.listen(PUERTO, () => {
            console.log(`servidor pego oido en el puerto ${PUERTO}`);
        });
    }catch (error) {
        console.error('error no arranco', error);
    }
}

arrancarServidor();