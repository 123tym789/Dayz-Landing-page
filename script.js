// ===============================
// DAYZ SURVIVAL WEBSITE JAVASCRIPT
// ===============================

// -------------------------------
// MOBILE NAVIGATION
// -------------------------------

const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");

if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
        const isOpen = mainNav.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );
    });

    // Close menu after clicking a navigation link
    document.querySelectorAll("#mainNav a").forEach(link => {
        link.addEventListener("click", () => {
            mainNav.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}


// -------------------------------
// ACCORDION
// -------------------------------

const accordionItems = document.querySelectorAll(".accordion-item");

accordionItems.forEach(item => {

    const trigger = item.querySelector(".accordion-trigger");
    const panel = item.querySelector(".accordion-panel");

    trigger.addEventListener("click", () => {

        const isActive = item.classList.contains("active");

        // Close every accordion item
        accordionItems.forEach(otherItem => {

            otherItem.classList.remove("active");

            const otherTrigger =
                otherItem.querySelector(".accordion-trigger");

            const otherPanel =
                otherItem.querySelector(".accordion-panel");

            otherTrigger.setAttribute(
                "aria-expanded",
                "false"
            );

            otherPanel.style.maxHeight = null;
        });

        // Open selected item
        if (!isActive) {

            item.classList.add("active");

            trigger.setAttribute(
                "aria-expanded",
                "true"
            );

            panel.style.maxHeight =
                panel.scrollHeight + "px";
        }
    });
});


// Open first accordion item by default

const firstAccordion =
    document.querySelector(".accordion-item.active");

if (firstAccordion) {

    const panel =
        firstAccordion.querySelector(".accordion-panel");

    panel.style.maxHeight =
        panel.scrollHeight + "px";
}


// -------------------------------
// GEAR / WEAPON STYLE CAROUSEL
// -------------------------------

const gearCards =
    document.querySelectorAll(".gear-card");

const nextGear =
    document.querySelector("#nextGear");

const previousGear =
    document.querySelector("#prevGear");

let currentGear = 0;


function updateGear() {

    gearCards.forEach((card, index) => {

        card.classList.toggle(
            "active",
            index === currentGear
        );

    });
}


// Next button

if (nextGear) {

    nextGear.addEventListener("click", () => {

        currentGear++;

        if (currentGear >= gearCards.length) {
            currentGear = 0;
        }

        updateGear();
    });
}


// Previous button

if (previousGear) {

    previousGear.addEventListener("click", () => {

        currentGear--;

        if (currentGear < 0) {
            currentGear = gearCards.length - 1;
        }

        updateGear();
    });
}


// -------------------------------
// LIGHTBOX / IMAGE GALLERY
// -------------------------------

const lightbox =
    document.querySelector("#lightbox");

const lightboxImage =
    document.querySelector("#lightboxImage");

const lightboxCaption =
    document.querySelector("#lightboxCaption");

const lightboxClose =
    document.querySelector("#lightboxClose");

const lightboxButtons =
    document.querySelectorAll("[data-lightbox]");


lightboxButtons.forEach(button => {

    button.addEventListener("click", () => {

        const image =
            button.getAttribute("data-lightbox");

        const caption =
            button.getAttribute("data-caption");

        lightboxImage.src = image;

        lightboxImage.alt =
            caption || "DayZ image";

        lightboxCaption.textContent =
            caption || "";

        lightbox.classList.add("open");

        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );
    });
});


// Close lightbox

function closeLightbox() {

    lightbox.classList.remove("open");

    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );

    lightboxImage.src = "";
}


if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );
}


// Close when clicking outside image

if (lightbox) {

    lightbox.addEventListener("click", event => {

        if (event.target === lightbox) {
            closeLightbox();
        }

    });
}


// Close with ESC key

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeLightbox();
    }

});


// -------------------------------
// HEADER SCROLL EFFECT
// -------------------------------

const header =
    document.querySelector(".site-header");


window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 30) {

        header.style.background =
            "rgba(5, 7, 6, 0.96)";

        header.style.backdropFilter =
            "blur(14px)";

    } else {

        header.style.background =
            "linear-gradient(180deg, rgba(5,7,6,.95), rgba(5,7,6,.55))";
    }

});


// -------------------------------
// HERO PARTICLES
// -------------------------------

const particleContainer =
    document.querySelector(".particles");


if (particleContainer) {

    for (let i = 0; i < 30; i++) {

        const particle =
            document.createElement("i");

        particle.style.left =
            Math.random() * 100 + "%";

        particle.style.top =
            Math.random() * 100 + "%";

        particle.style.animationDelay =
            Math.random() * 6 + "s";

        particle.style.animationDuration =
            5 + Math.random() * 7 + "s";

        particleContainer.appendChild(
            particle
        );
    }
}


// -------------------------------
// SMOOTH SCROLL
// -------------------------------

document.querySelectorAll(
    'a[href^="#"]'
).forEach(link => {

    link.addEventListener("click", event => {

        const targetID =
            link.getAttribute("href");

        if (
            targetID &&
            targetID !== "#"
        ) {

            const target =
                document.querySelector(targetID);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        }
    });

});


// -------------------------------
// SIMPLE SCROLL REVEAL
// -------------------------------

const revealElements =
    document.querySelectorAll(
        ".section-heading, .gear-card, .map-card, .clothing-grid article, .character-panel, .video-frame"
    );


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );
                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    element.classList.add("reveal");

    revealObserver.observe(element);

});


// -------------------------------
// KEYBOARD ACCESSIBILITY
// -------------------------------

document.addEventListener(
    "keydown",
    event => {

        // Close mobile menu with Escape

        if (
            event.key === "Escape" &&
            mainNav
        ) {

            mainNav.classList.remove(
                "open"
            );

            if (menuToggle) {

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }
        }
    }
);


// -------------------------------
// CONSOLE MESSAGE
// -------------------------------

console.log(
    "%cDAYZ // SURVIVE",
    "color:#d92824;font-size:24px;font-weight:bold;"
);

console.log(
    "Survive. Adapt. Endure."
);