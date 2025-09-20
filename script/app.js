// H&K Fashion Hub - Contact Form JavaScript
// Form validation and submission functionality

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    // Form validation rules
    const validationRules = {
        firstName: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-Z\s]+$/,
            message: 'First name must be at least 2 characters and contain only letters'
        },
        lastName: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-Z\s]+$/,
            message: 'Last name must be at least 2 characters and contain only letters'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        phone: {
            required: false,
            pattern: /^[\+]?[0-9\s\-\(\)]{10,}$/,
            message: 'Please enter a valid phone number'
        },
        subject: {
            required: true,
            message: 'Please select a subject'
        },
        message: {
            required: true,
            minLength: 10,
            message: 'Message must be at least 10 characters long'
        },
        privacy: {
            required: true,
            message: 'You must agree to the Privacy Policy and Terms of Service'
        }
    };

    // Validate individual field
    function validateField(fieldName, value) {
        const rules = validationRules[fieldName];
        if (!rules) return true;

        // Check required
        if (rules.required && (!value || value.trim() === '')) {
            return rules.message || `${fieldName} is required`;
        }

        // Check minimum length
        if (rules.minLength && value.length < rules.minLength) {
            return rules.message || `${fieldName} must be at least ${rules.minLength} characters`;
        }

        // Check pattern
        if (rules.pattern && value && !rules.pattern.test(value)) {
            return rules.message || `Invalid ${fieldName} format`;
        }

        return null; // Valid
    }

    // Display error message
    function showError(fieldName, message) {
        const errorElement = document.getElementById(fieldName + 'Error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        
        // Add error class to input
        const input = document.getElementById(fieldName);
        if (input) {
            input.classList.add('error');
        }
    }

    // Clear error message
    function clearError(fieldName) {
        const errorElement = document.getElementById(fieldName + 'Error');
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
        
        // Remove error class from input
        const input = document.getElementById(fieldName);
        if (input) {
            input.classList.remove('error');
        }
    }

    // Validate entire form
    function validateForm() {
        let isValid = true;
        const formData = new FormData(contactForm);
        
        // Clear all previous errors
        Object.keys(validationRules).forEach(fieldName => {
            clearError(fieldName);
        });

        // Validate each field
        Object.keys(validationRules).forEach(fieldName => {
            const value = formData.get(fieldName) || '';
            const error = validateField(fieldName, value);
            
            if (error) {
                showError(fieldName, error);
                isValid = false;
            }
        });

        return isValid;
    }

    // Format phone number as user types
    function formatPhoneNumber(input) {
        let value = input.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.length <= 3) {
                value = value;
            } else if (value.length <= 6) {
                value = value.slice(0, 3) + ' ' + value.slice(3);
            } else if (value.length <= 10) {
                value = value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6);
            } else {
                value = value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6, 10);
            }
        }
        input.value = value;
    }

    // Real-time validation
    function setupRealTimeValidation() {
        Object.keys(validationRules).forEach(fieldName => {
            const input = document.getElementById(fieldName);
            if (input) {
                input.addEventListener('blur', function() {
                    const value = this.value.trim();
                    const error = validateField(fieldName, value);
                    
                    if (error) {
                        showError(fieldName, error);
                    } else {
                        clearError(fieldName);
                    }
                });

                input.addEventListener('input', function() {
                    // Clear error on input
                    clearError(fieldName);
                });
            }
        });
    }

    // Handle form submission
    function handleFormSubmit(event) {
        event.preventDefault();
        
        if (validateForm()) {
            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Collect form data
                const formData = new FormData(contactForm);
                const data = {
                    firstName: formData.get('firstName'),
                    lastName: formData.get('lastName'),
                    email: formData.get('email'),
                    phone: formData.get('phone'),
                    subject: formData.get('subject'),
                    message: formData.get('message'),
                    newsletter: formData.get('newsletter') === 'on',
                    timestamp: new Date().toISOString()
                };
                
                // Log form data (in production, send to server)
                console.log('Form submitted:', data);
                
                // Show success message
                contactForm.style.display = 'none';
                successMessage.style.display = 'block';
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth' });
                
            }, 2000); // Simulate 2-second delay
        }
    }

    // Initialize form functionality
    function initContactForm() {
        if (contactForm) {
            // Setup real-time validation
            setupRealTimeValidation();
            
            // Setup phone number formatting
            const phoneInput = document.getElementById('phone');
            if (phoneInput) {
                phoneInput.addEventListener('input', function() {
                    formatPhoneNumber(this);
                });
            }
            
            // Setup form submission
            contactForm.addEventListener('submit', handleFormSubmit);
        }
    }

    // Initialize when DOM is loaded
    initContactForm();
});

// Additional utility functions
function showAlert() {
    alert('Welcome to H&K Fashion Hub! Thank you for visiting our website.');
}

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add loading animation to buttons
function addLoadingAnimation(button) {
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    
    const loader = document.createElement('div');
    loader.style.cssText = `
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
        animation: loading 1.5s infinite;
    `;
    
    button.appendChild(loader);
}

// CSS for loading animation
const style = document.createElement('style');
style.textContent = `
    @keyframes loading {
        0% { left: -100%; }
        100% { left: 100%; }
    }
    
    .error {
        border-color: #e74c3c !important;
        box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.2) !important;
    }
    
    .error-message {
        color: #e74c3c;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        display: none;
    }
    
    .success-message {
        background: linear-gradient(135deg, #27ae60, #2ecc71);
        color: white;
        padding: 2rem;
        border-radius: 15px;
        text-align: center;
        margin-top: 2rem;
    }
    
    .success-message h3 {
        margin-bottom: 1rem;
        font-size: 1.5rem;
    }
`;
document.head.appendChild(style);
