
/// Several functions, including the main

/// The scene graph
scene = null;

/// The GUI information
GUIcontrols = null;

/// The object for the statistics
stats = null;

/// A boolean to know if the left button of the mouse is down
mouseDown = false;


  _pause = false;


/// The current mode of the application
applicationMode = TheScene.NO_ACTION;

/// It creates the GUI and, optionally, adds statistic information
/**
 * @param withStats - A boolean to show the statictics or not
 */
function createGUI (withStats) {
  GUIcontrols = new function() {
    this.axis = true;
    this.lightIntensity = 0.5;
    this.addedLightIntensity = 0.2;
    this.rotation = 0;
    this.distance = 0;
    this.height   = 1;
    this.footRotation = 0;
    this.takeBox  = false;
    
    this.addBarricade  = function () {
      applicationMode = TheScene.ADDING_BOXES;
    };
    this.moveBarricade  = function () {
      applicationMode = TheScene.MOVING_BOXES;
    };
   
  }
 


  var gui = new dat.GUI();

  var axisLights = gui.addFolder ('Axis and Lights');
    axisLights.add(GUIcontrols, 'axis').name('Axis on/off :');
    axisLights.add(GUIcontrols, 'addedLightIntensity').name('Second Light intensity :');

  
  var r2d2Controls = gui.addFolder ('r2d2 Controls');
    r2d2Controls.add (GUIcontrols, 'rotation', -80, 80, 1).name('Rotación Cabeza').listen();
    r2d2Controls.add (GUIcontrols, 'distance', -45, 30, 1).name('Rotar Cuerpo').listen();
    r2d2Controls.add (GUIcontrols, 'height', 1, 1.2, 0.01).name('Altura piernas').listen();
    r2d2Controls.add (GUIcontrols, 'footRotation', -45, 30, 1).name('Rotar piernas').listen();
    // The method  listen()  allows the height attribute to be written, not only read
  
  if (withStats)
    stats = initStats();
}

/// It adds statistics information to a previously created Div
/**
 * @return The statistics object
 */
function initStats() {
  
  var stats = new Stats();
  
  stats.setMode(0); // 0: fps, 1: ms
  
  // Align top-left
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';
  
  $("#Stats-output").append( stats.domElement );
  
  return stats;
}

/// It shows a feed-back message for the user
/**
 * @param str - The message
 */
function setMessage (str) {
  document.getElementById ("Messages").innerHTML = "<h2>"+str+"</h2>";
}

/// It processes the clic-down of the mouse
/**
 * @param event - Mouse information
 */
function onMouseDown (event) {
  if (event.ctrlKey) {
    // The Trackballcontrol only works if Ctrl key is pressed
    scene.getCameraControls().enabled = true;
  } else {  
    scene.getCameraControls().enabled = false;
    if (event.button === 0) {   // Left button
      mouseDown = true;
      switch (applicationMode) {
        case TheScene.ADDING_BOXES :
          scene.addBarricade (event, TheScene.NEW_BOX);
          break;
        case TheScene.MOVING_BOXES :
          scene.moveBarricade (event, TheScene.SELECT_BOX);
          break;
        default :
          applicationMode = TheScene.NO_ACTION;
          break;
      }
    } else {
   //   setMessage ("");
      applicationMode = TheScene.NO_ACTION;
    }
  }
}

/// It processes the drag of the mouse
/**
 * @param event - Mouse information
 */
function onMouseMove (event) {
  if (mouseDown) {
    switch (applicationMode) {
      case TheScene.ADDING_BOXES :
      case TheScene.MOVING_BOXES :
        scene.moveBarricade (event, TheScene.MOVE_BOX);
        break;
      default :
        applicationMode = TheScene.NO_ACTION;
        break;
    }
  }
}

 function addBarr(){
    if(scene.character.money >= 50){
        applicationMode = TheScene.ADDING_BOXES;
    }

}
/// It processes the clic-up of the mouse
/**
 * @param event - Mouse information
 */
function onMouseUp (event) {
  if (mouseDown) {
    switch (applicationMode) {
      case TheScene.ADDING_BOXES :
        scene.addBarricade (event, TheScene.END_ACTION);
        break;
      case TheScene.MOVING_BOXES :
        scene.moveBarricade (event, TheScene.END_ACTION);
        break;
      default :
        applicationMode = TheScene.NO_ACTION;
        break;
    }
    mouseDown = false;
  }
    applicationMode = TheScene.NO_ACTION;
}

/// It processes the wheel rolling of the mouse
/**
 * @param event - Mouse information
 */
