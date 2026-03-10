"use strict";


export default function shrinkHeader() {
	const header = document.querySelector(".header");

	window.addEventListener("scroll", ()=>{
		header.classList.toggle("scrolled", window.scrollY > 10)
	})
}