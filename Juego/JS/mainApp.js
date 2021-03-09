$(document).ready(function () {

    var beepHover = $(".soundHover")[0];
    var beepTransition = $(".soundTransition")[0];
    var beepTranReverse = $(".soundTranReverse")[0];

    $(".navbar").hide();

    $(".btn").hover(function () {
        beepHover.play();
    }, function () {});

    $(".btn-menu").click(function (e) {
        beepTransition.play();
    });

    $(".btn-reverse").click(function (e) {
        beepTranReverse.play();
    });

    $("#btnPlay").click(function () {
        $(".menu").remove();
        $(".estrellas").remove();
        $(".brillando").remove();
        $(".nubes").remove();
        $(".navbar").show();
        IntiGame();
    });

    function IntiGame() {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        const renderer = new THREE.WebGLRenderer();
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
                modalWrap = document.createElement('div');
                modalWrap.innerHTML = `
                    <div class="modal modal-pause fade" id="PauseModal" tabindex="-1" aria-labelledby="PauseModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-header">
                                <h1 class="modal-title" id="PauseModalLabel">Pause</h1>
                            </div>
                            <div class="modal-content">
                            <div class="modal-body">
                                <div class="row">
                                    <button type="button" class="btn btn-online btn-reverse mb-4" data-bs-dismiss="modal">Resume</button>
                                </div>
                                <div class="row">
                                    <button type="button" class="btn btn-menu mb-4" id="btnSettings">Settings</button>
                                </div>
                                <div class="row">
                                <button type="button" class="btn btn-menu mb-4" id="btnLeave">Leave</button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
                document.body.append(modalWrap);
                var modal = new bootstrap.Modal(modalWrap.querySelector('.modal-pause'));
                modal.show();
            } else if (modalWrap !== null) {
                modalWrap.remove();
            }
        });

        animate();

        function animate() {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        }
    }

});