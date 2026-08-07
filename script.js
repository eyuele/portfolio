const scrollElement = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((element) => {
    element.forEach(el => {
        if (el.isIntersecting) {
            el.target.classList.add("visible");
        }

    });
},
    {
        threshold: 0.4 // triggers when 10% of the element is visible

    });

scrollElement.forEach((element) => observer.observe(element));