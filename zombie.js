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


    // Objects for operating with the r2d2

    this.base = null;
    this.head = null;
    this.brazoD = null;
    this.brazoI = null;   
    this.pieI = null;
    this.pieD = null; 

    this.todo = new THREE.Mesh();

    this.angle = 0;   //Angulo cabeza
    this.bodyAngle = 0;   //cuerpod

   // this.base = this.createBase();
    this.base = this.createBase();
    this.todo.add(this.base);
    // A way of feedback, a red jail will be visible around the r2d2 when a box is taken by it

    this.add (this.todo);
  }


  createTodo(){
        var todo = new THREE.Mesh();
        this.base = this.createBase();
        todo.add(this.base);
  }
  
  // CUERPO
  createBase () {
    var base = new THREE.Mesh (
    new THREE.BoxGeometry (5, 10, 5));
    base.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (0,20, 0));
    //base.rotation.x = this.bodyAngle;     //rotacion cuerrpo

    //Funciones para crear la cabeza, y los dos hombros, que a su vez incluiran la de cada brazo y estas las de cada pie
    //this.head = this.createHead();
    //base.add(this.healthbar);
    //base.add(this.head);
    //base.castShadow = true;
    //base.autoUpdateMatrix = false;
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


  }


// LENTE
createEye(){


}


// BRAZOS
createArm (place){
  
}


createFoot (place){
  
}


toRad(degrees) {
  return degrees * Math.PI / 180;
}





}