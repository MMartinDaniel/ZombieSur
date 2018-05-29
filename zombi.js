

class Zombi extends THREE.Object3D {
  
  constructor (parameters) {
    super();

    this.angle           = 0;
    this.distance        = 10;
    this.height          = 10;
 
    //Controlar que el zombie cada X pasos mire al jugador
    this.pasos = 0;

    this.t_cabeza = parameters.cab;
    this.t_cuerpo = parameters.cuerpo;
    this.t_brazoD = parameters.brazoD;
    this.t_brazoI = parameters.brazoI;  
    this.t_pieI = parameters.pieI;
    this.t_pieD = parameters.pieD;

    //SESION 2 DATOS
    this.alive = true;
    this.vida = 100;
    this.tween_to_walkz = new TWEEN.Tween();
    this.tween_from_walkz = new TWEEN.Tween();
    this.tween_to_hit = new TWEEN.Tween();
    this.tween_from_hit = new TWEEN.Tween();
    this.tween_to_die = new TWEEN.Tween();
    this.walking = false;
    this.attacking = false;

    this.cabeza = null;
    this.cuerpo = null;
    this.brazoD = null;
    this.brazoI = null;   
    this.pieI = null;
    this.pieD = null;
    this.die_form = null;


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

        this.die_form = this.createBlood();

        this.todo.add(this.brazoD);
        this.todo.add(this.brazoI);

        this.todo.add(this.pieD);
        this.todo.add(this.pieI);



        this.walk();
        this.zombie_hit();
        
        todo.position.y = 8;

        return todo;

  }

  createBlood(){
     var textureLoader = new THREE.TextureLoader();   
      var alphaTest = textureLoader.load( 'UI/blood.png' );  
      var material = new THREE.MeshLambertMaterial({ transparent: true, side: THREE.DoubleSide, opacity:1, map : alphaTest});
      var materials = [material];
      var bloodMat = new THREE.MeshFaceMaterial( materials );

      var blood = new THREE.Mesh (new THREE.BoxGeometry (5, 70,70, 16, 8), bloodMat);
        blood.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (0, -15, 0));
        blood.rotation.y -= 90 * (Math.PI / 180);
        blood.position.z = -1;

        blood.autoUpdateMatrix = false;
        
      return blood;

  }
  
  // CUERPO
    createBody () {

        var base = new THREE.Mesh (new THREE.BoxGeometry (8, 12, 4, 6, 6,6), this.t_cuerpo);
        base.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (0,-15, 0));
        base.position.y = 25;
        this.cabeza = this.createHead();

        base.add(this.cabeza);
        base.castShadow = true;
        base.autoUpdateMatrix = false;
        return base;
  }


  createHead () {



     var head = new THREE.Mesh (
        new THREE.BoxGeometry (8, 8, 8), this.t_cabeza );
      head.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (0, -35, 0));
      head.position.y = 30;
      head.castShadow = true;
      head.autoUpdateMatrix = false;
      head.updateMatrix();
      return head;
  }


// BRAZOS
createArm (place){


    var materia = null;
    if(place.w < 0){
      materia = this.t_brazoI;
    }else{
      materia = this.t_brazoD;
    }



 var larm = new THREE.Mesh ( 
    new THREE.BoxGeometry (4, 12 ,4, 16, 8),materia);
  larm.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (place.w, -5, 0));   
  larm.position.y = 23; 
  larm.castShadow = true;
  larm.autoUpdateMatrix = false;
  larm.updateMatrix();



  return larm;  
}


createFoot (place){

      var materia = null;
    if(place.w < 0){
      materia = this.t_pieI;
    }else{
      materia = this.t_pieD;
    }

 var rfoot = new THREE.Mesh ( 
    new THREE.BoxGeometry (4, 12 , 4, 16, 8), materia);
  rfoot.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (place.w,-5, 0));
  rfoot.position.y = 11 ;  
  rfoot.castShadow = true;
  rfoot.autoUpdateMatrix = false;
  rfoot.updateMatrix();
    return rfoot;  
}

hit(shoot){
  this.vida -= shoot.dmg;
 // console.log(this.vida);
  if(this.vida <= 0){
    this.alive = false;
    return true;
  }
  return false;
}


