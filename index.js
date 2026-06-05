import app from './src/app.js'; // Ojo: en ES Modules es obligatorio poner el ".js" al final del archivo importado
import 'dotenv/config';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});