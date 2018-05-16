class Building extends THREE.Object3D {
 constructor (parameters) {
    super();
    
    this.material = null;
    this.type = parameters.type;


    //SESION 2 DATOS

  
    this.modelo = null;

    this.todo = new THREE.Mesh();
    this.modelo = this.crearEdificios();
    this.todo.add(this.modelo);

    this.add (this.todo);
    
  }

  crearEdificios(){
    var Bmodel = new THREE.Object3D();
    var loader = new THREE.OBJLoader();
      if(this.type == 1){  
        loader.load('models/edificios/building.obj',
          function(obj,xhr){
          obj.position.x = 240;
          obj.position.y = 30;
          obj.position.z = 130;
 
          obj.scale.set(6,6,6);
          Bmodel.add(obj);
        }
        );
      }

      return Bmodel;
    }

}
