//Shaders
const _VS = ` 
varying vec3 v_Normal;

void main(){
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    v_Normal = normal;
}
`;

const _FS = `  
uniform vec3 triangleColor;

varying vec3 v_Normal;

void main(){
    gl_FragColor = vec4(triangleColor, 0.5);
}
`;

var totalTime = 0
var cameraRayo
var scene;
var controls;
var clock;
var raycastera;
var deltaTime;
var keys = {};

var contador = 1
var colisionado = false
var twoPlayers = false;
var selectStage = 1;
var selectTexture = 2;
var textureStage;
var pause = false;
var cameras = [];
var modelos = [false, false, false, false];

var puntosUno = 0;
var puntosDos = 0;
var puntosTres = 0;
var simon = true
var ganoUno = true


var arregloPersonas = []

var back_day = [
    './assets/skyboxes/day/front.jpg',
    './assets/skyboxes/day/back.jpg',
    './assets/skyboxes/day/top.jpg',
    './assets/skyboxes/day/bottom.jpg',
    './assets/skyboxes/day/left.jpg',
    './assets/skyboxes/day/right.jpg'
];

var back_sunset = [
    './assets/skyboxes/sunset/front.jpg',
    './assets/skyboxes/sunset/back.jpg',
    './assets/skyboxes/sunset/top.jpg',
    './assets/skyboxes/sunset/bottom.jpg',
    './assets/skyboxes/sunset/left.jpg',
    './assets/skyboxes/sunset/right.jpg'
];

var back_night = [
    './assets/skyboxes/night/front.png',
    './assets/skyboxes/night/back.png',
    './assets/skyboxes/night/top.png',
    './assets/skyboxes/night/bottom.png',
    './assets/skyboxes/night/left.png',
    './assets/skyboxes/night/right.png'
];

var ufos = [];

var cone;
var cone2;

var lightCone;
var lightCone2;

var visibleSize;

var mixers = [];

var action, action2, action3;

var flag = false;

var renders = [];

visibleSize = {
    width: window.innerWidth,
    height: window.innerHeight
};

var beepHover = $(".soundHover")[0];
var beepTransition = $(".soundTransition")[0];
var beepTranReverse = $(".soundTranReverse")[0];
var sound = 1;

function quitarInicio() {
    $(".menu").remove();
    $(".estrellas").remove();
    $(".brillando").remove();
    $(".nubes").remove();
    $(".carga").removeClass("d-none")
    // $(".screens").removeClass("d-none");
}

$(document).ready(function () {
    $(".btnSound").click(function (e) {
        if (!($(this).hasClass("active")) && ($(this).hasClass("btnOn"))) {
            $(this).addClass("active");
            $(".btnOff").removeClass("active");
            sound = 1;
        } else if (($(this).hasClass("btnOff")) && !($(this).hasClass("active"))) {
            $(".btnOn").removeClass("active");
            $(this).addClass("active");
            sound = 0;
        }
    });

    if (sound == 1) {

        $(".btn").hover(function () {
            beepHover.play();
        }, function () {});

        $(".btn-menu").click(function (e) {
            beepTransition.play();
        });

        $(".btn-reverse").click(function (e) {
            beepTranReverse.play();
        });

    }

    $("#btnSingleInputPlay").click(function () {
        if ($("#nicknameSingleInput").val() != "") {
            localStorage.setItem('Player1Name', $("#nicknameSingleInput").val());
            alert("Your nickname is: " + localStorage.getItem('Player1Name'));
            $('titulo-playerUno').empty();
            $(".titulo-playerUno").html(localStorage.getItem('Player1Name'));
            quitarInicio();
            $("#screen").removeClass("twoplayers").addClass("single");
            $("#screentwo").removeClass("twoplayers").addClass("single");
            setupScene();
        } else {
            alert("The field is empty");
        }
    });

    $("#btnMultiplayerInputPlay").click(function () {
        if ($("#playerOneName").val() != "" && $("#playerTwoName").val() != "") {
            localStorage.setItem('Player1Name', $("#playerOneName").val());
            localStorage.setItem('Player2Name', $("#playerTwoName").val());
            alert("Player 1: " + localStorage.getItem('Player1Name') + " Player 2: " + localStorage.getItem('Player2Name'));
            $('titulo-playerUno').empty();
            $(".titulo-playerUno").html(localStorage.getItem('Player1Name'));
            $('titulo-playerDos').empty();
            $(".titulo-playerDos").html(localStorage.getItem('Player2Name'));
            quitarInicio();
            twoPlayers = true;
            setupScene();
        } else {
            alert("Some of the fields are empty");
        }
    });

    //Elimina solo un elemto
    // localStorage.removeItem('miGato');
    // // Elimina todos los elementos
    // localStorage.clear();

    // $("#btnSolo").click(function () {
    //     quitarInicio();
    //     $("#screen").removeClass("twoplayers").addClass("single");
    //     $("#screentwo").removeClass("twoplayers").addClass("single");
    //     setupScene();
    // });

    // $("#btnMultiplayer").click(function () {
    //     quitarInicio();
    //     twoPlayers = true;
    //     setupScene();
    // });



});

