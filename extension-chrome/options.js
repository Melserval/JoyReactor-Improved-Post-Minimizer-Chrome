"use strict";
// messages page
document.head.querySelector("title").textContent = chrome.i18n.getMessage('options_window_title');
document.body.querySelector("#legend_1").textContent = chrome.i18n.getMessage('option_fieldset_title');
document.body.querySelector("label[for='btn-position-left'").textContent = chrome.i18n.getMessage('btn_location_left');
document.body.querySelector("label[for='btn-position-right'").textContent = chrome.i18n.getMessage('btn_location_right');

chrome.storage.local.get(["btn_narrow_position"], function(value) {
	switch (value.btn_narrow_position) {
		case 'left': 
			document.getElementById("btn-position-left").checked = true;
			break;
		case 'right':
			document.getElementById("btn-position-right").checked = true;
			break;
	}
});

document.forms[0].addEventListener("change", (e) => {
	if (e.target.nodeName == "INPUT") {
		chrome.storage.local.set({"btn_narrow_position": e.target.defaultValue});
		chrome.runtime.sendMessage(chrome.runtime.id, {type: "setposition",  position: e.target.defaultValue });
	}
});
