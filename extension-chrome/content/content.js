//
// Сворачивает развернутый длинный пост в его исходное, компактное состояние.
//
// v 1.0.0 
// Сергей Мельников <serhii.melnykov@outlook.com>
// 2023
//
;(function () {
"use strict";

const post_conteiner = document.getElementById("contentinner");
const btn_narrow_post = document.createElement("button");
Object.assign(btn_narrow_post.style, {
	display: "none",
	width: "40px",
	height: "35px",
	backgroundColor: "#625858",
	backgroundImage: `url(${chrome.runtime.getURL('/content/img/zigzag.png')})`,
	position: "fixed",
	borderRadius: "0 0 3px 3px",
	border: "1px solid transparent",
	cursor: "pointer",
	right: "40px",
	top: "0px",
	zIndex: "9",
});
document.body.append(btn_narrow_post);


post_conteiner.addEventListener('click', function (e) {
	let trg = e.target.closest(".post_content_expand");
	if (trg) {
		const post_content = trg.previousElementSibling;
		const rect = post_content.getBoundingClientRect();
		const rightOffset = document.documentElement.clientWidth - rect.right - 45;
		btn_narrow_post.style.display = "block";
		btn_narrow_post.style.right = `${rightOffset}px`;
		const startScrollX = window.scrollX;
		const startScrollY = window.scrollY;
		const endPost = post_content.scrollHeight - 1000 + startScrollY;
		const endScroll = (e) => {
			if (window.scrollY > endPost) {
				btn_narrow_post.style.display = "none";
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
