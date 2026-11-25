
// ============================================
// MILCAH CHACHA - CONTACT FORM
// ============================================

document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.getElementById("contact-form");

    const feedback = document.getElementById("contact-feedback");

    const submitButton = document.getElementById("contact-submit");


    // ========================================
    // CHECK REQUIRED ELEMENTS
    // ========================================

    if (!contactForm || !feedback || !submitButton) {
        console.error("Contact form elements could not be found.");
        return;
    }


    // ========================================
    // FORM SUBMISSION
    // ========================================

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();


        // VALIDATE FORM

        if (!contactForm.checkValidity()) {

            contactForm.reportValidity();

            return;

        }


        // ====================================
        // COLLECT FORM DATA
        // ====================================

        const formData = {

            sender_name: document
                .getElementById("sender-name")
                .value
                .trim(),

            sender_email: document
                .getElementById("sender-email")
                .value
                .trim(),

            message: document
                .getElementById("message")
                .value
                .trim()

        };


        // ====================================
        // CHECK EMPTY VALUES
        // ====================================

        if (
            !formData.sender_name ||
            !formData.sender_email ||
            !formData.message
        ) {

            feedback.textContent =
                "Please complete all the required fields.";

            feedback.className =
                "contact-feedback error";

            return;

        }


        // ====================================
        // PREPARE SUBMISSION
        // ====================================

        submitButton.disabled = true;

        submitButton.textContent = "Sending...";

        feedback.textContent = "";

        feedback.className = "contact-feedback";


        try {


            // =================================
            // SEND MESSAGE TO BACKEND
            // =================================

            const response =
                await submitContactMessage(formData);


            // =================================
            // SUCCESS RESPONSE
            // =================================

            feedback.textContent =
                response.message ||
                "Thank you! Your message has been received successfully.";

            feedback.className =
                "contact-feedback success";


            // RESET FORM AFTER SUCCESS

            contactForm.reset();


        } catch (error) {


            // =================================
            // ERROR RESPONSE
            // =================================

            console.error(
                "Contact form submission error:",
                error
            );

            feedback.textContent =
                error.message ||
                "Unable to send your message. Please try again later.";

            feedback.className =
                "contact-feedback error";


        } finally {


            // =================================
            // RESTORE SUBMIT BUTTON
            // =================================

            submitButton.disabled = false;

            submitButton.innerHTML =
                'Send Message <span aria-hidden="true">→</span>';

        }

    });

});
