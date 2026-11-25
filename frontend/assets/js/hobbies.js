
 // ============================================
 // MILCAH CHACHA - HOBBIES PAGE
 // ============================================

// Hobby images and fallback icons
const HOBBY_DATA = {
    "bike riding": {
        image: "assets/images/hobbies/bike-riding.jpeg",
        icon: "🚴"
    },

    "drawing": {
        image: "assets/images/hobbies/drawing.jpeg",
        icon: "🎨"
    },

    "skating": {
        image: "assets/images/hobbies/skating.jpeg",
        icon: "🛼"
    }
};

// ============================================
// LOAD HOBBIES
// ============================================

async function loadHobbies() {
    const container = document.getElementById("hobbies-container");
    const errorMessage = document.getElementById("hobbies-error");

    if (!container) return;

    try {
        const portfolio = await getPortfolio();

        const hobbies = portfolio.hobbies || [];

        if (hobbies.length === 0) {
            container.innerHTML = `
                <div class="academic-placeholder">
                    <p>No hobbies have been added yet.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = hobbies.map(hobby => {

            const hobbyName = String(
                hobby.hobby_name || "Personal Interest"
            );

            const hobbyInfo =
                HOBBY_DATA[hobbyName.toLowerCase()] || {
                    image: "",
                    icon: "✨"
                };

            const image = hobbyInfo.image
                ? `
                    <img
                        class="hobby-image"
                        src="${hobbyInfo.image}"
                        alt="${escapeHobbyHTML(hobbyName)}"
                        data-fallback-icon="${hobbyInfo.icon}"
                        loading="lazy"
                    >
                `
                : `
                    <div class="hobby-icon" aria-hidden="true">
                        ${hobbyInfo.icon}
                    </div>
                `;

            const description = hobby.description
                ? `
                    <p>
                        ${escapeHobbyHTML(hobby.description)}
                    </p>
                `
                : "";

            return `
                <article class="hobby-card">

                    <div class="hobby-visual">
                        ${image}
                    </div>

                    <div class="hobby-card-content">

                        <h3>
                            ${escapeHobbyHTML(hobbyName)}
                        </h3>

                        ${description}

                    </div>

                </article>
            `;

        }).join("");

        // ====================================
        // IMAGE ERROR FALLBACK
        // ====================================

        container.querySelectorAll(".hobby-image").forEach(img => {

            img.addEventListener("error", function () {

                const icon = document.createElement("div");

                icon.className = "hobby-icon";
                icon.setAttribute("aria-hidden", "true");

                icon.textContent =
                    this.dataset.fallbackIcon || "✨";

                this.replaceWith(icon);

            }, { once: true });

        });

    } catch (error) {

        console.error("Unable to load hobbies:", error);

        container.innerHTML = "";

        if (errorMessage) {
            errorMessage.hidden = false;

            errorMessage.textContent =
                "Unable to load hobbies. Please try again later.";
        }
    }
}

// ============================================
// HTML ESCAPE FUNCTION
// ============================================

function escapeHobbyHTML(value) {

    return String(value ?? "").replace(/[&<>"']/g, character => {

        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };

        return entities[character];

    });
}

// ============================================
// INITIALIZE HOBBIES PAGE
// ============================================

loadHobbies();
