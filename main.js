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
    const productsCardAction = document.createElement('div');
    const productsCardEye = document.createElement('div');
    const productsCardLike = document.createElement('div');
    const productsBadge = document.createElement('div');
    const productsBadgePercentage = document.createElement('p');
    const productsRating = document.createElement('div')

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
    productsRating.classList.add('products__card-rating')

    // qiymatlar
    productsName.textContent = item.name;
    productsImg.src = item.image;
    productsPrice.textContent = `$${item.price.toFixed(2)}`;

    for (let i = 0; i < 5; i++) {
        const star = document.createElement('i')

        if (i < item.rating) {
            star.classList.add("fa-solid", "fa-star")
        } else {
            star.classList.add('fa-regular', 'fa-star')
        }
        productsRating.append(star)
    }

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

    productsCardEye.addEventListener('click', () => {
        window.location.href = "./pages/detailsPage.html"
    })

    // strukturaga yig‘ish
    productsImage.appendChild(productsImg);
    productsInfo.append(productsName, productsPriceBox, productsRating);
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

products.slice(0, 10).forEach((item) => {
    const card = createProductCard(item)

    productsCards.appendChild(card)
})




const dealsCards = document.querySelector('.deals__cards')
products.forEach((item) => {
    const card = createProductCard(item)
    dealsCards.appendChild(card)
})


const featuredProductsCards = document.querySelector('.featured-products__cards');
products.slice(0, 5).forEach((item) => {
    const card = createProductCard(item);
    featuredProductsCards.appendChild(card);
});



// ==================================== CATEGORIES CARD ==============================
const categoriesCards = document.querySelector('.categories__cards')

const categories = [
    {
        id: 1,
        category: 'Fresh fruit',
        image: './assets/images/png/fruit.png',
        alt: '',
    },
    {
        id: 2,
        category: 'Fresh Vegetables',
        image: './assets/images/png/vagitables.png',
        alt: '',
    },
    {
        id: 3,
        category: 'Meat & Fish',
        image: './assets/images/png/fish.png',
        alt: '',
    },
    {
        id: 4,
        category: 'snacks',
        image: './assets/images/png/snacks.png',
        alt: '',
    },
    {
        id: 5,
        category: 'beverages',
        image: './assets/images/png/beverages.png',
        alt: '',
    },
    {
        id: 6,
        category: 'Beauty & Health',
        image: './assets/images/png/beauty.png',
        alt: '',
    },
    {
        id: 7,
        category: 'Bread & Bakery',
        image: './assets/images/png/bakery.png',
        alt: '',
    },
    {
        id: 8,
        category: 'Baking Needs',
        image: './assets/images/png/bakery-needs.png',
        alt: '',
    },
    {
        id: 9,
        category: 'cooking',
        image: './assets/images/png/cooking.png',
        alt: '',
    },
    {
        id: 10,
        category: 'Diabetic Food',
        image: './assets/images/png/deabetic-food.png',
        alt: '',
    },
    {
        id: 11,
        category: 'Dish Detergents',
        image: './assets/images/png/detergents.png',
        alt: '',
    },
    {
        id: 12,
        category: 'oil',
        image: './assets/images/png/oil.png',
        alt: '',
    },
]

categories.slice(0, 12).map((item) => {
    const categoriesCard = document.createElement('div');
    const categoriesImg = document.createElement('img');
    const categoriesName = document.createElement('p');
    ;
    categoriesCard.classList.add('categories__card');
    categoriesImg.classList.add('categories__card-image');
    categoriesName.classList.add('categories__card-text');


    categoriesImg.src = item.image;
    categoriesName.textContent = item.category;

    categoriesCard.append(categoriesImg, categoriesName);

    categoriesCards.appendChild(categoriesCard);
})
// ===========================================================================================================

// =========================== NEWS CARDS ====================================================================
const newsBoxes = document.querySelector('.news__boxes')

const news = [
    {
        id: 1,
        comments: 24,
        author: "admin",
        category: 'food',
        date: { day: "12", month: "Feb" },
        img: './assets/images/png/news-img.jpg',
        title: 'Curabitur porttitor orci eget neque accumsan abitur porttitor orci eget neque accumsvenenatis. Nunc fermentum.',
    },
    {
        id: 2,
        comments: 64,
        author: "admin",
        category: 'food',
        date: { day: "12", month: "sep" },
        img: './assets/images/png/news-img2.jpg',
        title: 'Salom Dunyo Salom JavaScript,',
    },
    {
        id: 3,
        comments: 12,
        author: "admin",
        category: 'food',
        date: { day: "12", month: "Feb" },
        img: './assets/images/png/news-img3.jpg',
        title: 'Maecenas blandit risus elementum mauris malesuada.',
    },
]

