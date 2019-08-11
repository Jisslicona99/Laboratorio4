
var mongoose = require('mongoose'); // Utilizamos la librería de mongoose
//Creamos la conexión con mongo
mongoose.connect('mongodb://usuario:contraseña@host:puerto/nombre_BD');

var express    = require('express');        // Utilizaremos express, aqui lo mandamos llamar

var app        = express();                 // definimos la app usando express
var bodyParser = require('body-parser'); //

// configuramos la app para que use bodyParser(), esto nos dejara usar la informacion de los POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // seteamos el puerto

var router = express.Router();   //Creamos el router de express

// Seteamos la ruta principal
router.get('/', function(req, res) {
    res.json({ message: 'Hooolaa :)'});
});

router.route('/dogs') //agregamos la ruta /dogs
  // El método POST es el estándar para crear
  .post(function(req, res) {
    var dog = new Dog(); // Creamos una nueva instancia del model Dog
    dog.name = req.body.name; // seteamos el nombre del perrito
    dog.age = req.body.age; // seteamos la edad del perrito
    // Guardamos el perrito, utilizando el modelo de mongoose
    dog(function(err) {
      if (err){ //Si hay un error, lo regresamos
        res.send(err);
      }
    //Si no hay errores, regresamos un mensaje de que todo salió bien
    res.json({ message: 'Creamos un perrito!' });
  });
});


  router.route('/dogs/:dog_id')
 //Como utilizamos la misma ruta para editar y eliminar
 // agregamos el delete despues del put
  /*.put(function(req, res) {
    ...
  })*/

  // DELETE para borrar el perrito
  .delete(function(req, res) {
    Dog.remove({
      _id: req.params.dog_id
      }, function(err, dog) {
        if (err){
          res.send(err);
        }
        
        res.json({ message: 'El perrito fue eliminado correctamente'});
    });
  });

// Obtenemos todos los perritos 
router.route('/dogs')
  //Para listar GET es el estandar
  .get(function(req, res) {
    //Usamos la funcion find de mongoose para encontrar todos los registros
    Dog.find(function(err, dogs) {
    //Si hay un error, lo regresamos
    if (err){
      res.send(err);
    }
    //Si no hay errores, regresamos los registros
    res.json(dogs);
  });
});

// Le decimos a la aplicación que utilize las rutas que agregamos
app.use('/api', router);

// Iniciamos el servidor
app.listen(port);
console.log('Aplicación creada en el puerto: ' + port);