function cargarModelos() {
    if (selectStage == 1) {
        cargaObj("assets/models/escenario/nuclear/", "10078_Nuclear_Power_Plant_v1_L3.obj", "10078_Nuclear_Power_Plant_v1_L3.mtl", (miModelo) => {
            miModelo.position.set(0, -1, 0);
            miModelo.rotation.set(THREE.Math.degToRad(-90), THREE.Math.degToRad(0), THREE.Math.degToRad(0));
            miModelo.scale.set(.5, .5, .5);
            miModelo.name = "escenario"

            scene.add(miModelo);
            modelos[0] = true;
        });
        // } else if (selectStage == 2) {
        //     cargaObj("assets/models/escenario/city", "The City.obj", "The_City.mtl", (miModelo) => {
        //         miModelo.position.set(0, 0, 0);
        //         miModelo.rotation.set(THREE.Math.degToRad(-90), THREE.Math.degToRad(0), THREE.Math.degToRad(0));
        //         miModelo.name = "escenario"

        //         scene.add(miModelo);
        //         modelos[0] = true;
        //     });
    } else {
        cargaObj("assets/models/escenario/farm/", "combined 2_simplified_3d_mesh.obj", "combined 2_simplified_3d_mesh.mtl", (miModelo) => {
            miModelo.position.set(0, 70, 0);
            miModelo.rotation.set(THREE.Math.degToRad(-90), THREE.Math.degToRad(0), THREE.Math.degToRad(0));
            miModelo.scale.set(1, 1, 1);
            miModelo.name = "escenario"

            scene.add(miModelo);
            modelos[0] = true;
        });
    }

    cargaObj("assets/models/UFO/", "Low_poly_UFO.obj", "Low_poly_UFO.mtl", (miModelo) => {
        miModelo.scale.set(.1, .1, .1);
        miModelo.position.x = -25;
        miModelo.position.y = 3;
        miModelo.position.z = 70;

        miModelo.rotation.x = THREE.Math.degToRad(0);

        scene.add(miModelo);
        miModelo.name = "UFO";
        miModelo.add(cone);
        miModelo.add(cameraRayo);
        modelos[1] = true;

    });

    if (twoPlayers) {

        cargaObj("assets/models/UFO/", "Low_poly_UFO.obj", "Low_poly_UFO.mtl", (miModelo) => {
            miModelo.scale.set(.1, .1, .1);
            miModelo.position.x = 25;
            miModelo.position.y = 3;
            miModelo.position.z = 70;

            miModelo.rotation.x = THREE.Math.degToRad(0);

            scene.add(miModelo);
            miModelo.name = "UFO2";
            miModelo.add(cone2);
            modelos[2] = true;

        });
    }
}

var copias = 0
var copiados = []

function cargaModelosAnimados() {
    var loader = new THREE.FBXLoader()
    loader.load('assets/models/characters/females/female1-anima.fbx', function (personaje) {
        // AnimationMixer es un reproductor de animaciones
        personaje.mixer = new THREE.AnimationMixer(personaje)

        // El reproductor de animaciones de nuestro modelo
        // entra al arreglo de mixers
        mixers.push(personaje.mixer)

        // Aqui van las animaciones que se hicieron en maya
        action = personaje.mixer.clipAction(personaje.animations[0])
        action2 = personaje.mixer.clipAction(personaje.animations[1])
        // action3 = personaje.mixer.clipAction(personaje.animations[2])

        action.play()
        action2.play()
        // action3.play()

        // limite x = -72 y 150
        // limite z = -176 y 50
        // le damos la posicion que queramos en x y z

        personaje.position.z = Math.floor(Math.random() * -176) - 100
        personaje.position.x = Math.floor(Math.random() * -72) + 150
        // personaje.position.z= 70
        // personaje.position.x= -25
        personaje.position.y = 0

        console.log(personaje.position.z + ' original');
        // le asignamos una escala en x y z
        personaje.scale.set(.02, .02, .02)

        // Le asignamos un nombre al modelo
        personaje.name = 'persona' + contador


        // Agregamos el personaje a la escena
        scene.add(personaje)
        copiados.push(personaje);

        if (contador >= 3) {
            modelos[3] = true;
        }

        contador++

    })
}

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
            console.log(progreso + "ya se cargó");
        });
}

