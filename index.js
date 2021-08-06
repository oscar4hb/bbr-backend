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

// CRUD -- Create Read Update Delete
app.use('/api/productos', require('./routes/productos'));



//Crear ID de producto
app.use('/api/productoid', require('./routes/productoid'))

app.use('/api/categorias', require('./routes/categorias') );
app.use('/api/subcategorias', require('./routes/subcategoria') );
app.use('/api/carousels', require('./routes/carousel'));
app.use('/api/todo', require('./routes/busquedas') );
app.use('/api/login', require('./routes/auth') );

// upload de imagenes y album 
app.use('/api/album', require('./routes/album') );
app.use('/api/upload', require('./routes/uploads') );

app.use('/api/producto', require('./routes/uploads-productos') );

// adress de usuario
app.use('/api/adress', require('./routes/adress') );

// Unidades 
app.use('/api/unidades', require('./routes/unidades'));


 

// puerto de servidor 
app.listen(process.env.PORT, () => {
    console.log('Servidor on port', process.env.PORT)
});


// app.get('/', ( req, res) => {
//     // res.send('Servidor Funcionado :)'),
//     res.sendFile(__dirname + '/index.html')
// });



