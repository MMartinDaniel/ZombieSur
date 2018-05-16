class Building extends THREE.Object3D {
 constructor (parameters) {
    super();
    
    this.material = null;
    this.type = parameters.type;



  
    this.modelo = null;

    this.todo = new THREE.Mesh();
    this.modelo = this.crearEdificios();
    this.todo.add(this.modelo);

    this.add (this.todo);
    
  }

  crearEdificios(){
    var modelko = new THREE.Object3D();


    var mtlLoader = new THREE.MTLLoader();

    mtlLoader.setBaseUrl( 'models/edificios/Big_Old_House/' );
    mtlLoader.setPath( 'models/edificios/Big_Old_House/' );
    var url = "Big_Old_House.mtl";
    mtlLoader.load( url, function( materials ) {

          materials.preload();

          var objLoader = new THREE.OBJLoader();
          objLoader.setMaterials( materials );
          objLoader.setPath( 'models/edificios/Big_Old_House/' );
          objLoader.load( 'Big_Old_House.obj', function ( object ) {
            object.scale.set(15,15,15);
            object.position.x = 200;
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
            object.position.x = 300;
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



      return modelko;
    }







}
