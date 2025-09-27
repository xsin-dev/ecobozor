const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minsEl = document.getElementById("mins");
const secEl = document.getElementById("sec");

let countdownDate = new Date("Sep 30, 2025 21:59:59").getTime();

let timer = setInterval(function () {
    let now = new Date().getTime();
    let distance = countdownDate - now;

    if (distance < 0) {
        clearInterval(timer);
        const box = document.querySelector(".promotions__box-countdown");
        if (box) {
            box.innerHTML = "<span style='color: white; background-color: red; padding: 8px 20px; border-radius: 10px; font-weight: 500; font-size: 20px;'>Expired!</span>";
        }
        return;
    }

    // Kun, soat, minut, sekund hisoblash
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // DOM mavjud bo'lsa, chiqarish
    if (daysEl) daysEl.innerText = days.toString().padStart(2, "0");
    if (hoursEl) hoursEl.innerText = hours.toString().padStart(2, "0");
    if (minsEl) minsEl.innerText = minutes.toString().padStart(2, "0");
    if (secEl) secEl.innerText = seconds.toString().padStart(2, "0");
}, 1000);


const galleryView = document.getElementById("detailsGalleryView");
const thumbs = document.querySelectorAll(".details__gallery-thumb");
const arrowUp = document.querySelector(".details__gallery-arrow--up");
const arrowDown = document.querySelector(".details__gallery-arrow--down");

function setActiveThumb(newActive) {
    // Avvalgi active olib tashlanadi
    thumbs.forEach(t => t.classList.remove("details__gallery-thumb--active"));
    // Yangi active qo‘shiladi
    newActive.classList.add("details__gallery-thumb--active");

    // Asosiy rasm o‘zgaradi
    const img = newActive.querySelector(".details__gallery-thumb-image");
    galleryView.src = img.dataset.large;
}

// ↑ yuqoriga o'tkazish
if (arrowUp) {
    arrowUp.addEventListener("click", () => {
        const active = document.querySelector(".details__gallery-thumb--active");
        const prev = active.previousElementSibling;
        if (prev) setActiveThumb(prev);
    });
}

// ↓ pastga o'tkazish
if (arrowDown) {
    arrowDown.addEventListener("click", () => {
        const active = document.querySelector(".details__gallery-thumb--active");
        const next = active.nextElementSibling;
        if (next) setActiveThumb(next);
    });
}

// Bosilganda ham ishlashi uchun (thumb click)
thumbs.forEach(thumb => {
    thumb.addEventListener("click", () => setActiveThumb(thumb));
});


// DETAILS TABS
const detailsTabs = document.querySelectorAll(".details__info-tab");
const detailsInfo = document.querySelectorAll(".details__info-wrapper");

detailsTabs.forEach(tab => {
    tab.addEventListener("click", () => {
        const target = tab.dataset.tab; // qaysi content kerakligini olamiz

        // Hamma tablardan active olib tashlash
        detailsTabs.forEach(t => t.classList.remove("details__info-tab--active"));
        // Hamma contentlardan active olib tashlash
        detailsInfo.forEach(c => c.classList.remove("details__info-wrapper--active"));

        // Bosilganga qo‘shish
        tab.classList.add("details__info-tab--active");
        document.querySelector(`[data-content="${target}"]`).classList.add("details__info-wrapper--active");
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const quantities = document.querySelectorAll(".quantity");

    quantities.forEach((quantity) => {
        const counter = quantity.querySelector(".quantity-counter");
        const increaseBtn = quantity.querySelector(".increase");
        const decreaseBtn = quantity.querySelector(".decrease");

        if (!counter || !increaseBtn || !decreaseBtn) return; // agar topilmasa tashlab ketadi

        let count = parseInt(counter.textContent);

        increaseBtn.addEventListener("click", () => {
            count++;
            counter.textContent = count;
        });

        decreaseBtn.addEventListener("click", () => {
            if (count > 1) {
                count--;
                counter.textContent = count;
            }
        });
    });
});



// SHOW MODAL 
const heroModal = document.querySelector(".hero-modal")
const heroModalWrapper = document.querySelector(".hero-modal__wrapper")
const modalOpenBtn = document.getElementById('modalOpen')
const modalCloseBtn = document.getElementById('modalClose')

modalOpenBtn.addEventListener('click', () => {
    heroModal.classList.add("hero-modal--show")
    // heroModalWrapper.classList.add("hero-modal--show")
    document.body.style.overflow = "hidden"; // scrollni o‘chiradi
})

modalCloseBtn.addEventListener('click', () => {
    heroModal.classList.remove("hero-modal--show")
    // heroModalWrapper.classList.remove("hero-modal--show")
    document.body.style.overflow = ""; // scrollni o‘chiradi
})

// // SHOW DRAWER
const heroDrawer = document.querySelector(".hero-drawer");
const drawerOpenBtn = document.getElementById("drawerOpen");
const drawerCloseBtn = document.getElementById("drawerClose");
const heroDrawerWrapper = document.querySelector(".hero-drawer__wrapper");

drawerOpenBtn.addEventListener("click", () => {
    heroDrawer.classList.add("hero-drawer--show");
    document.body.style.overflow = "hidden"; // scrollni o‘chiradi
});

drawerCloseBtn.addEventListener("click", () => {
    heroDrawer.classList.remove("hero-drawer--show");
    document.body.style.overflow = ""; // scrollni qaytaradi
});

heroDrawer.addEventListener("click", (e) => {
    if (!heroDrawerWrapper.contains(e.target)) {
        heroDrawer.classList.remove("hero-drawer--show");
        document.body.style.overflow = "";
    }
});
