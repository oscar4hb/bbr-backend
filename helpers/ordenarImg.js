const Producto = require('../models/producto');

const ordenarImg = (orden, producto  ) => {

 
    switch (orden) {
        case 'principal':
            producto.imgs.principal = urlImagen;
console.log(urlImagen)
            break;
        case 'segundo': 

            if (!producto.imgs.principal){
                console.log('Debe agregar la primera imagen')
                return false 
            }
            
            if(producto.imgs.principal){

                producto.imgs.segundo = urlImagen;
                console.log(urlImagen)
            }


            break;
        case 'tercero':
       
            
            if (!producto.imgs.segundo){
                console.log('Debe agregar la segunda imagen')
                return false;
            }

            if(producto.imgs.segundo){
                producto.imgs.tercero = urlImagen;
                console.log(urlImagen)
            }
            

            break;
        case 'cuarto':
            
            
            if (!producto.imgs.tercero){
                console.log('Debe agregar la tercera imagen')
                return false 
            }

            producto.imgs.cuarto = urlImagen;

            if(producto.imgs.tercero){
                producto.imgs.cuarto = urlImagen;
                console.log('cuarta imagen:  ',urlImagen)
            }

            break;

        case 'quinto':
         
            
            if (!producto.imgs.cuarto){
                console.log('Debe agregar la cuarta imagen')
                return false 
            }
            producto.imgs.quinto = urlImagen;
            break;
        case 'sexto':
         
            
            if (!producto.imgs.quinto){
                console.log('Debe agregar la quinta imagen')
                return false 
            }
            producto.imgs.sexto = urlImagen;
            break;
            
        case 'septimo':
           
            
            if (!producto.imgs.sexto){
                console.log('Debe agregar la sexta imagen')
                return false 
            }
            producto.imgs.septimo = urlImagen;
            break;
        case 'octavo':
            const img8 = producto.imgs.octavo;
            
            if (!producto.imgs.septimo){
                console.log('Debe agregar la septima imagen')
                return false 
            }
            producto.imgs.octavo = urlImagen;
            break;
        case 'noveno':
           
            
            if (!producto.imgs.octavo){
                console.log('Debe agregar la octava imagen')
                return false 
            }
            producto.imgs.noveno = urlImagen;
            break;
      
    }
 }

module.exports = {
    ordenarImg
 
}

