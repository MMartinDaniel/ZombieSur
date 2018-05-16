class Building extends THREE.Object3D {
 constructor (parameters) {
    super();
    
    this.material = null;
    this.type = parameters.type;



  
    this.modelo = null;

    this.todo = new THREE.Mesh();
    this.modelo = this.crearEdificios();
    this.todo.add(this.modelo);

    this.add (this.todo);
    
  }

  crearEdificios(){
    var modelko = new THREE.Object3D();
    var loader = new THREE.ObjectLoader();
      if(this.type == 1){  
        loader.load('models/edificios/japanese-house-2.json',
          function(obj,xhr){

            obj.position.x = 240;
            obj.position.y = 15 ;
            obj.position.z = 122;
            obj.scale.set(0.3,0.3,0.3);
            modelko.add(obj);
        }
        );
      }

      return modelko;
    }







}
