
/// The Model Facade class. The root node of the graph.
/**
 * @param renderer - The renderer to visualize the scene
 */
class TheScene extends THREE.Scene {
  
  constructor (renderer) {
    super();
    
    // Attributes
    
    this.ambientLight = null;
    this.escopeta_comprada = false;
    this.m4a4_comprada = false;
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
    this.t_cabeza = [];
    this.t_cuerpo = [];
    this.t_brazoD = [];
    this.t_brazoI = [];   
    this.t_pieI = [];
    this.t_pieD = [];
    this.check = 0;
    this.cameraInStreet = false;
    this.canNextWave = false;
    this.cargarTexturasZombie();
    this.listener = new THREE.AudioListener();
    this.sound = new THREE.Audio(this.listener);
    this.dmg_recoil = 0;
    this.n_camrot = 0;
    this.farolas = [];
    this.createLights ();
  
    //this.displayAmmo();




    this.cameraON = 1;
   // this.createCamera (renderer);
   this.cameraOut = null;
    this.axis = new THREE.AxisHelper (25);
    this.add (this.axis);
    this.model = this.createModel ();
    this.character.displayAmmo();

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
   this.cameraOut.position.set (288, 466, 298);
  //this.cameraOut.position.set (0, 90, 700);
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
  // this.add (this.ambientLight);

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
  


startGame(){
      document.getElementById('MenuInicio').style.visibility = 'hidden';
      document.getElementById('balas').style.visibility = 'visible';
}


backtoMenu(){
  location.reload();
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
 /*   
    var textura = loader.load ("imgs/flx.png", function ( textura ) {

    textura.wrapS = textura.wrapT = THREE.RepeatWrapping;
    textura.offset.set( 0, 0 );
    textura.repeat.set( 2, 2 );


} );
*/
   var textura = loader.load ("imgs/prueba.png");
    //Cuadro central
    this.ground = new Ground (200, 200, new THREE.MeshPhongMaterial ({map: textura}), 30);
    model.add (this.ground);
    this.faro1 = new Building({type:'1',x:130,y: (-135*Math.PI/180),z:-130});
    model.add(this.faro1);this.farolas.push(this.faro1);
    this.faro2 = new Building({type:'1',x:130,y: (135*Math.PI/180),z:130});
    model.add(this.faro2);this.farolas.push(this.faro2);
    this.faro3 = new Building({type:'1',x:-130,y: (-45*Math.PI/180),z:-130});
    model.add(this.faro3);this.farolas.push(this.faro3);
    this.faro4 = new Building({type:'1',x:-130,y: (45*Math.PI/180),z:130});
     model.add(this.faro4);this.farolas.push(this.faro4);
    this.edificios = new Building({type:'2',x:-130,y: (45*Math.PI/180),z:130});
     model.add(this.edificios);

     //Generar
    this.farola1 = new THREE.SpotLight( 0xFFC58F,1 );
    this.farola1.penumbra = 0.2;
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

    var audioLoader = new THREE.AudioLoader();
      audioLoader.load('models/background.mp3', function( buffer ) {
      scene.sound.setBuffer( buffer );
      scene.sound.setLoop( true );
      scene.sound.setVolume(0.3);
    //  scene.sound.play();
    });

   
    return model;


}


nextWave(){
  this.canNextWave = true;
}
  rotateCamera(s){

    this.updateMatrixWorld(true);


    if(this.n_camrot == 2){this.n_camrot = 0;};
    var c_pos = this.cameraOut.position;
    var varx = c_pos.x;
    var varz = c_pos.y;

   switch (s.side) {
     case 'der':
        varx = (c_pos.x);
        varz = -(c_pos.z);
        if(this.n_camrot == 1){ varx = -varx; varz = -varz;  }
        this.n_camrot++;
       break;
     case 'izq':
        varx = -c_pos.x;
        varz = (c_pos.z);
        if(this.n_camrot == 1){ varx = -varx; varz = -varz;  }
        this.n_camrot++;
       break;
   }
 
   this.tween_camera = new TWEEN.Tween();
      var position = {x:c_pos.x ,z:c_pos.z};


   this.tween_camera = new TWEEN.Tween(position).to({x: varx,z:varz },1000).onUpdate(function(){
          c_pos.x = position.x;
          c_pos.z = position.z;
       
   });

    //this.cameraOut.position  = c_pos;


   this.tween_camera.start();


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
     this.zombi = new Zombi({cab:this.t_cabeza,cuerpo:this.t_cuerpo,pieI: this.t_pieI,pieD: this.t_pieD,brazoI: this.t_brazoI,brazoD: this.t_brazoD});

      this.zombi.walk_start();
      this.zombi.hit_start();

      var po = Math.floor(Math.random() * 4);
      var r_x = Math.floor(Math.random() * 200)-100;
      var p_z,p_x;
      switch (po) {
        case 1:
          p_z = 700;
          p_x = r_x;
        break;
        case 2:
          p_z = -700;
          p_x = r_x;
        break;
        case 3:
          p_z = r_x;
          p_x = -700;
        break;
        case 0:
        p_z = r_x;
        p_x = 700;
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
    //this.addedLight.intensity = controls.addedLightIntensity;
   //this.addedLight.intensity =1;

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
  this.check++;
  if(this.check %3 == 0){this.colision = this.checkColBarrera();};
            this.checkUI();
  }
  checkColBarrera(){

        var originPoint = new THREE.Vector3();
        originPoint.setFromMatrixPosition( this.character.hitbox.matrixWorld );

        for (var vertexIndex = 0; vertexIndex < this.character.hitbox.geometry.vertices.length; vertexIndex++)
        {   
          var localVertex = this.character.hitbox.geometry.vertices[vertexIndex].clone();
          var globalVertex = localVertex.applyMatrix4( this.character.hitbox.matrix );
          var directionVector = globalVertex.sub( this.character.hitbox.position );
          
          var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
          var collisionResults =  ray.intersectObjects( this.ground.barricades_array,true );
          var ray2 = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
          var collisionResults_2 = ray2.intersectObjects(this.edificios.edificios);
          var collisionResults_3 = ray2.intersectObjects(this.farolas,true);
         
          if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) {
            return true;
          }
          if ( collisionResults_2.length > 0 && collisionResults_2[0].distance < directionVector.length() ){
            return true;
          }
          if ( collisionResults_3.length > 0 && collisionResults_3[0].distance < directionVector.length() ){
            return true;
          }
        }
    return false;
  }


  zombieCheckBarricade(){

    this.updateMatrixWorld(true);
    var position_barricade = new THREE.Vector3();
    var position_zombi = new THREE.Vector3();
    position_zombi.setFromMatrixPosition( this.zombi.matrixWorld );
   // console.log(this.ground.barricades_array.length);
    for (var i = 0; i < this.ground.barricades_array.length; i++) {
        position_barricade.setFromMatrixPosition( this.ground.barricades_array[i].matrixWorld );
        if(this.zombi.alive){
          if(position_barricade.x <= (position_zombi.x+15) && position_barricade.x >= (position_zombi.x-15)){
            if(position_barricade.z <= (position_zombi.z+15) && position_barricade.z >= (position_zombi.z-15)){
                return i;
              }
            }
        }
    }
    return -1;

  }

checkWaveSpawn(){
  
  if(this.c_dead_z == this.zombies.length){
    document.getElementById("waveCard").style.display = 'block';
    document.getElementById("boxCard").style.display = 'block';
   
  }else{ document.getElementById("waveCard").style.display = 'none'; 
          document.getElementById("boxCard").style.display = 'none';
  }
  if(this.canNextWave){
        if(this.c_dead_z == this.zombies.length){
          for (var i = 0; i <= this.zombies.length-1; i++) {
            this.zombi = this.zombies[i];
            this.model.remove(this.zombi); 
        }
        this.zombies = []; this.c_dead_z = 0; this.current_zombies = 0; this.wave_number++; this.spawn_wave(); this.canNextWave = false;};
  }
}
  zombieMove(controls){ 
      if(this.zombi != null && this.zombi.alive){
            this.zombi.setPiernas(controls.footRotation);
            this.zombi.setBrazos(controls.rotation);
          if(!this.checkColisionZombie()){
            var result = this.zombieCheckBarricade();
        //    console.log(result);
            if( result != -1){
                if(this.zombi.walking){this.zombi.walk_stop();};
                if(!this.zombi.attacking){this.zombi.hit_start();} 
                    if(this.ground.barricades_array[result].isDamaged()){
                      this.ground.barricades.remove(this.ground.barricades_array[result]);
                      this.ground.barricades_array.splice (result, 1);

                    }
            }else{



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
                //this.zombi.position.set(0,5,0);
                this.zombi.pasos = 0;
              } 
              else{

                this.zombi.translateZ(0.5);
                this.zombi.pasos++;        
              }

            }
          }



        }else{
           if(this.zombi.walking){this.zombi.walk_stop();};
           if(!this.zombi.attacking){this.zombi.hit_start();} 
              if(this.dmg_recoil <= 0){ 
                 this.dmg_recoil = 80;
                if(this.character.isDamaged()){/*this.setPosDie();*/}
                 this.character.attacked = true;
              }
        }
    }

  }

  setPosDie(){
        this.updateMatrixWorld(true);
    var c_pos = new THREE.Vector3();
    var position_char= new THREE.Vector3();
      c_pos.setFromMatrixPosition( this.cameraOut.matrixWorld );
      position_char.setFromMatrixPosition( this.character.matrixWorld );
       var c_pos = this.cameraOut.position;

        this.tween_camera = new TWEEN.Tween();
        var position = {x:c_pos.x ,z:c_pos.z,y:c_pos.y};

      
        //alert(position_char.z);
        this.tween_camera = new TWEEN.Tween(position).to({x: this.character.position.x,y: this.character.position.y+90,z:position_char.z },200).onUpdate(function(){
          c_pos.x = position.x;
          c_pos.z = position.z;
          c_pos.y = position.y;
        });
        
        this.cameraOut.position.set(position_char.x,position_char.y+180,position_char.z);

        this.cameraOut.lookAt(position_char);
        this.camera.lookAt(position_char);
      this.tween_camera.start();
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
         if(position_character.x < (position_drop.x+10) && position_character.x > (position_drop.x-10)){
          if(position_character.z < (position_drop.z+10) && position_character.z > (position_drop.z-10)){
            switch (this.drops[i].type) {
              case '2':
                this.character.money += this.drops[i].money;
                this.character.guns[1].magazine_bullets += this.drops[i].bullet_amount;
                break;
              case '3':
                 this.character.money += this.drops[i].money;
                  this.character.guns[2].magazine_bullets += this.drops[i].bullet_amount;
                break;
              case '4':
                 this.character.money += this.drops[i].money;     
                 this.checkUI();
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

  checkUI(){
    if(!this.m4a4_comprada){
      if(this.character.money >= 200){
          var doc = document.getElementById("m4a4");
          doc.className = "effects-overlay-good";
      }else{
          var doc = document.getElementById("m4a4");
          doc.className = "effects-overlay-bad";
      }
    }else{
          var doc = document.getElementById("m4a4");
          doc.className = "effects-overlay-normal";
    }

    if(!this.escopeta_comprada){
      if(this.character.money >= 300){
          var doc = document.getElementById("escopeta");
          doc.className = "effects-overlay-good";
      }else{
          var doc = document.getElementById("escopeta");
          doc.className = "effects-overlay-bad";
      }
    }else{
       var doc = document.getElementById("escopeta");
       doc.className = "effects-overlay-normal";
    }

    if(this.character.money >= 50){
        var doc = document.getElementById("barri");
        doc.className = "effects-overlay-normal";
    }else{
       var doc = document.getElementById("barri");
        doc.className = "effects-overlay-bad";
    }

    document.getElementById("oro").innerHTML = this.character.money + "$";
  }



  CambiarArma(para){
    if(para.selected == 0){
      this.character.swapGun({selected:para.selected});
    }else if(para.selected == 1 && !this.m4a4_comprada ){
      if(this.character.money >= 200){
        this.m4a4_comprada = true; this.character.money -= 200;
        this.character.swapGun({selected:para.selected});
      }
    }else if(para.selected == 1 && this.m4a4_comprada){
        this.character.swapGun({selected:para.selected});
    }else if(para.selected == 2 && !this.escopeta_comprada ){
      if(this.character.money >= 300){
        this.escopeta_comprada = true; this.character.money -= 300;
        this.character.swapGun({selected:para.selected});

      }
    }else if(para.selected == 2 && this.escopeta_comprada){
        this.character.swapGun({selected:para.selected});
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
  if(this.character.alive){
    if(parameters.move != 'up'){this.character.walking=false; this.character.walk_stop();};
      switch (parameters.move) {
        case 'up':
           if(this.character.aimpos){
             if(!this.colision){this.character.translateZ(2);}else{this.character.translateZ(0);};
            }else{
            if(!this.colision){this.character.translateZ(5);}else{this.character.translateZ(0);};
            }
            if(!this.character.walking){
              this.character.walk_start();
              this.character.walking = true;
            }
            if(this.drops.length != 0){this.checkDrop();};
            this.checkCameraMove();
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
            //Parte de eliminar bala de la UI
           // var myList = document.getElementById("contenedorBala");
          //  myList.innerHTML = '';

            this.recoil = 0;
          }
        break;
      }
    }
  }

checkCameraMove(){
        this.updateMatrixWorld(true);
        var position_char = new THREE.Vector3();
        position_char.setFromMatrixPosition( this.character.matrixWorld );

      if(position_char.x > 150 || position_char.x < -150 || position_char.z < -150 || position_char.z > 150){
        if(!this.cameraInStreet){
          if(position_char.x > 150 ){
            var n_pos_x = 700;
            var n_pos_z = 0;
          }else if(position_char.x < -150){
            var n_pos_x = -700;
            var n_pos_z = 0;
          }else if(position_char.z < -150){
            var n_pos_x = 0;
            var n_pos_z = -700;
          }else if(position_char.z > 150){
            var n_pos_x = 0;
            var n_pos_z = 700;
          }
          var n_pos_y = 120;
          var c_pos = this.cameraOut.position;
          var varx = c_pos.x;
          var varz = c_pos.y;
          var varz = c_pos.z;

         this.tween_camera = new TWEEN.Tween();
            var position = {x:c_pos.x ,z:c_pos.z,y:c_pos.y};


         this.tween_camera = new TWEEN.Tween(position).to({x: n_pos_x,y: n_pos_y,z:n_pos_z },200).onUpdate(function(){
                c_pos.x = position.x;
                c_pos.z = position.z;
                c_pos.y = position.y;
             
         });
        
         this.cameraInStreet = true;
         this.tween_camera.start();
        }
      }else{
        if(this.cameraInStreet){
          this.cameraOut.position.set (288, 466, 298);
          this.cameraInStreet = false;
        }
      } 
     
 
          
    
     
  


}

  cargarTexturasZombie(){
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
      this.t_cuerpo = materials;

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
    this.t_cabeza = materials;

     //Cara izq
     var texture0_ad = textureLoader.load( 'imgs/zombiebrazo5.png' );
     var texture0_ai = textureLoader.load( 'imgs/zombiebrazo3.png' );

     var texture1_ad = textureLoader.load( 'imgs/zombiebrazo3.png' );
     var texture1_ai = textureLoader.load( 'imgs/zombiebrazo5.png' );

     var texture2_ad = textureLoader.load( 'imgs/zombiebrazo2_2.png' );
     var texture2_ai = textureLoader.load( 'imgs/zombiebrazo2.png' );
     var texture3 = textureLoader.load( 'imgs/zombiebrazo6.png' );
     var texture4 = textureLoader.load( 'imgs/zombiebrazo1.png' );
     var texture5 = textureLoader.load( 'imgs/zombiebrazo5.png' );

    var materials = [
        new THREE.MeshLambertMaterial( { map: texture0_ai } ),
        new THREE.MeshLambertMaterial( { map: texture1_ai } ),
        new THREE.MeshLambertMaterial( { map: texture2_ai } ),
        new THREE.MeshLambertMaterial( { map: texture3 } ),
        new THREE.MeshLambertMaterial( { map: texture4 } ),
        new THREE.MeshLambertMaterial( { map: texture5 } )
    ];
    this.t_brazoI = materials;
    
    var materials = [
        new THREE.MeshLambertMaterial( { map: texture0_ad } ),
        new THREE.MeshLambertMaterial( { map: texture1_ad } ),
        new THREE.MeshLambertMaterial( { map: texture2_ad } ),
        new THREE.MeshLambertMaterial( { map: texture3 } ),
        new THREE.MeshLambertMaterial( { map: texture4 } ),
        new THREE.MeshLambertMaterial( { map: texture5 } )
    ];

    this.t_brazoD = materials;


    var texture0_d = textureLoader.load( 'imgs/zombiepierna3_1.png' );
    var texture0_i = textureLoader.load( 'imgs/zombiepierna3_1.png' );
    var texture1_d = textureLoader.load( 'imgs/zombiepierna3.png' );
    var texture1_i = textureLoader.load( 'imgs/zombiepierna3.png' );
    var texture2_d = textureLoader.load( 'imgs/zombieTapaArriba.png' );
    var texture2_i = textureLoader.load( 'imgs/zombieTapaArriba.png' );
    var texture3 = textureLoader.load( 'imgs/zombiepierna2.png' );
    var texture4_d = textureLoader.load( 'imgs/zombiepierna1_1.png' );
    var texture4_i = textureLoader.load( 'imgs/zombiepierna1_1.png' );
    var texture5 = textureLoader.load( 'imgs/zombiepierna2.png' );

    var materials = [
        new THREE.MeshLambertMaterial( { map: texture0_d } ),
        new THREE.MeshLambertMaterial( { map: texture1_d } ),
        new THREE.MeshLambertMaterial( { map: texture2_d } ),
        new THREE.MeshLambertMaterial( { map: texture3 } ),
        new THREE.MeshLambertMaterial( { map: texture4_d } ),
        new THREE.MeshLambertMaterial( { map: texture5 } )
    ];
    this.t_pieD = materials;
    var materials = [
        new THREE.MeshLambertMaterial( { map: texture0_i } ),
        new THREE.MeshLambertMaterial( { map: texture1_i } ),
        new THREE.MeshLambertMaterial( { map: texture2_i } ),
        new THREE.MeshLambertMaterial( { map: texture3 } ),
        new THREE.MeshLambertMaterial( { map: texture4_i } ),
        new THREE.MeshLambertMaterial( { map: texture5 } )
    ];
    this.t_pieI = materials;


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


