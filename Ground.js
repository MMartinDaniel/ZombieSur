
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
    this.add(this.barricades);

    this.ground = new THREE.Mesh (
      new THREE.BoxGeometry (this.width, 10, this.deep, 1, 1, 1),
      this.material);
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
    var surfaces = [this.ground];
    var pickedObjects = this.raycaster.intersectObjects (surfaces);
    if (pickedObjects.length > 0) {
      return new THREE.Vector2 (pickedObjects[0].point.x, pickedObjects[0].point.z);
    } else
      return null;
  }
  
  /// It computes the height of the boxes so that some can be stacked on the others
  /**
   * @param k - From which box must be calculated
   */
  updateHeightBarricade (k) {
    for (var i = k; i < this.barricades.children.length; i++) {
      this.barricades.children[i].position.y = 0;
      for (var j = 0; j < i; j++) {
        if (this.intersectBarricade (this.barricades.children[j], this.barricades.children[i])) {
          this.barricades.children[i].position.y = this.barricades.children[j].position.y + 
            this.barricades.children[j].geometry.parameters.height;
        }
      }
    }
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
      /*
        this.box = new THREE.Mesh (
          new THREE.BoxGeometry (this.boxSize, this.boxSize, this.boxSize), 
          new THREE.MeshPhongMaterial ({color: Math.floor (Math.random()*16777215)}));
        */
                this.box = new Barricade();

        //this.box.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (0, 10, 0));
        this.box.position.x = pointOnGround.x;
        this.box.position.y = 0;
        this.box.position.z = pointOnGround.y;
        this.box.receiveShadow = true;
        this.box.castShadow = true;
        this.barricades.add (this.box);
        this.updateHeightBarricade(this.barricades.children.length-1); 
      }else if(action == TheScene.ROTATE_BOX) {
        if (this.box !== null) {
          // Chrome and other use wheelDelta, Firefox uses detail
          this.box.rotation.y += (event.wheelDelta ? event.wheelDelta/20 : -event.detail);
        }
      }
    }
  }

  /// It removes a box on the ground
  /**
   * @param event - Mouse information
   * @param action - Which action is going to be processed: start adding or finish.
   */
  removeBarricade (event, action) {
    if (action === TheScene.END_ACTION && this.box !== null) {
      this.box = null;
      return;
    }
    
    var pointOnGround = this.getPointOnGround (event);
    if (pointOnGround !== null) {
      if (action === TheScene.NEW_BOX) {
        this.box = new THREE.Mesh (
          new THREE.BoxGeometry (this.boxSize, this.boxSize, this.boxSize), 
          new THREE.MeshPhongMaterial ({color: Math.floor (Math.random()*16777215)}));
        this.box.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (0, this.boxSize/2, 0));
        this.box.position.x = pointOnGround.x;
        this.box.position.y = 0;
        this.box.position.z = pointOnGround.y;
        this.box.receiveShadow = true;
        this.box.castShadow = true;
        this.barricades.add (this.box);
        this.updateHeightBarricade(this.barricades.children.length-1);
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
            this.updateHeightBarricade(this.barricades.children.length-1);
          }
        }
        break;
        
      case TheScene.SELECT_BOX :
        var mouse = this.getMouse (event);
        this.raycaster.setFromCamera (mouse, scene.getCamera());
        var pickedObjects = this.raycaster.intersectObjects (this.barricades.children);
        if (pickedObjects.length > 0) {
          this.box = pickedObjects[0].object;
          this.box.material.transparent = true;
          this.box.material.opacity = 0.5;
          var indexOfBox = this.barricades.children.indexOf (this.box);
          this.barricades.remove (this.box);
          this.barricades.add (this.box);
          this.updateHeightBarricade(indexOfBox);
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
  
  /// The crane can take a box
  /**
   * @param position The position where the crane's hook is
   * @return The box to be taken, or null
   */
  takeBarricade (position) {
    if (this.barricades.children.length === 0) // There are no boxes
      return null;
    var minDistance = position.distanceToSquared (this.barricades.children[0].position);
    var nearestBox = 0;
    var distance = 0;
    for (var i = 1; i < this.barricades.children.length; i++) {
      distance = position.distanceToSquared (this.barricades.children[i].position);
      if (distance < minDistance) {
        minDistance = distance;
        nearestBox = i;
      }
    }
    if (minDistance < this.boxSize*this.boxSize) {
      var boxCrane = this.barricades.children[nearestBox];
      this.barricades.remove (boxCrane);
      this.updateHeightBarricade(nearestBox);
      return boxCrane;
    }
    return null;
  }
  
  /// The crane has dropped a box
  /**
   * @param aBox - The dropped box
   */
  dropBarricade (aBox) {
    this.barricades.add (aBox);
    this.updateHeightBarricade(this.barricades.children.length-1);
  }
  


  
}
