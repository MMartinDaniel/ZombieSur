class Bullet extends THREE.Object3D {
  
  constructor (parameters) {
    super();
    
    this.material = null;
    this.damage           = 0;
    this.distance        = 0;
    this.bullets          = 0;
    this.max_bullets = 0;
    this.reload_time = 0;
    this.price = 100;
    this.type = parameters.type;


    this.todo = new THREE.Mesh();
    this.modelo = this.crearBullet();
    this.todo.add(this.modelo);

    this.add (this.todo);
    
  }

  crearBullet(){
    var geometry = new THREE.CylinderGeometry( 0.375, 0.375, 1.5 );
    var body = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0xD4AF37 } ) );
    body.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (6.8, 15, -4.5));


    var geometryhead = new THREE.CylinderGeometry( 0.225, 0.375, 0.3 );
    var head = new THREE.Mesh( geometryhead, new THREE.MeshLambertMaterial( { color: 0xD4AF37 } ) );
    head.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (6.8, 15.9, -4.5));
    body.add(head);
    body.rotation.x = Math.PI;
    body.autoUpdateMatrix = false;

    body.updateMatrix();

    return body;
  }
}
