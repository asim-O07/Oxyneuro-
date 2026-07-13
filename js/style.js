/* ==========================================
   OXY NEURO
   script.js
========================================== */

// ===============================
// Mobile Navigation
// ===============================

const menuBtn = document.querySelector(".menu-btn");
const navbar = document.querySelector(".navbar");

if (menuBtn && navbar) {

    menuBtn.addEventListener("click", () => {

        navbar.classList.toggle("active");

        const icon = menuBtn.querySelector("i");

        if (navbar.classList.contains("active")) {
            icon.className = "ri-close-line";
        } else {
            icon.className = "ri-menu-3-line";
        }

    });

}

// ===============================
// Close Menu After Clicking Link
// ===============================

document.querySelectorAll(".navbar a").forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("active");

        const icon = menuBtn.querySelector("i");

        icon.className = "ri-menu-3-line";

    });

});

// ===============================
// Sticky Header Effect
// ===============================

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.style.background = "rgba(5,8,22,.90)";
        header.style.backdropFilter = "blur(20px)";
        header.style.boxShadow = "0 10px 30px rgba(0,0,0,.35)";

    } else {

        header.style.background = "rgba(5,8,22,.55)";
        header.style.boxShadow = "none";

    }

});

// ===============================
// Scroll Reveal Animation
// ===============================

const reveals = document.querySelectorAll(

    ".feature-card, .community-card, .stat, .timeline, .roadmap-left, .hero-left, .hero-right"

);

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

        }

    });

}, {

    threshold: 0.15

});

reveals.forEach(item => {

    item.style.opacity = "0";
    item.style.transform = "translateY(40px)";
    item.style.transition = "all .8s ease";

    observer.observe(item);

});

// ===============================
// Smooth Scroll
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior: "smooth"

        });

    });

});

// ===============================
// Hero Floating Animation
// ===============================

const heroImage = document.querySelector(".hero-image");

if (heroImage) {

    document.addEventListener("mousemove", (e) => {

        const x = (window.innerWidth / 2 - e.clientX) / 45;
        const y = (window.innerHeight / 2 - e.clientY) / 45;

        heroImage.style.transform =
            `rotateY(${-x}deg) rotateX(${y}deg)`;

    });

    document.addEventListener("mouseleave", () => {

        heroImage.style.transform =
            "rotateX(0deg) rotateY(0deg)";

    });

}

// ===============================
// Current Year
// ===============================

const year = document.querySelector(".current-year");

if (year) {

    year.textContent = new Date().getFullYear();

}

console.log("🚀 Oxy Neuro Loaded Successfully");
