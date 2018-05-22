
/// The Ground class
/**
 * @author FVelasco
 * 
 * @param aWidth - The width of the ground
 * @param aDeep - The deep of the ground
 * @param aMaterial - The material of the ground
 * @param aBoxSize - The size for the boxes
 */

class Ground extends THREE.Object3D {

  constructor (aWidth, aDeep, aMaterial, aBoxSize) {
    super();
    
    this.width = aWidth;
    this.deep = aDeep;
    this.material = aMaterial;
    this.boxSize = aBoxSize;
    
    this.ground = null;

    this.raycaster = new THREE.Raycaster ();  // To select boxes
    this.barricades = new THREE.Object3D();
    this.barricades_array = [];
    this.add(this.barricades);

    this.ground = new THREE.Mesh (new THREE.BoxGeometry (this.width, 10, this.deep, 1, 1, 1),this.material);
    var loader2 = new THREE.TextureLoader();
    var texturaCalle = loader2.load ("imgs/street.jpg");
    this.calle1 = new THREE.Mesh (new THREE.BoxGeometry (200, 10, 600, 1, 1, 1),new THREE.MeshPhongMaterial ({map: texturaCalle}));
    this.calle1.position.set(0, 0, 450);
    this.calle1.receiveShadow = true;
    this.calle1.autoUpdateMatrix = false;
    this.ground.add(this.calle1);

      //Calle der
    this.groundCalle2 = new THREE.Mesh (new THREE.BoxGeometry (200, 10, 600, 1, 1, 1),new THREE.MeshPhongMaterial ({map: texturaCalle}));
    this.groundCalle2.position.set(0, 0, -450);
    this.groundCalle2.receiveShadow = true;
    this.groundCalle2.autoUpdateMatrix = false;
    this.ground.add (this.groundCalle2);

    var loader3 = new THREE.TextureLoader();
    var texturaCalleGirada = loader3.load ("imgs/street2.jpg");

    this.groundCalle3 = new THREE.Mesh (new THREE.BoxGeometry (600, 10, 200, 1, 1, 1),new THREE.MeshPhongMaterial ({map: texturaCalleGirada}));
    this.groundCalle3.position.set(450, 0, 0);
    this.groundCalle3.receiveShadow = true;
    this.groundCalle3.autoUpdateMatrix = false;
    this.ground.add (this.groundCalle3);

    //Calle Superior

    this.groundCalle4 = new THREE.Mesh (new THREE.BoxGeometry (600, 10, 200, 1, 1, 1),new THREE.MeshPhongMaterial ({map: texturaCalleGirada}));
    this.groundCalle4.position.set(-450, 0, 0);
    this.groundCalle4.receiveShadow = true;
    this.groundCalle4.autoUpdateMatrix = false;
     this.ground.add (this.groundCalle4);

    this.ground.applyMatrix (new THREE.Matrix4().makeTranslation (0,-0.1,0));
    this.ground.receiveShadow = true;
    this.ground.autoUpdateMatrix = false;
    this.add (this.ground);

  }
  

  
 /// Whether the boxes b1 and b2 intersect or not
  /**
   * @param b1 - A box to test
   * @param b2 - Other box to test
   * @return True if b1 and b2 intersect
   */
  intersectBarricade (b1, b2) {
    var vectorBetweenBoxes = new THREE.Vector2();
    vectorBetweenBoxes.subVectors (new THREE.Vector2 (b1.position.x, b1.position.z),
                                   new THREE.Vector2 (b2.position.x, b2.position.z));
    return (vectorBetweenBoxes.length() < this.boxSize);
  }
  
  /// It returns the position of the mouse in normalized coordinates ([-1,1],[-1,1])
  /**
   * @param event - Mouse information
   * @return A Vector2 with the normalized mouse position
   */
  getMouse (event) {
    var mouse = new THREE.Vector2 ();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = 1 - 2 * (event.clientY / window.innerHeight);
    return mouse;
  }
  
  /// It returns the point on the ground where the mouse has clicked
  /**
   * @param event - The mouse information
   * @return The Vector2 with the ground point clicked, or null
   */
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
  

  
  /// It adds a new box on the ground
  /**
   * @param event - Mouse information
   * @param action - Which action is going to be processed: start adding or finish.
   */
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
      }else if(action == TheScene.ROTATE_BOX) {
        if (this.box !== null) {
          this.box.rotation.y += (event.wheelDelta ? event.wheelDelta/20 : -event.detail);
        }
      }
    }
  }


    
  /// It moves or rotates a box on the ground
  /**
   * @param event - Mouse information
   * @param action - Which action is going to be processed: select a box, move it, rotate it or finish the action.
   */
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
