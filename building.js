class Building extends THREE.Object3D {
 constructor (parameters) {
    super();
    
    this.material = null;
    this.type = parameters.type;
  
    this.modelo = null;

    this.todo = new THREE.Mesh();
    this.modelo = this.crearEdificios(parameters);
    this.todo.add(this.modelo);

    this.add (this.todo);
    
  }

  crearEdificios(p){
    var objTexture = new THREE.ImageUtils.loadTexture('models/edificios/Street_Lamp_DM.png');

    var modelko = new THREE.Object3D();
        var loader = new THREE.OBJLoader();
        loader.load('models/edificios/Street_Lamp.obj',
        function(obj){
              obj.traverse( function ( child ) {

            if ( child instanceof THREE.Mesh ) {

            child.material.map = objTexture;
            }

            } );
        obj.position.x += p.x;
        obj.rotation.y = p.y;
        obj.position.z += p.z;
        obj.scale.set(1,1,1);
        modelko.add(obj);
        
        });


      //PARTE EDIFICIOS

      //EDIF 1

      var textureLoader = new THREE.TextureLoader();   
      //Cara izq
      var texture0 = textureLoader.load( 'models/edificios/texturas/BuildingsHighRise0322_1_S.jpg' );
      //Cara der
      var texture1 = textureLoader.load( 'models/edificios/texturas/BuildingsHighRise0305_1_S.jpg' );
      //Cara superior
      var texture2 = textureLoader.load( 'models/edificios/texturas/ConcreteNew0013_Bump.jpg' );
      //Cara inferior
      var texture3 = textureLoader.load( 'models/edificios/texturas/BuildingsHighRise0322_1_S.jpg' );
      //Cara delantera
      var texture4 = textureLoader.load( 'models/edificios/texturas/BuildingsHighRise0305_1_S.jpg' );
      //Cara trasera
      var texture5 = textureLoader.load( 'models/edificios/texturas/BuildingsHighRise0305_1_S.jpg' );
      
      var materials = [
          new THREE.MeshLambertMaterial( { map: texture0 } ),
          new THREE.MeshLambertMaterial( { map: texture1 } ),
          new THREE.MeshLambertMaterial( { map: texture2 } ),
          new THREE.MeshLambertMaterial( { map: texture3 } ),
          new THREE.MeshLambertMaterial( { map: texture4 } ),
          new THREE.MeshLambertMaterial( { map: texture5 } )
      ];

      var bodyMaterial = new THREE.MeshFaceMaterial( materials );

      var building = new THREE.Mesh (new THREE.BoxGeometry (100, 150, 90), bodyMaterial);
      building.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (200,75, 145));
      modelko.add( building );    



      //EDIF 2

      var textureLoader = new THREE.TextureLoader();   
      //Cara izq
      var texture0 = textureLoader.load( 'models/edificios/texturas/BuildingsHighRise0362_1_S.jpg' );
      //Cara der
      var texture1 = textureLoader.load( 'models/edificios/texturas/BuildingsHighRise0362_1_S.jpg' );
      //Cara superior
      var texture2 = textureLoader.load( 'models/edificios/texturas/ConcreteNew0013_Bump.jpg' );
      //Cara inferior
      var texture3 = textureLoader.load( 'models/edificios/texturas/BuildingsHighRise0362_1_S.jpg' );
      //Cara delantera
      var texture4 = textureLoader.load( 'models/edificios/texturas/BuildingsHighRise0362_1_S.jpg' );
      //Cara trasera
      var texture5 = textureLoader.load( 'models/edificios/texturas/BuildingsHighRise0362_1_S.jpg' );
      
      var materials = [
          new THREE.MeshLambertMaterial( { map: texture0 } ),
          new THREE.MeshLambertMaterial( { map: texture1 } ),
          new THREE.MeshLambertMaterial( { map: texture2 } ),
          new THREE.MeshLambertMaterial( { map: texture3 } ),
          new THREE.MeshLambertMaterial( { map: texture4 } ),
          new THREE.MeshLambertMaterial( { map: texture5 } )
      ];

      var bodyMaterial = new THREE.MeshFaceMaterial( materials );

      var building = new THREE.Mesh (new THREE.BoxGeometry (90, 100, 90), bodyMaterial);
      building.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (300, 50, 145));
      modelko.add( building );  


      //EDIF 3


      var textureLoader = new THREE.TextureLoader();   
      //Cara izq
      var texture0 = textureLoader.load( 'models/edificios/texturas/HighRiseTowerblocks0011_5_S.jpg' );
      //Cara der
      var texture1 = textureLoader.load( 'models/edificios/texturas/HighRiseTowerblocks0011_5_S.jpg' );
      //Cara superior
      var texture2 = textureLoader.load( 'models/edificios/texturas/ConcreteNew0013_Bump.jpg' );
      //Cara inferior
      var texture3 = textureLoader.load( 'models/edificios/texturas/HighRiseTowerblocks0011_5_S.jpg' );
      //Cara delantera
      var texture4 = textureLoader.load( 'models/edificios/texturas/HighRiseTowerblocks0011_5_S.jpg' );
      //Cara trasera
      var texture5 = textureLoader.load( 'models/edificios/texturas/HighRiseTowerblocks0011_5_S.jpg' );
      
      var materials = [
          new THREE.MeshLambertMaterial( { map: texture0 } ),
          new THREE.MeshLambertMaterial( { map: texture1 } ),
          new THREE.MeshLambertMaterial( { map: texture2 } ),
          new THREE.MeshLambertMaterial( { map: texture3 } ),
          new THREE.MeshLambertMaterial( { map: texture4 } ),
          new THREE.MeshLambertMaterial( { map: texture5 } )
      ];

      var bodyMaterial = new THREE.MeshFaceMaterial( materials );

      var building = new THREE.Mesh (new THREE.BoxGeometry (90, 130, 90), bodyMaterial);
      building.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (300, 65, -145));
      modelko.add( building );  


      //EDIF 4


      var textureLoader = new THREE.TextureLoader();   
      //Cara izq
      var texture0 = textureLoader.load( 'models/edificios/texturas/BuildingsHighRise0401_1_S.jpg' );
      //Cara der
      var texture1 = textureLoader.load( 'models/edificios/texturas/BuildingsHighRise0401_1_S.jpg' );
      //Cara superior
      var texture2 = textureLoader.load( 'models/edificios/texturas/ConcreteNew0013_Bump.jpg' );
      //Cara inferior
      var texture3 = textureLoader.load( 'models/edificios/texturas/BuildingsHighRise0401_1_S.jpg' );
      //Cara delantera
      var texture4 = textureLoader.load( 'models/edificios/texturas/BuildingsHighRise0401_1_S.jpg' );
      //Cara trasera
      var texture5 = textureLoader.load( 'models/edificios/texturas/BuildingsHighRise0401_1_S.jpg' );
      
      var materials = [
          new THREE.MeshLambertMaterial( { map: texture0 } ),
          new THREE.MeshLambertMaterial( { map: texture1 } ),
          new THREE.MeshLambertMaterial( { map: texture2 } ),
          new THREE.MeshLambertMaterial( { map: texture3 } ),
          new THREE.MeshLambertMaterial( { map: texture4 } ),
          new THREE.MeshLambertMaterial( { map: texture5 } )
      ];

      var bodyMaterial = new THREE.MeshFaceMaterial( materials );

      var building = new THREE.Mesh (new THREE.BoxGeometry (90, 80, 90), bodyMaterial);
      building.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (200, 40, -145));
      modelko.add( building );  


      //EDIF 5


      var textureLoader = new THREE.TextureLoader();   
      //Cara izq
      var texture0 = textureLoader.load( 'models/edificios/texturas/BuildingsHighRise0362_1_S.jpg' );
      //Cara der
      var texture1 = textureLoader.load( 'models/edificios/texturas/BuildingsHighRise0362_1_S.jpg' );
      //Cara superior
      var texture2 = textureLoader.load( 'models/edificios/texturas/ConcreteNew0013_Bump.jpg' );
      //Cara inferior
      var texture3 = textureLoader.load( 'models/edificios/texturas/BuildingsHighRise0362_1_S.jpg' );
      //Cara delantera
      var texture4 = textureLoader.load( 'models/edificios/texturas/BuildingsHighRise0362_1_S.jpg' );
      //Cara trasera
      var texture5 = textureLoader.load( 'models/edificios/texturas/BuildingsHighRise0362_1_S.jpg' );
      
      var materials = [
          new THREE.MeshLambertMaterial( { map: texture0 } ),
          new THREE.MeshLambertMaterial( { map: texture1 } ),
          new THREE.MeshLambertMaterial( { map: texture2 } ),
          new THREE.MeshLambertMaterial( { map: texture3 } ),
          new THREE.MeshLambertMaterial( { map: texture4 } ),
          new THREE.MeshLambertMaterial( { map: texture5 } )
      ];

      var bodyMaterial = new THREE.MeshFaceMaterial( materials );

      var building = new THREE.Mesh (new THREE.BoxGeometry (90, 220, 90), bodyMaterial);
      building.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (-200, 110, -145));
      modelko.add( building );  


      //EDIF 6


      var textureLoader = new THREE.TextureLoader();   
      //Cara izq
      var texture0 = textureLoader.load( 'models/edificios/texturas/HighRiseTowerblocks0046_2_S.jpg' );
      //Cara der
      var texture1 = textureLoader.load( 'models/edificios/texturas/HighRiseTowerblocks0046_2_S.jpg' );
      //Cara superior
      var texture2 = textureLoader.load( 'models/edificios/texturas/ConcreteNew0013_Bump.jpg' );
      //Cara inferior
      var texture3 = textureLoader.load( 'models/edificios/texturas/HighRiseTowerblocks0046_2_S.jpg' );
      //Cara delantera
      var texture4 = textureLoader.load( 'models/edificios/texturas/HighRiseTowerblocks0046_2_S.jpg' );
      //Cara trasera
      var texture5 = textureLoader.load( 'models/edificios/texturas/HighRiseTowerblocks0046_2_S.jpg' );
      
      var materials = [
          new THREE.MeshLambertMaterial( { map: texture0 } ),
          new THREE.MeshLambertMaterial( { map: texture1 } ),
          new THREE.MeshLambertMaterial( { map: texture2 } ),
          new THREE.MeshLambertMaterial( { map: texture3 } ),
          new THREE.MeshLambertMaterial( { map: texture4 } ),
          new THREE.MeshLambertMaterial( { map: texture5 } )
      ];

      var bodyMaterial = new THREE.MeshFaceMaterial( materials );

      var building = new THREE.Mesh (new THREE.BoxGeometry (80, 60, 80), bodyMaterial);
      building.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (-300, 30, -145));
      modelko.add( building );  


      //EDIF 7


      var textureLoader = new THREE.TextureLoader();   
      //Cara izq
      var texture0 = textureLoader.load( 'models/edificios/texturas/BuildingsHighRise0318_1_S.jpg' );
      //Cara der
      var texture1 = textureLoader.load( 'models/edificios/texturas/BuildingsHighRise0318_1_S.jpg' );
      //Cara superior
      var texture2 = textureLoader.load( 'models/edificios/texturas/ConcreteNew0013_Bump.jpg' );
      //Cara inferior
      var texture3 = textureLoader.load( 'models/edificios/texturas/BuildingsHighRise0318_1_S.jpg' );
      //Cara delantera
      var texture4 = textureLoader.load( 'models/edificios/texturas/BuildingsHighRise0318_1_S.jpg' );
      //Cara trasera
      var texture5 = textureLoader.load( 'models/edificios/texturas/BuildingsHighRise0318_1_S.jpg' );
      
      var materials = [
          new THREE.MeshLambertMaterial( { map: texture0 } ),
          new THREE.MeshLambertMaterial( { map: texture1 } ),
          new THREE.MeshLambertMaterial( { map: texture2 } ),
          new THREE.MeshLambertMaterial( { map: texture3 } ),
          new THREE.MeshLambertMaterial( { map: texture4 } ),
          new THREE.MeshLambertMaterial( { map: texture5 } )
      ];

      var bodyMaterial = new THREE.MeshFaceMaterial( materials );

      var building = new THREE.Mesh (new THREE.BoxGeometry (80, 120, 80), bodyMaterial);
      building.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (-190, 60, 145));
      modelko.add( building );  



      //EDIF 8


      var textureLoader = new THREE.TextureLoader();   
      //Cara izq
      var texture0 = textureLoader.load( 'models/edificios/texturas/HighRiseTowerblocks0044_2_S.jpg' );
      //Cara der
      var texture1 = textureLoader.load( 'models/edificios/texturas/HighRiseTowerblocks0044_2_S.jpg' );
      //Cara superior
      var texture2 = textureLoader.load( 'models/edificios/texturas/ConcreteNew0013_Bump.jpg' );
      //Cara inferior
      var texture3 = textureLoader.load( 'models/edificios/texturas/HighRiseTowerblocks0044_2_S.jpg' );
      //Cara delantera
      var texture4 = textureLoader.load( 'models/edificios/texturas/HighRiseTowerblocks0044_2_S.jpg' );
      //Cara trasera
      var texture5 = textureLoader.load( 'models/edificios/texturas/HighRiseTowerblocks0044_2_S.jpg' );
      
      var materials = [
          new THREE.MeshLambertMaterial( { map: texture0 } ),
          new THREE.MeshLambertMaterial( { map: texture1 } ),
          new THREE.MeshLambertMaterial( { map: texture2 } ),
          new THREE.MeshLambertMaterial( { map: texture3 } ),
          new THREE.MeshLambertMaterial( { map: texture4 } ),
          new THREE.MeshLambertMaterial( { map: texture5 } )
      ];

      var bodyMaterial = new THREE.MeshFaceMaterial( materials );

      var building = new THREE.Mesh (new THREE.BoxGeometry (130, 60, 80), bodyMaterial);
      building.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (-300, 30, 145));
      modelko.add( building );  



      //EDIF 9


      var textureLoader = new THREE.TextureLoader();   
      //Cara izq
      var texture0 = textureLoader.load( 'models/edificios/texturas/HighRiseTowerblocks0044_2_S.jpg' );
      //Cara der
      var texture1 = textureLoader.load( 'models/edificios/texturas/HighRiseTowerblocks0044_2_S.jpg' );
      //Cara superior
      var texture2 = textureLoader.load( 'models/edificios/texturas/ConcreteNew0013_Bump.jpg' );
      //Cara inferior
      var texture3 = textureLoader.load( 'models/edificios/texturas/HighRiseTowerblocks0044_2_S.jpg' );
      //Cara delantera
      var texture4 = textureLoader.load( 'models/edificios/texturas/HighRiseTowerblocks0044_2_S.jpg' );
      //Cara trasera
      var texture5 = textureLoader.load( 'models/edificios/texturas/HighRiseTowerblocks0044_2_S.jpg' );
      
      var materials = [
          new THREE.MeshLambertMaterial( { map: texture0 } ),
          new THREE.MeshLambertMaterial( { map: texture1 } ),
          new THREE.MeshLambertMaterial( { map: texture2 } ),
          new THREE.MeshLambertMaterial( { map: texture3 } ),
          new THREE.MeshLambertMaterial( { map: texture4 } ),
          new THREE.MeshLambertMaterial( { map: texture5 } )
      ];

      var bodyMaterial = new THREE.MeshFaceMaterial( materials );

      var building = new THREE.Mesh (new THREE.BoxGeometry (45, 80, 80), bodyMaterial);
      building.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (125, 40, 220));
      modelko.add( building );  


      //EDIF 10

      var textureLoader = new THREE.TextureLoader();   
      //Cara izq
      var texture0 = textureLoader.load( 'models/edificios/texturas/BuildingsHighRise0319_1_S.jpg' );
      //Cara der
      var texture1 = textureLoader.load( 'models/edificios/texturas/BuildingsHighRise0319_1_S.jpg' );
      //Cara superior
      var texture2 = textureLoader.load( 'models/edificios/texturas/ConcreteNew0013_Bump.jpg' );
      //Cara inferior
      var texture3 = textureLoader.load( 'models/edificios/texturas/BuildingsHighRise0319_1_S.jpg' );
      //Cara delantera
      var texture4 = textureLoader.load( 'models/edificios/texturas/BuildingsHighRise0319_1_S.jpg' );
      //Cara trasera
      var texture5 = textureLoader.load( 'models/edificios/texturas/BuildingsHighRise0319_1_S.jpg' );
      
      var materials = [
          new THREE.MeshLambertMaterial( { map: texture0 } ),
          new THREE.MeshLambertMaterial( { map: texture1 } ),
          new THREE.MeshLambertMaterial( { map: texture2 } ),
          new THREE.MeshLambertMaterial( { map: texture3 } ),
          new THREE.MeshLambertMaterial( { map: texture4 } ),
          new THREE.MeshLambertMaterial( { map: texture5 } )
      ];

      var bodyMaterial = new THREE.MeshFaceMaterial( materials );

      var building = new THREE.Mesh (new THREE.BoxGeometry (80, 100, 80), bodyMaterial);
      building.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (140, 50, 300));
      modelko.add( building );  


      //EDIF 11


      var textureLoader = new THREE.TextureLoader();   
      //Cara izq
      var texture0 = textureLoader.load( 'models/edificios/texturas/HighRiseTowerblocks0007_7_S.jpg' );
      //Cara der
      var texture1 = textureLoader.load( 'models/edificios/texturas/HighRiseTowerblocks0007_7_S.jpg' );
      //Cara superior
      var texture2 = textureLoader.load( 'models/edificios/texturas/ConcreteNew0013_Bump.jpg' );
      //Cara inferior
      var texture3 = textureLoader.load( 'models/edificios/texturas/HighRiseTowerblocks0007_7_S.jpg' );
      //Cara delantera
      var texture4 = textureLoader.load( 'models/edificios/texturas/HighRiseTowerblocks0007_7_S.jpg' );
      //Cara trasera
      var texture5 = textureLoader.load( 'models/edificios/texturas/HighRiseTowerblocks0007_7_S.jpg' );
      
      var materials = [
          new THREE.MeshLambertMaterial( { map: texture0 } ),
          new THREE.MeshLambertMaterial( { map: texture1 } ),
          new THREE.MeshLambertMaterial( { map: texture2 } ),
          new THREE.MeshLambertMaterial( { map: texture3 } ),
          new THREE.MeshLambertMaterial( { map: texture4 } ),
          new THREE.MeshLambertMaterial( { map: texture5 } )
      ];

      var bodyMaterial = new THREE.MeshFaceMaterial( materials );

      var building = new THREE.Mesh (new THREE.BoxGeometry (90, 220, 90), bodyMaterial);
      building.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (-145, 110, 300));
      modelko.add( building );





      //EDIF 12


      var textureLoader = new THREE.TextureLoader();   
      //Cara izq
      var texture0 = textureLoader.load( 'models/edificios/texturas/BuildingsHighRise0401_1_S.jpg' );
      //Cara der
      var texture1 = textureLoader.load( 'models/edificios/texturas/BuildingsHighRise0401_1_S.jpg' );
      //Cara superior
      var texture2 = textureLoader.load( 'models/edificios/texturas/ConcreteNew0013_Bump.jpg' );
      //Cara inferior
      var texture3 = textureLoader.load( 'models/edificios/texturas/BuildingsHighRise0401_1_S.jpg' );
      //Cara delantera
      var texture4 = textureLoader.load( 'models/edificios/texturas/BuildingsHighRise0401_1_S.jpg' );
      //Cara trasera
      var texture5 = textureLoader.load( 'models/edificios/texturas/BuildingsHighRise0401_1_S.jpg' );
      
      var materials = [
          new THREE.MeshLambertMaterial( { map: texture0 } ),
          new THREE.MeshLambertMaterial( { map: texture1 } ),
          new THREE.MeshLambertMaterial( { map: texture2 } ),
          new THREE.MeshLambertMaterial( { map: texture3 } ),
          new THREE.MeshLambertMaterial( { map: texture4 } ),
          new THREE.MeshLambertMaterial( { map: texture5 } )
      ];

      var bodyMaterial = new THREE.MeshFaceMaterial( materials );

      var building = new THREE.Mesh (new THREE.BoxGeometry (90, 150, 70), bodyMaterial);
      building.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (-145, 75, 210));
      modelko.add( building );


      //EDIF 13


      var textureLoader = new THREE.TextureLoader();   
      //Cara izq
      var texture0 = textureLoader.load( 'models/edificios/texturas/HighRiseTowerblocks0044_2_S.jpg' );
      //Cara der
      var texture1 = textureLoader.load( 'models/edificios/texturas/HighRiseTowerblocks0044_2_S.jpg' );
      //Cara superior
      var texture2 = textureLoader.load( 'models/edificios/texturas/ConcreteNew0013_Bump.jpg' );
      //Cara inferior
      var texture3 = textureLoader.load( 'models/edificios/texturas/HighRiseTowerblocks0044_2_S.jpg' );
      //Cara delantera
      var texture4 = textureLoader.load( 'models/edificios/texturas/HighRiseTowerblocks0044_2_S.jpg' );
      //Cara trasera
      var texture5 = textureLoader.load( 'models/edificios/texturas/HighRiseTowerblocks0044_2_S.jpg' );
      
      var materials = [
          new THREE.MeshLambertMaterial( { map: texture0 } ),
          new THREE.MeshLambertMaterial( { map: texture1 } ),
          new THREE.MeshLambertMaterial( { map: texture2 } ),
          new THREE.MeshLambertMaterial( { map: texture3 } ),
          new THREE.MeshLambertMaterial( { map: texture4 } ),
          new THREE.MeshLambertMaterial( { map: texture5 } )
      ];

      var bodyMaterial = new THREE.MeshFaceMaterial( materials );

      var building = new THREE.Mesh (new THREE.BoxGeometry (100, 90, 150), bodyMaterial);
      building.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (-145, 45, -280));
      modelko.add( building );


      //EDIF 14


      var textureLoader = new THREE.TextureLoader();   
      //Cara izq
      var texture0 = textureLoader.load( 'models/edificios/texturas/BuildingsHighRise0362_1_S.jpg' );
      //Cara der
      var texture1 = textureLoader.load( 'models/edificios/texturas/BuildingsHighRise0362_1_S.jpg' );
      //Cara superior
      var texture2 = textureLoader.load( 'models/edificios/texturas/ConcreteNew0013_Bump.jpg' );
      //Cara inferior
      var texture3 = textureLoader.load( 'models/edificios/texturas/BuildingsHighRise0362_1_S.jpg' );
      //Cara delantera
      var texture4 = textureLoader.load( 'models/edificios/texturas/BuildingsHighRise0362_1_S.jpg' );
      //Cara trasera
      var texture5 = textureLoader.load( 'models/edificios/texturas/BuildingsHighRise0362_1_S.jpg' );
      
      var materials = [
          new THREE.MeshLambertMaterial( { map: texture0 } ),
          new THREE.MeshLambertMaterial( { map: texture1 } ),
          new THREE.MeshLambertMaterial( { map: texture2 } ),
          new THREE.MeshLambertMaterial( { map: texture3 } ),
          new THREE.MeshLambertMaterial( { map: texture4 } ),
          new THREE.MeshLambertMaterial( { map: texture5 } )
      ];

      var bodyMaterial = new THREE.MeshFaceMaterial( materials );

      var building = new THREE.Mesh (new THREE.BoxGeometry (100, 120, 150), bodyMaterial);
      building.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (150, 60, -280));
      modelko.add( building );








