
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
    this.wave_number = 1;
    this.ground = null;
    this.groundCalle = null;
    this.groundCalle2 = null;
    this.groundCalle3 = null;
    this.groundCalle4 = null;
    this.zombies = [];
    this.current_zombies = 0;
    this.recoil = 0;
    this.drops = [];
    this.barricades = [];
    this.barricade = null;
    this.n_barricades = 0;
    this.n_drops = 0;
    this.edificio = null;
    this.c_dead_z = 0;
    this.zombi = null;
    this.listener = new THREE.AudioListener();
    this.sound = new THREE.Audio(this.listener);
    this.dmg_recoil = 0;

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
   // this.ambientLight = new THREE.AmbientLight(0xccddee, 0.5);
  //  this.add (this.ambientLight);

    // add spotlight for the shadows
    this.spotLight = new THREE.SpotLight( 0xffffff,0.5 );
    this.spotLight.position.set( 60, 500, 40 );
    this.spotLight.castShadow = true;
    // the shadow resolution
    this.spotLight.shadow.mapSize.width=2048
    this.spotLight.shadow.mapSize.height=2048;
    this.add (this.spotLight);


    //La luz ambiental es una luz que se proyecta en todo el plano, a diferencia de la focal que apunta a una posicion

    //P1  Luz añadida
    // add spotlight for the shadows
    this.addedLight = new THREE.SpotLight( 0xeecccc,0.04);
    this.addedLight.position.set( 60, 500, 40 );
    this.addedLight.castShadow = true;
    // the shadow resolution
    this.addedLight.shadow.mapSize.width=2048
    this.addedLight.shadow.mapSize.height=2048;
    this.add (this.addedLight);

  }

  addBarricade (event, action) {
    this.ground.addBarricade(event, action);
  }
  moveBarricade (event, action) {
    this.ground.moveBarricade (event, action);
  }
  
  /// It creates the geometric model: r2d2 and ground
  /**
   * @return The model
   */
  createModel () {

  var model = new THREE.Object3D();


    this.character = new Character();
    model.add(this.character);
    this.character.position.set(0,5,0);
    
    var loader = new THREE.TextureLoader();
    var textura = loader.load ("imgs/floor.png", function ( textura ) {

    textura.wrapS = textura.wrapT = THREE.RepeatWrapping;
    textura.offset.set( 0, 0 );
    textura.repeat.set( 2, 2 );

} );


    //Cuadro central
    this.ground = new Ground (300, 300, new THREE.MeshPhongMaterial ({map: textura}), 30);
    model.add (this.ground);

    this.edificio = new Building({type:'1',x:130,y: (-135*Math.PI/180),z:-130});
    model.add(this.edificio);
    this.edificio = new Building({type:'1',x:130,y: (135*Math.PI/180),z:130});
    model.add(this.edificio);
    this.edificio = new Building({type:'1',x:-130,y: (-45*Math.PI/180),z:-130});
    model.add(this.edificio);
    this.edificio = new Building({type:'1',x:-130,y: (45*Math.PI/180),z:130});
    model.add(this.edificio);

    this.farola1 = new THREE.SpotLight( 0xFFC58F,1 );
    this.farola1.penumbra = 0.30;
    this.farola1.angle = 1.3 *Math.PI/4;
    this.farola1.castShadow = true;
    // the shadow resolution
    this.farola1.shadow.mapSize.width=2048
    this.farola1.shadow.mapSize.height=2048;
    this.farola1.position.set( 90, 135, -90 );
    this.farola1.target.position.set(90, 0, -90 );
   model.add(this.farola1);
    model.add(this.farola1.target);

    var farola2 = this.farola1.clone();
    farola2.position.set(-90, 135, 90 );
    farola2.target.position.set(-90, 0, 90 );
   model.add(farola2);
    model.add(farola2.target);
    var farola3 = this.farola1.clone();
    farola3.position.set( -90, 135, -90 );
    farola3.target.position.set(-90, 0, -90 );
    model.add(farola3);
    model.add(farola3.target);
    var farola4 = this.farola1.clone();
     farola4.position.set( 90, 135, 90 );
    farola4.target.position.set(90, 0, 90 );
     model.add(farola4);
    model.add(farola4.target);


    var spotLightHelper = new THREE.SpotLightHelper( this.farola1 );
 //   model.add( spotLightHelper );

    var shadowCameraHelper = new THREE.CameraHelper( this.farola1.shadow.camera );
 //    model.add( shadowCameraHelper );

    model.add(this.edificio);




    var audioLoader = new THREE.AudioLoader();
      audioLoader.load('models/background.mp3', function( buffer ) {
      scene.sound.setBuffer( buffer );
      scene.sound.setLoop( true );
      scene.sound.setVolume(0.3);
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

  spawn_wave(){
    for (var i = 0; i < this.wave_number; i++) {
      this.zombi = new Zombi();
      this.zombi.walk_start();
      this.zombi.hit_start();

      var po = Math.floor(Math.random() * 4);
      var p_z,p_x;
      switch (po) {
        case 1:
          p_z = 350;
          p_x = 0;
        break;
        case 2:
          p_z = -350;
          p_x = 0;
        break;
        case 3:
          p_z = 0;
          p_x = -350;
        break;
        case 0:
        p_z = 0;
        p_x = 350;
        break;

      }

      this.zombi.position.set(p_x,5,p_z);
      this.current_zombies++;
      this.zombies[i] = this.zombi;
      this.model.add(this.zombies[i]);
    }
  }

  // Public methods

 
  animate (controls) {
   
    this.axis.visible = controls.axis;
    this.spotLight.intensity = controls.lightIntensity;
   // console.log(this.zombies.length);
    //this.addedLight.intensity = controls.addedLightIntensity;
   // this.addedLight.intensity =1;

    //console.log("muertos: " + this.c_dead_z + "total :" + this.zombies.length);
    
    this.checkWaveSpawn();

    if(!this.character.aimpos){
      this.character.setBrazos(controls.rotation);
    }
    this.character.setPiernas(controls.footRotation);

   

    if(this.character.shooting ){
      this.character.gun.bullet.translateY(-20);
         for (var i = 0; i <= this.zombies.length-1; i++) {
          this.zombi = this.zombies[i];
            var hit = this.checkColisionBala();
            if(!this.character.gun.checkGunPos({hitt:hit})){
              this.character.shooting = false;
            }
          }
    }
  

  if(this.character.attacked && this.dmg_recoil < 80){this.character.recover();};
  
  for (var i = 0; i <= this.zombies.length-1; i++) {
    this.zombi = this.zombies[i];
    this.zombieMove(controls);
  }

    if(this.character.attacked){this.dmg_recoil--;}
    this.recoil++;

    TWEEN.update();

  }

checkWaveSpawn(){
      if(this.c_dead_z == this.zombies.length){
      for (var i = 0; i <= this.zombies.length-1; i++) {
        this.zombi = this.zombies[i];
        this.model.remove(this.zombi); 
      }
      this.zombies = []; this.c_dead_z = 0; this.current_zombies = 0; this.wave_number++; this.spawn_wave();};
}
  zombieMove(controls){ 
      if(this.zombi != null && this.zombi.alive){
            this.zombi.setPiernas(controls.footRotation);
            this.zombi.setBrazos(controls.rotation);
          if(!this.checkColisionZombie()){
            this.zombi.hit_stop();

            if(this.zombi.attacking){this.zombi.hit_stop();};
            if(!this.zombi.walking){this.zombi.walk_start();};





         //Para que los zombis no pisen la zona negra inferior IZQUIERDA
            if(this.zombi.position.x > 150 && ( this.zombi.position.z > 100 || this.zombi.position.z < -100 ) ){    
              this.zombi.lookAt(new THREE.Vector3(0,0,0));
              this.zombi.translateZ(0.5);                   this.zombi.pasos++;

            }
            //Para que los zombis no pisen la zona negra inferior IZQUIERDA     
            else if(this.zombi.position.x < -150 && ( this.zombi.position.z > 100 || this.zombi.position.z < -100 ) ){    
              this.zombi.lookAt(new THREE.Vector3(0,0,0));
              this.zombi.translateZ(0.5);                   this.zombi.pasos++;

            }
              //Para que los zombis no pisen la zona negra inferior IZQUIERDA     
            else if(this.zombi.position.z > 150 && ( this.zombi.position.x > 100 || this.zombi.position.x < -100 ) ){    
              this.zombi.lookAt(new THREE.Vector3(0,0,0));
              this.zombi.translateZ(0.5);                 this.zombi.pasos++;
  
            }
            
           //Para que los zombis no pisen la zona negra inferior derecha               
            else if(this.zombi.position.z < -150 && ( this.zombi.position.x > 100 || this.zombi.position.x < -100 ) ){                
                this.zombi.lookAt(new THREE.Vector3(0,0,0));
                this.zombi.translateZ(0.5);
                this.zombi.pasos++;
            }
               

            //Para que el zombi no se atasque mirando al jugador y luego al centro muchas veces sucesivas
            //Dejamos un margen(pasos) para que vaya al centro y se reposicione y luego mire al player
            else  {
              if(this.zombi.pasos==0 || this.zombi.pasos>25){
                this.zombi.lookAt(this.character.position);
                this.zombi.translateZ(0.5);
                this.zombi.pasos = 0;
              } 
              else{

                this.zombi.translateZ(0.5);
                this.zombi.pasos++;        
              }

            }


        }else{
           if(this.zombi.walking){this.zombi.walk_stop();};
           if(!this.zombi.attacking){this.zombi.hit_start();} 
           if(this.dmg_recoil <= 0){ 
               this.dmg_recoil = 80;
               this.character.isDamaged();
               this.character.attacked = true;

           }

          }
    }

  }

  checkColisionBala(){
    //console.log(this.zombies.length);
    this.updateMatrixWorld(true);
    var position_bullet = new THREE.Vector3();
    var position_zombi = new THREE.Vector3();
    position_bullet.setFromMatrixPosition( this.character.gun.bullet.matrixWorld );

        if( this.zombi.alive){
          position_zombi.setFromMatrixPosition( this.zombi.matrixWorld );
          if(position_bullet.x < (position_zombi.x+10) && position_bullet.x > (position_zombi.x-10)){
            if(position_bullet.z < (position_zombi.z+10) && position_bullet.z > (position_zombi.z-10)){
              if(this.zombi.hit({dmg: this.character.gun.damage})){ 
                this.drop();
                this.zombi.death_start(); 
                this.c_dead_z++;
    
              };

                return true;
              }
            }
          }
      
  
  }

drop(para){
  var valor = Math.floor(Math.random() *10)+1;
  var position_zombi = new THREE.Vector3();
  position_zombi.setFromMatrixPosition( this.zombi.matrixWorld );
  if(valor > 4){
    switch (valor) {
      case 5:
        var ammo_drop = new Drop({type:'2'});
        break;
      case 6:
       var ammo_drop = new Drop({type:'2'});
        break;
      case 7: 
        var ammo_drop = new Drop({type:'3'});
        break;
      case 8:
        var ammo_drop = new Drop({type:'3'});
        break;
      case 9:
        var ammo_drop = new Drop({type:'4'});
        break;
      case 10:
        var ammo_drop = new Drop({type:'4'});
    }
    ammo_drop.position.set(position_zombi.x,12,position_zombi.z);
    ammo_drop.rotation.x = 270*(Math.PI / 180);
    this.model.add(ammo_drop);
    this.drops[this.n_drops] = ammo_drop;
    this.n_drops++;
  }


}

checkColisionZombie(){
    this.updateMatrixWorld(true);
    var position_player = new THREE.Vector3();
    var position_zombi = new THREE.Vector3();
    position_zombi.setFromMatrixPosition( this.zombi.matrixWorld );
    //if(this.zombies.length != 0){
      //for (var i = 0; i <= this.zombies.length-1; i++) {
    position_player.setFromMatrixPosition(this.character.matrixWorld);
    if(position_zombi.x < (position_player.x+10) && position_zombi.x > (position_player.x-10)){
        if(position_zombi.z < (position_player.z+10) && position_zombi.z > (position_player.z-10)){
                return true;   
              }
            };
            return false;
}
checkDrop(){
   this.updateMatrixWorld(true);
    var position_character = new THREE.Vector3();
    var position_drop = new THREE.Vector3();
    position_character.setFromMatrixPosition( this.character.matrixWorld );

    for (var i = 0; i <  this.drops.length; i++) {
         position_drop.setFromMatrixPosition( this.drops[i].matrixWorld );
         if(position_character.x < (position_drop.x+5) && position_character.x > (position_drop.x-5)){
          if(position_character.z < (position_drop.z+5) && position_character.z > (position_drop.z-5)){
            switch (this.drops[i].type) {
              case '2':
                this.character.money += this.drops[i].money;
                break;
              case '3':
                 this.character.money += this.drops[i].money;
                break;
            }
            this.drops[i].reproduceSound();
            this.model.remove(this.drops[i]);
            this.drops.splice(i,1);
            this.n_drops--;
        //    alert(this.character.money);
          }
        }
    }
  }




  CambiarArma(para){
    this.character.swapGun({selected:para.selected});
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
  if(parameters.move != 'up'){this.character.walking=false; this.character.walk_stop();};
    switch (parameters.move) {
      case 'up':
         if(this.character.aimpos){
              this.character.translateZ(2);
          }else{

            if(this.character.position.x < 150) {
               if(this.character.position.x + 10 < 150) this.character.translateZ(10);
               else{
                      var axis = new THREE.Vector3(0,1,0);
                      this.character.rotateOnAxis(axis, 3);
                      this.character.translateZ(10);   
               }
            }
            /*
            if(this.character.position.z > 150) { 
              this.character.translateZ(5);
            }
            else if(this.character.position.z + 10 < 10) this.character.translateZ(10);

            */
            


          }
          if(!this.character.walking){
            this.character.walk_start();
            this.character.walking = true;
          }
          if(this.drops.length != 0){this.checkDrop();};
        break;
      case'down':
          this.character.walk_stop();
     // this.character.translateZ(-5);
      var axis = new THREE.Vector3(0,1,0);
      this.character.rotateOnAxis(axis, 3);

      break;
      case'left':
      var axis = new THREE.Vector3(0,1,0);
      this.character.rotateOnAxis(axis, 0.15);
      break;
      case'right':
      var axis = new THREE.Vector3(0,1,0)
      this.character.rotateOnAxis(axis, -0.15);
      break;
      case 'aim':
        if(this.character.aimpos){
          this.character.aim_stop();
        }else{
           this.character.aim_start();
        }
      break;
      case 'shoot':
         if(this.character.aimpos && this.recoil >= this.character.gun.reload_time){
          
          this.character.shoot();
          this.recoil = 0;
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
  TheScene.AFTER_WAVE = 20;
  TheScene.IN_WAVE = 30;
  // Actions
  TheScene.NEW_BOX = 0;
  TheScene.MOVE_BOX = 1;
  TheScene.SELECT_BOX = 2;
  TheScene.ROTATE_BOX = 3;
  TheScene.END_ACTION = 10;


