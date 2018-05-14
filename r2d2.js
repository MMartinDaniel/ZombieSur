/// The r2d2 class
/**
 * @author FVelasco
 * 
 * @param parameters = {
 *      r2d2Height: <float>,
 *      r2d2Width : <float>,
 *      material: <Material>
 * }
 */



class r2d2 extends THREE.Object3D {
  
  constructor (parameters) {
    super();
    
    // If there are no parameters, the default values are used
    
    this.r2d2Height = (parameters.r2d2Height === undefined ? 20 : parameters.r2d2Height);
    this.r2d2Width  = (parameters.r2d2Width === undefined ? 45 : parameters.r2d2Width);       
    //Texturas
    this.material    = (parameters.material === undefined ? new THREE.MeshPhongMaterial ({color: 0xA2C257, specular: 0xfbf804, shininess: 70}) : parameters.material);
    this.matCuerpo = parameters.material2;
    this.matHombros = parameters.material3;    
    this.matBrazos = parameters.material4;
    this.matPies = parameters.material5;
    this.matLente = parameters.material6;



    // With these variables, the posititon of the hook is set
    this.angle           = 0;
    this.distance        = this.r2d2Width / 2;
    this.height          = this.r2d2Height / 2;
    this.fps = null;

    // Height of different parts
    this.baseHookHeight = this.r2d2Height/100;
    
    //SESION 2 DATOS

    this.energia = 100;
    this.puntos = 0;

    // Objects for operating with the r2d2

    this.base = null;
    this.head = null;
    this.brazoD = null;
    this.brazoI = null;   
    this.hombroI = null;
    this.hombroD = null;
    this.pieI = null;
    this.pieD = null; 
    this.healthbar = null;

    this.todo = new THREE.Mesh();

        this.angle = 0;   //Angulo cabeza
    this.bodyAngle = 0;   //cuerpod
    this.fps = this.createCamera();
   // this.base = this.createBase();
    this.base = this.createTodo();
    this.todo.add(this.base);
    // A way of feedback, a red jail will be visible around the r2d2 when a box is taken by it

    this.add (this.todo);
    

  }


   createTodo(){

        var todo = new THREE.Mesh();
        this.base = this.createBase();
        todo.add(this.base);

        // this.createFeets();
        //todo.add(this.feet1);
        //todo.add(this.feet2);

        this.hombroD = this.createShoulder({w:6,ww: 5});
        this.hombroI = this.createShoulder({w:-6, ww: -5});
        this.brazoD = this.createArm({w:6,ww: 5});
        this.brazoI = this.createArm({w:-6,ww: -5});
        this.pieD = this.createFoot({w:6,ww: 5});
        this.pieI = this.createFoot({w:-6,ww: -5});


        this.todo.add(this.hombroD);
        this.todo.add(this.hombroI);

        this.todo.add(this.brazoD);
        this.todo.add(this.brazoI);

        this.todo.add(this.pieD);
        this.todo.add(this.pieI);




        return todo;

  }
  
  // CUERPO
    createBase () {
      var base = new THREE.Mesh (
      new THREE.BoxGeometry (30, 20, 10, 16, 8), this.matCuerpo);
    base.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (0,-2.2, 0));
    base.rotation.x = this.bodyAngle;     //rotacion cuerrpo

    //Funciones para crear la cabeza, y los dos hombros, que a su vez incluiran la de cada brazo y estas las de cada pie
    this.head = this.createHead();
    base.add(this.healthbar);
    base.add(this.head);
    base.add(this.fps);
    base.castShadow = true;
    base.autoUpdateMatrix = false;
    return base;
  }

  createCamera(){
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
     // var look = new THREE.Vector3 (0,0,0);
    // this.camera.lookAt(look);
   this.camera.position.y = this.position.y+25; // <-- this is relative to the cube's position
  
    return this.camera;
  }

  // CABEZA
  createHead () {
   var head = new THREE.Mesh (
      new THREE.SphereGeometry (this.r2d2Width/10.2, this.r2d2Width, this.r2d2Height), this.material);
    head.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (0, this.r2d2Height/10, 0));
    head.castShadow = true;

    head.rotation.y = this.angle;
    head.position.y = this.baseHookHeight;
    head.autoUpdateMatrix = false;
    head.updateMatrix();
    //crear ojo
    //crear ojo

    // add spotlight for the shadows
      var spotLight = new THREE.SpotLight( 0xffffff,0.6 );
      spotLight.position.set( this.position.x, this.position.y+10, this.position.z);
      spotLight.castShadow = true;
      spotLight.shadow.camera.near = 300;
      spotLight.shadow.camera.fov = 1;
      spotLight.target.position.set( this.position.x, this.position.y-3, this.position.z+3);
    head.add (spotLight);
    head.add(spotLight.target);
    head.add(this.createEye());

    return head;
  }


// LENTE
createEye(){
    var eye = new THREE.Mesh (
      new THREE.CylinderGeometry (this.r2d2Width/50, this.r2d2Width/50, this.r2d2Height/20, 10, 8), this.matLente);

    eye.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (0, 5.8, -2));
    eye.rotateX(Math.PI/3);
    eye.castShadow = true;
    eye.autoUpdateMatrix = false;
    eye.updateMatrix();


    return eye;
}


createShoulder (place){
 var lshoulder = new THREE.Mesh ( 
    new THREE.BoxGeometry (this.r2d2Width/10, this.r2d2Width/20, this.r2d2Height/15), this.matHombros);
    lshoulder.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (place.ww, this.r2d2Height/2.5, 0));
    lshoulder.position.y = -2;
    lshoulder.castShadow = true;
    lshoulder.autoUpdateMatrix = false;
    lshoulder.updateMatrix();



    return lshoulder;
  } 

// BRAZOS
createArm (place){
 var larm = new THREE.Mesh ( 
    new THREE.CylinderGeometry (this.r2d2Width/50, this.r2d2Width/50 , this.r2d2Height/3, 16, 8),this.matBrazos);
    larm.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (place.w, this.r2d2Height/5, 0));
    
  larm.castShadow = true;
  larm.autoUpdateMatrix = false;
  larm.updateMatrix();



  return larm;  
}


createFoot (place){
 var rfoot = new THREE.Mesh ( 
    new THREE.ConeGeometry (this.r2d2Width/20, this.r2d2Width/20 , this.r2d2Height/3, 16, 8),  this.matPies);
    rfoot.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (place.w, this.r2d2Height/22, 0));
    
  rfoot.castShadow = true;
  rfoot.autoUpdateMatrix = false;
  rfoot.updateMatrix();
    return rfoot;  
}

setPositionH(cabeza,cuerpo,brazos){
  this.setHead(cabeza);
  this.setBody(cuerpo);
  this.setBrazos(brazos);
}
toRad(degrees) {
  return degrees * Math.PI / 180;
}

setHead(cabeza){
   this.angle = this.toRad(cabeza);
  this.head.rotation.y = this.angle;
}

setBody(cuerpo){
  this.bodyAngle = this.toRad(cuerpo);
  this.base.rotation.x = this.bodyAngle;
}

setBrazos(brazos){

 this.brazoI.scale.set(1,brazos,1);
 this.brazoD.scale.set(1,brazos,1);
 //base.position.y = (this.scalefFeet * 6) + 1.5; 
 this.hombroI.position.y = (this.r2d2Height/3 * brazos) -11 ;
 this.hombroD.position.y = (this.r2d2Height/3 * brazos) -11 ;
 this.base.position.y = (this.r2d2Height/3 * brazos) -2;

}


}

// class variables
r2d2.WORLD = 0;
r2d2.LOCAL = 1;
