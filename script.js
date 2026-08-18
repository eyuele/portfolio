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


// ========== SLIDER SCROLL (only if the slider exists) ==========
const slider = document.getElementById("scrollHolder");

if (slider) {
    // Wheel scroll
    slider.addEventListener('wheel', (e) => {
        e.preventDefault();
        slider.scrollLeft += e.deltaY;
    });
    
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