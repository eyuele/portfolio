// ========== SCROLL REVEAL ==========
const scrollElement = document.querySelectorAll(".reveal");
const scrollElementLeft = document.querySelectorAll(".revealleft");
const scrollElementRight = document.querySelectorAll(".revealright");

const observer = new IntersectionObserver((entries) => {
    const intersectingEntries = entries.filter(el => el.isIntersecting);
    intersectingEntries.forEach((el, index) => {
        el.target.style.setProperty('--delay-index', index);
        el.target.classList.add("visible");
    });
}, {
    threshold: 0.1
});

// Observe all reveal elements
scrollElement.forEach((element) => observer.observe(element));
scrollElementLeft.forEach((element) => observer.observe(element));
scrollElementRight.forEach((element) => observer.observe(element));


setTimeout(() => {
    const allRevealElements = document.querySelectorAll(".reveal, .revealleft, .revealright");
    allRevealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const winHeight = window.innerHeight || document.documentElement.clientHeight;
        if (rect.top < winHeight * 0.9 && rect.bottom > 0) {
            el.classList.add("visible");
        }
    });
}, 200);

// ========== SLIDER SCROLL (with touch swipe support) ==========
const slider = document.getElementById("scrollHolder");

if (slider) {
    // --- Wheel scroll (desktop) ---
    slider.addEventListener('wheel', (e) => {
        e.preventDefault();
        slider.scrollLeft += e.deltaY;
    }, { passive: false });

    // --- Touch swipe (mobile) ---
    let startX = 0;
    let startY = 0;
    let startScrollLeft = 0;
    let isSwiping = false;

    slider.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
        startScrollLeft = slider.scrollLeft;
        isSwiping = true;
    }, { passive: true });

    slider.addEventListener('touchmove', (e) => {
        if (!isSwiping) return;
        const touch = e.touches[0];
        const deltaX = touch.clientX - startX;
        const deltaY = touch.clientY - startY;

        // Only prevent vertical scroll if horizontal swipe is dominant
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            e.preventDefault(); // prevent page scroll
            slider.scrollLeft = startScrollLeft - deltaX;
        }
    }, { passive: false });

    slider.addEventListener('touchend', (e) => {
        isSwiping = false;
        // Optional: add a small momentum effect (you can implement a simple deceleration)
        // For now, we just stop
    }, { passive: true });

    
    // const scrollBtnRight = document.getElementById("scrollbtnright");
    // const scrollBtnLeft = document.getElementById("scrollbtnleft");

    // if (scrollBtnRight && scrollBtnLeft) {
    //     scrollBtnRight.addEventListener('click', () => {
    //         slider.scrollLeft -= 300;
    //     });
    //     scrollBtnLeft.addEventListener('click', () => {
    //         slider.scrollLeft += 300;
    //     });
    // }
}