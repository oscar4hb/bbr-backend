const mongoose = require( 'mongoose' );


const dbConnection = async() => {
   try {
    // await mongoose.connect( 'mongodb://localhost:27017',{
   await mongoose.connect( process.env.DB_CNN, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true});
    console.log('Barbaro BD online');

   } catch (error){

    console.log(error);
    throw new Error ('Erro a la hora de iniciar la BD ver log')
   } 
}
module.exports = {
    dbConnection
}