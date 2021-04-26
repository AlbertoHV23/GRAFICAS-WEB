import * as THREE from '/resources/js/libs/three.module.js';
// //Mover la cámara con el ratón utilizando click derecho e izquierdo
import {
  OrbitControls
} from '/resources/js/libs/OrbitControls.js';

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
    Mundo = new BasicWorld();
  });

});

class BasicWorld {
  constructor() {
    this._Initialize();
  }

  _Initialize() {
    const canvas = document.querySelector('#pantalla');

    this._threejs = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });
    this._threejs.shadowMap.enabled = true;
    this._threejs.shadowMap.type = THREE.PCFSoftShadowMap;
    this._threejs.setPixelRatio(window.devicePixelRatio);
    this._threejs.setSize(window.innerWidth, window.innerHeight);

    // document.body.appendChild(this._threejs.domElement);

    window.addEventListener('resize', () => {
      this._OnWindowResize();
    }, false);

    const fov = 60;
    const aspect = 1920 / 1080;
    const near = 1.0;
    const far = 1000.0;
    this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this._camera.position.set(75, 20, 0);

    this._scene = new THREE.Scene();

    let light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    light.position.set(20, 100, 10);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    light.shadow.bias = -0.001;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 500.0;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 500.0;
    light.shadow.camera.left = 100;
    light.shadow.camera.right = -100;
    light.shadow.camera.top = 100;
    light.shadow.camera.bottom = -100;
    this._scene.add(light);

    light = new THREE.AmbientLight(0x101010);
    this._scene.add(light);

    const controls = new OrbitControls(
      this._camera, canvas);
    controls.target.set(0, 20, 0);
    controls.update();

    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([
      './resources/skybox/night/front.png',
      './resources/skybox/night/back.png',
      './resources/skybox/night/top.png',
      './resources/skybox/night/bottom.png',
      './resources/skybox/night/left.png',
      './resources/skybox/night/right.png',
    ]);
    this._scene.background = texture;

    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(500, 500, 10, 10),
      new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
      }));
    plane.castShadow = false;
    plane.receiveShadow = true;
    plane.rotation.x = -Math.PI / 2;
    this._scene.add(plane);

    const box = new THREE.Mesh(
      new THREE.SphereGeometry(2, 32, 32),
      new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        wireframe: true,
        wireframeLinewidth: 4,
      }));
    box.position.set(0, 10, 0);
    box.castShadow = true;
    box.receiveShadow = true;
    this._scene.add(box);

    $(document).on('keydown', function (event) {
      if (event.key == "Escape") {
        beepTransition.play();
        $('#PauseModal').modal('show');
      } else {
        $('#PauseModal').modal('hide');
      }
    });

    this._RAF();
  }

  _OnWindowResize() {
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();
    this._threejs.setSize(window.innerWidth, window.innerHeight);
  }

  _RAF() {
    requestAnimationFrame(() => {
      this._threejs.render(this._scene, this._camera);
      this._RAF();
    });
  }

}