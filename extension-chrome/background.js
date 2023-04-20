"use strict";

chrome.runtime.onMessage.addListener(function(request) {

	if (request.type == 'setposition') {
		chrome.tabs.query({ currentWindow: true }, function(tabs) {
			tabs.forEach(tab => chrome.tabs.sendMessage(tab.id, {type: "position", position: request.position}));
		});
	} 
	else if (request.contentready) {
		chrome.storage.local.get(["btn_narrow_position"], function(value) {
			
			if (value.btn_narrow_position === undefined) {
				chrome.storage.local.set({"btn_narrow_position": 'right'});
				value.btn_narrow_position = "right";
			}
			
			chrome.tabs.query({
				url: ["https://joyreactor.cc/*", "https://*.reactor.cc/*"], 
				currentWindow: true
				}, 
				function(tabs) {
					tabs.forEach(tab => chrome.tabs.sendMessage(tab.id, {
						type: "position", 
						position: value.btn_narrow_position
						})
					);
				}
			);
		});
	}
});
