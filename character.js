class Character extends THREE.Object3D {
  
  constructor (parameters) {
    super();
    
    this.material    = parameters.material;

    // With these variables, the posititon of the hook is set
    this.angle           = 0;
    this.distance        = 10;
    this.height          = 10;
    
    //SESION 2 DATOS

    this.vida = 100;
    this.dinero = 0;

    // Objects for operating with the r2d2
    this.cabeza = null;
    this.cuerpo = null;
    this.brazoD = null;
    this.brazoI = null;   
    this.pieI = null;
    this.pieD = null; 


    this.todo = new THREE.Mesh();

    this.angle = 0;   //Angulo cabeza
    this.bodyAngle = 0;   //cuerpod
  
    this.base = this.createTodo();
    this.todo.add(this.base);

    this.add (this.todo);
    

  }


   createTodo(){

        var todo = new THREE.Mesh();

        this.cuerpo =  this.createBody();
        todo.add(this.cuerpo);
        this.brazoD =  this.createArm({w:6,ww: 5});;
        this.brazoI =  this.createArm({w:-6,ww: -5});;   
        this.pieD = this.createFoot({w:2,ww: 5});
        this.pieI = this.createFoot({w:-2,ww: -5});


        this.todo.add(this.brazoD);
        this.todo.add(this.brazoI);

        this.todo.add(this.pieD);
        this.todo.add(this.pieI);



        todo.position.y = 8;

        return todo;

  }
  
  // CUERPO
    createBody () {
    var base = new THREE.Mesh (new THREE.BoxGeometry (8, 12, 4, 16, 8), this.material);
    base.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (0,10, 0));
    
    this.cabeza = this.createHead();

    base.add(this.cabeza);
    base.castShadow = true;
    base.autoUpdateMatrix = false;
    return base;
  }


  createHead () {
   var head = new THREE.Mesh (
      new THREE.BoxGeometry (8, 8, 8), this.material);
    head.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (0, 20, 0));
    head.castShadow = true;
    head.autoUpdateMatrix = false;
    head.updateMatrix();
    return head;
  }


// BRAZOS
createArm (place){
 var larm = new THREE.Mesh ( 
    new THREE.BoxGeometry (4, 12 ,4, 16, 8),this.material);
    larm.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (place.w, 18, 0));   
  larm.castShadow = true;
  larm.autoUpdateMatrix = false;
  larm.updateMatrix();



  return larm;  
}


createFoot (place){
 var rfoot = new THREE.Mesh ( 
    new THREE.BoxGeometry (4, 12 , 4, 16, 8),  this.material);
    rfoot.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (place.w,6, 0));
    
  rfoot.castShadow = true;
  rfoot.autoUpdateMatrix = false;
  rfoot.updateMatrix();
    return rfoot;  
}



}
