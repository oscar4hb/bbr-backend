const sharp = require('sharp');

const funcQuality1 = (file) => {
    return sharp(file.data)
        .trim()

        .withMetadata({
         
            density: 96,
            depth:24
        } )

        .resize({
            width: 1000,
            height: 1000,
         
            fit: sharp.fit.fill,
        })

        .toFormat('webp')
        .webp({ quality: 60})
        .toBuffer((err, data, info) => {
            console.log('info1 :', info.size);
            (err) => console.log(err);
        });
};

const funcQuality2 = (file) => {
    return sharp(file.data)
    .trim()
        .withMetadata({
            exif: {
                IFD0: {
                    Copyright: 'Oscar Huayascachi',
                },
            },
            density: 96,
            depth: 24,
        })
        .resize({ width: 500, height: 500, fit: sharp.fit.fill })
        .toFormat('webp')
        .webp({ quality: 40})
        .toBuffer((err, data, info) => {
            console.log('info2 :', info.size);
        });
};

const funcQuality3 = (file) => {
 
 
    return sharp(file.data)
        .withMetadata({
         
        density: 96,
 
         })
        .resize({ width: 400, height: 400, fit: sharp.fit.fill })
  
        .toFormat('webp')
        .webp({ quality: 40  })
        .toBuffer((err, data, info) => {
            console.log('info3 :', info.size);
        });
    
    };

const funcQuality4 = (file) => {
    return sharp(file.data)
    .trim()
    .withMetadata({
        exif: {
            IFD0: {
                Copyright: 'Oscar Huayascachi',
            },
        },
        density: 96,
        depth: 24,
    })
    .resize({ width: 300, height: 300, fit: sharp.fit.fill })
        .toFormat('webp')
        .webp({ quality: 40 })
        .toBuffer((err, data, info) => {
            console.log('info4 :', info.size);
        });
};

const funcQuality5 = (file) => {
    return sharp(file.data)
    .trim()
    .withMetadata({
        exif: {
            IFD0: {
                Copyright: 'Oscar Huayascachi',
            },
        },
        density: 96,
        depth: 24,
    })
    .resize({ width: 200, height: 200, fit: sharp.fit.fill })
        .toFormat('webp')
        .webp({ quality: 40 })
        .toBuffer((err, data, info) => {
            console.log('info5 :', info.size);
        });
};

const funcQuality6 = (file) => {
    return sharp(file.data)
    .trim()
    .withMetadata({
        exif: {
            IFD0: {
                Copyright: 'Oscar Huayascachi',
            },
        },
        density: 96,
        depth: 24,
    })
    .resize({ width: 100, height: 100, fit: sharp.fit.fill })
        .webp({ quality: 40})
        .toBuffer((err, data, info) => {
            console.log('info6 :', info.size);
        });
};

const funcQuality7 = (file) => {
    return sharp(file.data)
    .trim()
    .withMetadata({
   
        density: 96,
        depth: 24,
    })
        .resize({ width: 20, height: 20, fit: sharp.fit.fill })
        .toFormat('webp')
        .webp({ quality: 4})
        .toBuffer((err, data, info) => {
            console.log('info7 :', info.size);
        });
};

module.exports = {
    funcQuality1,
    funcQuality2,
    funcQuality3,
    funcQuality4,
    funcQuality5,
    funcQuality6,
    funcQuality7,
};
