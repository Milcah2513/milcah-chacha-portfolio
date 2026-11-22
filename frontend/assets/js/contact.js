
document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.getElementById("contact-form");
    const feedback = document.getElementById("contact-feedback");
    const submitButton = document.getElementById("contact-submit");

    if (!contactForm) {
        return;
    }

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        const formData = {
            sender_name: document.getElementById("sender-name").value.trim(),
            sender_email: document.getElementById("sender-email").value.trim(),
            message: document.getElementById("message").value.trim()
        };

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
        feedback.textContent = "";
        feedback.className = "contact-feedback";

        try {

            const response = await submitContactMessage(formData);

            feedback.textContent = response.message ||
                "Thank you! Your message has been received.";

            feedback.classList.add("success");

            contactForm.reset();

        } catch (error) {

            console.error("Contact form error:", error);

            feedback.textContent = error.message ||
                "Unable to send your message. Please try again.";

            feedback.classList.add("error");

        } finally {

            submitButton.disabled = false;
            submitButton.innerHTML = 'Send Message <span>→</span>';

        }

    });

});
