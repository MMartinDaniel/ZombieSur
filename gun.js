class Gun extends THREE.Object3D {
  
  constructor (parameters) {
    super();
    
    this.material = null;
    this.damage           = 0;
    this.distance        = 0;
    this.bullets          = 0;
    this.max_bullets = 0;
    this.reload_time = 0;
    this.price = 100;
    this.type = parameters.type;

    //SESION 2 DATOS

  
    this.shoot_anim = new TWEEN.Tween();
    this.modelo = null;
    this.todo = new THREE.Mesh();
    this.modelo = this.crearArma();
    this.todo.add(this.modelo);

    this.add (this.todo);
    
  }

  crearArma(){
    var modelko = new THREE.Object3D();
    var loader = new THREE.ObjectLoader();
      if(this.type == 1){  
        loader.load('models/mp5k.json',
          function(obj,xhr){
          obj.position.y -= 15;
          obj.position.x += 6.7;
          obj.rotation.y = 59.7;
          obj.position.z += 2;
          obj.rotation.x = 1.5;
           obj.scale.set(0.125,0.125,0.125);
          modelko.add(obj);
        }
        );
      }

      return modelko;
    }

}
