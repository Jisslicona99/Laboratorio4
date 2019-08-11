outer.route('/dogs') //agregamos la ruta /dogs
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

//Ruta para editar un perrito
router.route('/dogs/:dog_id')
  // El estandár para editar es PUT
  .put(function(req, res) {
    // Usamos la funcion findById de mongoose para encontrar
    // el perrito que queremos editar 
    Dog.findById(req.params.dog_id, function(err, dog) {
      
      if (err){//si hay errores los regresamos
        res.send(err);
      }
      
      //Modificamos el registro
      dog.age = req.body.age; 
      // Guardamos
      dog.save(function(err) {
        if (err){
            res.send(err);
        }
        res.json({ message: 'El perrito ' +  dog.name + ' fue actualizado correctamente'});
      });
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

router.route(‘/dogs/:dog_id’)
 //Como utilizamos la misma ruta para editar y eliminar
 // agregamos el delete despues del put
  .put(function(req, res) {
    ...
  })
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