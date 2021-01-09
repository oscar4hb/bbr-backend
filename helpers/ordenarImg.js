const Producto = require('../models/producto');

const ordenarImg = (orden, producto ) => {



    switch (orden) {
        case 'principal':
            producto.imgs.principal = urlImagen;
            break;
        case 'segundo':

            const img2 = producto.imgs.principal;

            if (!img2){
                console.log('Debe agregar la primera imagen')
                return false 
            }
            
            producto.imgs.segundo = urlImagen;
            break;
        case 'tercero':
            const img3 = producto.imgs.tercero;
            
            if (!img3){
                console.log('Debe agregar la segunda imagen')
                return false 
            }
            
            producto.imgs.tercero = urlImagen;
            break;
        case 'cuarto':
            const img4 = producto.imgs.cuarto;
            
            if (!img4){
                console.log('Debe agregar la tercera imagen')
                return false 
            }

            producto.imgs.cuarto = urlImagen;
            break;
        case 'quinto':
            const img5 = producto.imgs.quinto;
            
            if (!img5){
                console.log('Debe agregar la cuarta imagen')
                return false 
            }
            producto.imgs.quinto = urlImagen;
            break;
        case 'sexto':
            const img6 = producto.imgs.sexto;
            
            if (!img6){
                console.log('Debe agregar la quinta imagen')
                return false 
            }
            producto.imgs.sexto = urlImagen;
            break;
        case 'septimo':
            const img7 = producto.imgs.septimo;
            
            if (!img7){
                console.log('Debe agregar la sexta imagen')
                return false 
            }
            producto.imgs.septimo = urlImagen;
            break;
        case 'octavo':
            const img8 = producto.imgs.octavo;
            
            if (!img8){
                console.log('Debe agregar la septima imagen')
                return false 
            }
            producto.imgs.octavo = urlImagen;
            break;
        case 'noveno':
            const img9 = producto.imgs.noveno;
            
            if (!img9){
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

