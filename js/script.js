const carousels = document.querySelectorAll(".service-carousel");

carousels.forEach((carousel) => {

    const images = carousel.querySelectorAll("img");
    const dots = carousel.querySelectorAll(".dot");

    const prevBtn = carousel.querySelector(".prev");
    const nextBtn = carousel.querySelector(".next");

    let currentIndex = 0;

    function showImage(index) {

        images.forEach((image) => {
            image.classList.remove("active");
        });

        dots.forEach((dot) => {
            dot.classList.remove("active");
        });

        images[index].classList.add("active");
        dots[index].classList.add("active");
    }

    nextBtn.addEventListener("click", () => {

        currentIndex++;

        if (currentIndex >= images.length) {
            currentIndex = 0;
        }

        showImage(currentIndex);
    });

    prevBtn.addEventListener("click", () => {

        currentIndex--;

        if (currentIndex < 0) {
            currentIndex = images.length - 1;
        }

        showImage(currentIndex);
    });

});

const pricingTabs = document.querySelectorAll(".pricing-tab");
const pricingContents = document.querySelectorAll(".pricing-content");

pricingTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        const target = tab.dataset.target;

        pricingTabs.forEach((button) => {
            button.classList.remove("active");
        });

        pricingContents.forEach((content) => {
            content.classList.remove("active");
        });

        tab.classList.add("active");
        document.getElementById(target).classList.add("active");
    });
});


const bookingButton = document.getElementById("bookingButton");
const bookingTabs = document.querySelectorAll(".booking-tab");
const bookingOptionsGroups = document.querySelectorAll(".booking-options");
const bookingOptions = document.querySelectorAll(".booking-option");

bookingTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        const target = tab.dataset.bookingTab;

        bookingTabs.forEach((button) => {
            button.classList.remove("active");
        });

        bookingOptionsGroups.forEach((group) => {
            group.classList.remove("active");
        });

        tab.classList.add("active");
        document.getElementById(target).classList.add("active");
    });
});

bookingOptions.forEach((option) => {
    option.addEventListener("click", () => {
        option.classList.toggle("selected");
    });
});

if (bookingButton) {
    bookingButton.addEventListener("click", () => {
        const selectedOptions = document.querySelectorAll(".booking-option.selected");

        let services = [];

        selectedOptions.forEach((option) => {
            services.push(option.dataset.service);
        });

        const date = document.getElementById("bookingDate").value;
        const time = document.getElementById("bookingTime").value;
        const name = document.getElementById("bookingName").value;
        const phone = document.getElementById("bookingPhone").value;
        const message = document.getElementById("bookingMessage").value;

        if (services.length === 0 || !date || !time || !name) {
            alert("Merci de choisir au moins une expérience, une date, une heure et votre nom.");
            return;
        }

        const whatsappNumber = "221776722346";

        const servicesText = services
            .map((service) => `- ${service}`)
            .join("%0A");

        const whatsappMessage =
            `Bonjour Reboot Room,%0A%0A` +
            `Je souhaite faire une demande de réservation.%0A%0A` +
            `Expériences choisies :%0A${servicesText}%0A%0A` +
            `Date : ${date}%0A` +
            `Heure : ${time}%0A` +
            `Nom : ${name}%0A` +
            `Téléphone : ${phone || "WhatsApp"}%0A` +
            `Commentaire : ${message || "Aucun"}%0A%0A` +
            `Merci de me confirmer la disponibilité.`;

        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

        window.open(whatsappURL, "_blank");
    });
}






const menuToggle = document.getElementById("menuToggle");
const nav = document.querySelector("nav");
const navLinks = document.querySelectorAll("nav a");

if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
}

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        nav.classList.remove("active");
    });
});