//
// Сворачивает развернутый длинный пост в его исходное, компактное состояние.
//
// v 1.0.0 
// Сергей Мельников <serhii.melnykov@outlook.com>
// 2023
//
(function () {
"use strict";
const post_conteiner = document.getElementById("contentinner");
const btn_narrow_post = document.createElement("button");
Object.assign(btn_narrow_post.style, {
	backgroundImage: `url(${chrome.runtime.getURL('/content/img/zigzag.png')})`
});
btn_narrow_post.id = "__btn_post_narrow";
document.body.append(btn_narrow_post);

const btnNarrowPost = {
	element: btn_narrow_post,
	_position: "",
	cordForRight: null,
	cordForLeft: null,
	set position(value) {
		this._position = value;
		this.element.setAttribute("data-btn-position", value);
		this.updatePosition();
	},
	updatePosition() {
		if (this.cordForLeft && this._position == 'left') {
			this.element.style.right = this.cordForLeft + "px";
		} 
		else if (this.cordForRight && this._position == 'right') {
			this.element.style.right = this.cordForRight + "px";
		}
	},
	show() {
		this.updatePosition();
		setTimeout(() => this.element.style.display = "block");
	},
	hide() {
		this.element.style.display = "none";
	}
};
chrome.runtime.onMessage.addListener(function(request) {
	if (request.type == "position") {
		btnNarrowPost.position = request.position;
	}
});

window.addEventListener(
	"load",
	() => chrome.runtime.sendMessage(chrome.runtime.id, {"contentready": true})
);

let rect;
let post_content;
post_conteiner.addEventListener('click', function (e) {
	let trg = e.target.closest(".post_content_expand");
	if (trg) {
		post_content = trg.previousElementSibling;
		rect = post_content.getBoundingClientRect();
		btnNarrowPost.cordForRight = document.documentElement.clientWidth - rect.right;
		btnNarrowPost.cordForLeft = document.documentElement.clientWidth - rect.left;
		btnNarrowPost.show();
		const startScrollX = window.scrollX;
		const startScrollY = window.scrollY;
		const endPost = post_content.scrollHeight - 1000 + startScrollY;
		const endScroll = (e) => {
			if (window.scrollY > endPost) {
				btnNarrowPost.hide();
				btn_narrow_post.onclick = null;
				window.removeEventListener("scroll", endScroll);
			}
		}
		window.addEventListener("scroll", endScroll);
		btn_narrow_post.onclick = (e) => {
			post_content.style.maxHeight = "999px";
			trg.style.display = "block";
			btn_narrow_post.style.display = "none";
			window.removeEventListener("scroll", endScroll);
			window.scrollTo(startScrollX, startScrollY);
		};
	}
});
// --- end ---
}());
