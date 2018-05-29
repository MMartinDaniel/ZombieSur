class Building extends THREE.Object3D {
 constructor (parameters) {
    super();
    
    this.material = null;
    this.type = parameters.type;
  
    this.modelo = null;
    this.edificios = [];
    this.todo = new THREE.Mesh();
    this.modelo = this.crearEdificios(parameters);
    this.todo.add(this.modelo);
    this.add (this.todo);
    
    
  }

  crearEdificios(p){
    var modelko = new THREE.Object3D();

    if(p.type == 1){
    var objTexture = new THREE.ImageUtils.loadTexture('models/edificios/Street_Lamp_DM.png');


        var loader = new THREE.OBJLoader();
        loader.load('models/edificios/Street_Lamp.obj',
        function(obj){
              obj.traverse( function ( child ) {

            if ( child instanceof THREE.Mesh ) {

            child.material.map = objTexture;
              child.receiveShadow = true;
         //   child.material.transparent = true;
           // child.material.opacity = 0.3;
            }

            } );
        obj.position.x += p.x;
        obj.rotation.y = p.y;
        obj.position.z += p.z;
       
        obj.scale.set(1,1,1);
        modelko.add(obj);
        
        });
      }else{

      //PARTE EDIFICIOS
      //Texturas tipos:
      var textureLoader = new THREE.TextureLoader(); 
      var texture_top = textureLoader.load( 'models/edificios/texturas/ConcreteNew0013_Bump.jpg' );  
      var texture_t1 = textureLoader.load( 'models/edificios/texturas/BuildingsHighRise0322_1_S.jpg' );
      var texture_t2 = textureLoader.load( 'models/edificios/texturas/BuildingsHighRise0362_1_S.jpg' );
      var texture_t3 = textureLoader.load( 'models/edificios/texturas/BuildingsHighRise0401_1_S.jpg' );
      var texture_t4 = textureLoader.load( 'models/edificios/texturas/HighRiseTowerblocks0046_2_S.jpg' );
      var texture_t5 = textureLoader.load( 'models/edificios/texturas/BuildingsHighRise0318_1_S.jpg' );
      var texture_t6 = textureLoader.load( 'models/edificios/texturas/HighRiseTowerblocks0044_2_S.jpg' );
      var texture_t7 = textureLoader.load( 'models/edificios/texturas/BuildingsHighRise0319_1_S.jpg' );
      var texture_t8 = textureLoader.load( 'models/edificios/texturas/HighRiseTowerblocks0007_7_S.jpg' );
      var t_tejado_t = new THREE.MeshLambertMaterial( { map: texture_top ,color: 0xffffff,  transparent: true, opacity: 0.3 } );
      var t_tejado = new THREE.MeshLambertMaterial( { map: texture_top });
      var t_t1 =     new THREE.MeshLambertMaterial( { map: texture_t1} );
      var t_t2 =     new THREE.MeshLambertMaterial( { map: texture_t2} );
      var t_t3 =     new THREE.MeshLambertMaterial( { map: texture_t3 } );
      var t_t4 =     new THREE.MeshLambertMaterial( { map: texture_t4} );
      var t_t5 =     new THREE.MeshLambertMaterial( { map: texture_t5 } );
      var t_t6 =     new THREE.MeshLambertMaterial( { map: texture_t6} );
      var t_t7 =     new THREE.MeshLambertMaterial( { map: texture_t7, } );
      var t_t8 =     new THREE.MeshLambertMaterial( { map: texture_t8} );
      var materials_t1 = [t_t1,t_t1,t_tejado,t_t1,t_t1,t_t1];
      var materials_t2 = [t_t2,t_t2,t_tejado,t_t2,t_t2,t_t2];
      var materials_t3 = [t_t3,t_t3,t_tejado,t_t3,t_t3,t_t3];
      var materials_t4 = [t_t4,t_t4,t_tejado,t_t4,t_t4,t_t4];
      var materials_t5 = [t_t5,t_t5,t_tejado,t_t5,t_t5,t_t5];
      var materials_t6 = [t_t6,t_t6,t_tejado,t_t6,t_t6,t_t6];
      var materials_t7 = [t_t7,t_t7,t_tejado,t_t7,t_t7,t_t7];
      var materials_t8 = [t_t8,t_t8,t_tejado,t_t4,t_t8,t_t8];

  
      //EDIF Lado Izq
      var building = new THREE.Mesh (new THREE.BoxGeometry (200, 120, 150,10,10,10), materials_t4);
      building.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (200, 65, -225));
      modelko.add( building ); this.edificios.push(building);

      var building = new THREE.Mesh (new THREE.BoxGeometry (150, 120, 50,10,10,10), materials_t4);
      building.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (225, 65, -125));
      modelko.add( building ); this.edificios.push(building);
      //Fin Edificio lado Iqz
     
      //EDIF Lado der
      var building = new THREE.Mesh (new THREE.BoxGeometry (200, 120, 150,10,10,10), materials_t2);
      building.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (-200, 65, 225));
      modelko.add( building );this.edificios.push(building);

      var building = new THREE.Mesh (new THREE.BoxGeometry (150, 120, 50,10,10,10), materials_t2);
      building.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (-225, 65, 125));
      modelko.add( building );this.edificios.push(building);
      //Fin Edificio lado Der

      //EDIF Lado Arriba
      var building = new THREE.Mesh (new THREE.BoxGeometry (200, 120, 150,10,10,10), materials_t1);
      building.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (-200, 65,-225));
      modelko.add( building );this.edificios.push(building);

      var building = new THREE.Mesh (new THREE.BoxGeometry (150, 120, 50,10,10,10), materials_t1);
      building.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (-225, 65, -125));
      modelko.add( building );this.edificios.push(building);
      //Fin Edificio lado Arriba

      //EDIF Lado Abajo
      var building = new THREE.Mesh (new THREE.BoxGeometry (200, 120, 150,10,10,10), materials_t6);
      building.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (200, 65, 225));
      modelko.add( building );this.edificios.push(building);

      var building = new THREE.Mesh (new THREE.BoxGeometry (150, 120, 50,10,10,10), materials_t6);
      building.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (225, 65, 125));
      modelko.add( building );this.edificios.push(building);
      //Fin Edificio lado Abajo


      //EDIF Lado Izq 2
      var building = new THREE.Mesh (new THREE.BoxGeometry (200, 60, 150,8,8,8), materials_t6);
      building.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (200, 35, -375));
      modelko.add( building );this.edificios.push(building);
     //Fin Edificio lado Izq 2
     //EDIF Lado der 2
      var building = new THREE.Mesh (new THREE.BoxGeometry (200, 60, 150,8,8,8), materials_t4);
      building.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (-200, 35, -375));
      modelko.add( building );this.edificios.push(building);
     //Fin Edificio der 2
      //EDIF Lado Abajo 2
      var building = new THREE.Mesh (new THREE.BoxGeometry (200, 60, 150,8,8,8), materials_t8);
      building.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (200, 35, 375));
      modelko.add( building );this.edificios.push(building);
     //Fin Edificio lado Abajo 2
     //EDIF Lado der 3
      var building = new THREE.Mesh (new THREE.BoxGeometry (200, 60, 150,8,8,8), materials_t7);
      building.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (-200, 35, 375));
      modelko.add( building );this.edificios.push(building);
     //Fin Edificio Arriba  3


      //EDIF Lado Izq 3
      var building = new THREE.Mesh (new THREE.BoxGeometry (150, 60, 200,8,8,8), materials_t2);
      building.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (-375, 35, -200));
      modelko.add( building );this.edificios.push(building);
     //Fin Edificio lado Izq 3
     //EDIF Lado der 3
      var building = new THREE.Mesh (new THREE.BoxGeometry (150, 60, 200,8,8,8), materials_t5);
      building.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (375, 35, -200));
      modelko.add( building );this.edificios.push(building);
     //Fin Edificio der 3
      //EDIF Lado Abajo 3
      var building = new THREE.Mesh (new THREE.BoxGeometry (150, 60, 200,8,8,8), materials_t6);
      building.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (375, 35, 200));
      modelko.add( building );this.edificios.push(building);
     //Fin Edificio lado Abajo 3
     //EDIF Lado der 3
      var building = new THREE.Mesh (new THREE.BoxGeometry (150, 60, 200,8,8,8), materials_t1);
      building.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (-375, 35, 200));
      modelko.add( building );this.edificios.push(building);
     //Fin Edificio Arriba  3

      //EDIF Lado Izq 4
      var building = new THREE.Mesh (new THREE.BoxGeometry (150, 300, 200,8,8,8), materials_t1);
      building.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (-525, 150, -200));
      modelko.add( building );this.edificios.push(building);
     //Fin Edificio lado Izq 4
     //EDIF Lado der 4
      var building = new THREE.Mesh (new THREE.BoxGeometry (150, 300, 200,8,8,8), materials_t3);
      building.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (525, 150, -200));
      modelko.add( building );this.edificios.push(building);
     //Fin Edificio der 4
      //EDIF Lado Abajo 4
      var building = new THREE.Mesh (new THREE.BoxGeometry (150, 300, 200,8,8,8), materials_t7);
      building.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (525, 150, 200));
      modelko.add( building );this.edificios.push(building);
     //Fin Edificio lado Abajo 4
     //EDIF Lado der 4
      var building = new THREE.Mesh (new THREE.BoxGeometry (150, 300, 200,8,8,8), materials_t6);
      building.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (-525, 150, 200));
      modelko.add( building );this.edificios.push(building);
     //Fin Edificio Arriba  4

    //EDIF Lado Izq 5
      var building = new THREE.Mesh (new THREE.BoxGeometry (200, 300, 150,8,8,8), materials_t3);
      building.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (-200, 150, -525));
      modelko.add( building );this.edificios.push(building);
     //Fin Edificio lado Izq 5
     //EDIF Lado der 5
      var building = new THREE.Mesh (new THREE.BoxGeometry (200, 300, 150,8,8,8), materials_t2);
      building.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (200, 150, -525));
      modelko.add( building );this.edificios.push(building);
     //Fin Edificio der 5
      //EDIF Lado Abajo 5
      var building = new THREE.Mesh (new THREE.BoxGeometry (200, 300, 150,8,8,8), materials_t7);
      building.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (200, 150, 525));
      modelko.add( building );this.edificios.push(building);
     //Fin Edificio lado Abajo 5
     //EDIF Lado der 5
      var building = new THREE.Mesh (new THREE.BoxGeometry (200, 300, 150,8,8,8), materials_t8);
      building.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (-200, 150, 525));
      modelko.add( building );this.edificios.push(building);
     //Fin Edificio Arriba  5

      //EDIF Lado Izq 5
      var building = new THREE.Mesh (new THREE.BoxGeometry (200, 300, 200), materials_t4);
      building.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (-200, 150, -400));
      modelko.add( building );
     //Fin Edificio lado Izq 5
     //EDIF Lado der 5
      var building = new THREE.Mesh (new THREE.BoxGeometry (200, 300, 200), materials_t7);
      building.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (400, 150, 400));
      modelko.add( building );
     //Fin Edificio der 5
      //EDIF Lado Abajo 5
      var building = new THREE.Mesh (new THREE.BoxGeometry (200, 300, 200), materials_t1);
      building.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (-400, 150, 400));
      modelko.add( building );
     //Fin Edificio lado Abajo 5
     //EDIF Lado der 5
      var building = new THREE.Mesh (new THREE.BoxGeometry (200, 300, 200), materials_t2);
      building.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (400, 150, -400));
      modelko.add( building );
     //Fin Edificio Arriba  5


  }
      return modelko;
    }







}
