/* CARROUSELS SERVICES */
const carousels = document.querySelectorAll(".service-carousel");

carousels.forEach((carousel) => {
    const images = carousel.querySelectorAll("img");
    const dots = carousel.querySelectorAll(".dot");
    const prevBtn = carousel.querySelector(".prev");
    const nextBtn = carousel.querySelector(".next");

    let currentIndex = 0;

    function showImage(index) {
        images.forEach((image) => image.classList.remove("active"));
        dots.forEach((dot) => dot.classList.remove("active"));

        if (images[index]) images[index].classList.add("active");
        if (dots[index]) dots[index].classList.add("active");
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            currentIndex = currentIndex >= images.length - 1 ? 0 : currentIndex + 1;
            showImage(currentIndex);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            currentIndex = currentIndex <= 0 ? images.length - 1 : currentIndex - 1;
            showImage(currentIndex);
        });
    }
});


/* ONGLES TARIFS PAGE ACCUEIL */
const pricingTabs = document.querySelectorAll(".pricing-tab");
const pricingContents = document.querySelectorAll(".pricing-content");

pricingTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        const target = tab.dataset.target;

        pricingTabs.forEach((button) => button.classList.remove("active"));
        pricingContents.forEach((content) => content.classList.remove("active"));

        tab.classList.add("active");

        const targetContent = document.getElementById(target);
        if (targetContent) targetContent.classList.add("active");
    });
});


/* RESERVATION */
const bookingButton = document.getElementById("bookingButton");
const bookingTabs = document.querySelectorAll(".booking-tab");
const bookingOptionsGroups = document.querySelectorAll(".booking-options");
const bookingOptions = document.querySelectorAll(".booking-option");
const bookingSummaryList = document.getElementById("bookingSummaryList");
const bookingTotal = document.getElementById("bookingTotal");
const giftCardAmountInput = document.getElementById("giftCardAmount");

bookingTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        const target = tab.dataset.bookingTab;

        bookingTabs.forEach((button) => button.classList.remove("active"));
        bookingOptionsGroups.forEach((group) => group.classList.remove("active"));

        tab.classList.add("active");

        const targetGroup = document.getElementById(target);
        if (targetGroup) targetGroup.classList.add("active");
    });
});

function formatPrice(price) {
    return price.toLocaleString("fr-FR") + " FCFA";
}

function getGiftCardAmount() {
    if (!giftCardAmountInput) return 0;

    const amount = parseInt(giftCardAmountInput.value, 10);
    return isNaN(amount) || amount <= 0 ? 0 : amount;
}

function getPriceNumber(option) {
    if (option.dataset.gift === "true") {
        return getGiftCardAmount();
    }

    const priceText = option.querySelector("strong").textContent;

    return parseInt(
        priceText
            .replace(/\s/g, "")
            .replace("FCFA", ""),
        10
    );
}

function getServiceName(option) {
    if (option.dataset.gift === "true") {
        const amount = getGiftCardAmount();

        return amount > 0
            ? `Carte cadeau — ${formatPrice(amount)}`
            : "Carte cadeau — montant à définir";
    }

    return option.dataset.service;
}

function updateBookingSummary() {
    if (!bookingSummaryList || !bookingTotal) return;

    const selectedOptions = document.querySelectorAll(".booking-option.selected");

    bookingSummaryList.innerHTML = "";

    if (selectedOptions.length === 0) {
        bookingSummaryList.innerHTML = "<li>Aucune expérience sélectionnée</li>";
        bookingTotal.textContent = "0 FCFA";
        return;
    }

    let total = 0;

    selectedOptions.forEach((option) => {
        const serviceName = getServiceName(option);
        const price = getPriceNumber(option);

        total += price;

        const li = document.createElement("li");
        li.textContent = serviceName;

        bookingSummaryList.appendChild(li);
    });

    bookingTotal.textContent = formatPrice(total);
}

bookingOptions.forEach((option) => {
    option.addEventListener("click", () => {
        option.classList.toggle("selected");
        updateBookingSummary();
    });
});

if (giftCardAmountInput) {
    giftCardAmountInput.addEventListener("input", updateBookingSummary);
}

if (bookingButton) {
    bookingButton.addEventListener("click", () => {
        const selectedOptions = document.querySelectorAll(".booking-option.selected");

        let services = [];
        let total = 0;
        let giftWithoutAmount = false;

        selectedOptions.forEach((option) => {
            const price = getPriceNumber(option);

            if (option.dataset.gift === "true" && price <= 0) {
                giftWithoutAmount = true;
            }

            services.push(getServiceName(option));
            total += price;
        });

        const date = document.getElementById("bookingDate").value;
        const time = document.getElementById("bookingTime").value;
        const name = document.getElementById("bookingName").value;
        const phone = document.getElementById("bookingPhone").value;
        const message = document.getElementById("bookingMessage").value;

        if (selectedOptions.length === 0) {
            alert("Merci de choisir au moins une expérience ou une carte cadeau.");
            return;
        }

        if (giftWithoutAmount) {
            alert("Merci d’indiquer le montant de la carte cadeau.");
            return;
        }

        if (!date || !time || !name) {
            alert("Merci de choisir une date, une heure et votre nom.");
            return;
        }

        const whatsappNumber = "221776722346";

        const servicesText = services
            .map((service) => `- ${service}`)
            .join("%0A");

        const totalText = formatPrice(total);

        const whatsappMessage =
            `Bonjour Reboot Room,%0A%0A` +
            `Je souhaite faire une demande de réservation.%0A%0A` +
            `Expériences choisies :%0A${servicesText}%0A%0A` +
            `Total : ${totalText}%0A%0A` +
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


/* MENU MOBILE */
const menuToggle = document.getElementById("menuToggle");
const nav = document.querySelector("nav");
const navLinks = document.querySelectorAll("nav a");

if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
}

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        if (nav) nav.classList.remove("active");
    });
});