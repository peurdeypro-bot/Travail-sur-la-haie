const imageDialog = document.querySelector(".image-zoom-dialog");
const zoomedImage = imageDialog.querySelector(".image-zoom-view");
const zoomCaption = imageDialog.querySelector(".image-zoom-caption");

document.querySelectorAll(".image-zoom-trigger").forEach((trigger) => {
    trigger.addEventListener("click", () => {
        const image = trigger.querySelector("img");
        zoomedImage.src = image.src;
        zoomedImage.alt = image.alt;
        zoomCaption.textContent = trigger.closest("figure").querySelector("figcaption").textContent;
        imageDialog.showModal();
    });
});

imageDialog.querySelector(".image-zoom-close").addEventListener("click", () => imageDialog.close());
imageDialog.addEventListener("click", (event) => {
    if (event.target === imageDialog) imageDialog.close();
});

document.querySelectorAll(".plant-category-button").forEach((button) => {
    button.addEventListener("click", () => {
        const selectedCategory = button.dataset.category;

        document.querySelectorAll(".plant-category-button").forEach((categoryButton) => {
            categoryButton.setAttribute("aria-pressed", String(categoryButton === button));
        });

        document.querySelectorAll(".plant-panel").forEach((panel) => {
            panel.hidden = panel.dataset.panel !== selectedCategory;
        });
    });
});

document.querySelectorAll(".plant-panel").forEach((panel) => {
    const cards = [...panel.querySelectorAll(".plant-card")];
    const controls = panel.querySelector(".plant-carousel-controls");
    const status = panel.querySelector(".plant-carousel-status");
    let currentIndex = 0;

    function updateCarousel() {
        cards.forEach((card, index) => {
            card.hidden = index !== currentIndex;
        });
        controls.hidden = cards.length < 2;
        status.textContent = `Plante ${currentIndex + 1} sur ${cards.length} : ${cards[currentIndex].querySelector("h4").textContent}`;
    }

    panel.querySelectorAll(".plant-carousel-button").forEach((button) => {
        button.addEventListener("click", () => {
            currentIndex = (currentIndex + Number(button.dataset.direction) + cards.length) % cards.length;
            updateCarousel();
        });
    });

    updateCarousel();
});
