

class Zombi extends THREE.Object3D {
  
  constructor (parameters) {
    super();
    


    // With these variables, the posititon of the hook is set
    this.angle           = 0;
    this.distance        = 10;
    this.height          = 10;
 
    //Controlar que el zombie cada X pasos mire al jugador
    this.pasos = 0;

    //SESION 2 DATOS
    this.alive = true;
    this.vida = 100;
    this.dinero = 0;
    this.tween_to_walkz = new TWEEN.Tween();
    this.tween_from_walkz = new TWEEN.Tween();
    this.tween_to_hit = new TWEEN.Tween();
    this.tween_from_hit = new TWEEN.Tween();
    this.tween_to_die = new TWEEN.Tween();
    this.walking = false;
    this.attacking = false;
    // Objects for operating with the r2d2
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

      //  this.brazoD.rotation.x = this.toRad(270);
       // this.brazoI.rotation.x = this.toRad(270);


        this.pieD = this.createFoot({w:2,ww: 5});
        this.pieI = this.createFoot({w:-2,ww: -5});

        this.die_form = this.createBlood();


        this.todo.add(this.brazoD);
        this.todo.add(this.brazoI);

        this.todo.add(this.pieD);
        this.todo.add(this.pieI);



        this.walk();
        this.zombie_hit();
        
        //this.die();

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
      var textureLoader = new THREE.TextureLoader();   
      //Cara izq
      var texture0 = textureLoader.load( 'imgs/zombiecuerpo4.png' );
      //Cara der
      var texture1 = textureLoader.load( 'imgs/zombiecuerpo3.png' );
      //Cara superior
      var texture2 = textureLoader.load( 'imgs/zombiecabeza2.png' );
      //Cara inferior
      var texture3 = textureLoader.load( 'imgs/zombiecabeza6.png' );
      //Cara delantera
      var texture4 = textureLoader.load( 'imgs/zombiecuerpo1.png' );
      //Cara trasera
      var texture5 = textureLoader.load( 'imgs/zombiecuerpo5.png' );

      var materials = [
          new THREE.MeshLambertMaterial( { map: texture0 } ),
          new THREE.MeshLambertMaterial( { map: texture1 } ),
          new THREE.MeshLambertMaterial( { map: texture2 } ),
          new THREE.MeshLambertMaterial( { map: texture3 } ),
          new THREE.MeshLambertMaterial( { map: texture4 } ),
          new THREE.MeshLambertMaterial( { map: texture5 } )
      ];
      var bodyMaterial = new THREE.MeshFaceMaterial( materials );

        var base = new THREE.Mesh (new THREE.BoxGeometry (8, 12, 4, 6, 6,6), bodyMaterial);
        base.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (0,-15, 0));
        base.position.y = 25;
        this.cabeza = this.createHead();

        base.add(this.cabeza);
        base.castShadow = true;
        base.autoUpdateMatrix = false;
        return base;
  }


  createHead () {
    var textureLoader = new THREE.TextureLoader();
    //Cara izq
    var texture0 = textureLoader.load( 'imgs/zombiecabeza4.png' );
    //Cara der
    var texture1 = textureLoader.load( 'imgs/zombiecabeza3.png' );
    //Cara superior
    var texture2 = textureLoader.load( 'imgs/zombiecabeza2.png' );
    //Cara inferior
    var texture3 = textureLoader.load( 'imgs/zombiecabeza6.png' );
    //Cara delantera
    var texture4 = textureLoader.load( 'imgs/zombiecabeza1.png' );
    //Cara trasera
    var texture5 = textureLoader.load( 'imgs/zombiecabeza5.png' );

    var materials = [
        new THREE.MeshLambertMaterial( { map: texture0 } ),
        new THREE.MeshLambertMaterial( { map: texture1 } ),
        new THREE.MeshLambertMaterial( { map: texture2 } ),
        new THREE.MeshLambertMaterial( { map: texture3 } ),
        new THREE.MeshLambertMaterial( { map: texture4 } ),
        new THREE.MeshLambertMaterial( { map: texture5 } )
    ];
    var headMaterial = new THREE.MeshFaceMaterial( materials );


     var head = new THREE.Mesh (
        new THREE.BoxGeometry (8, 8, 8), headMaterial );
      head.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (0, -35, 0));
      head.position.y = 30;
      head.castShadow = true;
      head.autoUpdateMatrix = false;
      head.updateMatrix();
      return head;
  }


