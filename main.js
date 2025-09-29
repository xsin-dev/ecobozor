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


// TESTIMONIALS CAROUSEL ======================================================================================================
const testimonialsNext = document.querySelector('.testimonials__header-button--next')
const testimonialsPrev = document.querySelector('.testimonials__header-button--prev')
const testimonialsCarousel = document.querySelector('.testimonials__cards')

const dots = document.querySelector('.testimonials__dots')


let currentIndex = 0;
let interval;

const testimonials = [
    {
        id: 1,
        quote: "Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget",
        authorName: "Robert Fox",
        authorRole: "Customer",
        authorImage: "./assets/images/png/testimonials-user1.jpg",
        quotation: './assets/images/svg/quotation-icon.svg',
        rating: 5,
    },
    {
        id: 2,
        quote: "Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. ",
        authorName: "Dianne Russell",
        authorRole: "Customer",
        authorImage: "./assets/images/png/testimonials-user2.jpg",
        quotation: './assets/images/svg/quotation-icon.svg',
        rating: 3
    },
    {
        id: 3,
        quote: "Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. DPellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. DPellentesque eu nibh eget mauris congue mattis mattis nec tellus. ",
        authorName: "Eleanor Pena",
        authorRole: "Customer",
        authorImage: "./assets/images/png/testimonials-user3.jpg",
        quotation: './assets/images/svg/quotation-icon.svg',
        rating: 4
    },
    {
        id: 2,
        quote: "Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. ",
        authorName: " Russell",
        authorRole: "Customer",
        authorImage: "./assets/images/png/testimonials-user2.jpg",
        quotation: './assets/images/svg/quotation-icon.svg',
        rating: 3
    },
    {
        id: 3,
        quote: "Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. DPellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. DPellentesque eu nibh eget mauris congue mattis mattis nec tellus. ",
        authorName: "Eleanor",
        authorRole: "Customer",
        authorImage: "./assets/images/png/testimonials-user3.jpg",
        quotation: './assets/images/svg/quotation-icon.svg',
        rating: 4
    },
    {
        id: 2,
        quote: "Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. ",
        authorName: " Russell",
        authorRole: "Customer",
        authorImage: "./assets/images/png/testimonials-user2.jpg",
        quotation: './assets/images/svg/quotation-icon.svg',
        rating: 3
    },
    {
        id: 3,
        quote: "Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. DPellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. DPellentesque eu nibh eget mauris congue mattis mattis nec tellus. ",
        authorName: "Eleanor",
        authorRole: "Customer",
        authorImage: "./assets/images/png/testimonials-user3.jpg",
        quotation: './assets/images/svg/quotation-icon.svg',
        rating: 4
    },
]


testimonials.map((item, index) => {
    // CREATE ELEMENTS
    const testimonialCard = document.createElement('div')
    const testimonialCardQuotation = document.createElement('img')
    const testimonialCardText = document.createElement('p')
    const testimonialCardBottom = document.createElement('div')
    const testimonialCardUser = document.createElement('div')
    const testimonialCardUserImg = document.createElement('img')
    const testimonialCardUserInfo = document.createElement('div')
    const testimonialCardUserName = document.createElement('p')
    const testimonialCardUserRole = document.createElement('p')
    const testimonialCardRating = document.createElement('div')

    // ADD Classlist
    testimonialCard.classList.add('testimonials__card')
    testimonialCardQuotation.classList.add('testimonials__card-quotation')
    testimonialCardText.classList.add('testimonials__card-text')
    testimonialCardBottom.classList.add('testimonials__card-bottom')
    testimonialCardUser.classList.add('testimonials__card-user')
    testimonialCardUserImg.classList.add('testimonials__card-user-img')
    testimonialCardUserInfo.classList.add('testimonials__card-user-info')
    testimonialCardUserName.classList.add('testimonials__card-user-name')
    testimonialCardUserRole.classList.add('testimonials__card-user-position')
    testimonialCardRating.classList.add('testimonials__card-rating')

    // OBYEKT bilan bog'lash
    testimonialCardQuotation.src = item.quotation
    testimonialCardText.textContent = item.quote
    testimonialCardUserImg.src = item.authorImage
    testimonialCardUserName.textContent = item.authorName
    testimonialCardUserRole.textContent = item.authorRole

    // Yulduzchalarni yaratish
    for (let i = 0; i < 5; i++) {
        const star = document.createElement('i')

        if (i < item.rating) {
            star.classList.add("fa-solid", "fa-star")
        } else {
            star.classList.add('fa-regular', 'fa-star')
        }
        testimonialCardRating.append(star)
    }

    // ======== DOTS ====
    if (index <= testimonials.length - 3) {
        const dot = document.createElement('div')
        dot.classList.add('testimonials__dot')

        dot.addEventListener('click', () => {
            currentIndex = index;
            testimonialsCarousel.style.transform = `translateX(-${currentIndex * 33.33}%)`

            dots.querySelectorAll('.testimonials__dot').forEach((dot) => {
                dot.classList.remove('testimonials__dot--active')
            })
            dots.querySelectorAll('.testimonials__dot')[currentIndex].classList.add('testimonials__dot--active')

            startCarousel()
        })
        if (index === currentIndex) {
            dot.classList.add('testimonials__dot--active')
        }
        dots.appendChild(dot)
    }
    // =================

    // APPEND qilish yani qo'shish HTML ga 
    testimonialCardUserInfo.append(testimonialCardUserName, testimonialCardUserRole)

    testimonialCardUser.append(testimonialCardUserImg, testimonialCardUserInfo)

    testimonialCardBottom.append(testimonialCardUser, testimonialCardRating)

    testimonialCard.append(testimonialCardQuotation, testimonialCardText, testimonialCardBottom)

    testimonialsCarousel.appendChild(testimonialCard, dots)
})

