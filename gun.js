class Gun extends THREE.Object3D {
  
  constructor (parameters) {
    super();
    
    this.material = null;
    this.distance = 0;
    this.bullet = new Bullet ({type:'1'});
    this.max_bullets = 0;         //Balas maximas del arma
    this.magazine_bullets = 0;    //Balas totales del arma
    this.current_bullets = 0;     //Balas actuales en el cargador del arma
    this.reload_time = 0;
    this.price = 100;
    this.damage = 0;
    this.listener = new THREE.AudioListener();
    this.type = parameters.type;

    //SESION 2 DATOS

  
    this.shoot_anim = new TWEEN.Tween();
    this.modelo = null;
    this.todo = new THREE.Mesh();
    this.modelo = this.crearArma();
    this.todo.add(this.modelo);
    //this.todo.add(this.bullet);
    this.add (this.todo);
    
  }

  crearArma(){

    var modelko = new THREE.Object3D();
    var loader = new THREE.ObjectLoader();
      if(this.type == 1){  
        this.distance = 200;
        this.damage = 20;
        this.reload_time = 40;
        this.current_bullets = 10;
        this.max_bullets = 10;
        this.magazine_bullets = 999;
 
        loader.load('models/mp5k.json',
          function(obj){
          obj.position.y -= 15;
          obj.position.x += 6.7;
          obj.rotation.y = 59.7;
          obj.position.z += 2;
          obj.rotation.x = 1.5;
          obj.scale.set(0.125,0.125,0.125);
          modelko.add(obj);
        }
        );
      }else if(this.type == 2){
        this.distance = 200;
        this.damage = 40;
        this.reload_time = 10;
        this.current_bullets = 15;
        this.max_bullets = 15;
        this.magazine_bullets = 30;


        loader.load('models/m4a1.json',
          function(obj){
          var materialx = new THREE.MeshBasicMaterial({ color: 0xff0000 });
          obj.material = materialx;
          obj.position.y -= 12;
          obj.position.x += 10;
          obj.rotation.y = 59.7;
          obj.position.z += 2;
          obj.rotation.x = 1.5;
          obj.scale.set(10,10,10);
          modelko.add(obj);
        });

      }else if(this.type == 3){  
        this.distance = 100;
        this.damage = 100;
        this.reload_time = 80;

        this.current_bullets = 5;
        this.max_bullets = 5;
        this.magazine_bullets = 7;

        loader.load('models/shotgun/shotgun.json',
          function(obj){
          obj.position.y -= 12;
          obj.position.x += 5;
          obj.position.z += 2;
          obj.rotation.x = 1.5;
          obj.scale.set(5,5,2.3);
          modelko.add(obj);
        }
        );

      }

      return modelko;
    }

    shoot(){
      this.reproduceSound();
      this.todo.add(this.bullet);
    }

    reload(){
      var elem = document.getElementById('balasArma');
      elem.parentNode.removeChild(elem); 

      if(this.magazine_bullets >= this.max_bullets){
         this.current_bullets = this.max_bullets;
         this.magazine_bullets = this.magazine_bullets - this.max_bullets;
      }
      else if(this.magazine_bullets < this.max_bullets){      //Recargas menos de un cargador entero
        this.current_bullets = this.magazine_bullets;
        this.magazine_bullets = 0;
      }

      this.reproduceSoundReload();
    }

    noBullets(){
          var sound = new THREE.PositionalAudio( this.listener );
          var audioLoader = new THREE.AudioLoader();
          var au = 'models/sonidos/guncocking.mp3';
          audioLoader.load( au, function( buffer ) {
            sound.setBuffer( buffer );
            sound.setRefDistance( 20 );
            scene.sound.setVolume(2);
            sound.play();
          });

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
              //ESCOPETA
             case '3':
              var au = 'models/sonidos/ShootReload.mp3';
              break;           
          }
            audioLoader.load( au, function( buffer ) {
              sound.setBuffer( buffer );
              sound.setRefDistance( 20 );
              scene.sound.setVolume(2);
              sound.play();
            });
    }

    reproduceSoundReload(){
          var sound = new THREE.PositionalAudio( this.listener );
          var audioLoader = new THREE.AudioLoader();
          switch (this.type) {
            case '1':
             var au = 'models/sonidos/loadmp5.wav';
              break;
            case '2':
              var au = 'models/sonidos/m4Reload.mp3';
              break;
              //ESCOPETA
             case '3':
              var au = 'models/sonidos/GunshotReloadingSound.mp3';
              break;           
          }
            audioLoader.load( au, function( buffer ) {
              sound.setBuffer( buffer );
              sound.setRefDistance( 20 );
              scene.sound.setVolume(2);
              sound.play();
            });
    }



    checkGunPos(param){
      if(this.bullet.position.y < -this.distance || param.hitt){
        this.todo.remove(this.bullet);
        this.bullet = new Bullet ({type:'1'});
        return false;
      }
      return true;
    }
}
