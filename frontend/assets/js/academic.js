
// ============================================
// MILCAH CHACHA - ACADEMIC JOURNEY
// ============================================

async function loadAcademicInformation() {

    const educationContainer =
        document.getElementById("education-container");

    const skillsContainer =
        document.getElementById("skills-container");

    const errorMessage =
        document.getElementById("education-error");

    try {

        const portfolio = await getPortfolio();

        // ====================================
        // DISPLAY EDUCATION
        // ====================================

        const education = portfolio.education || [];

        if (education.length === 0) {

            educationContainer.innerHTML = `
                <div class="academic-placeholder">
                    <p>No education records are available yet.</p>
                </div>
            `;

        } else {

            educationContainer.innerHTML = education.map(item => {

                const graduation = item.expected_graduation_year
                    ? item.expected_graduation_year
                    : "Not specified";

                return `
                    <article class="education-card">

                        <div class="education-marker">
                            🎓
                        </div>

                        <div class="education-content">

                            <span class="education-period">
                                ${item.start_year} - ${graduation}
                            </span>

                            <h3>${escapeHTML(item.qualification)}</h3>

                            <p class="education-institution">
                                ${escapeHTML(item.institution)}
                            </p>

                            <span class="education-status">
                                ${escapeHTML(item.status || "Not specified")}
                            </span>

                        </div>

                    </article>
                `;

            }).join("");

        }

        // ====================================
        // DISPLAY SKILLS
        // ====================================

        const skills = portfolio.skills || [];

        if (skills.length === 0) {

            skillsContainer.innerHTML = `
                <p>Skills information has not been added yet.</p>
            `;

        } else {

            skillsContainer.innerHTML = skills.map(skill => `
                <article class="skill-card">
                    <h3>${escapeHTML(skill.skill_name)}</h3>
                    <p>${escapeHTML(skill.category || "Skill")}</p>
                    <span>${escapeHTML(skill.proficiency || "")}</span>
                </article>
            `).join("");

        }

    } catch (error) {

        console.error("Academic information error:", error);

        educationContainer.innerHTML = "";

        errorMessage.hidden = false;
        errorMessage.textContent =
            "Unable to load academic information. Please try again later.";

    }

}


// ============================================
// PROTECT HTML FROM UNTRUSTED DATABASE TEXT
// ============================================

function escapeHTML(value) {

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


// LOAD PAGE INFORMATION

loadAcademicInformation();
