const exitBtn = document.getElementById("exit-btn");
	const aboutBtn = document.getElementById("about-btn");
	const checkBox = document.getElementById("checkbox");
	const countdownDisplay = document.querySelector(".countdown-display");
	const select = document.getElementById("select");
	const aboutTxt = document.querySelector(".about-txt");
	const container = document.querySelector(".container");
	const closeBtn = document.getElementById("close-btn");
	const display = document.getElementById("display");
	
	const stopBtn = document.getElementById("stop-btn");
	
	let intervalId;
	
	function startCountdown(minutes) {
		clearInterval(intervalId);
		
		let totalSeconds = minutes * 60;
		
		function updateDisplay() {
			const minutesLeft = Math.floor(totalSeconds / 60);
			const secondsLeft = totalSeconds % 60;
			
			const formattedMinutes = String(minutesLeft).padStart(2, '0');
			const formattedSeconds = String(secondsLeft).padStart(2, '0');
			
			display.textContent = `${formattedMinutes}:${formattedSeconds}`;
			
			if(totalSeconds <= 0) {
				if (!checkBox.checked) {
					select.disabled = true;
					if(select.disabled) {
						clearInterval(intervalId);
						display.textContent = "Time's up!"
					}
				} else {
					select.disabled = false;
					const selectedSound = select.value
				if(selectedSound) {
			const audioToPlay = document.getElementById(selectedSound + '-sound');
			if(audioToPlay) {
				audioToPlay.currentTime = 0;
				audioToPlay.play();
				clearInterval(intervalId);
				display.textContent = "Time's up!"
			}
		}
				}

			}
			totalSeconds--;
		}
		
		updateDisplay();
		intervalId = setInterval(updateDisplay, 1000);
	}
	
	document.querySelectorAll(".timer-btns button[data-minutes]").forEach(button => {
		button.addEventListener('click', (event) => {
			const minutes = event.target.dataset.minutes;
			container.style.display = "none";
			countdownDisplay.style.display = "flex";
			startCountdown(parseInt(minutes));
		})
	})
	
	stopBtn.addEventListener("click", () => {
		clearInterval(intervalId);
		countdownDisplay.style.display = "none";
		container.style.display = "flex";
	})
	
	checkBox.addEventListener('change', () => {
		if(!checkBox.checked) {
		select.disabled = true;
		} else {
		select.disabled = false;
		}
	});
	
	exitBtn.addEventListener("click", () => {
		window.close();
	});
	
	aboutBtn.addEventListener('click', () => {
		container.style.display = "none";
		aboutTxt.style.display = "flex";
	});
	
	closeBtn.addEventListener("click", () => {
		aboutTxt.style.display = "none"
		container.style.display = "flex";
	});

	select.addEventListener("change", (event) => {
		const selectedSound = event.target.value;
		
		const allAudio = document.querySelectorAll("audio");
		allAudio.forEach(audio => {
			audio.pause();
			audio.currentTime = 0;
		});
		
		if(selectedSound) {
			const audioToPlay = document.getElementById(selectedSound + '-sound');
			if(audioToPlay) {
				audioToPlay.currentTime = 0;
				audioToPlay.play();
			}
		}
	});
