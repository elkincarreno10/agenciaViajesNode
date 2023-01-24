import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';


const app = express();

// Conectar a la base de datos
db.authenticate()
    .then( () => console.log('Base datos conectada'))
    .catch(error => console.log(error))
 
// Definir Puerto
const port = process.env.PORT || 4000;

// Habilitar PUG
app.set('view engine', 'pug');

// Crear nuestro propio middleware (Obtener el año actual)
app.use((req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = "Agencia de Viajes";
    next(); // return next() se usa para obligarlo a ir al siguiente cuando se atasca
})

// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extend: true}));

// Definir la carpeta pública
app.use(express.static('public'));

// Agregar Router
app.use('/', router);
 
app.listen(port, () => {
    console.log(`El servidor esta corriendo en ${port}`)
});