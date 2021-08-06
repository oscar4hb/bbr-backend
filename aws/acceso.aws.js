const AWS = require('aws-sdk');
const { response } = require('express');


    AWS.config.region = 'us-east-1'; // Región

    const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, 
        region: process.env.AWS_REGION,
        apiVersion: "2021-01-03",
        params: {
            Bucket: process.env.AWS_NAME_BUCKET,
        }
    });
    
    
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-1:8332b440-62ef-4812-a275-19004726ca37',
        accessKeyId: process.env.AWS_ACCESS_KEY,
    });
    
    
    AWS.config.getCredentials((err, res = response) => {
      if (err) console.log(err.stack);
      // credentials not loaded
      else {
        const AccesoID = AWS.config.credentials.accessKeyId;
        console.log('Conexión AWS successful');
        // console.log("Access key:", AccesoID);
       

      }

    });



module.exports = {
   s3

}