news.map((item) => {
    const newsBox = document.createElement('div')
    const newsBoxImage = document.createElement('div')
    const newsImg = document.createElement('img')
    const newsDate = document.createElement('div')
    const newsDateDay = document.createElement('p')
    const newsDateMonth = document.createElement('p')
    const newsInfo = document.createElement('div')
    const newsMeta = document.createElement('div')
    const newsTitle = document.createElement('p')
    const newsButton = document.createElement('button')


    newsBox.classList.add('news__box')
    newsBoxImage.classList.add('news__box-image')
    newsImg.classList.add('news__box-img')
    newsDate.classList.add('news__box-date')
    newsDateDay.classList.add('news__box-date-day')
    newsDateMonth.classList.add('news__box-date-month')
    newsInfo.classList.add('news__box-info')
    newsMeta.classList.add('news__box-meta')
    newsTitle.classList.add('news__box-text')
    newsButton.classList.add('news__box-button')

    newsImg.src = item.img
    newsDateDay.textContent = item.date.day
    newsDateMonth.textContent = item.date.month
    newsTitle.textContent = item.title

    newsButton.innerHTML = `read more <i class="fa-solid fa-arrow-right"></i>`

    newsDate.append(newsDateDay, newsDateMonth);
    newsBoxImage.append(newsImg, newsDate);
    newsMeta.append(
        createMetaItem("./assets/images/svg/category-icon.svg", "category icon", item.category),
        createMetaItem("./assets/images/svg/user-icon.svg", "user icon", "By " + item.author),
        createMetaItem("./assets/images/svg/comment-icon.svg", "comment icon", item.comments + " Comment")
    );
    newsInfo.append(newsMeta, newsTitle, newsButton);
    newsBox.append(newsBoxImage, newsInfo);

    newsBoxes.appendChild(newsBox);
})

function createMetaItem(iconSrc, altText, text) {
    const span = document.createElement("span");
    span.className = "news__box-meta-item";

    const img = document.createElement("img");
    img.className = "news__box-meta-img";
    img.src = iconSrc;
    img.alt = altText;

    span.appendChild(img);
    span.append(text);
    return span;
}
// ===========================================================================================================


// ====================== PARTNERS LOGOS =====================================
const partnersWrapper = document.querySelector(".partners__wrapper");

const logos = [
    { src: "./assets/images/svg/step.svg", alt: "step icon" },
    { src: "./assets/images/svg/mango.svg", alt: "mango icon" },
    { src: "./assets/images/svg/food-network.svg", alt: "food-network icon" },
    { src: "./assets/images/svg/food.svg", alt: "food icon" },
    { src: "./assets/images/svg/bookoff-corporation-logo.svg", alt: "bookoff-corporation icon" },
    { src: "./assets/images/svg/g-series.svg", alt: "g-series icon" },
];

logos.forEach((logo, index) => {
    const img = document.createElement("img");
    img.className = "partners__img";
    img.src = logo.src;
    img.alt = logo.alt;
    partnersWrapper.appendChild(img);

    // agar oxirgi bo‘lmasa, line qo‘shish
    if (index < logos.length - 1) {
        const line = document.createElement("span");
        line.className = "partners__line";
        partnersWrapper.appendChild(line);
    }
});
// ===============================================================================================

// ================================= INSTAGRAM POSTS ======================================
const instagramCards = document.querySelector('.instagram__cards')

const instagramPosts = [
    {
        id: 1,
        image: "/assets/images/png/instagram-post.jpg",
        url: 'https://www.instagram.com/sin_1005_',
    },
    {
        id: 2,
        image: "/assets/images/png/instagram-post.jpg",
        url: 'https://www.instagram.com/najottalim',
    },
    {
        id: 3,
        image: "/assets/images/png/instagram-post.jpg",
        url: 'https://www.instagram.com/najottalim',
    },
    {
        id: 4,
        image: "/assets/images/png/instagram-post.jpg",
        url: 'https://www.instagram.com/najottalim',
    },
    {
        id: 5,
        image: "/assets/images/png/instagram-post.jpg",
        url: 'https://www.instagram.com/najottalim',
    },
    {
        id: 6,
        image: "/assets/images/png/instagram-post.jpg",
        url: 'https://www.instagram.com/najottalim',
    },
]

instagramPosts.map((item) => {
    const instagramCard = document.createElement('div')
    const instagramCardImg = document.createElement('img')

    instagramCard.classList.add('instagram__card')
    instagramCardImg.classList.add('instagram__card-img')

    instagramCardImg.src = item.image

    instagramCard.addEventListener('click', () => {
        window.location.href = item.url
    })

    instagramCard.appendChild(instagramCardImg)
    instagramCards.appendChild(instagramCard)
})
// =============================================================================================================

// ======================= MEDIAS ==============================
const mediasIcon = document.querySelector('.medias')

const medias = [
    {
        id: 1,
        icon: 'fa-facebook-f',
        url: 'https://facebook.com/tajottalim',
    },
    {
        id: 2,
        icon: 'fa-twitter',
        url: 'https://x.com/najottalim',
    },
    {
        id: 3,
        icon: 'fa-pinterest-p',
        url: 'https://pinterest.com',
    },
    {
        id: 4,
        icon: 'fa-instagram',
        url: 'https://instagram.com/najottalim',
    },
]

medias.map((item) => {
    const media = document.createElement('div')
    const icon = document.createElement('i')

    media.classList.add('media')
    icon.classList.add('fa-brands', item.icon)

    media.addEventListener('click', ()=>{
        window.open(item.url, "_blank")
    })

    media.appendChild(icon)
    mediasIcon.appendChild(media)
})
// ================================================================================================================