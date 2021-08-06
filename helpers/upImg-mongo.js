const Imagenes  = require('../models/imagenes/imagenes');
 


const upImgModel = async ( url1, url2, url3, url4, url5, url6, url7) => {

    const imagenesBD = new Imagenes ({  quality1: url1, 
                                        quality2: url2,
                                        quality3: url3,
                                        quality4: url4,
                                        quality5: url5,
                                        quality6: url6,
                                        quality7: url7, });
    
    await imagenesBD.save();


    if( imagenesBD){
        return imagenesBD._id;

    }

}
    


    module.exports = {
        upImgModel
    }
    