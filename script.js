// Slider functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize slider if it exists on the page
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.prev');
        const nextBtn = document.querySelector('.next');
        let currentSlide = 0;
        let slideInterval;

        // Function to show a specific slide
        function showSlide(n) {
            // Hide all slides
            slides.forEach(slide => {
                slide.classList.remove('active');
            });
            
            // Remove active class from all dots
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            // Show the selected slide
            slides[n].classList.add('active');
            dots[n].classList.add('active');
            
            currentSlide = n;
        }

        // Function to show next slide
        function nextSlide() {
            let next = currentSlide + 1;
            if (next >= slides.length) {
                next = 0;
            }
            showSlide(next);
        }

        // Function to show previous slide
        function prevSlide() {
            let prev = currentSlide - 1;
            if (prev < 0) {
                prev = slides.length - 1;
            }
            showSlide(prev);
        }

        // Start automatic slide change
        function startSlider() {
            slideInterval = setInterval(nextSlide, 3000);
        }

        // Stop automatic slide change
        function stopSlider() {
            clearInterval(slideInterval);
        }

        // Event listeners for slider controls
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                stopSlider();
                nextSlide();
                startSlider();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                stopSlider();
                prevSlide();
                startSlider();
            });
        }

        // Event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                stopSlider();
                showSlide(index);
                startSlider();
            });
        });

        // Start the slider
        startSlider();
    }

    // Video controls if video exists on the page
    const video = document.getElementById('academyVideo');
    if (video) {
        const playPauseBtn = document.getElementById('playPauseBtn');
        const fullscreenBtn = document.getElementById('fullscreenBtn');
        const progressBar = document.querySelector('.progress-bar');

        // Play/Pause functionality
        playPauseBtn.addEventListener('click', function() {
            if (video.paused) {
                video.play();
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                video.pause();
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        });

        // Update progress bar as video plays
        video.addEventListener('timeupdate', function() {
            const progress = (video.currentTime / video.duration) * 100;
            progressBar.style.width = progress + '%';
        });

        // Click on progress bar to seek
        document.querySelector('.progress-container').addEventListener('click', function(e) {
            const progressContainer = this;
            const clickPosition = (e.pageX - progressContainer.getBoundingClientRect().left) / progressContainer.offsetWidth;
            video.currentTime = clickPosition * video.duration;
        });

        // Fullscreen functionality
        fullscreenBtn.addEventListener('click', function() {
            if (video.requestFullscreen) {
                video.requestFullscreen();
            } else if (video.mozRequestFullScreen) {
                video.mozRequestFullScreen();
            } else if (video.webkitRequestFullscreen) {
                video.webkitRequestFullscreen();
            } else if (video.msRequestFullscreen) {
                video.msRequestFullscreen();
            }
        });

        // Reset play button when video ends
        video.addEventListener('ended', function() {
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        });
    }

    // Registration form submission
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(registrationForm);
            const data = Object.fromEntries(formData);
            
            // Format the message for WhatsApp
            const message = `New Student Registration:
            
Personal Information:
Full Name: ${data.fullName}
Email: ${data.email}
Phone: ${data.phone}
Address: ${data.address}
Age: ${data.age}

Educational Background:
Highest Qualification: ${data.qualification}
Institution: ${data.institution || 'Not provided'}
Year of Graduation: ${data.year || 'Not provided'}

Course Selection:
Course: ${data.course}
Study Mode: ${data.studyMode}

Sponsor Information:
Sponsor Name: ${data.sponsorName}
Relationship: ${data.sponsorRelationship}
Sponsor Address: ${data.sponsorAddress}
Sponsor Phone: ${data.sponsorPhone}`;
            
            // Encode the message for URL
            const encodedMessage = encodeURIComponent(message);
            
            // Create WhatsApp URL
            const whatsappURL = `https://wa.me/2348023005603?text=${encodedMessage}`;
            
            // Open WhatsApp in a new tab
            window.open(whatsappURL, '_blank');
            
            // Show success message
            alert('Registration submitted successfully! You will be redirected to WhatsApp to complete the process.');
            
            // Reset the form
            registrationForm.reset();
        });
    }

    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});