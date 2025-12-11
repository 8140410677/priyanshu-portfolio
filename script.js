// Simple helpers
const $ = q => document.querySelector(q);
const $$ = q => document.querySelectorAll(q);

// YEAR
$("#year").textContent = new Date().getFullYear();

// MOBILE NAV
$("#hamburger").addEventListener("click", () => {
    const nav = document.querySelector("header nav");
    if (nav.style.display === "flex") {
        nav.style.display = "none";
    } else {
        nav.style.display = "flex";
        nav.style.flexDirection = "column";
        nav.style.position = "absolute";
        nav.style.top = "64px";
        nav.style.right = "20px";
        nav.style.background = "var(--card)";
        nav.style.padding = "12px";
        nav.style.borderRadius = "10px";
        nav.style.boxShadow = "0 8px 30px rgba(16,24,40,0.08)";
    }
});

// SMOOTH SCROLL + close mobile nav on click
$$("header nav a").forEach(a => {
    a.addEventListener("click", e => {
        e.preventDefault();
        const t = document.querySelector(a.getAttribute("href"));
        if (!t) return;
        const top = t.offsetTop - 70;
        window.scrollTo({ top, behavior: "smooth" });
        const nav = document.querySelector("header nav");
        if (window.innerWidth <= 900) nav.style.display = "none";
    });
});

// FADE-IN on scroll
const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add("fade-in");
            obs.unobserve(e.target);
        }
    });
}, { threshold: 0.15 });
$$(".opacity-0").forEach(el => observer.observe(el));

// CONTACT FORM -> open WhatsApp with prefilled message
$("#contactForm").addEventListener("submit", e => {
    e.preventDefault();
    const status = $("#formStatus");
    const name = encodeURIComponent($("#name").value.trim());
    const email = encodeURIComponent($("#email").value.trim());
    const message = encodeURIComponent($("#message").value.trim());

    if (!name || !email || !message) {
        status.textContent = "Please fill all fields.";
        return;
    }

    status.textContent = "Opening WhatsApp...";

    // WhatsApp number (your number)
    const number = "918140410677";
    const text = `Hi Priyanshu, I am ${name}. Email: ${email}. Message: ${message}`;
    const waUrl = `https://wa.me/${number}?text=${encodeURIComponent(text)}`;

    // open in new tab
    window.open(waUrl, "_blank");

    setTimeout(() => {
        status.textContent = "Message opened in WhatsApp. If nothing opened, please click the WhatsApp link above.";
        $("#contactForm").reset();
    }, 800);
});

// Close mobile nav when resizing to large screens
window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
        document.querySelector("header nav").style.display = "flex";
        document.querySelector("header nav").style.position = "static";
    }
});
