const scrollElement = document.querySelectorAll(".reveal");
const scrollElementLeft = document.querySelectorAll(".revealleft");
const scrollElementRight = document.querySelectorAll(".revealright");




const observer = new IntersectionObserver((entries) => {
    // 1. Group items that are entering the viewport at the exact same time
    const intersectingEntries = entries.filter(el => el.isIntersecting);
    
    // 2. Loop through them and apply an index-based delay variable
    intersectingEntries.forEach((el, index) => {
        el.target.style.setProperty('--delay-index', index);
        el.target.classList.add("visible");
    });
},
{
    threshold: 0.1 
});




scrollElement.forEach((element) => observer.observe(element));
scrollElementLeft.forEach((element) => observer.observe(element));
scrollElementRight.forEach((element) => observer.observe(element));


const scrollBtnRight = document.getElementById("scrollbtnright");
const scrollBtnLeft = document.getElementById("scrollbtnleft");
const slider = document.getElementById("scrollHolder");

slider.addEventListener('wheel', (e) => {
  e.preventDefault();
  slider.scrollLeft += e.deltaY;
});
scrollBtnRight.addEventListener('click', (e) => {
    slider.scrollLeft -= 300;
})
scrollBtnLeft.addEventListener('click', (e) => {
    slider.scrollLeft += 300;
})