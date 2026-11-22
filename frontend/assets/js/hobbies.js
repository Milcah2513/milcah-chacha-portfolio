
// ============================================
// MILCAH CHACHA - HOBBIES PAGE
// ============================================

async function loadHobbies() {

    const container = document.getElementById("hobbies-container");
    const errorMessage = document.getElementById("hobbies-error");

    const hobbyIcons = {
        "bike riding": "🚴",
        "drawing": "🎨",
        "skating": "🛼"
    };

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

            const icon = hobbyIcons[
                String(hobby.hobby_name).toLowerCase()
            ] || "✨";

            const image = hobby.image_url
                ? `
                    <img
                        class="hobby-image"
                        src="${escapeHobbyHTML(hobby.image_url)}"
                        alt="${escapeHobbyHTML(hobby.hobby_name)}"
                        onerror="this.style.display='none'"
                    >
                `
                : `
                    <div class="hobby-icon" aria-hidden="true">
                        ${icon}
                    </div>
                `;

            const description = hobby.description
                ? `<p>${escapeHobbyHTML(hobby.description)}</p>`
                : "";

            return `
                <article class="hobby-card">
                    <div class="hobby-visual">
                        ${image}
                    </div>

                    <div class="hobby-card-content">
                        <h3>${escapeHobbyHTML(hobby.hobby_name)}</h3>
                        ${description}
                    </div>
                </article>
            `;

        }).join("");

    } catch (error) {

        console.error("Unable to load hobbies:", error);

        container.innerHTML = "";

        errorMessage.hidden = false;
        errorMessage.textContent =
            "Unable to load hobbies. Please try again later.";
    }
}


// Escape database text before inserting it into HTML
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


// Load hobbies when the page opens
loadHobbies();
