const menuBtn = document.getElementById("menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

/* NAVBAR BACKGROUND ON SCROLL */

window.addEventListener("scroll", () => {

    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 50) {
        navbar.style.background = "rgba(255,255,255,0.98)";
        navbar.style.boxShadow = "0 2px 20px rgba(0,0,0,0.08)";
    } else {
        navbar.style.background = "rgba(255,255,255,0.92)";
        navbar.style.boxShadow = "0 2px 20px rgba(0,0,0,0.05)";
    }
});