function onMouseWheel (event) {
  if (event.ctrlKey) {
    // The Trackballcontrol only works if Ctrl key is pressed
    scene.getCameraControls().enabled = true;
  } else {  
    scene.getCameraControls().enabled = false;
    if (mouseDown) {
      switch (applicationMode) {
        case TheScene.MOVING_BOXES :
          scene.moveBarricade (event, TheScene.ROTATE_BOX);
          break;
        case TheScene.ADDING_BOXES :
          scene.addBarricade(event, TheScene.ROTATE_BOX);
          break;
      }
    }
  }
}

/// It processes the window size changes
function onWindowResize () {
  scene.setCameraAspect (window.innerWidth / window.innerHeight);
  renderer.setSize (window.innerWidth, window.innerHeight);
}

/// It creates and configures the WebGL renderer
/**
 * @return The renderer
 */
function createRenderer () {

 // var renderer = new THREE.WebGLRenderer();
  var renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setClearColor(new THREE.Color(0x000000), 1.0);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  return renderer;  
}

/// It renders every frame
function render() {

  requestAnimationFrame(render);
    stats.update();


   scene.getCameraControls().update ();
   scene.animate(GUIcontrols);
   renderer.render(scene, scene.getCamera());

}

function onKeyDown(){
  if(event.repeat){return;}

  if(event.key == 'w' || event.key == 'W' || event.key == "ArrowUp" ){
    scene.makeMove({move:'up'});
  }else if( event.key == 'a' || event.key == 'A' || event.key == "ArrowLeft" ){
    scene.makeMove({move:'left'}); 

  }else if( event.key == 'q' || event.key == '  Q' ){
    scene.rotateCamera({side:'izq'}); 
  }else if( event.key == 'e' || event.key == '  E' ){
    scene.rotateCamera({side:'der'}); 
  }else if( event.key == 's' || event.key == 'S' || event.key == "ArrowDown"){
   scene.makeMove({move:'down'}); 
  }else if( event.key == 'd' || event.key == 'D' || event.key == "ArrowRight"){
   scene.makeMove({move:'right'}); 
  }else if(event.key == 'v'){
      scene.checkCamera({cam:2});
  }else if (event.key == 'V'){
  scene.checkCamera({cam:1});
  }else if (event.key == ' '){
    this.pause();
  }else if (event.key == 'i'){
    scene.makeMove({move:'aim'});
  }else if(event.key == 'u'){
    scene.makeMove({move:'shoot'});
  }

  

}

function onKeyDownArrow(){
  if(event.repeat){return;}
  switch(event.key){
  case 'ArrowUp':
    scene.makeMove({move:'up'});
    break;
  case 'ArrowLeft':
    scene.makeMove({move:'left'}); 
  break;
  case 'ArrowDown':
   scene.makeMove({move:'down'}); 
  break;
  case 'ArrowRight':
   scene.makeMove({move:'right'}); 
  break;
  }

}

function stateChange(newState) {
    setTimeout(function () {
        if (newState == -1) {
           // alert('VIDEO HAS STOPPED');
        }
    }, 500);
}

function onKeyUp(){
  stateChange(-1);
  if(scene.character.walking){
     scene.character.walk_stop();
      scene.character.walking = false;
  }
}
window.onload = function() {
  var context = new AudioContext();
}


/// The main function
$(function () {
  // create a render and set the size
  renderer = createRenderer();
  // add the output of the renderer to the html element
  $("#WebGL-output").append(renderer.domElement);
  // liseners
  window.addEventListener ("resize", onWindowResize);
  window.addEventListener ("mousemove", onMouseMove, true);
  window.addEventListener ("mousedown", onMouseDown, true);
  window.addEventListener ("mouseup", onMouseUp, true);
  window.addEventListener ("mousewheel", onMouseWheel, true);   // For Chrome an others
  window.addEventListener ("DOMMouseScroll", onMouseWheel, true); // For Firefox
  window.addEventListener ('keyup', onKeyUp,false);
  window.addEventListener('keydown', onKeyDownArrow,false);
  window.addEventListener('keypress', onKeyDown,false);

 // window.addEventListener('keyup', onKeyUp,false);
  // create a scene, that will hold all our elements such as objects, cameras and lights.
  scene = new TheScene (renderer.domElement);
  scene.background = new THREE.Color(0x00000);
  scene.fog = new THREE.FogExp2( 0x000000, 0.00104 );
  createGUI(true);
  dat.GUI.toggleHide();
  render();
});
