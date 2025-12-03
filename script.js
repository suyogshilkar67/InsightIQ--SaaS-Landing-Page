document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Modal Functionality ---
    const modal = document.getElementById('ctaModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const modalNote = document.getElementById('modalNote');
    
    // Select all buttons/links that should open the modal
    const openBtns = document.querySelectorAll(
        '#openModalBtn, #openModalBtn2, #openModalContact, #openModalBtnStarter, #openModalBtnBusiness, #openModalBtnEnterprise' 
    );
    const closeBtn = document.querySelector('.close-btn');

    // Function to customize modal content based on button ID
    function updateModalContent(buttonId) {
        if (buttonId.includes('Contact') || buttonId.includes('Enterprise')) {
            // For general contact and enterprise sales
            modalTitle.textContent = "Contact Our Sales Team";
            modalMessage.placeholder = "Tell us about your requirements (e.g., Enterprise needs, partnership inquiry).";
            modalNote.textContent = "We aim to respond to all inquiries within 24 hours.";
        } else if (buttonId.includes('Starter') || buttonId.includes('Business') || buttonId.includes('Btn') || buttonId.includes('Btn2')) {
            // For general trial sign-ups
            modalTitle.textContent = "Start Your 14-Day Free Trial";
            modalMessage.placeholder = "Optional: Which industry are you in? (e.g., Retail, Finance)";
            modalNote.textContent = "No credit card required. Instant access to the platform.";
        }
    }

    // Open Modal Listener
    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevents jump to '#'
            // Update the modal content before opening
            updateModalContent(btn.id); 
            modal.style.display = 'block';
        });
    });

    // Close Modal via 'x' button
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close Modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // --- 2. Testimonial Slider Functionality ---
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    function showSlide(index) {
        // Ensure index wraps around
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        // Hide all slides and deactivate all dots
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        // Show the current slide and activate the corresponding dot
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // Handle dot clicks
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideIndex = parseInt(e.target.getAttribute('data-slide'));
            showSlide(slideIndex);
            // Reset the auto-advance timer on manual click
            resetTimer();
        });
    });

    // Auto-advance the slider every 5 seconds
    let sliderInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);

    // Function to reset the auto-advance timer
    function resetTimer() {
        clearInterval(sliderInterval);
        sliderInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    }

    // Initialize the first slide
    showSlide(currentSlide);
});