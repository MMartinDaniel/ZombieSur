
/// The Model Facade class. The root node of the graph.
/**
 * @param renderer - The renderer to visualize the scene
 */
class TheScene extends THREE.Scene {
  
  constructor (renderer) {
    super();
    
    // Attributes
    
    this.ambientLight = null;
    this.spotLight = null;
    this.camera = null;
    this.trackballControls = null;
    this.r2d2 = null;
    this.character = null;

    this.ground = null;
    this.groundCalle = null;
    this.groundCalle2 = null;
    this.groundCalle3 = null;
    this.groundCalle4 = null;


    this.edificio = null;

    this.zombi = null;
    this.listener = new THREE.AudioListener();
    this.sound = new THREE.Audio(this.listener);

    this.createLights ();
  
    this.cameraON = 1;
   // this.createCamera (renderer);
   this.cameraOut = null;
    this.axis = new THREE.AxisHelper (25);
    this.add (this.axis);
    this.model = this.createModel ();
    this.createCamera (renderer);

//    this.soldado = this.cargarModelo();
 //   this.setModeloPos();
 //   this.model.add(this.soldado);
    this.add (this.model);
  }
  


  /// It creates the camera and adds it to the graph
  /**
   * @param renderer - The renderer associated with the camera
   */
  createCamera (renderer) {
  
  this.cameraOut = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
   this.cameraOut.position.set (240, 240, 240);
    var look2 = new THREE.Vector3 (0,0,0);
    this.cameraOut.lookAt(look2);
  
    this.trackballControls = new THREE.TrackballControls (this.cameraOut, renderer);
    this.trackballControls.rotateSpeed = 5;
    this.trackballControls.zoomSpeed = -2;
    this.trackballControls.panSpeed = 0.5;
    this.trackballControls.target = look2;

    this.camera = this.cameraOut;
    this.camera.add(this.listener);
    this.add(this.cameraOut);
  }
  
  setModeloPos(){


    this.soldado.position.x = 10;
    this.soldado.position.y = 5;
    this.soldado.position.z = 10;
    this.soldado.scale.set(40,40,40);

  }

  /// It creates lights and adds them to the graph
  createLights () {
    // add subtle ambient lighting
    this.ambientLight = new THREE.AmbientLight(0xccddee, 0.5);
    this.add (this.ambientLight);

    // add spotlight for the shadows
    this.spotLight = new THREE.SpotLight( 0xffffff,0.5 );
    this.spotLight.position.set( 60, 500, 40 );
    this.spotLight.castShadow = true;
    // the shadow resolution
    this.spotLight.shadow.mapSize.width=2048
    this.spotLight.shadow.mapSize.height=2048;
   // this.add (this.spotLight);


    //La luz ambiental es una luz que se proyecta en todo el plano, a diferencia de la focal que apunta a una posicion

    //P1  Luz añadida
    // add spotlight for the shadows
    this.addedLight = new THREE.SpotLight( 0xeecccc,0.5);
    this.addedLight.position.set( 60, 500, 40 );
    this.addedLight.castShadow = true;
    // the shadow resolution
    this.addedLight.shadow.mapSize.width=2048
    this.addedLight.shadow.mapSize.height=2048;
    this.add (this.addedLight);

  }
  
  /// It creates the geometric model: r2d2 and ground
  /**
   * @return The model
   */
  createModel () {

  var model = new THREE.Object3D();


    this.zombi = new Zombi();
    model.add(this.zombi);

    this.zombi.position.set(0,5,30);
    //Texturas cabeza
    var loader1 = new THREE.TextureLoader();


    var texturaCuerpo = loader1.load ("imgs/torso.png");
    var mat = new THREE.MeshBasicMaterial({map: texturaCuerpo});
    var texturaCabeza = loader1.load ("imgs/cabez.png");

    var matcab = new THREE.MeshBasicMaterial({map: texturaCabeza});
    var texturaBrazo = loader1.load ("imgs/arm.png");
    var matarm = new THREE.MeshBasicMaterial({map: texturaBrazo});
    var texturapierna = loader1.load ("imgs/foot.png");
    var matfoot = new THREE.MeshBasicMaterial({map: texturapierna});
    this.character = new Character({materialBody: mat,materialCab: matcab, materialArm: matarm, materialfoot: matfoot});
    model.add(this.character);
    this.character.position.set(0,5,0);
    
    /*
    this.r2d2 = new r2d2({r2d2Height: 30, r2d2Width: 45, material: mat, material2: mat, material3: mat, material4: mat, material5: mat, material6: mat});
    model.add (this.r2d2);
    //this.r2d2.position.set(0, 0, -140);
    this.r2d2.position.set(0,0,-140);
*/
    var loader = new THREE.TextureLoader();
    var textura = loader.load ("imgs/floor.png", function ( textura ) {

    textura.wrapS = textura.wrapT = THREE.RepeatWrapping;
    textura.offset.set( 0, 0 );
    textura.repeat.set( 2, 2 );

} );


    var loader2 = new THREE.TextureLoader();
    var texturaCalle = loader.load ("imgs/street.jpg");

    //Calle izq
    this.groundCalle = new Ground (200, 200 , new THREE.MeshPhongMaterial ({map: texturaCalle}), 4);
    this.groundCalle.position.set(0, 0, 250);
    model.add (this.groundCalle);

    //Calle der
    this.groundCalle2 = new Ground (200, 200 , new THREE.MeshPhongMaterial ({map: texturaCalle}), 4);
    this.groundCalle2.position.set(0, 0, -250);
    model.add (this.groundCalle2);


    //Calle inferior

    var loader3 = new THREE.TextureLoader();
    var texturaCalleGirada = loader.load ("imgs/street2.jpg");

    this.groundCalle3 = new Ground (200, 200 , new THREE.MeshPhongMaterial ({map: texturaCalleGirada}), 4);
    this.groundCalle3.position.set(250, 0, 0);
    model.add (this.groundCalle3);


    //Calle Superior

    this.groundCalle4 = new Ground (200, 200 , new THREE.MeshPhongMaterial ({map: texturaCalleGirada}), 4);
    this.groundCalle4.position.set(-250, 0, 0);
    model.add (this.groundCalle4);

    //Cuadro central
    this.ground = new Ground (300, 300, new THREE.MeshPhongMaterial ({map: textura}), 4);
    model.add (this.ground);

    this.edificio = new Building({type:'1'});
    model.add(this.edificio);




    var audioLoader = new THREE.AudioLoader();
      audioLoader.load('models/background.mp3', function( buffer ) {
      scene.sound.setBuffer( buffer );
      scene.sound.setLoop( true );
      scene.sound.setVolume(0.5);
    //  scene.sound.play();
    });

   
    return model;


}

