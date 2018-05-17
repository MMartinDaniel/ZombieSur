

class Zombi extends THREE.Object3D {
  
  constructor (parameters) {
    super();
    


    // With these variables, the posititon of the hook is set
    this.angle           = 0;
    this.distance        = 10;
    this.height          = 10;
    
    //SESION 2 DATOS

    this.vida = 100;
    this.dinero = 0;
    this.tween_to_walkz = new TWEEN.Tween();
    this.tween_from_walkz = new TWEEN.Tween();

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

        this.walk();

        todo.position.y = 8;

        return todo;

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
          new THREE.MeshBasicMaterial( { map: texture0 } ),
          new THREE.MeshBasicMaterial( { map: texture1 } ),
          new THREE.MeshBasicMaterial( { map: texture2 } ),
          new THREE.MeshBasicMaterial( { map: texture3 } ),
          new THREE.MeshBasicMaterial( { map: texture4 } ),
          new THREE.MeshBasicMaterial( { map: texture5 } )
      ];
      var bodyMaterial = new THREE.MeshFaceMaterial( materials );

        var base = new THREE.Mesh (new THREE.BoxGeometry (8, 12, 4, 16, 8), bodyMaterial);
        base.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (0,10, 0));
        
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
        new THREE.MeshBasicMaterial( { map: texture0 } ),
        new THREE.MeshBasicMaterial( { map: texture1 } ),
        new THREE.MeshBasicMaterial( { map: texture2 } ),
        new THREE.MeshBasicMaterial( { map: texture3 } ),
        new THREE.MeshBasicMaterial( { map: texture4 } ),
        new THREE.MeshBasicMaterial( { map: texture5 } )
    ];
    var headMaterial = new THREE.MeshFaceMaterial( materials );


     var head = new THREE.Mesh (
        new THREE.BoxGeometry (8, 8, 8), headMaterial );
      head.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (0, 20, 0));
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
        new THREE.MeshBasicMaterial( { map: texture0 } ),
        new THREE.MeshBasicMaterial( { map: texture1 } ),
        new THREE.MeshBasicMaterial( { map: texture2 } ),
        new THREE.MeshBasicMaterial( { map: texture3 } ),
        new THREE.MeshBasicMaterial( { map: texture4 } ),
        new THREE.MeshBasicMaterial( { map: texture5 } )
    ];
    var armMaterial = new THREE.MeshFaceMaterial( materials );




 var larm = new THREE.Mesh ( 
    new THREE.BoxGeometry (4, 12 ,4, 16, 8),armMaterial);
    larm.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (place.w, 18, 0));   
  larm.castShadow = true;
  larm.autoUpdateMatrix = false;
  larm.updateMatrix();



  return larm;  
}


createFoot (place){

    var textureLoader = new THREE.TextureLoader();
    //Cara izq
    if(place.w > 0) var texture0 = textureLoader.load( 'imgs/zombiepierna3_1.png' );
    else var texture0 = textureLoader.load( 'imgs/zombiepierna2.png' );
    //Cara der
    if(place.w > 0) var texture1 = textureLoader.load( 'imgs/zombiepierna2.png' );
    else var texture1 = textureLoader.load( 'imgs/zombiepierna3.png' );
    //Cara superior
    if(place.w > 0) var texture2 = texture1 = textureLoader.load( 'imgs/zombiepierna2.png' );
    //Cara inferior
    var texture3 = textureLoader.load( 'imgs/zombiepierna2.png' );
    //Cara delantera
    if(place.w > 0)  var texture4 = textureLoader.load( 'imgs/zombiepierna1_1.png' );
    else var texture4 = textureLoader.load( 'imgs/zombiepierna1.png' );
    //Cara trasera
    var texture5 = textureLoader.load( 'imgs/zombiepierna2.png' );

    var materials = [
        new THREE.MeshBasicMaterial( { map: texture0 } ),
        new THREE.MeshBasicMaterial( { map: texture1 } ),
        new THREE.MeshBasicMaterial( { map: texture2 } ),
        new THREE.MeshBasicMaterial( { map: texture3 } ),
        new THREE.MeshBasicMaterial( { map: texture4 } ),
        new THREE.MeshBasicMaterial( { map: texture5 } )
    ];
    var footMaterial = new THREE.MeshFaceMaterial( materials );






 var rfoot = new THREE.Mesh ( 
    new THREE.BoxGeometry (4, 12 , 4, 16, 8), footMaterial);
    rfoot.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (place.w,6, 0));
    
  rfoot.castShadow = true;
  rfoot.autoUpdateMatrix = false;
  rfoot.updateMatrix();
    return rfoot;  
}

hit(shoot){
  this.vida -= shoot.dmg;
  console.log(this.vida);
  if(this.vida <= 0){
    return true;
  }
  return false;
}




walk_start(){
  this.tween_to_walkz.start(); 
}



//Funciones movimiento

  walk() {


   var position = {x:0.0, y: 0.0};

   this.tween_to_walkz = new TWEEN.Tween(position).to({x: 1.2, y:0.0},500).onUpdate(function(){

           this.pieI.rotation.x =  40;
           this.character.pieD.rotation.x = -position.x;
           this.character.brazoI.rotation.x =  position.x;
           this.character.brazoD.rotation.x = -position.x;


   });

   this.tween_from_walkz = new TWEEN.Tween(position).to({x: -1.2, y:0.0},500).onUpdate(function(){
          this.pieI.rotation.x =  position.x;
          this.pieD.rotation.x =  -position.x;
          this.brazoI.rotation.x =  position.x;
          this.brazoD.rotation.x = -position.x;
   });




   this.tween_to_walkz.chain(this.tween_from_walkz);
   this.tween_from_walkz.chain(this.tween_to_walkz);


}

/*
walk_stop(){
    this.tween_to_walk.stop();

}
*/






}

