const {  response } = require("express");

const {  s3 } = require("../aws/acceso.aws");

const createAlbum = async (req, res = response) => {
  const { nombreAlbum } = req.body;

  const crear = (tipo) => {
    let albumName = tipo.trim();
    if (!albumName) {
      return res.status(500).json({
        ok: false,
        msg: "El nombre no debe tener espacios",
      });
    }
    if (albumName.indexOf("/") !== -1) {
      return res.status(500).json({
        ok: false,
        msg: "El nombre del albun no puede contener slash",
      });
    }
    let albumKey = encodeURIComponent(albumName);

    s3.headObject({Key: albumKey }, (err, data) => {
      if (!err) {
        return res.status(500).json({
          ok: false,
          msg: "El album con ese nombre ya existe",
        });
      }
      if (err.code !== "NotFound") {
        return res.status(403).json({
          ok: false,
          msg: "Hubo un error al crear tu álbum",
          err,
        });
      }
      s3.putObject({   Key: albumKey + "/", }, (err, data) => {
        if (err) {
          return alert(
            "There was an error creating your album: " + err.message,
          );
        }
        return res.json({
          ok: true,
          msg: "Se creo album correctamente",
          albumKey,
     
        });

        //viewAlbum(albumName);
      });
    });
  };

  crear(nombreAlbum);
};

const listarAlbuem = async (req, res = response) => {
/**  */

     s3.listObjects({Delimiter: '/'},(err, data) => {
      if (err) {
        return alert('There was an error listing your albums: ' + err.message);
      } else {
       albums = data.CommonPrefixes.map((commonPrefix) => {
          let prefix = commonPrefix.Prefix;
          let albumNames = decodeURIComponent(prefix.replace('/', ''));
     
          return albumNames
                })
      }
      res.json({
        ok: true,
        msg: 'Se ha listado',
        albums
  
      });
    })
    }

   

// getAlbunes
const getAlbum = async (req, res = response) => {

  const { albumName } = req.body;

  const viewAlbum = async (albumName) => {
    let albumPhotosKey = encodeURIComponent(albumName) + "/"; // usuarios/

    s3.listObjects({      Prefix: albumPhotosKey   }, (err, data) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          msg: "Hubo un error al ver tu álbum:",
         
        });
      }
      let href = s3.listObjects().httpRequest.endpoint.href;

      let bucketUrl = href + data.Name + "/"; // --> https://s3.sa-east-1.amazonaws.com/mantttostk/

      let photos = data.Contents.map((photo) => {
        let photoKey = photo.Key; // --> usuarios/oscar.jpg
        let photoUrls = bucketUrl + photoKey; // --> https://s3.sa-east-1.amazonaws.com/mantttostk/usuarios/oscar.jpg

        return photoUrls;
      });


      res.json({
        ok: true,
        photos,
      });


    });
  };

  viewAlbum(albumName);
  
};

const putAlbum = async (req, res = response) => {
};

const deleteAlbum = async (req, res = response) => {
  const nameA = req.body.nombreDeAlbum;

  listaAlbunes = [];

    let albumKey = encodeURIComponent(nameA) + "/";


    s3.listObjects({Delimiter: '/'},(err, data) => {
      if (err) {
        return alert('There was an error listing your albums: ' + err.message);
      } else {
       albums = data.CommonPrefixes.map((commonPrefix) => {
          let prefix = commonPrefix.Prefix;
          let albumNames = decodeURIComponent(prefix.replace('/', ''));
          return albumNames
                })

       // Se convierte en un array plano la lista de albunes
        let listado = [];
        listado.push(albums);
        listaAlbunes = listado.flat();
      }

      const tipoValidos = listaAlbunes;
    
      if( !tipoValidos.includes(nameA) ) {
  
          return res.status(400).json({
              ok:false,
              msg: 'No exite o ya fue eliminado'
          });
      }

      s3.listObjects({ Prefix: albumKey}, (err, data) => {
      
        if (err) {
          return alert("There was an error deleting your album: ", err.message);
        }
  
        let objects = data.Contents.map((object) => {
          return { Key: object.Key };
        });
  
  
        s3.deleteObjects( { Delete: { Objects: objects, Quiet: true } },
          (err, data) => {
            if (err) {
              return res.json({
                ok: false,
                msg: `Album: ${nameA}  ya no existe`
              })
              
            }
            //listarAlbuem()
            console.log("Successfully deleted album.");
           
           res.json({
             ok: true,
             msg: `Successfully deleted Album ${nameA}`,
             
          });
          }
  
          )
  
  
      });

    })




    }


module.exports = {
  createAlbum,
  getAlbum,
  putAlbum,
  deleteAlbum,
  listarAlbuem,
};