function onKeyDown(event) {
    keys[String.fromCharCode(event.keyCode)] = true;
}

function onKeyUp(event) {
    keys[String.fromCharCode(event.keyCode)] = false;
}



function render() {
    if ((modelos[0] == true && modelos[1] == true && modelos[3] == true) || (modelos[0] == true && modelos[1] == true && modelos[2] == true && modelos[3] == true)) {
        $(".carga").remove();
        $(".screens").removeClass("d-none")
        $(".datos").removeClass("d-none")

    }

    $(document).on('keydown', function (event) {

        if (event.key == "Escape") {
            beepTransition.play();
            $('#PauseModal').modal('show');
        } else {
            $('#PauseModal').modal('hide');
        }

        if (event.key == "Enter") {
            beepTransition.play();
            $('#OverModal').modal('show');
        } else {
            $('#PauseModal').modal('hide');
        }

    });

    requestAnimationFrame(render);
    deltaTime = clock.getDelta();

    totalTime += deltaTime
    const v = Math.sin(totalTime * 2.0) * 0.5 + 0.5
    const c1 = new THREE.Vector3(1, 1, 0)
    const c2 = new THREE.Vector3(0, 1, 1)

    const cambioColor = c1.lerp(c2, v)

    cone.material.uniforms.triangleColor.value = cambioColor

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
    if (keys["F"]) {
        up = -20;
    } else if (keys["G"]) {
        up = 20;
    }
    if (keys["V"]) {
        cone.visible = true;
    } else {
        colisionado = true
        cone.visible = false;
    }

    // if (keys["Z"]) {
    //     puntosUno += 1;
    //     $(".titulo-playerUnoPuntos").empty();
    //     $(".titulo-playerUnoPuntos").html('Puntos: ' + puntosUno);
    // }

    // if (keys["X"]) {
    //     puntosDos += 1;
    //     $(".titulo-playerDosPuntos").empty();
    //     $(".titulo-playerDosPuntos").html('Puntos: ' + puntosDos);
    // }


    var yaw2 = 0;
    var forward2 = 0;
    var up2 = 0;

    if (mixers.length > 0) {
        for (let index = 0; index < mixers.length; index++) {
            mixers[index].update(deltaTime);
        }
        if (flag) {
            action.weight = 0;
            action2.weight = 1;
            // action3.weight = 0

            flag = false;
        } else {
            action.weight = 1
            action2.weight = 0
            // action3.weight = 0
        }
    }

    var anclado = scene.getObjectByName("ancla1");
    ufos[0] = scene.getObjectByName("UFO");
    ufos[0].rotation.y += yaw * deltaTime;
    ufos[0].translateZ(forward * deltaTime);
    ufos[0].translateY(up * deltaTime);
    anclado.position.set(ufos[0].position.x, ufos[0].position.y, ufos[0].position.z);


    if (twoPlayers) {

        if (keys["J"]) {
            yaw2 = 5;
        } else if (keys["L"]) {
            yaw2 = -5;
        }
        if (keys["I"]) {
            forward2 = -20;
        } else if (keys["K"]) {
            forward2 = 20;
        }
        if (keys["N"]) {
            up2 = -20;
        } else if (keys["M"]) {
            up2 = 20;
        }
        if (keys["O"]) {
            cone2.visible = true;
        } else {
            colisionado = true
            cone2.visible = false;
        }

        var ancla2s = scene.getObjectByName("ancla2");
        ufos[1] = scene.getObjectByName("UFO2");
        ufos[1].rotation.y += yaw2 * deltaTime;
        ufos[1].translateZ(forward2 * deltaTime);
        ufos[1].translateY(up2 * deltaTime);
        ancla2s.position.set(ufos[1].position.x, ufos[1].position.y, ufos[1].position.z);

    }

    // for (let index = 0; index < 20; index++) {
    //     var nombre = "persona" + indiceNombre
    //     indiceNombre++
    // }

    // limite x = -72 y 150
    // limite z = -176 y 50

    $(".titulo-vivos").html('Alive: ' + copiados.length);
    copiados.forEach(personas => {
        var perona = scene.getObjectByName(personas.name)
        perona.position.z += 4 * deltaTime;

        if (perona.position.z >= 50) {
            scene.remove(perona)
            var indice = copiados.indexOf(perona); // obtenemos el indice
            copiados.splice(indice, 1);
            // copiados.shift()
            $(".titulo-vivos").html('Alive: ' + copiados.length);
            puntosTres++
        }

        if (((perona.position.x > ufos[0].position.x - 2.5 && perona.position.x < ufos[0].position.x + 1.5) && (perona.position.z > ufos[0].position.z - 1.5 && perona.position.z < ufos[0].position.z + 1.5)) && cone.visible) {
            scene.remove(perona)
            var indice = copiados.indexOf(perona); // obtenemos el indice
            copiados.splice(indice, 1);
            $(".titulo-vivos").html('Alive: ' + copiados.length);


            if (colisionado) {
                puntosUno += 1
                localStorage.setItem('puntosUnoS', puntosUno);
                colisionado = false
            }
        }
        $(".titulo-playerUnoPuntos").empty();
        $(".titulo-playerUnoPuntos").html('Puntos: ' + puntosUno);

        if (twoPlayers) {
            if (((perona.position.x > ufos[1].position.x - 2.5 && perona.position.x < ufos[1].position.x + 1.5) && (perona.position.z > ufos[1].position.z - 1.5 && perona.position.z < ufos[1].position.z + 1.5)) && cone2.visible) {
                console.log('Colsion')
                scene.remove(perona)
                var indice = copiados.indexOf(perona); // obtenemos el indice
                copiados.splice(indice, 1);
                $(".titulo-vivos").html('Alive: ' + copiados.length);


                if (colisionado) {
                    puntosDos += 1;
                    localStorage.setItem('puntosDosS', puntosDos);
                    colisionado = false
                }

            }
        }
        $(".titulo-playerDosPuntos").empty();
        $(".titulo-playerDosPuntos").html('Puntos: ' + puntosDos);

    });

    // persona.position.z += 0.03;

    // camera.rotation.y += yaw * deltaTime;
    // camera.translateZ(forward * deltaTime);
    // camera.translateY(up * deltaTime);

    for (let index = 0; index < renders.length; index++) {
        renders[index].render(scene, cameras[index]);
    }

    if (twoPlayers) {
        rainGeo.vertices.forEach(p => {
            p.velocity -= 0.1 + Math.random() * 0.1;
            p.y += p.velocity;
            if (p.y < -200) {
                p.y = 200;
                p.velocity = 0;
            }
        });
        rainGeo.verticesNeedUpdate = true;
        rain.rotation.y += 0.002;
    }

    if (puntosTres == 3 && twoPlayers == false) {
        puntosTres = 4;
        //mandar datos de firebase
        confirm("Game Over")
        location.reload()
    } else if ((copiados.length == 0 && twoPlayers == false && modelos[3]) && ganoUno) {
        ganoUno = false
        confirm("Gana " + localStorage.getItem('Player1Name'));
        location.reload()
    } else if ((twoPlayers == true && modelos[3])) {
        if ((puntosUno > puntosDos && copiados.length == 0) && ganoUno) {
            ganoUno = false
            confirm("Gana " + localStorage.getItem('Player1Name'));

            // mandamos los datos de que tenga mas puntos
            location.reload()
        } else if ((puntosDos > puntosUno && copiados.length == 0) && ganoUno) {
            ganoUno = false
            confirm("Gana " + localStorage.getItem('Player2Name'));
            // mandamos los datos de que tenga mas puntos
            location.reload()
        } else if (copiados.length == 0 && ganoUno) {
            ganoUno = false
            confirm("EMPATE");
            // mandamos los datos de que tenga mas puntos
            location.reload()
        }
    }

}

