
/* ============================================
   MILCAH CHACHA - TOP 5 MOVIES
============================================ */


// ============================================
// ESCAPE DATABASE CONTENT
// ============================================

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


// ============================================
// LOAD MOVIES
// ============================================

async function loadMovies() {

    const container = document.getElementById("movies-container");
    const count = document.getElementById("movies-count");

    if (!container) return;

    try {

        const portfolio = await getPortfolio();

        const allMovies = portfolio.movies || [];

        // Sort by ranking and display only the top five
        const movies = [...allMovies]
            .sort((a, b) => {
                return Number(a.ranking || 999) - Number(b.ranking || 999);
            })
            .slice(0, 5);


        // Handle an empty movie collection
        if (movies.length === 0) {

            if (count) {
                count.textContent = "0 movies";
            }

            container.innerHTML = `
                <div class="academic-placeholder">
                    <p>No movies have been added yet.</p>
                </div>
            `;

            return;
        }


        // Update movie count
        if (count) {
            count.textContent = `${movies.length} of 5 favourites`;
        }


        // Generate movie cards
        container.innerHTML = movies.map((movie, index) => {

            const title = escapeMovieHTML(
                movie.title || "Untitled Movie"
            );

            const year = escapeMovieHTML(
                movie.release_year || "Year unavailable"
            );

            const ranking = Number(movie.ranking) || index + 1;

            const poster = movie.poster_url
                ? `
                    <img
                        src="${escapeMovieHTML(movie.poster_url)}"
                        alt="${title} movie poster"
                        class="movie-poster"
                        loading="lazy"
                    >
                `
                : `
                    <div class="movie-poster-placeholder">

                        <span>TOP ${ranking}</span>

                        <strong>${title}</strong>

                        <small>${year}</small>

                    </div>
                `;


            return `
                <article class="movie-card">

                    <div class="movie-poster-wrapper">

                        ${poster}

                        <span class="movie-rank">
                            #${ranking}
                        </span>

                    </div>


                    <div class="movie-details">

                        <p class="movie-category">
                            MY FAVOURITE MOVIE
                        </p>

                        <h3>
                            ${title}
                        </h3>

                        <p class="movie-year">
                            ${year}
                        </p>

                    </div>

                </article>
            `;

        }).join("");


        // Replace broken posters with attractive placeholders
        container.querySelectorAll(".movie-poster").forEach(img => {

            img.addEventListener("error", function () {

                const placeholder = document.createElement("div");

                placeholder.className = "movie-poster-placeholder";

                const rank = this
                    .closest(".movie-poster-wrapper")
                    .querySelector(".movie-rank")
                    ?.textContent || "#";

                const title = document.createElement("strong");

                title.textContent = this.alt.replace(" movie poster", "");

                const top = document.createElement("span");

                top.textContent = `TOP ${rank.replace("#", "")}`;

                placeholder.append(top, title);

                this.replaceWith(placeholder);

            }, { once: true });

        });


    } catch (error) {

        console.error("Unable to load movies:", error);

        if (count) {
            count.textContent = "Unable to load";
        }

        container.innerHTML = `
            <div class="academic-placeholder">
                <p>
                    We couldn't load the movies right now.
                    Please try again later.
                </p>
            </div>
        `;
    }
}


// ============================================
// INITIALIZE MOVIES PAGE
// ============================================

document.addEventListener("DOMContentLoaded", loadMovies);