toRad(degrees) {
  return degrees * Math.PI / 180;
}

setPiernas(piernas){
  this.angleP = this.toRad(piernas);
  this.pieD.rotation.x = this.angleP;
  this.pieI.rotation.x = -this.angleP;
}

  setBrazos(brazos){
    this.angle = this.toRad(brazos);
    this.brazoD.rotation.x = this.angle;
    this.brazoI.rotation.x = -this.angle;

  }

death_start(){
  this.walk_stop();
  this.hit_stop();
  this.die();

}
death_stop(){
  this.tween_to_die.stop();
}


die(){

      this.cuerpo.add(this.die_form);
      this.todo.rotation.x = this.toRad(270);
      this.brazoD.rotation.x = this.toRad(-40);
      this.brazoI.rotation.x = this.toRad(-40);
}

walk_start(){
  this.tween_to_walkz.start(); 
  this.walking = true;
}

walk_stop(){
  this.tween_to_walkz.stop();
  this.tween_from_walkz.stop();
  this.walking = false;
}


//Funciones movimiento

  walk() {

   var position = {x:0.0, y: 0.0, z: 0.0};
   var pieI = this.pieI;
   var pieD = this.pieD;
   var todt = this.todo;
   var  brazoI = this.brazoI;
   var brazoD  = this.brazoD;
   this.tween_to_walkz = new TWEEN.Tween(position).to({x: 0.5, y:0.0, z:0.050},1000).onUpdate(function(){

          pieI.rotation.x =  position.x;
          pieD.rotation.x = -position.x;
          todt.rotation.z = position.z/2;
          brazoI.rotation.z = position.z;
          brazoD.rotation.z = position.z;
          brazoI.rotation.x = -((position.x)/2)+(Math.PI / 180)*(270);
          brazoD.rotation.x = ((position.x)/2)+(Math.PI / 180)*(270);


   });

   this.tween_from_walkz = new TWEEN.Tween(position).to({x: -0.5, y:0.0, z:0.050},1000).onUpdate(function(){
          pieI.rotation.x =  position.x;
          pieD.rotation.x =  -position.x;
          todt.rotation.z = -position.z/2;
          brazoI.rotation.z = -position.z;
          brazoD.rotation.z = -position.z;
          brazoI.rotation.x = -((position.x)/2)+(Math.PI / 180)*(270);
          brazoD.rotation.x = ((position.x)/2)+(Math.PI / 180)*(270);

   });
    this.pieI = pieI;
    this.pieD = pieD;
    this.todo = todt;
    this.brazoI = brazoI;
    this.brazoD = brazoD;

   this.tween_to_walkz.chain(this.tween_from_walkz);
   this.tween_from_walkz.chain(this.tween_to_walkz);


}

hit_start(){
  this.tween_to_hit.start(); 

  this.attacking = true;
}

hit_stop(){
  this.tween_to_hit.stop();
  this.tween_from_hit.stop(); 
  this.attacking = false;
}

//Funciones movimiento

  zombie_hit() {

   var position = {x:0.0};
   var pieI = this.pieI;
   var pieD = this.pieD;
   var todt = this.todo;
   var  brazoI = this.brazoI;
   var brazoD  = this.brazoD;

   this.tween_to_hit = new TWEEN.Tween(position).to({x: 2},500).onUpdate(function(){
          brazoI.rotation.x = position.x;
          brazoD.rotation.x = position.x;
          brazoI.rotation.x = scene.zombi.toRad(270);
          brazoD.rotation.x = scene.zombi.toRad(270);


   });

   this.tween_from_hit = new TWEEN.Tween(position).to({x: 4},500).onUpdate(function(){

          brazoI.rotation.x = -position.x;
          brazoD.rotation.x = -position.x;
   });

    this.pieI = pieI;
    this.pieD = pieD;
    this.todo = todt;
    this.brazoI = brazoI;
    this.brazoD = brazoD;

   this.tween_to_hit.chain(this.tween_from_hit);
   this.tween_from_hit.chain(this.tween_to_hit);
/*
   if(scene.checkColision){
    this.hit_stop;
    this.walk_start();
   }
  */
}



}

