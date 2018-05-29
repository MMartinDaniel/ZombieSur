class Barricade extends THREE.Object3D {
  
  constructor (parameters) {
    super();
    
    this.material = null;
    this.health = 50;
    this.price = 100;
    this.modelo = null;
    this.todo = new THREE.Mesh();
    this.modelo = this.crearBarricada();
    this.todo.add(this.modelo);
    this.add (this.todo);
    
  }

  isDamaged(){
    this.health -= 0.1;
   // console.log("health" + this.health);
    if(this.health <= 0){
        return true;
    }
    return false;
  }

  crearBarricada(){

    var objTexture = new THREE.ImageUtils.loadTexture('models/Barrier/Maps/road_block.jpg');

    var modelko = new THREE.Object3D();
        var loader = new THREE.OBJLoader();
        loader.load('models/Barrier/roadblock_obj.obj',
        function(obj){
              obj.traverse( function ( child ) {

            if ( child instanceof THREE.Mesh ) {

            child.material.map = objTexture;
            child.castShadow = true;
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