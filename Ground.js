
class Ground extends THREE.Object3D {

  constructor (aWidth, aDeep, aMaterial, aBoxSize) {
    super();
    
    this.width = aWidth;
    this.deep = aDeep;
    this.material = aMaterial;
    this.boxSize = aBoxSize;
    
    this.ground = null;

    this.raycaster = new THREE.Raycaster ();  
    this.barricades = new THREE.Object3D();
    this.barricades_array = [];
    this.add(this.barricades);

    this.ground = new THREE.Mesh (new THREE.BoxGeometry (this.width, 10, this.deep, 1, 1, 1),this.material);
    
    var loader2 = new THREE.TextureLoader();
    var texturalado = loader2.load ("imgs/fborder.png");
    this.l1 = new THREE.Mesh (new THREE.BoxGeometry (50, 10, 50, 1, 1, 1),new THREE.MeshPhongMaterial ({map: texturalado}));
    this.l1.position.set(125, 0, 125);
    this.l1.receiveShadow = true;
    this.l1.autoUpdateMatrix = false;
    this.l2 = this.l1.clone();
    this.l3 = this.l1.clone();
    this.l4 = this.l1.clone();
    this.l2.position.set(125,0,-125);
    this.l3.position.set(-125,0,125);
    this.l4.position.set(-125,0,-125);
    this.ground.add(this.l1);
    this.ground.add(this.l2);
    this.ground.add(this.l3);
    this.ground.add(this.l4);


    var texturaCalle = loader2.load ("imgs/street.png");
    this.calle1 = new THREE.Mesh (new THREE.BoxGeometry (200, 10, 600, 1, 1, 1),new THREE.MeshPhongMaterial ({map: texturaCalle}));
    this.calle1.position.set(0, 0, 400);
    this.calle1.receiveShadow = true;
    this.calle1.autoUpdateMatrix = false;
    this.ground.add(this.calle1);

      //Calle der
    this.groundCalle2 = new THREE.Mesh (new THREE.BoxGeometry (200, 10, 600, 1, 1, 1),new THREE.MeshPhongMaterial ({map: texturaCalle}));
    this.groundCalle2.position.set(0, 0, -400);
    this.groundCalle2.receiveShadow = true;
    this.groundCalle2.autoUpdateMatrix = false;
    this.ground.add (this.groundCalle2);

    var loader3 = new THREE.TextureLoader();
    var texturaCalleGirada = loader3.load ("imgs/street2.jpg");

    this.groundCalle3 = new THREE.Mesh (new THREE.BoxGeometry (600, 10, 200, 1, 1, 1),new THREE.MeshPhongMaterial ({map: texturaCalleGirada}));
    this.groundCalle3.position.set(400, 0, 0);
    this.groundCalle3.receiveShadow = true;
    this.groundCalle3.autoUpdateMatrix = false;
    this.ground.add (this.groundCalle3);

    //Calle Superior

    this.groundCalle4 = new THREE.Mesh (new THREE.BoxGeometry (600, 10, 200, 1, 1, 1),new THREE.MeshPhongMaterial ({map: texturaCalleGirada}));
    this.groundCalle4.position.set(-400, 0, 0);
    this.groundCalle4.receiveShadow = true;
    this.groundCalle4.autoUpdateMatrix = false;
     this.ground.add (this.groundCalle4);

    this.ground.applyMatrix (new THREE.Matrix4().makeTranslation (0,-0.1,0));
    this.ground.receiveShadow = true;
    this.ground.autoUpdateMatrix = false;
    this.add (this.ground);

  }
  


  intersectBarricade (b1, b2) {
    var vectorBetweenBoxes = new THREE.Vector2();
    vectorBetweenBoxes.subVectors (new THREE.Vector2 (b1.position.x, b1.position.z),
                                   new THREE.Vector2 (b2.position.x, b2.position.z));
    return (vectorBetweenBoxes.length() < this.boxSize);
  }
  
  getMouse (event) {
    var mouse = new THREE.Vector2 ();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = 1 - 2 * (event.clientY / window.innerHeight);
    return mouse;
  }
  

  getPointOnGround (event) {
    var mouse = this.getMouse (event);
    this.raycaster.setFromCamera (mouse, scene.getCamera());
    var surfaces = [this.ground,this.calle1,this.groundCalle2,this.groundCalle3,this.groundCalle4];
    var pickedObjects = this.raycaster.intersectObjects (surfaces);
    if (pickedObjects.length > 0) {
      return new THREE.Vector2 (pickedObjects[0].point.x, pickedObjects[0].point.z);
    } else
      return null;
  }
  
  addBarricade (event, action) {
    if (action === TheScene.END_ACTION && this.box !== null) {
      this.box = null;
      return;
    }
    var pointOnGround = this.getPointOnGround (event);
    if (pointOnGround !== null) {
      if (action === TheScene.NEW_BOX) {
        this.box = new Barricade();
        this.box.position.x = pointOnGround.x;
        this.box.position.y = 0;
        this.box.position.z = pointOnGround.y;
        this.box.receiveShadow = true;
        this.box.castShadow = true;
        this.barricades.add (this.box);
        this.barricades_array.push(this.box);
        scene.character.money -= 50;
      }else if(action == TheScene.ROTATE_BOX) {
        if (this.box !== null) {
          this.box.rotation.y += (event.wheelDelta ? event.wheelDelta/20 : -event.detail);
        }
      }
    }
  }

  moveBarricade (event, action) {
    switch (action) {
      case TheScene.END_ACTION :
        if (this.box !== null) {
          this.box.material.transparent = false;
          this.box = null;
        }
        break;
        
      case TheScene.MOVE_BOX :
        var pointOnGround = this.getPointOnGround (event);
        if (pointOnGround !== null) {
          if (this.box !== null) {
            this.box.position.x = pointOnGround.x;
            this.box.position.z = pointOnGround.y;
          }
        }
        break;
          
      case TheScene.ROTATE_BOX :
        if (this.box !== null) {
          // Chrome and other use wheelDelta, Firefox uses detail
          this.box.rotation.y += (event.wheelDelta ? event.wheelDelta/20 : -event.detail);
        }
        break;
    }
  }
  
 


  
}
