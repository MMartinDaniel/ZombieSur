class Character extends THREE.Object3D {
  
  constructor (parameters) {
    super();
    
    this.materialBody    = null;
    this.materialCab = null;
    this.material_arm_i = null;
    this.material_arm_d = null;
    this.material_foot_i = null;
    this.material_foot_d = null;

    this.angle           = 0;
    this.distance        = 10;
    this.height          = 10;
    this.angleP = 0;
    this.aimpos = false;
    this.walking = false;

    this.alive = true;
    this.vida = 100;
    this.money = 800;
    this.tween_to_walk = new TWEEN.Tween();
    this.tween_from_walk = new TWEEN.Tween();
    this.tween_to_aim_walk = new TWEEN.Tween();
    this.tween_from_aim_walk = new TWEEN.Tween();

    this.tween_to_aim = new TWEEN.Tween();
    this.tween_to_shoot = new TWEEN.Tween();

    this.cabeza = null;
    this.cuerpo = null;
    this.brazoD = null;
    this.brazoI = null;   
    this.pieI = null;
    this.pieD = null; 
    this.gun = null;
    this.shooting = false;
    this.guns = [];
    this.todo = new THREE.Mesh();
    this.hitbox = null;
    this.attacked = false;
    this.die_form = false;


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
        this.hitbox = this.createHitBox();
        todo.add(this.hitbox);
        todo.add(this.cuerpo);
      
        this.pieD = this.createFoot({w:2,ww: 5});
        this.pieI = this.createFoot({w:-2,ww: -5});

        this.die_form = this.createBlood();

       // this.todo.add(this.brazoD);
        //this.todo.add(this.brazoI);

        this.cuerpo.add(this.pieD);
        this.cuerpo.add(this.pieI);

        this.gun = new Gun({type:'1'});
        this.guns.push(this.gun);
        this.guns.push(  new Gun({type:'2'}));
        this.guns.push(  new Gun({type:'3'}));

        this.brazoD.add(this.gun);
        todo.position.y = 8;
        this.walk(180);
        this.createAim_anim();
        this.createShoot_anim();

        return todo;

  }
  
  createHitBox(){
      var geometry = new THREE.BoxGeometry( 17, 17, 13,4,4,4 );
      var material = new THREE.MeshBasicMaterial( {color: 0xffff00, transparent: true,opacity:0.0} );
      var plane = new THREE.Mesh( geometry, material );
      plane.position.set(0,10,8);
      plane.autoUpdateMatrix = false;

       return plane;
  }


    createAim_anim(){

      var cpos_i = this.brazoI.rotation.z;
      var cpos_d = this.brazoD.rotation.z;
      var xpos_gun = this.gun.position.x;
      
      var position = {x:0.0, y: 0.0,z:0.0};

     this.tween_to_aim = new TWEEN.Tween(position).to({x: -1.5, y:0.0,z:-0.3},500).onUpdate(function(){

             scene.character.brazoI.rotation.x =  position.x;
             scene.character.brazoD.rotation.x = position.x;
             scene.character.brazoI.rotation.z = -position.z;
             scene.character.brazoD.rotation.z = position.z;
             scene.character.gun.position.x = position.x*2.5;


     });
     this.tween_to_aim.onComplete(function(){
            scene.character.brazoI.rotation.z = cpos_i;
            scene.character.brazoD.rotation.z = cpos_d;
            scene.character.gun.position.x = xpos_gun;
     });


    }

   createShoot_anim(){
      var cpos_i = this.brazoI.rotation.z;
      var cpos_d = this.brazoD.rotation.z;    
      var position = {x:0.0, y: 0.0,z:0.0};

     this.tween_to_shoot = new TWEEN.Tween(position).to({x: -2, y:0.0,z:-0.3},500).onUpdate(function(){

             scene.character.brazoI.rotation.x =  position.x;
             scene.character.brazoD.rotation.x = position.x;
             scene.character.brazoI.rotation.z = -position.z;
             scene.character.brazoD.rotation.z = position.z;
     });
     this.tween_to_shoot.onComplete(function(){
            scene.character.brazoI.rotation.z = cpos_i;
            scene.character.brazoD.rotation.z = cpos_d;
     });
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
        new THREE.MeshLambertMaterial ( { map: texture0 } ),
        new THREE.MeshLambertMaterial ( { map: texture1 } ),
        new THREE.MeshLambertMaterial ( { map: texture2 } ),
        new THREE.MeshLambertMaterial ( { map: texture3 } ),
        new THREE.MeshLambertMaterial ( { map: texture4 } ),
        new THREE.MeshLambertMaterial ( { map: texture5 } )
    ];
 


    this.materialBody = materials;

    var base = new THREE.Mesh (new THREE.BoxGeometry (8, 12, 4, 6,6,6), materials);
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
      new THREE.MeshLambertMaterial ( { map: texture0 } ),
      new THREE.MeshLambertMaterial ( { map: texture1 } ),
      new THREE.MeshLambertMaterial ( { map: texture2 } ),
      new THREE.MeshLambertMaterial ( { map: texture3 } ),
      new THREE.MeshLambertMaterial ( { map: texture4 } ),
      new THREE.MeshLambertMaterial ( { map: texture5 } )
  ];
  var faceMaterial = new THREE.MeshFaceMaterial( materials );
  this.materialCab = faceMaterial;

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
      new THREE.MeshLambertMaterial( { map: texture0 } ),
      new THREE.MeshLambertMaterial( { map: texture1 } ),
      new THREE.MeshLambertMaterial( { map: texture2 } ),
      new THREE.MeshLambertMaterial( { map: texture3 } ),
      new THREE.MeshLambertMaterial( { map: texture4 } ),
      new THREE.MeshLambertMaterial( { map: texture5 } )
  ];
    var armMaterial = new THREE.MeshFaceMaterial( materials );
    this.material_arm_i = armMaterial;
  }else{


  var texture10 = textureLoader.load( 'imgs/character/ad2.png');
  var texture11 = textureLoader.load( 'imgs/character/ad3.png');
  var texture12 = textureLoader.load( 'imgs/character/ad5.png');
  var texture13 = textureLoader.load( 'imgs/character/ad6.png');
  var texture14 = textureLoader.load( 'imgs/character/ad1.png');
  var texture15 = textureLoader.load( 'imgs/character/ad4.png');

  var materials = [
      new THREE.MeshLambertMaterial( { map: texture10 } ),
      new THREE.MeshLambertMaterial( { map: texture11 } ),
      new THREE.MeshLambertMaterial( { map: texture12 } ),
      new THREE.MeshLambertMaterial( { map: texture13 } ),
      new THREE.MeshLambertMaterial( { map: texture14 } ),
      new THREE.MeshLambertMaterial( { map: texture15 } )
  ];
    var armMaterial = new THREE.MeshFaceMaterial( materials );
    this.material_arm_d = armMaterial;
  }



  var larm = new THREE.Mesh ( 
  new THREE.BoxGeometry (4, 12 ,4, 16, 8),armMaterial);
  larm.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (place.w, -5, 0));  
  larm.position.y = 15; 
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
        new THREE.MeshLambertMaterial( { map: texture0 } ),
        new THREE.MeshLambertMaterial( { map: texture1 } ),
        new THREE.MeshLambertMaterial( { map: texture2 } ),
        new THREE.MeshLambertMaterial( { map: texture3 } ),
        new THREE.MeshLambertMaterial( { map: texture4 } ),
        new THREE.MeshLambertMaterial( { map: texture5 } )
    ];
    var footMaterial = new THREE.MeshFaceMaterial( materials );
    this.material_foot_i = footMaterial;
  }else{
    var texture0 = textureLoader.load( 'imgs/character/fd2.png' );
    var texture1 = textureLoader.load( 'imgs/character/fd3.png' );
    var texture2 = textureLoader.load( 'imgs/character/fd5.png' );
    var texture3 = textureLoader.load( 'imgs/character/fd6.png' );
    var texture4 = textureLoader.load( 'imgs/character/fd1.png' );
    var texture5 = textureLoader.load( 'imgs/character/fd4.png' );


     var materials = [
        new THREE.MeshLambertMaterial( { map: texture0 } ),
        new THREE.MeshLambertMaterial( { map: texture1 } ),
        new THREE.MeshLambertMaterial( { map: texture2 } ),
        new THREE.MeshLambertMaterial( { map: texture3 } ),
        new THREE.MeshLambertMaterial( { map: texture4 } ),
        new THREE.MeshLambertMaterial( { map: texture5 } )
    ];
    var footMaterial = new THREE.MeshFaceMaterial( materials );
    this.material_foot_d = footMaterial;
  }

   


 var rfoot = new THREE.Mesh ( 
    new THREE.BoxGeometry (4, 12 , 4, 16, 8), footMaterial);
    rfoot.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (place.w, -5, 0));  
    rfoot.position.y = 3 ;    
  rfoot.castShadow = true;
  rfoot.autoUpdateMatrix = false;
  rfoot.updateMatrix();
    return rfoot;  
}

  toRad(degrees) {
  return degrees * Math.PI / 180;
  }



  setBrazos(brazos){
    this.angle = this.toRad(brazos);
    this.brazoD.rotation.x = this.angle;
    this.brazoI.rotation.x = -this.angle;

  }
  setPiernas(piernas){
    this.angleP = this.toRad(piernas);
    this.pieD.rotation.x = this.angleP;
    this.pieI.rotation.x = -this.angleP;
  }

   walk(angle) {

   var position = {x:0.0, y: 0.0};

   this.tween_to_walk = new TWEEN.Tween(position).to({x: 1.2, y:0.0},500).onUpdate(function(){

           scene.character.pieI.rotation.x =  position.x;
           scene.character.pieD.rotation.x = -position.x;
           scene.character.brazoI.rotation.x =  position.x;
           scene.character.brazoD.rotation.x = -position.x;


   });

   this.tween_from_walk = new TWEEN.Tween(position).to({x: -1.2, y:0.0},500).onUpdate(function(){
          scene.character.pieI.rotation.x =  position.x;
          scene.character.pieD.rotation.x =  -position.x;
          scene.character.brazoI.rotation.x =  position.x;
          scene.character.brazoD.rotation.x = -position.x;
   });

   this.tween_to_aim_walk = new TWEEN.Tween(position).to({x: 1.2, y:0.0},500).onUpdate(function(){

           scene.character.pieI.rotation.x =  position.x;
           scene.character.pieD.rotation.x = -position.x;


   });

   this.tween_from_aim_walk = new TWEEN.Tween(position).to({x: -1.2, y:0.0},500).onUpdate(function(){
          scene.character.pieI.rotation.x =  position.x;
          scene.character.pieD.rotation.x =  -position.x;
   });



   this.tween_to_walk.chain(this.tween_from_walk);
   this.tween_from_walk.chain(this.tween_to_walk);

   this.tween_to_aim_walk.chain(this.tween_from_aim_walk);
   this.tween_from_aim_walk.chain(this.tween_to_aim_walk);

}


