class Drop extends THREE.Object3D {
  
  constructor (parameters) {
    super();
    
    this.material = null;
    this.distance = 0;
    this.bullet_amount = 0; 
    this.listener = new THREE.AudioListener();
    this.type = parameters.type;
    this.spin_a
    //SESION 2 DATOS

  
    this.spin_anim = new TWEEN.Tween();
  this.spin_anim_from = new TWEEN.Tween();
    this.modelo = null;
    this.todo = new THREE.Mesh();
    this.modelo = this.crearDrop();
    this.todo.add(this.modelo);
    //this.todo.add(this.bullet);
    this.add (this.todo);
    this.spin();
    
  }

  crearDrop(){

    var modelko = new THREE.Object3D();
    var loader = new THREE.ObjectLoader();
      if(this.type == 2){  
          
        var textureLoader = new THREE.TextureLoader();
        var texture0 = textureLoader.load( 'models/drop/card3.png' );
        var texture1 = textureLoader.load( 'models/drop/card2.png' );
        var texture2 = textureLoader.load( 'models/drop/chartuchos-der.png' );
        var texture3 = textureLoader.load( 'models/drop/chartuchos-izq.png' );
        var texture4 = textureLoader.load( 'models/drop/Cartuchos-arriba.png' );
        var texture5 = textureLoader.load( 'models/drop/cartuchos-abajo.png' );

        var materials = [
        new THREE.MeshBasicMaterial( { map: texture0 } ),
        new THREE.MeshBasicMaterial( { map: texture1 } ),
        new THREE.MeshBasicMaterial( { map: texture2 } ),
        new THREE.MeshBasicMaterial( { map: texture3 } ),
        new THREE.MeshBasicMaterial( { map: texture4 } ),
        new THREE.MeshBasicMaterial( { map: texture5 } )
        ];
        var faceMaterial = new THREE.MeshFaceMaterial( materials );

        var shell = new THREE.Mesh ( new THREE.BoxGeometry (10, 7, 4), faceMaterial);

        shell.castShadow = true;
        shell.autoUpdateMatrix = false;
        shell.updateMatrix();
        modelko.add(shell);

      }else if(this.type == 3){
        
        var textureLoader = new THREE.TextureLoader();
        var texture0 = textureLoader.load( 'models/drop/b1.png' );
        var texture1 = textureLoader.load( 'models/drop/b1.png' );
        var texture2 = textureLoader.load( 'models/drop/b2_back.png' );
        var texture3 = textureLoader.load( 'models/drop/b2.png' );
        var texture4 = textureLoader.load( 'models/drop/b4.png' );
        var texture5 = textureLoader.load( 'models/drop/b5.png' );

        var materials = [
        new THREE.MeshBasicMaterial( { map: texture0 } ),
        new THREE.MeshBasicMaterial( { map: texture1 } ),
        new THREE.MeshBasicMaterial( { map: texture2 } ),
        new THREE.MeshBasicMaterial( { map: texture3 } ),
        new THREE.MeshBasicMaterial( { map: texture4 } ),
        new THREE.MeshBasicMaterial( { map: texture5 } )
        ];
        var faceMaterial = new THREE.MeshFaceMaterial( materials );

        var shell = new THREE.Mesh ( new THREE.BoxGeometry (10, 7, 4), faceMaterial);

        shell.castShadow = true;
        shell.autoUpdateMatrix = false;
        shell.updateMatrix();
        modelko.add(shell);

      }
      return modelko;

    }


    reproduceSound(){
          var sound = new THREE.PositionalAudio( this.listener );
          var audioLoader = new THREE.AudioLoader();
          switch (this.type) {
            case '1':
             var au = 'models/mp5k_sound.wav';
              break;
            case '2':
              var au = 'models/sonidos/m4a4.wav';
              break;
          }
            audioLoader.load( au, function( buffer ) {
              sound.setBuffer( buffer );
              sound.setRefDistance( 20 );
              scene.sound.setVolume(2);
              sound.play();
            });
    }


 spin() {

   var position = {x:0.0, y: 0.0};
   var mod = this.modelo;
   this.spin_anim = new TWEEN.Tween(position).to({x: 3.8, y:1.2},5000).onUpdate(function(){

           mod.rotation.z =  position.x;
   });
  this.spin_anim_from = new TWEEN.Tween(position).to({x:-3.8, y:1.2},5000).onUpdate(function(){
           mod.rotation.z =  -position.x;
   });

   this.spin_anim.chain(this.spin_anim_from);
   this.spin_anim_from.chain(this.spin_anim);

   this.modelo = mod;
   this.spin_anim.start();


}

}