  cargarModelo(){

    var container = new THREE.Object3D();  
    var loader2 = new THREE.JSONLoader();
    loader2.load('models/7 S.json',
    function ( geometry, materials, ) {
        var material = materials[ 2 ];
        var soldadoo = new THREE.SkinnedMesh( geometry, material );
       //     soldadoo.skeleton.bones['Body'].set(new THREE.Vector3( 0, 0, Math.PI / 2));
       container.add(soldadoo);

    });

    return container;
}


  // Public methods

 
  animate (controls) {
   
    this.axis.visible = controls.axis;
    this.spotLight.intensity = controls.lightIntensity;
    //P1
    this.addedLight.intensity = controls.addedLightIntensity;
    this.zombi.lookAt(this.character.position);
    if(this.character.aimpos){
     
    }else{
    this.character.setBrazos(controls.rotation);
    }
    this.character.setPiernas(controls.footRotation);
    if(this.character.shooting){
      this.character.gun.bullet.translateY(-20);
      this.checkColisionBala();
      if(!this.character.gun.checkGunPos()){
        this.character.shooting = false;
      }
    }
    TWEEN.update();

    
   // this.zombi.translateZ(1);

  }
  

  checkColisionBala(){

    this.updateMatrixWorld(true);
    var position_bullet = new THREE.Vector3();
    position_bullet.getPositionFromMatrix( this.character.gun.bullet.matrixWorld );
    alert(position_bullet.x + ',' + position_bullet.y + ',' + position_bullet.z);
    
    var position_zombi = new THREE.Vector3();
    position_zombi.getPositionFromMatrix( this.zombi.matrixWorld );
    alert(position_zombi.x + ',' + position_zombi.y + ',' + position_zombi.z);

    if(pos_x < (zpos+40) && pos_x > (zpos-40)){
      alert("hit");
    }

  }




  /// It returns the camera
  /**
   * @return The camera
   */
  getCamera () {
    return this.camera;
  }
  
  /// It returns the camera controls
  /**
   * @return The camera controls
   */
  getCameraControls () {
    return this.trackballControls;
  }
  
  /// It updates the aspect ratio of the camera
  /**
   * @param anAspectRatio - The new aspect ratio for the camera
   */
  setCameraAspect (anAspectRatio) {
    this.camera.aspect = anAspectRatio;
    this.camera.updateProjectionMatrix();
  }

 makeMove(parameters){
    switch (parameters.move) {
      case 'up':
         if(this.character.aimpos){
              this.character.translateZ(2);
          }else{
            this.character.translateZ(10);
          }
           this.character.walk_start();
        break;
      case'down':
          this.character.walk_stop();
      this.character.translateZ(-5);
      break;
      case'left':
      // this.r2d2.position.x += -5;
      var axis = new THREE.Vector3(0,1,0);//tilted a bit on x and y - feel free to plug your different axis here
      //in your update/draw function
      this.character.rotateOnAxis(axis, 0.25);
      break;
      case'right':
       // this.r2d2.position.x += -5;
      var axis = new THREE.Vector3(0,1,0);//tilted a bit on x and y - feel free to plug your different axis here
      //in your update/draw function
      this.character.rotateOnAxis(axis, -0.25);
      break;
      case 'aim':
        if(this.character.aimpos){
          this.character.aim_stop();
        }else{
           this.character.aim_start();
        }
      break;
      case 'shoot':
         if(this.character.aimpos){
          var sound = new THREE.PositionalAudio( this.listener );
          var audioLoader = new THREE.AudioLoader();
            audioLoader.load( 'models/mp5k_sound.wav', function( buffer ) {
              sound.setBuffer( buffer );
              sound.setRefDistance( 20 );
              sound.play();
            });
          this.character.shoot();
        }
      break;
    }

  }




}

  // class variables
  
  // Application modes
  TheScene.NO_ACTION = 0;
  TheScene.ADDING_BOXES = 1;
  TheScene.MOVING_BOXES = 2;
  
  // Actions
  TheScene.NEW_BOX = 0;
  TheScene.MOVE_BOX = 1;
  TheScene.SELECT_BOX = 2;
  TheScene.ROTATE_BOX = 3;
  TheScene.END_ACTION = 10;