function crearRenders(_color) {

    var renderer = new THREE.WebGLRenderer({
        precision: "mediump"
    });
    renderer.setClearColor(_color);
    renderer.setPixelRatio((twoPlayers ? (visibleSize.width / 2) : visibleSize.width) / visibleSize.height);
    renderer.setSize((twoPlayers ? (visibleSize.width / 2) : visibleSize.width), visibleSize.height);
    renders.push(renderer);

}

function crearCamara() {

    var camera = new THREE.PerspectiveCamera(75, (twoPlayers ? (visibleSize.width / 2) : visibleSize.width) / visibleSize.height, 0.1, 2000);
    camera.position.set(-10, 10, 10);
    camera.rotation.order = 'YXZ';
    camera.rotation.y = -Math.PI / 4;
    camera.rotation.x = Math.atan(-1 / Math.sqrt(2));
    cameras.push(camera);

}
let cloudParticles = [],
    flash, rain, rainGeo, rainCount = 700;

function setupScene() {

    clock = new THREE.Clock();
    raycastera = new THREE.Raycaster()
    scene = new THREE.Scene();

    crearCamara();
    crearRenders(new THREE.Color(0, 0, 0));

    var ambientLight = new THREE.AmbientLight(new THREE.Color(1, 1, 1), 1.0);
    scene.add(ambientLight);

    var directionalLight = new THREE.DirectionalLight(new THREE.Color(1, 1, 1), 0.1);
    directionalLight.position.set(0, 10, 0);
    scene.add(directionalLight);

    const loader = new THREE.CubeTextureLoader();

    if (twoPlayers == false) {
        selectStage = $('#selectEscenario').val();
    }

    if (selectStage == 1 && twoPlayers) {
        textureStage = loader.load(back_night);
    } else if (selectStage == 1 && twoPlayers == false) {
        textureStage = loader.load(back_sunset);
    } else {
        textureStage = loader.load(back_day);
    }


    scene.background = textureStage;

    var grid = new THREE.GridHelper(100, 10, 0xffffff, 0xffffff);
    grid.position.y = -1;
    scene.add(grid);

    var ancla = new THREE.Object3D();
    ancla.position.set(-15, -5, 0);
    ancla.name = "ancla1";
    ancla.add(cameras[0]);
    scene.add(ancla);


    // cameraRayo = new THREE.PerspectiveCamera(75, visibleSize.width / visibleSize.height, 0.1, 100);
    // cameraRayo.position.set(-25, 3, 70);
    // cameraRayo.rotation.y = THREE.Math.degToRad(180);
    // cameraRayo.rayos = [
    //     new THREE.Vector3(0, -1, 0)
    // ]

    scene.add(cameraRayo)

    const geometria = new THREE.ConeGeometry(3, 8, 32);
    const materialTrans = new THREE.MeshPhongMaterial({
        color: 0x0af43e,
        opacity: 0.5,
        transparent: true,
    });

    var shaderColor = new THREE.ShaderMaterial({
        uniforms: {
            triangleColor: {
                value: new THREE.Vector3(0, 0, 1)
            }
        },
        vertexShader: _VS,
        fragmentShader: _FS,
    })
    cone = new THREE.Mesh(geometria, shaderColor);
    cone.scale.set(6, 6, 6);
    scene.add(cone);

    $("#screen").append(renders[0].domElement);

    if (twoPlayers) {
        crearCamara();

        crearRenders(new THREE.Color(0, 0, 0));

        var ancla2 = ancla.clone();
        ancla2.position.set(25, 0, 0);
        ancla2.name = "ancla2";
        ancla2.add(cameras[1]);
        scene.add(ancla2);

        cone2 = new THREE.Mesh(geometria, materialTrans);
        cone2.scale.set(6, 6, 6);
        scene.add(cone2);

        $("#screentwo").append(renders[1].domElement);
    }

    if (twoPlayers) {
        rainGeo = new THREE.Geometry();
        for (let i = 0; i < rainCount; i++) {
            rainDrop = new THREE.Vector3(
                Math.random() * 400 - 100,
                Math.random() * 500 - 125,
                Math.random() * 400 - 100
            );
            rainDrop.velocity = {};
            rainDrop.velocity = 0;
            rainGeo.vertices.push(rainDrop);
        }

        rainMaterial = new THREE.PointsMaterial({
            color: 0xaaaaaa,
            size: 0.5,
            transparent: true
        });

        rain = new THREE.Points(rainGeo, rainMaterial);
        scene.add(rain);
    }

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    cargarModelos();


    for (let index = 0; index < 3; index++) {
        cargaModelosAnimados();
    }

    render();
}