// Next button
testimonialsNext.addEventListener('click', () => {
    if (currentIndex === testimonials.length - 3) {
        currentIndex = 0
    } else {
        currentIndex++;

    }
    updateCarousel()
    startCarousel()
})
// Prev button
testimonialsPrev.addEventListener('click', () => {
    if (currentIndex === 0) {
        currentIndex = testimonials.length - 3
    } else {
        currentIndex--;
    }
    updateCarousel()
    startCarousel()
})
// ======= startCarousel chaqirildi ======
startCarousel()
// =======================================

// bir nechta joyda qaytarilgan amalni bitta funksiyaga olish 
function updateCarousel() {
    testimonialsCarousel.style.transform = `translateX(-${currentIndex * 33.33}%)`
    dots.querySelectorAll('.testimonials__dot').forEach((dot) => {
        dot.classList.remove('testimonials__dot--active')
    })
    dots.querySelectorAll('.testimonials__dot')[currentIndex].classList.add('testimonials__dot--active')
}

// SetInterval ishlatish funksiyasi
function startCarousel() {
    clearInterval(interval);

    interval = setInterval(() => {
        if (currentIndex === testimonials.length - 3) {
            currentIndex = 0
        } else {
            currentIndex++;

        }
        updateCarousel()
    }, 2000)
}
// =======================================================================================================================

// ====================================================== CARDS APPEND ===================================================
const productsCards = document.querySelector('.products__cards')

