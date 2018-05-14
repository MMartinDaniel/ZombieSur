class Character extends THREE.Object3D {
  
  constructor (parameters) {
    super();
    
    this.materialBody    = parameters.materialBody;
    this.materialCab = parameters.materialCab;
    this.materialArm = parameters.materialArm;
    this.materialfoot = parameters.materialfoot;
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
        this.brazoD =  this.createArm({w:6,ww: 5});;
        this.brazoI =  this.createArm({w:-6,ww: -5});;  
        this.cuerpo.add(this.brazoD);
        this.cuerpo.add(this.brazoI); 

        todo.add(this.cuerpo);
      
        this.pieD = this.createFoot({w:2,ww: 5});
        this.pieI = this.createFoot({w:-2,ww: -5});


       // this.todo.add(this.brazoD);
        //this.todo.add(this.brazoI);

        this.cuerpo.add(this.pieD);
        this.cuerpo.add(this.pieI);

        todo.position.y = 8;

        return todo;

  }
  
  // CUERPO
    createBody () {
    var textureLoader = new THREE.TextureLoader();
    var texture0 = textureLoader.load( 'imgs/character/b4.png' );
    var texture1 = textureLoader.load( 'imgs/character/b2.png' );
    var texture2 = textureLoader.load( 'imgs/character/b5.png' );
    var texture3 = textureLoader.load( 'imgs/character/b6.png' );
    var texture4 = textureLoader.load( 'imgs/character/b1.png' );
    var texture5 = textureLoader.load( 'imgs/character/b3.png' );

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
  var texture0 = textureLoader.load( 'imgs/character/c3.png' );
  var texture1 = textureLoader.load( 'imgs/character/c2.png' );
  var texture2 = textureLoader.load( 'imgs/character/c5.png' );
  var texture3 = textureLoader.load( 'imgs/character/c6.png' );
  var texture4 = textureLoader.load( 'imgs/character/c1.png' );
  var texture5 = textureLoader.load( 'imgs/character/c4.png' );

  var materials = [
      new THREE.MeshBasicMaterial( { map: texture0 } ),
      new THREE.MeshBasicMaterial( { map: texture1 } ),
      new THREE.MeshBasicMaterial( { map: texture2 } ),
      new THREE.MeshBasicMaterial( { map: texture3 } ),
      new THREE.MeshBasicMaterial( { map: texture4 } ),
      new THREE.MeshBasicMaterial( { map: texture5 } )
  ];
  var faceMaterial = new THREE.MeshFaceMaterial( materials );

   var head = new THREE.Mesh ( new THREE.BoxGeometry (8, 8, 8), faceMaterial);
    head.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (0, 20, 0));
    head.castShadow = true;
    head.autoUpdateMatrix = false;
    head.updateMatrix();
    return head;
  }


// BRAZOS
createArm (place){
  
    var textureLoader = new THREE.TextureLoader();

if(place.w == -6){
  var texture0 = textureLoader.load( 'imgs/character/ai2.png' );
  var texture1 = textureLoader.load( 'imgs/character/ai3.png' );
  var texture2 = textureLoader.load( 'imgs/character/ai5.png' );
  var texture3 = textureLoader.load( 'imgs/character/ai6.png' );
  var texture4 = textureLoader.load( 'imgs/character/ai1.png' );
  var texture5 = textureLoader.load( 'imgs/character/ai4.png' );

   var materials = [
      new THREE.MeshBasicMaterial( { map: texture0 } ),
      new THREE.MeshBasicMaterial( { map: texture1 } ),
      new THREE.MeshBasicMaterial( { map: texture2 } ),
      new THREE.MeshBasicMaterial( { map: texture3 } ),
      new THREE.MeshBasicMaterial( { map: texture4 } ),
      new THREE.MeshBasicMaterial( { map: texture5 } )
  ];
  }else{


  var texture10 = textureLoader.load( 'imgs/character/ad2.png');
  var texture11 = textureLoader.load( 'imgs/character/ad3.png');
  var texture12 = textureLoader.load( 'imgs/character/ad5.png');
  var texture13 = textureLoader.load( 'imgs/character/ad6.png');
  var texture14 = textureLoader.load( 'imgs/character/ad1.png');
  var texture15 = textureLoader.load( 'imgs/character/ad4.png');

  var materials = [
      new THREE.MeshBasicMaterial( { map: texture10 } ),
      new THREE.MeshBasicMaterial( { map: texture11 } ),
      new THREE.MeshBasicMaterial( { map: texture12 } ),
      new THREE.MeshBasicMaterial( { map: texture13 } ),
      new THREE.MeshBasicMaterial( { map: texture14 } ),
      new THREE.MeshBasicMaterial( { map: texture15 } )
  ];
}
    //  var armMaterial = new THREE.MeshFaceMaterial( materials );

      var armMaterial = new THREE.MeshFaceMaterial( materials );
  

 var larm = new THREE.Mesh ( 
    new THREE.BoxGeometry (4, 12 ,4, 16, 8),armMaterial);
  larm.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (place.w, 10, 0));   
  larm.castShadow = true;
  larm.autoUpdateMatrix = false;
  larm.updateMatrix();



  return larm;  
}

createFoot (place){
  var textureLoader = new THREE.TextureLoader();

  if(place.w == -2){
    var texture0 = textureLoader.load( 'imgs/character/fi2.png' );
    var texture1 = textureLoader.load( 'imgs/character/fi3.png' );
    var texture2 = textureLoader.load( 'imgs/character/fi5.png' );
    var texture3 = textureLoader.load( 'imgs/character/fi6.png' );
    var texture4 = textureLoader.load( 'imgs/character/fi1.png' );
    var texture5 = textureLoader.load( 'imgs/character/fi4.png' );


     var materials = [
        new THREE.MeshBasicMaterial( { map: texture0 } ),
        new THREE.MeshBasicMaterial( { map: texture1 } ),
        new THREE.MeshBasicMaterial( { map: texture2 } ),
        new THREE.MeshBasicMaterial( { map: texture3 } ),
        new THREE.MeshBasicMaterial( { map: texture4 } ),
        new THREE.MeshBasicMaterial( { map: texture5 } )
    ];
    
  }else{
    var texture0 = textureLoader.load( 'imgs/character/fd2.png' );
    var texture1 = textureLoader.load( 'imgs/character/fd3.png' );
    var texture2 = textureLoader.load( 'imgs/character/fd5.png' );
    var texture3 = textureLoader.load( 'imgs/character/fd6.png' );
    var texture4 = textureLoader.load( 'imgs/character/fd1.png' );
    var texture5 = textureLoader.load( 'imgs/character/fd4.png' );


     var materials = [
        new THREE.MeshBasicMaterial( { map: texture0 } ),
        new THREE.MeshBasicMaterial( { map: texture1 } ),
        new THREE.MeshBasicMaterial( { map: texture2 } ),
        new THREE.MeshBasicMaterial( { map: texture3 } ),
        new THREE.MeshBasicMaterial( { map: texture4 } ),
        new THREE.MeshBasicMaterial( { map: texture5 } )
    ];
  }

      var armMaterial = new THREE.MeshFaceMaterial( materials );


 var rfoot = new THREE.Mesh ( 
    new THREE.BoxGeometry (4, 12 , 4, 16, 8), armMaterial);
    rfoot.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (place.w,-2, 0));
    
  rfoot.castShadow = true;
  rfoot.autoUpdateMatrix = false;
  rfoot.updateMatrix();
    return rfoot;  
}



}
