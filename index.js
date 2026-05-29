import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

const reportes = [
    {id: 1, zona: 'maipu', ubicacion:'PadreHurtado', enroll: true},
    {id: 2, zona: 'Micasa', ubicacion:'en la cocina', enroll: false},
    {id: 3, zona: 'valpo', ubicacion:'no me se ubis de valpo xd', enroll: true},
];

app.get('/', (req, res) => {
    res.send('Node JS api');
});

app.get('/api/reportes', (req, res) =>{
    res.send(reportes);
});

app.get('/api/reportes/:id', (req, res) => {
    const reporte = reportes.find(c => c.id === parseInt(req.params.id));
    if(!reporte) return res.status(404).send('Incendios no ubicado')
    else res.send(reporte);
})

app.post('/api/reportes', (req, res) => {
    const reporte = {
        id: reportes.length + 1,
        zona: req.body.zona,
        ubicacion: req.body.zona,
        enroll: (req.body.enroll ==='true')
    };

    reportes.push(reportes);
    res.send(reporte);
});

app.delete('/api/reportes/:id', (req, res) => {
    const reporte = reportes.find(c => c.id === parseInt(req.params.id));
    if (!reporte) return res.status(404).send('Incendio no ubicado');
    
    const index = reportes.indexOf(reporte);
    reportes.splice(index,1);
    res.send(reporte);
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
