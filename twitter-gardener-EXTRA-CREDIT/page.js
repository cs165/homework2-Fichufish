// TODO(you): Add your own positive messages if you'd like!
const POSITIVE_MESSAGES = [
  'You are worthy.',
  'You are enough.',
  'Be kind and forgiving to yourself.',
  'You are amazing.',
  'It\'s okay not to be okay.',
  'It\'s enough to just breathe.',
  'You are loved.',
  'I believe in you.',
  'You can do it!',
  'You are not a failure.',
  'You matter.',
  'Your life matters.',
  'Owowowowowowowowo.'
];

chrome.runtime.onConnect.addListener(function(port) {
  port.onMessage.addListener(onMessage);
});

function changeTheWord(event) {
	event.stopPropagation();
	const p = event.currentTarget.querySelector('div.content p.TweetTextSize.TweetTextSize--normal.js-tweet-text.tweet-text');
	const index = Math.floor(Math.random() * POSITIVE_MESSAGES.length);
	if(p !== undefined && p.nodeName == "P") {
		p.textContent = POSITIVE_MESSAGES[index];
	}
}

function changeBackground(event) {
	const bgdiv = event.currentTarget.querySelector('div');
	bgdiv.style.backgroundImage = 'url(' + bgurl + ')';
	bgdiv.style.backgroundRepeat = 'repeat';
	bgdiv.style.opacity = '0.8';
	bgdiv.style.cursor = 'url(' + csurl + ') 4 12, auto';
}

function removeBackground(event) {
	const bgdiv = event.currentTarget.querySelector('div');
	bgdiv.style.backgroundImage = '';
	bgdiv.style.backgroundRepeat = '';
	bgdiv.style.opacity = '';
	bgdiv.style.cursor = '';
}



function onMessage(gardeningInProgress) {
  // TODO(you): Implement this function for extra credit! Add helper functions
  // as needed.

  // NOTE: This extension is EXTRA CREDIT and is not required for HW2.

  // If `gardeningInProgress` is true, that means "Start Gardening" was clicked.
  // If `gardeningInProgress` is false, that means "Stop Gardening" was clicked.
	const boxes = document.querySelectorAll('li.js-stream-item.stream-item.stream-item');
	if(gardeningInProgress) {
		console.log('Gardening start');
		for(const box of boxes) {
			box.addEventListener('click', changeTheWord);
			box.addEventListener('mouseover', changeBackground);
			box.addEventListener('mouseout', removeBackground);
		}
	}
	else {
		console.log('Gardening end');
		for(const box of boxes) {
			box.removeEventListener('click', changeTheWord);
			box.removeEventListener('mouseover', changeBackground);
			box.removeEventListener('mouseout', removeBackground);
		}
	}
}

const bgurl = chrome.runtime.getURL('images/sparkle.gif');
const csurl = chrome.runtime.getURL('images/rose-cursor.gif');