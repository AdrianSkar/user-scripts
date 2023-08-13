// ==UserScript==
// @name        Zoom meeting in the browser
// @namespace   Violentmonkey Scripts
// @match       https://*.zoom.us/*
// @grant       none
// @version     1.0
// @author      Adrian Skar
// @description 5/29/2020, 3:54:07 PM
// ==/UserScript==

window.addEventListener("load", function () {
	var curU = window.location.href; // get current URL
	var newU = curU.replace('/j/', '/wc/join/'); // Set URL for running meeting in the browser
	var browMe = document.createElement('a');
	browMe.setAttribute('href', newU);
	browMe.innerHTML = 'Run in browser';

	document.querySelector('div[role="main"]').appendChild(browMe); // 
});