// BRAZOS
createArm (place){

    var textureLoader = new THREE.TextureLoader();
    //Cara izq
     if(place.w > 0) var texture0 = textureLoader.load( 'imgs/zombiebrazo5.png' );
     else texture0 = textureLoader.load( 'imgs/zombiebrazo3.png' );

    //Cara der(menor que 0 es izq)
    if(place.w > 0) var texture1 = textureLoader.load( 'imgs/zombiebrazo3.png' );
    else var texture1 = textureLoader.load( 'imgs/zombiebrazo5.png' );

    //Cara superior
    if(place.w > 0) var texture2 = textureLoader.load( 'imgs/zombiebrazo2_2.png' );
    else var texture2 = textureLoader.load( 'imgs/zombiebrazo2.png' );


    //Cara inferior
    var texture3 = textureLoader.load( 'imgs/zombiebrazo6.png' );
    //Cara delantera
    var texture4 = textureLoader.load( 'imgs/zombiebrazo1.png' );
    //Cara trasera
    var texture5 = textureLoader.load( 'imgs/zombiebrazo5.png' );

    var materials = [
        new THREE.MeshLambertMaterial( { map: texture0 } ),
        new THREE.MeshLambertMaterial( { map: texture1 } ),
        new THREE.MeshLambertMaterial( { map: texture2 } ),
        new THREE.MeshLambertMaterial( { map: texture3 } ),
        new THREE.MeshLambertMaterial( { map: texture4 } ),
        new THREE.MeshLambertMaterial( { map: texture5 } )
    ];
    var armMaterial = new THREE.MeshFaceMaterial( materials );




 var larm = new THREE.Mesh ( 
    new THREE.BoxGeometry (4, 12 ,4, 16, 8),armMaterial);
  larm.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (place.w, -5, 0));   
  larm.position.y = 23; 
  larm.castShadow = true;
  larm.autoUpdateMatrix = false;
  larm.updateMatrix();



  return larm;  
}


createFoot (place){

    var textureLoader = new THREE.TextureLoader();
    //Cara izq
    if(place.w > 0) var texture0 = textureLoader.load( 'imgs/zombiepierna3_1.png' );
    else var texture0 = textureLoader.load( 'imgs/zombiepierna3_1.png' );
    //Cara der
    if(place.w > 0) var texture1 = textureLoader.load( 'imgs/zombiepierna3.png' );
    else var texture1 = textureLoader.load( 'imgs/zombiepierna3.png' );
    //Cara superior
    if(place.w > 0) var texture2 = textureLoader.load( 'imgs/zombieTapaArriba.png' );
    else var texture2 =  textureLoader.load( 'imgs/zombieTapaArriba.png' );
    //Cara inferior
    var texture3 = textureLoader.load( 'imgs/zombiepierna2.png' );
    //Cara delantera
    if(place.w > 0)  var texture4 = textureLoader.load( 'imgs/zombiepierna1_1.png' );
    else var texture4 = textureLoader.load( 'imgs/zombiepierna1_1.png' );
    //Cara trasera
    var texture5 = textureLoader.load( 'imgs/zombiepierna2.png' );

    var materials = [
        new THREE.MeshLambertMaterial( { map: texture0 } ),
        new THREE.MeshLambertMaterial( { map: texture1 } ),
        new THREE.MeshLambertMaterial( { map: texture2 } ),
        new THREE.MeshLambertMaterial( { map: texture3 } ),
        new THREE.MeshLambertMaterial( { map: texture4 } ),
        new THREE.MeshLambertMaterial( { map: texture5 } )
    ];
    var footMaterial = new THREE.MeshFaceMaterial( materials );


 var rfoot = new THREE.Mesh ( 
    new THREE.BoxGeometry (4, 12 , 4, 16, 8), footMaterial);
  rfoot.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (place.w,-5, 0));
  rfoot.position.y = 11 ;  
  rfoot.castShadow = true;
  rfoot.autoUpdateMatrix = false;
  rfoot.updateMatrix();
    return rfoot;  
}

hit(shoot){
  this.vida -= shoot.dmg;
  console.log(this.vida);
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
/*
   var position = {y:0.0};
   
   this.tween_to_die = new TWEEN.Tween(position).to({y:0.0},500).onUpdate(function(){
      scene.zombi.todo.rotation.x = scene.zombi.toRad(270);
      scene.zombi.brazoD.rotation.x = scene.zombi.toRad(-40);
      scene.zombi.brazoI.rotation.x = scene.zombi.toRad(-40);

  });
*/
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

