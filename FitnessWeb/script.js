// Initialize EmailJS with your public key
emailjs.init({
  publicKey: "e4biaHHDNicczj0Ki",
});

document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Basic validation
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }

    // Create template parameters
    const templateParams = {
        from_name: name,
        from_email: email,
        message: message
    };

    // Send email using your credentials
    emailjs.send('service_ab7qh9h', 'template_79mmtdr', templateParams)
        .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Thank you! Your message has been sent successfully.');
            document.getElementById('contact-form').reset();
        })
        .catch(function (error) {
            console.log('FAILED...', error);
            alert('Failed to send message. Please try again later.');
        });
});


//dark mode

let darkmode = localStorage.getItem("darkmode");

const themeSwitch = document.getElementById("theme-switch");

const enableDarkMode = () => {
    document.body.classList.add("darkmode");
    localStorage.setItem("darkmode", "active");
}
const disableDarkMode = () => {
    document.body.classList.remove("darkmode");
    localStorage.setItem("darkmode", "inactive");
}

if (darkmode === "active") {
    enableDarkMode()
}
themeSwitch.addEventListener("click", () => {
    darkmode = localStorage.getItem("darkmode");
    darkmode !== "active" ? enableDarkMode() : disableDarkMode();
})
