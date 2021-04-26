var scene;
var camera;
var renderer;
var controls;
var clock;
var deltaTime;
var keys = {};

$(document).ready(function () {

    setupScene();

    cargaObj("assets/models/escenario/","combined 2_simplified_3d_mesh.obj","combined 2_simplified_3d_mesh.mtl", (miModelo) => {
    	miModelo.position.set(0,71,0);
        miModelo.rotation.set(THREE.Math.degToRad(-90),THREE.Math.degToRad(0),THREE.Math.degToRad(0));
        miModelo.name = "escenario"

    	scene.add(miModelo);
    });

    cargaObj("assets/models/UFO/", "Low_poly_UFO.obj", "Low_poly_UFO.mtl", (miModelo) => {
        miModelo.scale.set(.1,.1,.1);
        miModelo.position.z = -10;
        miModelo.rotation.x = THREE.Math.degToRad(0);
        miModelo.name = "UFO";
        // miModelo.add(camera);
        scene.add(miModelo);

    });

    render();

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
});

function cargaObj(path, objFile, mtlFile, miCallBack) {

    var mtlLoader = new THREE.MTLLoader();

    mtlLoader.setPath(path);

    mtlLoader.load(mtlFile, (materiales) => {
            //Aqui se ejecuta cuando ya termina la carga de los materiales
            var objLoader = new THREE.OBJLoader();

            objLoader.setPath(path);

            objLoader.setMaterials(materiales);

            objLoader.load(objFile, (objCargado) => {

                miCallBack(objCargado);

            });

        },
        (progreso) => {
            console.log(progreso);
        });
}

function onKeyDown(event) {
    keys[String.fromCharCode(event.keyCode)] = true;
}

function onKeyUp(event) {
    keys[String.fromCharCode(event.keyCode)] = false;
}


function render() {
    requestAnimationFrame(render);
    deltaTime = clock.getDelta();

    var yaw = 0;
    var forward = 0;
    var up = 0;
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
    if (keys["J"]) {
        up = -20;
    } else if (keys["K"]) {
        up = 20;
    }

    // var ufo = scene.getObjectByName("UFO");
    // ufo.rotation.y += yaw * deltaTime;
    // ufo.translateZ(forward * deltaTime);

    camera.rotation.y += yaw * deltaTime;
    camera.translateZ(forward * deltaTime);
    camera.translateY(up * deltaTime);

    renderer.render(scene, camera);
}

function setupScene() {

    const canvas = document.querySelector('#screen');

    var visibleSize = {
        width: window.innerWidth,
        height: window.innerHeight
    };
    clock = new THREE.Clock();
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, visibleSize.width / visibleSize.height, 0.1, 500);
    camera.position.z = 2;
    camera.position.y = 5;

    renderer = new THREE.WebGLRenderer({canvas,
        precision: "mediump"
    });
    renderer.setClearColor(new THREE.Color(0, 0, 0));
    renderer.setPixelRatio(visibleSize.width / visibleSize.height);
    renderer.setSize(visibleSize.width, visibleSize.height);

    var ambientLight = new THREE.AmbientLight(new THREE.Color(1, 1, 1), 1.0);
    scene.add(ambientLight);

    var directionalLight = new THREE.DirectionalLight(new THREE.Color(1, 1, 0), 0.4);
    directionalLight.position.set(0, 0, 1);
    scene.add(directionalLight);


    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([
        './assets/skybox/posx.jpg',
        './assets/skybox/negx.jpg',
        './assets/skybox/posy.jpg',
        './assets/skybox/negy.jpg',
        './assets/skybox/posz.jpg',
        './assets/skybox/negz.jpg',
    ]);
    scene.background = texture;


    var grid = new THREE.GridHelper(50, 10, 0xffffff, 0xffffff);
    grid.position.y = -1;
    scene.add(grid);
}