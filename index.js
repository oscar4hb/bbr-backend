const express = require( 'express');
const path = require('path');
require('dotenv').config();
const cors = require('cors');


const app = express();
const { dbConnection } = require('./database/config');

// Configuración de CORS 
app.use(cors())


// Lectura y parseo del body
app.use( express.json() );

//conexion con la BD
dbConnection();


// Directorio público
 app.use( express.static('public') );


// Rutas
app.use('/api/usuarios', require('./routes/usuarios') );
app.use('/api/productos', require('./routes/productos') );
app.use('/api/caracteristicaproducto', require('./routes/caracteristicaproducto') );
app.use('/api/categorias', require('./routes/categorias') );
app.use('/api/todo', require('./routes/busquedas') );
app.use('/api/login', require('./routes/auth') );
app.use('/api/upload', require('./routes/uploads') );

app.use('/api/producto', require('./routes/uploads-productos') );

// puerto de servidor 
app.listen(process.env.PORT, () => {
    console.log('Servidor on port', process.env.PORT)
})
// app.get('/', ( req, res) => {
//     // res.send('Servidor Funcionado :)'),
//     res.sendFile(__dirname + '/index.html')
// });