walk_stop(){
  if(this.aimpos){
    this.tween_to_aim_walk.stop();
    this.tween_from_aim_walk.stop();
  }else{
     this.tween_to_walk.stop();
     this.tween_from_walk.stop();
  }
}

walk_start(){
    if(this.aimpos){
       this.tween_to_aim_walk.start();
    }else{
          this.tween_to_walk.start();
      }
}
aim_stop(){

    this.brazoD.rotation.z = 0;
     this.brazoI.rotation.z = 0;
     this.brazoI.rotation.x = 0;
     this.brazoD.rotation.x = 0;
     this.gun.rotation.z = 0;
     this.gun.position.x = 0;
     this.gun.position.y = 0;
     this.gun.position.z = 0;

    this.aimpos = false;

}
aim_start(){

     this.brazoD.rotation.z = -this.toRad(20);
     this.brazoI.rotation.z = this.toRad(20);
     this.brazoI.rotation.x = -Math.PI /2;
     this.brazoD.rotation.x = -Math.PI /2;
     this.gun.rotation.z = -this.toRad(-20);
     switch (this.gun.type) {
       case '1':
           this.gun.position.x = -6.5;
           this.gun.position.y = -3;
         break;
       case '2':
          this.gun.position.x = -5.2;
          this.gun.position.y = -4;
         break;
       case '3':
          this.gun.position.x = -4.3;
          this.gun.position.y = -5.4;
          this.gun.position.z = -2;



         break         
     }
   
    this.aimpos = true;
}



