// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling
document.getElementById('contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = this;
    const submitButton = form.querySelector('button[type="submit"]');
    const statusDiv = document.getElementById('form-status');
    
    try {
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        statusDiv.innerHTML = '';
        
        const formData = new FormData(form);
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            form.reset();
            statusDiv.innerHTML = '<p style="color: green;">Thanks for your message! I\'ll get back to you soon.</p>';
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        console.error('Error:', error);
        statusDiv.innerHTML = '<p style="color: red;">Oops! There was a problem sending your message. Please try again.</p>';
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
    }
});

// Scroll animation for sections
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
});

document.querySelectorAll('section').forEach((section) => {
    observer.observe(section);
});
