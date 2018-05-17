class Gun extends THREE.Object3D {
  
  constructor (parameters) {
    super();
    
    this.material = null;
    this.distance = 0;
    this.bullet = new Bullet ({type:'1'});
    this.max_bullets = 0;
    this.reload_time = 0;
    this.price = 100;
    this.damage = 0;
    this.type = parameters.type;

    //SESION 2 DATOS

  
    this.shoot_anim = new TWEEN.Tween();
    this.modelo = null;
    this.todo = new THREE.Mesh();
    this.modelo = this.crearArma();
    this.todo.add(this.modelo);
    //this.todo.add(this.bullet);
    this.add (this.todo);
    
  }

  crearArma(){

    var modelko = new THREE.Object3D();
    var loader = new THREE.ObjectLoader();
      if(this.type == 1){  
        this.distance = 200;
        this.damage = 20;
        this.reload_time = 40;
        loader.load('models/mp5k.json',
          function(obj){
          obj.position.y -= 15;
          obj.position.x += 6.7;
          obj.rotation.y = 59.7;
          obj.position.z += 2;
          obj.rotation.x = 1.5;
          obj.scale.set(0.125,0.125,0.125);
          modelko.add(obj);
        }
        );
      }else if(this.type == 2){
        this.distance = 200;
        this.damage = 40;
        this.reload_time = 10;
      
        loader.load('models/m4a1.json',
          function(obj){
          var materialx = new THREE.MeshBasicMaterial({ color: 0xff0000 });
          obj.material = materialx;
          obj.position.y -= 15;
          obj.position.x += 6.7;
          obj.rotation.y = 59.7;
          obj.position.z += 2;
          obj.rotation.x = 1.5;
          obj.scale.set(10,10,10);
          modelko.add(obj);
        });

      }

      return modelko;
    }

    shoot(){
      this.todo.add(this.bullet);
    }
    checkGunPos(param){
      if(this.bullet.position.y < -this.distance || param.hitt){
        this.todo.remove(this.bullet);
        this.bullet = new Bullet ({type:'1'});
        return false;
      }
      return true;
    }
}