displayAmmo(){

   var divElem = document.createElement('div');
    divElem.id = "balasArma";
  //var divElem = document.getElementById("balasArma");

    for (var i = 0; i < this.gun.current_bullets; i++) {
    //  var div = document.createElement('li');
   //   div.classList.add("prueba");

    var listElem = document.createElement('li');
    listElem.classList.add("prueba");
    listElem.setAttribute("type", "none");
    listElem.id = "contenedorBala";

    var elem = document.createElement("img");
    switch (this.gun.type) {
      case '1':
         elem.setAttribute("src", "imgs/9mm.png");
         elem.classList.add('bala-1');
        break;
      case '3':
        elem.setAttribute("src", "imgs/bullet_shotgun.png");
        elem.classList.add('bala-1');
        break;
        case '2':
         elem.setAttribute("src", "imgs/bullet-sniper.png");
        elem.classList.add('bala-2');
        break;
    }




    listElem.appendChild(elem);
    divElem.appendChild(listElem);
    //document.body.appendChild(listElem);

    document.getElementById("balas").appendChild(divElem);

    }
  }


shoot_start(){
  this.tween_to_shoot.start();
}
shoot_stop(){
  this.tween_to_shoot.stop();
}
  shoot(){
      //Sin balas no se puede disparar 
      if(this.gun.current_bullets > 0){       
          this.gun.shoot();
          this.gun.current_bullets--;
  //        console.log(this.gun.magazine_bullets);
          var elem = document.getElementById('contenedorBala');
          elem.parentNode.removeChild(elem);
          if(this.gun.type == 1){
            document.getElementById("b"+this.gun.type).innerHTML = '&#x221e';
          }else{
            document.getElementById("b"+this.gun.type).innerHTML = this.gun.magazine_bullets;
          }
          
        }
         //CASO RECARGAR
      else if(this.gun.current_bullets == 0 && this.gun.magazine_bullets > 0){
        this.gun.reload();
        this.displayAmmo();
      }

      else if(this.gun.magazine_bullets <= 0){
        this.gun.noBullets();

      }

      this.shooting = true;

      
  }

  swapGun(param){

  //Al cargar una nueva arma las balas anteriores desaparecen
    if(!this.aimpos){
      if(this.gun != this.guns[param.selected]){
        var elem = document.getElementById('balasArma');
        elem.parentNode.removeChild(elem);    
        this.brazoD.remove(this.gun);
        this.gun = this.guns[param.selected];
        this.brazoD.add(this.gun);
        this.displayAmmo();
      }
    } 
}
  isDamaged(){
      var mat = new THREE.MeshBasicMaterial( { color: 0xFF0000 ,transparent: true, opacity: 0.5 }  );
      this.cabeza.material = mat;
      this.cuerpo.material = mat;
      this.pieI.material = mat;
      this.pieD.material = mat;
      this.brazoD.material = mat;
      this.brazoI.material = mat;
      this.vida -= 10; 
      document.getElementById("health").style.width = this.vida + '%';
      var color = '82ff00';
       if(this.vida <= 50){color = 'ffff00';}
      document.getElementById("health").style.background = '#' + color;
      if(this.vida <= 0){
        this.die();
        if(this.die_form){return false;}else{return true;};
      }
      return false;
  }
  recover(){
      this.cabeza.material = this.materialCab;
      this.cuerpo.material = this.materialBody;
      this.pieI.material = this.material_foot_i;
      this.pieD.material = this.material_foot_d;
      this.brazoD.material = this.material_arm_d;
      this.brazoI.material = this.material_arm_i;
  }
  die(){
   
      this.cuerpo.add(this.die_form);
      this.todo.rotation.x = this.toRad(270);
      this.brazoD.rotation.x = this.toRad(-40);
      this.brazoI.rotation.x = this.toRad(-40);

      this.alive = false;
      this.walk_stop();
      this.shoot_stop();



      document.getElementById('endContainer').style.visibility = 'visible';
      document.getElementById('pfinal').innerHTML =  scene.wave_number-2;





  }

  createBlood(){
     var textureLoader = new THREE.TextureLoader();   
      //Cara izq
      var alphaTest = textureLoader.load( 'UI/blood.png' );    
      var material = new THREE.MeshBasicMaterial({ transparent: true, side: THREE.DoubleSide, opacity:1, map : alphaTest});
      var materials = [material];
      var bloodMat = new THREE.MeshFaceMaterial( materials );
      var blood = new THREE.Mesh (new THREE.BoxGeometry (5, 80,80, 16, 8), bloodMat);
        blood.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (0, 10, 0));
        blood.rotation.y -= 90 * (Math.PI / 180);
        blood.position.z = -1;
        blood.autoUpdateMatrix = false;   
      return blood;

  }

}
