class Barricade extends THREE.Object3D {
  
  constructor (parameters) {
    super();
    
    this.material = null;
    this.health = 0;
    this.price = 100;
    this.damage = 0;
    //SESION 2 DATOS

  
    this.modelo = null;
    this.todo = new THREE.Mesh();
    this.modelo = this.crearBarricada();
    this.todo.add(this.modelo);
    //this.todo.add(this.bullet);
    this.add (this.todo);
    
  }



  crearBarricada(){

    var objTexture = new THREE.ImageUtils.loadTexture('models/Barrier/Maps/road_block.jpg');

    var modelko = new THREE.Object3D();
        var loader = new THREE.OBJLoader();
        this.distance = 200;
        this.damage = 20;
        this.reload_time = 40;
        loader.load('models/Barrier/roadblock_obj.obj',
        function(obj){
              obj.traverse( function ( child ) {

            if ( child instanceof THREE.Mesh ) {

            child.material.map = objTexture;
            }

            } );
        obj.position.x += 0;
        obj.position.y = 5;
        obj.position.z += 0;
        obj.scale.set(3,3,3);
        modelko.add(obj);
        
        });
     

      return modelko;
    }

}