/*
Script to scroll automatically to the bottom of Reddit's saved page
(https://www.reddit.com/user/USERNAME/saved/).
This adds a `↓` button on the right bottom of the page that prompts for a `timeValue`
in ms and scrolls to the bottom of the page once every given `timeValue`.
When it's done, it'll show an alert. When active, it'll show a '⏹' button to 
stop scrolling, which can be rerun again with the previous time setting.
*/

(function () {
	setTimeout(() => {
		let isScrolling = false;
		let intervalId;
		let time;

		// Scroll fn
		function autoScroll(time) {
			isScrolling = true;
			intervalId = window.setInterval(() => {
				if (
					window.scrollY + window.screen.height >=
					document.body.scrollHeight
				) {
					alert('done scrolling');
					clearInterval(intervalId);
					isScrolling = false;
					toggleButtonText();
					return;
				} else window.scrollTo(0, document.body.scrollHeight);
			}, time);
		}

		// Stop scrolling
		function stopScroll() {
			clearInterval(intervalId);
			isScrolling = false;
			toggleButtonText();
		}

		// Toggle button text between "Start" and "Stop"
		function toggleButtonText() {
			const scrollButton = document.getElementById('scroll-button');
			if (isScrolling) {
				scrollButton.textContent = '⏹';
			} else {
				scrollButton.textContent = '↓';
			}
		}

		// Create and display new button
		const scrollButton = document.createElement('button');
		scrollButton.id = 'scroll-button';
		scrollButton.style = `
			position: fixed;
			background-color: rgba(250, 250, 250, 0.9);
			color: black;
			font-weight: bold;
			font-size: 1rem;
			bottom: 0.6rem;
			right: 6rem;
			padding: 0.4rem;
			border-radius: 11px;
			font-family: Noto Sans, Arial, sans-serif;
			z-index: 9;
		`;
		scrollButton.textContent = '↓';

		// Listen for click and perform autoScroll or stopScroll
		scrollButton.addEventListener('click', ev => {
			ev.preventDefault();
			if (isScrolling) {
				stopScroll();
			} else {
				time = time || prompt("Speed in ms (you'l get an alert when done):");
				autoScroll(time);
				toggleButtonText();
			}
		});

		document.body.appendChild(scrollButton);
	}, 2000);
})();
