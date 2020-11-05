
const { Schema, model } = require('mongoose');


const CaracteristicaproductoSchema = Schema({
    caracteristica1: {
        type: String,
  
            },
    caracteristica2: {
        type: String,
          
            },
    caracteristica3: {
        type: String,
                  
             },
    caracteristica4: {
        type: String,
                          
            },

}, {
    collection: 'Caracteristicaproducto'
});




module.exports = model('Caracteristicaproducto', CaracteristicaproductoSchema);

// export interface ProductAttributeValue {
//     name: string;
//     slug: string;
//     customFields?: CustomFields;
// }

// export interface ProductAttribute {
//     name: string;
//     slug: string;
//     featured: boolean;
//     values: ProductAttributeValue[];
//     customFields?: CustomFields;
// }
