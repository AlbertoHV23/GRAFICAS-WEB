
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<!-- Bootstrap CSS -->
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet">
	<!-- FontAwesome CSS -->
	<link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" />
	<link rel="stylesheet" href="./assets/css/style.css">
	<title>Abducted</title>
</head>

<body>

	<audio class="soundHover" src="assets/Sounds/Hover.mp3"></audio>
	<audio class="soundTransition" src="assets/Sounds/Transition.mp3"></audio>
	<audio class="soundTranReverse" src="assets/Sounds/Transition_reverse.mp3"></audio>

	<div class="screens d-none">
		<div class="datos d-none">
			<div class="datosUno">
				<h2 class="titulo-playerUno">Gerax</h1>
					<h2 class="titulo-playerUnoPuntos">Puntos: 0</h1>
			</div>

			<div class="datosDos">
				<h2 class="titulo-vivos">Alive: 0</h1>
			</div>

			<div class="datosDos">
				<h2 class="titulo-playerDos">Player2</h1>
					<h2 class="titulo-playerDosPuntos">Puntos: 0</h1>
			</div>
		</div>

		<div id="screen" class="twoplayers"></div>
		<div id="screentwo" class="twoplayers"></div>
	</div>
	<div class="carga d-none w-100 h-100 d-flex justify-content-center">
		<img src="/assets/img/load.gif" alt="">
	</div>

	<div class="estrellas"></div>
	<div class="brillando"></div>
	<div class="nubes"></div>

	<section class="menu" id="menu">
		<div class="container d-flex">
			<div class="row col-lg-6 col-md-8">
				<div class="buttons my-auto">
					<div class="row">
						<button type="button" class="btn btn-menu mb-5" id="btnPlay" data-bs-toggle="modal"
							data-bs-target="#PlayModal">Play</button>
					</div>
					<div class="row">
						<button type="button" class="btn btn-menu mb-5" id="btnScores" data-bs-toggle="modal"
							data-bs-target="#ScoresModal">Scores</button>
					</div>
					<div class="row">
						<button type="button" class="btn btn-menu mb-5" id="btnSettings" data-bs-toggle="modal"
							data-bs-target="#SettingsModal">Settings</button>
					</div>
					<div class="row">
						<button type="button" class="btn btn-menu " id="btnAbout" data-bs-toggle="modal"
							data-bs-target="#AboutModal">About</button>
					</div>
				</div>
			</div>
			<div class="row col-lg-6 col-md-8 my-auto mx-auto">
				<h1 class="titulo">Abducted</h1>
			</div>
		</div>
	</section>

	<div class="modal modal-play fade" id="PlayModal" tabindex="-1" aria-labelledby="PlayModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header text-center">
					<h1 class="modal-title" id="PlayModalLabel">Play</h1>
				</div>
				<div class="modal-body">
					<div class="container">
						<div class="row">
							<!-- <button type="button" class="btn btn-menu mb-2" id="btnSolo"
								data-bs-dismiss="modal">Solo</button> -->
							<button type="button" class="btn btn-menu mb-2" id="btnSolo" data-bs-toggle="modal"
								data-bs-target="#singleInputModal">Solo</button>
						</div>
						<div class="row">
							<button type="button" class="btn btn-menu mb-2" id="btnMultiplayer" data-bs-toggle="modal"
								data-bs-target="#multiplayerInputModal">Multiplayer</button>
						</div>
						<!-- <div class="row">
							<button type="button" class="btn btn-menu mb-2" id="btnOnline" data-bs-toggle="modal"
								data-bs-target="#OnlineModal">Online</button>
						</div> -->
						<div class="row">
							<button type="button" class="btn btn-reverse" id="btnClose"
								data-bs-dismiss="modal">Close</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>


	<!-- <div class="modal modal-online fade" id="OnlineModal" tabindex="-1" aria-labelledby="OnlineModalLabel"
		aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header text-center">
					<h1 class="modal-title" id="OnlineModalLabel">Online</h1>
				</div>
				<div class="modal-body">
					<form>
						<div class="mb-3">
							<label for="recipient-name" class="col-form-label">Nickname:</label>
							<input type="text" class="form-control" id="recipient-name">
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn mx-auto" id="btnOnlinePlay">Play</button>
					<button type="button" class="btn btn-reverse mx-auto" id="btnClose"
						data-bs-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div> -->




	<div class="modal modal-single-input fade" id="singleInputModal" tabindex="-1"
		aria-labelledby="singleInputModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header text-center">
					<h1 class="modal-title" id="singleInputModalLabel">Single</h1>
				</div>
				<div class="modal-body">
					<div class="mb-3">
						<label for="recipient-name" class="col-form-label">Nickname:</label>
						<input type="text" class="form-control" id="nicknameSingleInput" name="nicknameSingleInput"
							placeholder="Nickname">
					</div>
					<select name="selectEscenario" id="selectEscenario">
						<option value="0">FARM</option>
						<option value="1">NUCLEAR DAY</option>
					</select>
					<div>
						<img src="" alt="">
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn mx-auto" id="btnSingleInputPlay">Save</button>
					<button type="button" class="btn btn-reverse mx-auto" id="btnClose"
						data-bs-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>


	<div class="modal modal-multiplayer-input fade" id="multiplayerInputModal" tabindex="-1"
		aria-labelledby="multiplayerInputModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header text-center">
					<h1 class="modal-title" id="multiplayerInputModalLabel">Local</h1>
				</div>
				<div class="modal-body">
					<div class="mb-3">
						<label for="playerOneName" class="col-form-label">Nickname P1:</label>
						<input type="text" class="form-control" id="playerOneName" name="playerOneName"
							placeholder="Nickname">
					</div>
					<div class="mb-3">
						<label for="playerTwoName" class="col-form-label">Nickname P2:</label>
						<input type="text" class="form-control" id="playerTwoName" name="playerTwoName"
							placeholder="Nickname">
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn mx-auto" id="btnMultiplayerInputPlay">Save</button>
					<button type="button" class="btn btn-reverse mx-auto" id="btnClose"
						data-bs-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>


	<div class="modal modal-scores fade" id="ScoresModal" tabindex="-1" aria-labelledby="ScoresModalLabel"
		aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
			<div class="modal-content">
				<div class="modal-header text-center">
					<h1 class="modal-title" id="ScoresModalLabel">Scores</h1>
				</div>
				<div class="modal-body">
					<table class="table text-white">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">Name</th>
								<th scope="col">Score</th>
								<th scope="col">Date</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th scope="row">1</th>
								<td>Gerax</td>
								<td>10000</td>
								<td>07/03/21</td>
							</tr>
							<tr>
								<th scope="row">2</th>
								<td>Alberto</td>
								<td>9999</td>
								<td>08/03/21</td>
							</tr>
							<tr>
								<th scope="row">2</th>
								<td>Pedro</td>
								<td>9998</td>
								<td>09/03/21</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="modal-footer text-center">
					<div class="row">
						<button type="button" class="btn btn-reverse mx-auto" id="btnClose"
							data-bs-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="modal modal-settings fade" id="SettingsModal" tabindex="-1" aria-labelledby="SettingsModalLabel"
		aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header text-center">
					<h1 class="modal-title" id="SettingsModalLabel">Settings</h1>
				</div>
				<div class="modal-body">
					<div class="row">
						<button type="button" class="btn btn-menu mb-2" id="btnSound" data-bs-toggle="modal"
							data-bs-target="#SoundModal">Sound</button>
					</div>
					<div class="row">
						<button type="button" class="btn btn-menu mb-2" id="btnControl" data-bs-toggle="modal"
							data-bs-target="#ControlModal">Controls</button>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-reverse mx-auto" id="btnClose"
						data-bs-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>

	<div class="modal modal-sound fade" id="SoundModal" tabindex="-1" aria-labelledby="SoundModalLabel"
		aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header text-center">
					<h1 class="modal-title" id="SoundModalLabel">Sound</h1>
				</div>
				<div class="modal-body text-center">
					<div class="row">
						<button class="btn btnSound btnOn active"><i class="fas fa-volume-up"
								style="font-size: 80px;"></i></button>
					</div>
					<div class="row">
						<button class="btn btnSound btnOff"><i class="fas fa-volume-mute"
								style="font-size: 80px;"></i></button>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-reverse mx-auto" id="btnClose"
						data-bs-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>

	<div class="modal modal-controls fade" id="ControlModal" tabindex="-1" aria-labelledby="ControlModalLabel"
		aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header text-center">
					<h1 class="modal-title" id="ControlModalLabel">Controls</h1>
				</div>
				<div class="modal-body">
					<table class="table text-white">
						<thead>
							<tr>
								<th scope="col">Button</th>
								<th scope="col">Action</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th scope="row">W</th>
								<td>Go froward</td>
							</tr>
							<tr>
								<th scope="row">S</th>
								<td>Go back</td>
							</tr>
							<tr>
								<th scope="row">A</th>
								<td>Go left</td>
							</tr>
							<tr>
								<th scope="row">D</th>
								<td>Go right</td>
							</tr>
							<tr>
								<th scope="row">Space</th>
								<td>Abduct</td>
							</tr>
							<tr>
								<th scope="row">I</th>
								<td>Power # 1</td>
							</tr>
							<tr>
								<th scope="row">O</th>
								<td>Power # 2</td>
							</tr>
							<tr>
								<th scope="row">P</th>
								<td>Power # 3</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-reverse mx-auto" id="btnClose"
						data-bs-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>

	<div class="modal modal-about fade" id="AboutModal" tabindex="-1" aria-labelledby="AboutModalLabel"
		aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
			<div class="modal-content">
				<div class="modal-header text-center">
					<h1 class="modal-title" id="AboutModalLabel">About</h1>
				</div>
				<div class="modal-body text-white">
					<p>The game is about some UFOs that came to earth in search of things to discover, the objective of
						the UFOs is to abduct as many things that move and thus return to investigate these new beings.
					</p>
				</div>
				<div class="modal-footer text-center">
					<div class="row">
						<button type="button" class="btn btn-reverse mx-auto" id="btnClose"
							data-bs-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="modal modal-pause fade" id="PauseModal" tabindex="-1" aria-labelledby="PauseModalLabel"
		aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header text-center">
					<h1 class="modal-title" id="PauseModalLabel">Pause</h1>
				</div>
				<div class="modal-body">
					<div class="row">
						<button type="button" class="btn btn-resume btn-online btn-reverse mb-4"
							data-bs-dismiss="modal">Resume</button>
					</div>
					<!-- <div class="row">
						<button type="button" class="btn btn-menu mb-4" id="btnSettings">Settings</button>
					</div> -->
					<div class="row">
						<button type="button" class="btn btn-menu mb-4" id="btnLeave">Leave</button>
					</div>
				</div>
			</div>
		</div>
	</div>


	<div class="modal modal-Over fade" id="OverModal" tabindex="-1" aria-labelledby="OverModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header text-center">
					<h1 class="modal-title" id="PauseModalLabel">Game Over</h1>
				</div>
				<div class="modal-body">
					<div class="row">
						<button type="button" class="btn btn-resume btn-online btn-reverse mb-4"
							data-bs-dismiss="modal">Play again</button>
					</div>
					<div class="row">
						<button type="button" class="btn btn-menu mb-4" id="btnLeave">Leave</button>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Bootstrap JS -->
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js"></script>
	<!-- Jquery JS -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

	<script src="/js/libs/three/three2.js"></script>
	<script src="/js/libs/three/MTLLoader.js"></script>
	<script src="/js/libs/three/FBXLoader.js"></script>
	<script src="/js/libs/three/OBJLoader.js"></script>
	<script src="/js/libs/three/inflate.min.js"></script>
	<script src="/js/main.js"></script>
</body>

</html>