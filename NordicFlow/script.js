const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileOverlay = document.getElementById('mobile-overlay');
const mobileLinks = document.querySelectorAll('.mobile-link');

function openMenu() {
    hamburger.classList.add('open');
    mobileMenu.classList.add('open');
    mobileOverlay.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    mobileOverlay.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
    mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
});

mobileOverlay.addEventListener('click', closeMenu);

// Close menu when a link is clicked
mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Close menu on Escape key press
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        closeMenu();
    }
});


//Email form

emailjs.init({
    publicKey: "e4biaHHDNicczj0Ki",
});

const form = document.getElementById('contact-form');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('b-time').value;
    const message = document.getElementById('message').value;

    const templateParams = {
        from_name: name,
        from_email: email,
        phone: phone,
        service: service,
        preferred_date: date,
        preferred_time: time,
        message: message,
    };

    emailjs.send('service_ab7qh9h', 'template_79mmtdr', templateParams)
        .then(function (response) {
            alert('Thank you! Your request has been sent.');
            form.reset();  // clears the form
        })
        .catch(function (error) {
            alert('Failed to send. Please try again later.');
            console.error(error);
        });
});