function createProductCard(item) {
    const productsCard = document.createElement('div');
    const productsImage = document.createElement('div');
    const productsImg = document.createElement('img');
    const productsContent = document.createElement('div');
    const productsInfo = document.createElement('div');
    const productsName = document.createElement('p');
    const productsPriceBox = document.createElement('div');
    const productsPrice = document.createElement('p');
    const productsPriceOld = document.createElement('p');
    const productsCart = document.createElement('div');
    const productsCartIcon = document.createElement('i');
    const productsCardAction = document.createElement('div');
    const productsCardEye = document.createElement('div');
    const productsCardEyeIcon = document.createElement('i');
    const productsCardLike = document.createElement('div');
    const productsCardLikeIcon = document.createElement('i');
    const productsBadge = document.createElement('div');
    const productsBadgePercentage = document.createElement('p');

    // class qo'shish
    productsCard.classList.add('products__card');
    productsImage.classList.add('products__card-image');
    productsImg.classList.add('products__card-img');
    productsContent.classList.add('products__card-content');
    productsInfo.classList.add('products__card-info');
    productsName.classList.add('products__card-title');
    productsPriceBox.classList.add('products__card-price-box');
    productsPrice.classList.add('products__card-price');
    productsPriceOld.classList.add('products__card-old-price');
    productsCart.classList.add('products__card-cart');
    productsCardAction.classList.add('products__card-action');
    productsCardLike.classList.add('products__card-like');
    productsCardEye.classList.add('products__card-eye');
    productsBadge.classList.add('products__card-badge');
    productsBadgePercentage.classList.add('products__card-badge-percentage');

    // qiymatlar
    productsName.textContent = item.name;
    productsImg.src = item.image;
    productsPrice.textContent = `$${item.price.toFixed(2)}`;

    // agar discount bo‘lsa
    if (item.discount) {
        const oldPrice = item.price / (1 - item.discount / 100);
        productsPriceOld.textContent = `$${oldPrice.toFixed(2)}`;
        productsPriceBox.append(productsPrice, productsPriceOld);

        // badge chiqarish
        productsBadgePercentage.textContent = `Sale ${item.discount}%`;
        productsBadge.appendChild(productsBadgePercentage);
        productsCard.appendChild(productsBadge);
    } else {
        // discount bo‘lmasa faqat price ko‘rsatiladi
        productsPriceBox.append(productsPrice);
    }

    // ikonlar
    productsCardLike.innerHTML = '<i class="fa-regular fa-heart"></i>';
    productsCardEye.innerHTML = '<i class="fa-regular fa-eye"></i>';
    productsCart.innerHTML = '<i class="fa-solid fa-cart-shopping"></i>';

    // strukturaga yig‘ish
    productsImage.appendChild(productsImg);
    productsInfo.append(productsName, productsPriceBox);
    productsContent.append(productsInfo, productsCart);
    productsCardAction.append(productsCardLike, productsCardEye);
    productsCard.append(productsImage, productsContent, productsCardAction);

    return productsCard;
}

const products = [
    {
        id: 1,
        name: "Green apple",
        price: 14.99,
        // discount: 50,
        image: './assets/images/png/green-apple.jpg',
        rating: 4,
        isFavorite: false,
    },
    {
        id: 1,
        name: "Green apple",
        price: 14.99,
        discount: 30,
        image: './assets/images/png/green-apple.jpg',
        rating: 4,
        isFavorite: false,
    },
    {
        id: 1,
        name: "Green apple",
        price: 14.99,
        // discount: 50,
        image: './assets/images/png/green-apple.jpg',
        rating: 4,
        isFavorite: false,
    },
    {
        id: 1,
        name: "Green apple",
        price: 14.99,
        // discount: 50,
        image: './assets/images/png/green-apple.jpg',
        rating: 4,
        isFavorite: false,
    },
    {
        id: 1,
        name: "Green apple",
        price: 14.99,
        // discount: 50,
        image: './assets/images/png/green-apple.jpg',
        rating: 4,
        isFavorite: false,
    },
    {
        id: 1,
        name: "Green apple",
        price: 14.99,
        // discount: 50,
        image: './assets/images/png/green-apple.jpg',
        rating: 4,
        isFavorite: false,
    },
    {
        id: 1,
        name: "Green apple",
        price: 14.99,
        // discount: 50,
        image: './assets/images/png/green-apple.jpg',
        rating: 4,
        isFavorite: false,
    },
    {
        id: 1,
        name: "Green apple",
        price: 14.99,
        // discount: 50,
        image: './assets/images/png/green-apple.jpg',
        rating: 4,
        isFavorite: false,
    },
    {
        id: 1,
        name: "Green apple",
        price: 14.99,
        discount: 50,
        image: './assets/images/png/green-apple.jpg',
        rating: 4,
        isFavorite: false,
    },
    {
        id: 1,
        name: "Green apple",
        price: 14.99,
        // discount: 50,
        image: './assets/images/png/green-apple.jpg',
        rating: 4,
        isFavorite: false,
    },
    {
        id: 1,
        name: "Green apple",
        price: 14.99,
        // discount: 50,
        image: './assets/images/png/green-apple.jpg',
        rating: 4,
        isFavorite: false,
    },
]

products.forEach((item) => {
    const card = createProductCard(item)

    productsCards.appendChild(card)
})




const dealsCards = document.querySelector('.deals__cards')
products.forEach((item) => {
    const card = createProductCard(item)
    dealsCards.appendChild(card)
})


const featuredProductsCards = document.querySelector('.featured-products__cards');
products.slice(0, 4).forEach((item) => {
    const card = createProductCard(item);
    featuredProductsCards.appendChild(card);
});