/*
  

    


    var mtlLoader2 = new THREE.MTLLoader();

    mtlLoader2.setBaseUrl( 'models/edificios/Big_Old_House/' );
    mtlLoader2.setPath( 'models/edificios/Big_Old_House/' );
    var url = "Big_Old_House.mtl";
    mtlLoader2.load( url, function( materials ) {

          materials.preload();

          var objLoader2 = new THREE.OBJLoader();
          objLoader2.setMaterials( materials );
          objLoader2.setPath( 'models/edificios/Big_Old_House/' );
          objLoader2.load( 'Big_Old_House.obj', function ( object ) {
            object.scale.set(15,15,15);
            object.position.x = 200;
            object.position.y = 0;
            object.position.z = -130;
            //object.rotateY(22);

            modelko.add( object );

        });

    });



    var mtlLoader2 = new THREE.MTLLoader();

    mtlLoader2.setBaseUrl( 'models/edificios/Big_Old_House/' );
    mtlLoader2.setPath( 'models/edificios/Big_Old_House/' );
    var url = "Big_Old_House.mtl";
    mtlLoader2.load( url, function( materials ) {

          materials.preload();

          var objLoader2 = new THREE.OBJLoader();
          objLoader2.setMaterials( materials );
          objLoader2.setPath( 'models/edificios/Big_Old_House/' );
          objLoader2.load( 'Big_Old_House.obj', function ( object ) {
            object.scale.set(15,15,15);
            object.position.x = 300;
            object.position.y = 0;
            object.position.z = -130;
            //object.rotateY(22);

            modelko.add( object );

        });

    });



    var mtlLoader2 = new THREE.MTLLoader();

    mtlLoader2.setBaseUrl( 'models/edificios/Big_Old_House/' );
    mtlLoader2.setPath( 'models/edificios/Big_Old_House/' );
    var url = "Big_Old_House.mtl";
    mtlLoader2.load( url, function( materials ) {

          materials.preload();

          var objLoader2 = new THREE.OBJLoader();
          objLoader2.setMaterials( materials );
          objLoader2.setPath( 'models/edificios/Big_Old_House/' );
          objLoader2.load( 'Big_Old_House.obj', function ( object ) {
            object.scale.set(15,15,15);
            object.position.x = -300;
            object.position.y = 0;
            object.position.z = 130;
            object.rotateY(22);

            modelko.add( object );

        });

    });




    var mtlLoader2 = new THREE.MTLLoader();

    mtlLoader2.setBaseUrl( 'models/edificios/Big_Old_House/' );
    mtlLoader2.setPath( 'models/edificios/Big_Old_House/' );
    var url = "Big_Old_House.mtl";
    mtlLoader2.load( url, function( materials ) {

          materials.preload();

          var objLoader2 = new THREE.OBJLoader();
          objLoader2.setMaterials( materials );
          objLoader2.setPath( 'models/edificios/Big_Old_House/' );
          objLoader2.load( 'Big_Old_House.obj', function ( object ) {
            object.scale.set(15,15,15);
            object.position.x = -200;
            object.position.y = 0;
            object.position.z = 130;
            object.rotateY(22);

            modelko.add( object );

        });

    });


    var mtlLoader2 = new THREE.MTLLoader();

    mtlLoader2.setBaseUrl( 'models/edificios/Big_Old_House/' );
    mtlLoader2.setPath( 'models/edificios/Big_Old_House/' );
    var url = "Big_Old_House.mtl";
    mtlLoader2.load( url, function( materials ) {

          materials.preload();

          var objLoader2 = new THREE.OBJLoader();
          objLoader2.setMaterials( materials );
          objLoader2.setPath( 'models/edificios/Big_Old_House/' );
          objLoader2.load( 'Big_Old_House.obj', function ( object ) {
            object.scale.set(15,15,15);
            object.position.x = -200;
            object.position.y = 0;
            object.position.z = -130;
            //object.rotateY(22);

            modelko.add( object );

        });

    });


    var mtlLoader2 = new THREE.MTLLoader();

    mtlLoader2.setBaseUrl( 'models/edificios/Big_Old_House/' );
    mtlLoader2.setPath( 'models/edificios/Big_Old_House/' );
    var url = "Big_Old_House.mtl";
    mtlLoader2.load( url, function( materials ) {

          materials.preload();

          var objLoader2 = new THREE.OBJLoader();
          objLoader2.setMaterials( materials );
          objLoader2.setPath( 'models/edificios/Big_Old_House/' );
          objLoader2.load( 'Big_Old_House.obj', function ( object ) {
            object.scale.set(15,15,15);
            object.position.x = -300;
            object.position.y = 0;
            object.position.z = -130;
            //object.rotateY(22);

            modelko.add( object );

        });

    });


    //LADOS IZQUIERDO Y DERECHO

    var mtlLoader2 = new THREE.MTLLoader();

    mtlLoader2.setBaseUrl( 'models/edificios/Big_Old_House/' );
    mtlLoader2.setPath( 'models/edificios/Big_Old_House/' );
    var url = "Big_Old_House.mtl";
    mtlLoader2.load( url, function( materials ) {

          materials.preload();

          var objLoader2 = new THREE.OBJLoader();
          objLoader2.setMaterials( materials );
          objLoader2.setPath( 'models/edificios/Big_Old_House/' );
          objLoader2.load( 'Big_Old_House.obj', function ( object ) {
            object.scale.set(15,15,15);
            object.position.x = 130;
            object.position.y = 0;
            object.position.z = 320;
            object.rotateY(11);

            modelko.add( object );

        });

    });


    //LADOS IZQUIERDO Y DERECHO

    var mtlLoader2 = new THREE.MTLLoader();

    mtlLoader2.setBaseUrl( 'models/edificios/Big_Old_House/' );
    mtlLoader2.setPath( 'models/edificios/Big_Old_House/' );
    var url = "Big_Old_House.mtl";
    mtlLoader2.load( url, function( materials ) {

          materials.preload();

          var objLoader2 = new THREE.OBJLoader();
          objLoader2.setMaterials( materials );
          objLoader2.setPath( 'models/edificios/Big_Old_House/' );
          objLoader2.load( 'Big_Old_House.obj', function ( object ) {
            object.scale.set(15,15,15);
            object.position.x = 130;
            object.position.y = 0;
            object.position.z = 220;
            object.rotateY(11);

            modelko.add( object );

        });

    });


    var mtlLoader2 = new THREE.MTLLoader();

    mtlLoader2.setBaseUrl( 'models/edificios/Big_Old_House/' );
    mtlLoader2.setPath( 'models/edificios/Big_Old_House/' );
    var url = "Big_Old_House.mtl";
    mtlLoader2.load( url, function( materials ) {

          materials.preload();

          var objLoader2 = new THREE.OBJLoader();
          objLoader2.setMaterials( materials );
          objLoader2.setPath( 'models/edificios/Big_Old_House/' );
          objLoader2.load( 'Big_Old_House.obj', function ( object ) {
            object.scale.set(15,15,15);
            object.position.x = -130;
            object.position.y = 0;
            object.position.z = 220;
            object.rotateY(14.1);

            modelko.add( object );

        });

    });


    var mtlLoader2 = new THREE.MTLLoader();

    mtlLoader2.setBaseUrl( 'models/edificios/Big_Old_House/' );
    mtlLoader2.setPath( 'models/edificios/Big_Old_House/' );
    var url = "Big_Old_House.mtl";
    mtlLoader2.load( url, function( materials ) {

          materials.preload();

          var objLoader2 = new THREE.OBJLoader();
          objLoader2.setMaterials( materials );
          objLoader2.setPath( 'models/edificios/Big_Old_House/' );
          objLoader2.load( 'Big_Old_House.obj', function ( object ) {
            object.scale.set(15,15,15);
            object.position.x = -130;
            object.position.y = 0;
            object.position.z = 320;
            object.rotateY(14.1);

            modelko.add( object );

        });

    });

    var mtlLoader2 = new THREE.MTLLoader();

    mtlLoader2.setBaseUrl( 'models/edificios/Big_Old_House/' );
    mtlLoader2.setPath( 'models/edificios/Big_Old_House/' );
    var url = "Big_Old_House.mtl";
    mtlLoader2.load( url, function( materials ) {

          materials.preload();

          var objLoader2 = new THREE.OBJLoader();
          objLoader2.setMaterials( materials );
          objLoader2.setPath( 'models/edificios/Big_Old_House/' );
          objLoader2.load( 'Big_Old_House.obj', function ( object ) {
            object.scale.set(15,15,15);
            object.position.x = -130;
            object.position.y = 0;
            object.position.z = -320;
            object.rotateY(14.1);

            modelko.add( object );

        });

    });

    var mtlLoader2 = new THREE.MTLLoader();

    mtlLoader2.setBaseUrl( 'models/edificios/Big_Old_House/' );
    mtlLoader2.setPath( 'models/edificios/Big_Old_House/' );
    var url = "Big_Old_House.mtl";
    mtlLoader2.load( url, function( materials ) {

          materials.preload();

          var objLoader2 = new THREE.OBJLoader();
          objLoader2.setMaterials( materials );
          objLoader2.setPath( 'models/edificios/Big_Old_House/' );
          objLoader2.load( 'Big_Old_House.obj', function ( object ) {
            object.scale.set(15,15,15);
            object.position.x = -130;
            object.position.y = 0;
            object.position.z = -220;
            object.rotateY(14.1);

            modelko.add( object );

        });

    });


    var mtlLoader2 = new THREE.MTLLoader();

    mtlLoader2.setBaseUrl( 'models/edificios/Big_Old_House/' );
    mtlLoader2.setPath( 'models/edificios/Big_Old_House/' );
    var url = "Big_Old_House.mtl";
    mtlLoader2.load( url, function( materials ) {

          materials.preload();

          var objLoader2 = new THREE.OBJLoader();
          objLoader2.setMaterials( materials );
          objLoader2.setPath( 'models/edificios/Big_Old_House/' );
          objLoader2.load( 'Big_Old_House.obj', function ( object ) {
            object.scale.set(15,15,15);
            object.position.x = 130;
            object.position.y = 0;
            object.position.z = -220;
            object.rotateY(11);

            modelko.add( object );

        });

    });

    var mtlLoader2 = new THREE.MTLLoader();

    mtlLoader2.setBaseUrl( 'models/edificios/Big_Old_House/' );
    mtlLoader2.setPath( 'models/edificios/Big_Old_House/' );
    var url = "Big_Old_House.mtl";
    mtlLoader2.load( url, function( materials ) {

          materials.preload();

          var objLoader2 = new THREE.OBJLoader();
          objLoader2.setMaterials( materials );
          objLoader2.setPath( 'models/edificios/Big_Old_House/' );
          objLoader2.load( 'Big_Old_House.obj', function ( object ) {
            object.scale.set(15,15,15);
            object.position.x = 130;
            object.position.y = 0;
            object.position.z = -320;
            object.rotateY(11);

            modelko.add( object );

        });

    });

*/

      return modelko;
    }







}
