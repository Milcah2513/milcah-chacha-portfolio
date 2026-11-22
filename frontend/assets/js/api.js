
// ============================================
// MILCAH CHACHA PORTFOLIO - API CONFIGURATION
// ============================================

// Production API (Render)
const API_BASE_URL = "https://milcah-chacha-portfolio.onrender.com";


/**
 * Reusable API request function.
 */
async function apiRequest(endpoint, options = {}) {
    const response = await fetch(
        `${API_BASE_URL}${endpoint}`,
        {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options.headers
            }
        }
    );

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(
            data.detail || "Something went wrong. Please try again."
        );
    }

    return data;
}


/**
 * Retrieve portfolio information.
 */
async function getPortfolio() {
    return await apiRequest("/api/portfolio/");
}


/**
 * Submit a contact message.
 */
async function submitContactMessage(formData) {
    return await apiRequest("/api/contact/", {
        method: "POST",
        body: JSON.stringify(formData)
    });
}


/**
 * Check backend health.
 */
async function checkAPIHealth() {
    return await apiRequest("/health");
}
