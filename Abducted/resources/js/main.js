var beepHover = $(".soundHover")[0];
var beepTransition = $(".soundTransition")[0];
var beepTranReverse = $(".soundTranReverse")[0];
var sound = true;

$(document).ready(function () {

  $(".btnSound").click(function (e) {
    if (($(this).hasClass("active") === false) && ($(this).hasClass("btnOn") === true)) {
      $(this).addClass("active");
      $(".btnOff").removeClass("active");
      sound = true;
    } else {
      $(".btnOn").removeClass("active");
      $(this).addClass("active");
      sound = false;
    }
  });

  $(".btn").hover(function () {
    beepHover.play();
  }, function () {});

  $(".btn-menu").click(function (e) {
    beepTransition.play();
  });

  $(".btn-reverse").click(function (e) {
    beepTranReverse.play();
  });

  $("#btnSolo").click(function () {
    $(".menu").remove();
    $(".estrellas").remove();
    $(".brillando").remove();
    $(".nubes").remove();
    $(".navbar").show();
    $(".d-none").removeClass();
    init();
  });

});

// Variables globales
var scene
var renderer
var camera

var clock
var delta

var keys = {}

function init() {

  clock = new THREE.Clock()

  // Tamano del canvas
  var canvasSize = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  // Inicializar el renderer
  renderer = new THREE.WebGLRenderer()

  //Limpiamos la pantalla
  renderer.setClearColor(new THREE.Color(0, 0, 0))
  renderer.setSize(
    canvasSize.width,
    canvasSize.height
  )

  // Inicializar la camara
  camera = new THREE.PerspectiveCamera(
    //Campo de vision
    75,
    //Relacion aspecto
    canvasSize.width / canvasSize.height,
    //Que tan cerca se va a ver
    0.1,
    // Que tan lejos se va a ver
    500
  )

  camera.position.set(0,20,55);

  // Inicializamos la escena
  scene = new THREE.Scene()

  // Agregamos la etiquetada canvas dentro del Div
  $('#scene-section').append(renderer.domElement)

  // Iluminacion
  var ambient = new THREE.AmbientLight(
    // Color
    new THREE.Color(1, 1, 1),
    // intensidad
    1.0
  )

  var directional = new THREE.DirectionalLight(
    // Color
    new THREE.Color(1, 1, 0),
    // intensidad
    0.4
  )

  // Posicion de la luz direccional
  directional.position.set(0, 0, 1)

  // Ambos tipos de iluminacion se agregan a la escena
  scene.add(ambient)
  scene.add(directional)

  // Dibujamos un grid
  var grid = new THREE.GridHelper(50, 10, 0xffffff, 0xffffff);
  grid.position.y = -1;
  scene.add(grid);

  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('keyup', onKeyUp);

  //Carga de obj
  loadOBJWithMTL(
    //Carpeta donde esta el modelo,
    'resources/assets/UFO/',
    // El archivo obj del modelo
    'Low_poly_UFO.obj',
    // El archivo mtl
    'Low_poly_UFO.mtl',
    (miObjetoYaCargado) => {
      // Posicion del objeto en x y z
      miObjetoYaCargado.position.z = 0
      miObjetoYaCargado.position.x = 0
      miObjetoYaCargado.position.y = 0
      // Escala del objeto en x y z
      miObjetoYaCargado.scale.set(.15, .15, .15)
      // Nombre del objeto
      miObjetoYaCargado.name = 'UFO'
      miObjetoYaCargado.add(camera)
      scene.add(miObjetoYaCargado)
    }
  )
  // Mandamos llamar la funcion render
  render()
}

function render() {

  // Se llama arias veces (update)
  requestAnimationFrame(render)

  delta = clock.getDelta()

  var yaw = 0;
  var forward = 0;
  var updown = 0;

  if (keys["A"]) {
    yaw = 5;
  } else if (keys["D"]) {
    yaw = -5;
  }
  if (keys["W"]) {
    forward = -20;
  } else if (keys["S"]) {
    forward = 20;
  }
  if (keys["Q"]) {
    updown = 5;
  } else if (keys["E"]) {
    updown = -5;
  }


  var UFO = scene.getObjectByName("UFO");
  UFO.rotation.y += yaw * delta
  UFO.translateZ(forward * delta)

  // camera.rotation.y += yaw * delta;
  // camera.translateZ(forward * delta);
  // camera.translateY(updown * delta);

  // Recibe como parametro que escena va a dibujar, y la camara que se va a utilizar
  renderer.render(scene, camera)
}

function onKeyDown(event) {
  keys[String.fromCharCode(event.keyCode)] = true;
}

function onKeyUp(event) {
  keys[String.fromCharCode(event.keyCode)] = false;
}

function loadOBJWithMTL(path, objFile, mtlFile, onLoadCallback) {
  var mtlLoader = new THREE.MTLLoader()
  mtlLoader.setPath(path)

  mtlLoader.load(mtlFile, (material) => {
    var objLoader = new THREE.OBJLoader()
    objLoader.setPath(path)
    objLoader.setMaterials(material)
    objLoader.load(objFile, (object3d) => {
      onLoadCallback(object3d)
    })
  })
}