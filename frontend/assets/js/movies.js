
function escapeMovieHTML(value) {
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

async function loadMovies() {
    const container = document.getElementById("movies-container");
    const count = document.getElementById("movies-count");

    try {
        const portfolio = await getPortfolio();
        const movies = portfolio.movies || [];

        if (movies.length === 0) {
            count.textContent = "0 movies";
            container.innerHTML = `
                <p class="empty-message">
                    No movies have been added yet.
                </p>
            `;
            return;
        }

        count.textContent = `${movies.length} movies`;

        container.innerHTML = movies
            .sort((a, b) => a.ranking - b.ranking)
            .map(movie => {
                const title = escapeMovieHTML(movie.title);
                const year = escapeMovieHTML(movie.release_year);
                const ranking = escapeMovieHTML(movie.ranking);

                const poster = movie.poster_url
                    ? `<img src="${escapeMovieHTML(movie.poster_url)}"
                            alt="${title} movie poster"
                            class="movie-poster"
                            loading="lazy">`
                    : `<div class="movie-poster-placeholder">
                            <span>TOP ${ranking}</span>
                            <strong>${title}</strong>
                            <small>${year}</small>
                       </div>`;

                return `
                    <article class="movie-card">
                        <div class="movie-poster-wrapper">
                            ${poster}
                            <span class="movie-rank">#${ranking}</span>
                        </div>

                        <div class="movie-details">
                            <p class="movie-category">FAVOURITE MOVIE</p>
                            <h3>${title}</h3>
                            <p class="movie-year">${year}</p>
                        </div>
                    </article>
                `;
            }).join("");

    } catch (error) {
        console.error("Unable to load movies:", error);

        count.textContent = "Unable to load";

        container.innerHTML = `
            <p class="error-message">
                We couldn't load the movies right now.
                Please try again later.
            </p>
        `;
    }
}

document.addEventListener("DOMContentLoaded", loadMovies);
