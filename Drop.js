class Drop extends THREE.Object3D {
  
  constructor (parameters) {
    super();
    
    this.material = null;
    this.distance = 0;
    this.bullet_amount = 0; 
    this.listener = new THREE.AudioListener();
    this.type = parameters.type;
    this.money = 0;
  
    this.spin_anim = new TWEEN.Tween();
    this.spin_anim_from = new TWEEN.Tween();
    this.modelo = null;
    this.todo = new THREE.Mesh();
    this.modelo = this.crearDrop();
    this.todo.add(this.modelo);
    this.add (this.todo);
    this.spin();
    
  }

  crearDrop(){

    var modelko = new THREE.Object3D();
    var loader = new THREE.ObjectLoader();
      if(this.type == 2){  
          this.money = 0;
          this.bullet_amount = 15;
        var textureLoader = new THREE.TextureLoader();
        var texture0 = textureLoader.load( 'models/drop/card3.png' );
        var texture1 = textureLoader.load( 'models/drop/card2.png' );
        var texture2 = textureLoader.load( 'models/drop/chartuchos-der.png' );
        var texture3 = textureLoader.load( 'models/drop/chartuchos-izq.png' );
        var texture4 = textureLoader.load( 'models/drop/Cartuchos-arriba.png' );
        var texture5 = textureLoader.load( 'models/drop/cartuchos-abajo.png' );

        var materials = [
        new THREE.MeshLambertMaterial( { map: texture0 } ),
        new THREE.MeshLambertMaterial( { map: texture1 } ),
        new THREE.MeshLambertMaterial( { map: texture2 } ),
        new THREE.MeshLambertMaterial( { map: texture3 } ),
        new THREE.MeshLambertMaterial( { map: texture4 } ),
        new THREE.MeshLambertMaterial( { map: texture5 } )
        ];
        var faceMaterial = new THREE.MeshFaceMaterial( materials );

        var shell = new THREE.Mesh ( new THREE.BoxGeometry (10, 7, 4), faceMaterial);

        shell.castShadow = true;
        shell.autoUpdateMatrix = false;
        shell.updateMatrix();
        modelko.add(shell);

      }else if(this.type == 3){
        this.money = 0;
        this.bullet_amount = 5;
        var textureLoader = new THREE.TextureLoader();
        var texture0 = textureLoader.load( 'models/drop/b1.png' );
        var texture1 = textureLoader.load( 'models/drop/b1.png' );
        var texture2 = textureLoader.load( 'models/drop/b2_back.png' );
        var texture3 = textureLoader.load( 'models/drop/b2.png' );
        var texture4 = textureLoader.load( 'models/drop/b4.png' );
        var texture5 = textureLoader.load( 'models/drop/b5.png' );

        var materials = [
        new THREE.MeshLambertMaterial( { map: texture0 } ),
        new THREE.MeshLambertMaterial( { map: texture1 } ),
        new THREE.MeshLambertMaterial( { map: texture2 } ),
        new THREE.MeshLambertMaterial( { map: texture3 } ),
        new THREE.MeshLambertMaterial( { map: texture4 } ),
        new THREE.MeshLambertMaterial( { map: texture5 } )
        ];
        var faceMaterial = new THREE.MeshFaceMaterial( materials );

        var shell = new THREE.Mesh ( new THREE.BoxGeometry (10, 7, 4), faceMaterial);

        shell.castShadow = true;
        shell.autoUpdateMatrix = false;
        shell.updateMatrix();
        modelko.add(shell);

      }else if(this.type == 4){
        this.money = 50;
        var textureLoader = new THREE.TextureLoader();
        var texture0 = textureLoader.load( 'models/drop/bill2.png' );
        var texture1 = textureLoader.load( 'models/drop/bill2.png' );
        var texture2 = textureLoader.load( 'models/drop/bill2.png' );
        var texture3 = textureLoader.load( 'models/drop/bill2.png' );
        var texture4 = textureLoader.load( 'models/drop/bill1.png' );
        var texture5 = textureLoader.load( 'models/drop/bill1.png' );

        var materials = [
        new THREE.MeshLambertMaterial( { map: texture0 } ),
        new THREE.MeshLambertMaterial( { map: texture1 } ),
        new THREE.MeshLambertMaterial( { map: texture2 } ),
        new THREE.MeshLambertMaterial( { map: texture3 } ),
        new THREE.MeshLambertMaterial( { map: texture4 } ),
        new THREE.MeshLambertMaterial( { map: texture5 } )
        ];
        var faceMaterial = new THREE.MeshFaceMaterial( materials );

        var shell = new THREE.Mesh ( new THREE.BoxGeometry (12, 7, 3), faceMaterial);

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
          var au = 'models/sonidos/collect.wav';
            audioLoader.load( au, function( buffer ) {
              sound.setBuffer( buffer );
              sound.setRefDistance( 20 );
              scene.sound.setVolume(200);
              sound.play();
            });
    }


 spin() {

   var position = {x:0.0, y: 0.0};
   var mod = this.modelo;
   this.spin_anim = new TWEEN.Tween(position).to({x: 6.3, y:1.2},5000).onUpdate(function(){
       mod.rotation.z =  position.x;

   });
   this.spin_anim.repeat(Infinity);
   this.modelo = mod;
   this.spin_anim.start();
}


}
