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
        IntiGame();
    });

});

function IntiGame() {
    const canvas = document.querySelector('#pantalla');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({
        canvas
    }, {
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({
        color: 0x00ff00
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    $(document).on('keydown', function (event) {
        if (event.key == "Escape") {
            beepTransition.play();
            $('#PauseModal').modal('show');
        } else {
            $('#PauseModal').modal('hide');
        }
    });

    animate();

    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        cube.rotation.z += 0.01;
        renderer.render(scene, camera);
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', onWindowResize, false);
}