 console.log("js Loaded");

        const API_KEY = 'c5b6f95dd3cd3e52f088fba760aa6302';
        const BASE_URL = 'https://api.themoviedb.org/3';
        const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
        const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original';

        // Get movie ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const movieId = urlParams.get('id');

         // Fetch movie details
        async function fetchMovieDetails() {

                const [movieResponse, creditsResponse, videosResponse, similarResponse] = await Promise.all([
                    fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`),
                    fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`),
                    fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`),
                    fetch(`${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}`)
                ]);

                const movie = await movieResponse.json();
                const credits = await creditsResponse.json();
                const videos = await videosResponse.json();
                const similar = await similarResponse.json();

                displayMovieDetails(movie, credits, videos, similar);
            
        }
        // Display movie details
        function displayMovieDetails(movie, credits, videos, similar) {
            document.getElementById('loading').classList.add('hidden');
            document.getElementById('movieDetails').classList.remove('hidden');

            // Set page title
            document.title = movie.title + ' - Movie Details';

            // Backdrop
            if (movie.backdrop_path) {
                document.getElementById('backdrop').style.backgroundImage = `url(${BACKDROP_BASE_URL}${movie.backdrop_path})`;
                document.getElementById('backdrop').style.backgroundSize = 'cover';
                document.getElementById('backdrop').style.backgroundPosition = 'center';
            }

            // Poster
            const posterPath = movie.poster_path 
                ? `${IMAGE_BASE_URL}${movie.poster_path}` 
                : 'https://via.placeholder.com/500x750/1a2942/ffffff?text=No+Poster';
            document.getElementById('poster').src = posterPath;

            // Basic Info
            document.getElementById('title').textContent = movie.title;
            document.getElementById('rating').textContent = movie.vote_average.toFixed(1) + '/10';
            document.getElementById('releaseDate').textContent = movie.release_date;
            document.getElementById('runtime').textContent = movie.runtime ? `${movie.runtime} min` : 'N/A';
            document.getElementById('overview').textContent = movie.overview || 'No overview available.';
            document.getElementById('language').textContent = movie.original_language.toUpperCase();
            document.getElementById('budget').textContent = movie.budget ? `$${movie.budget.toLocaleString()}` : 'N/A';
            document.getElementById('revenue').textContent = movie.revenue ? `$${movie.revenue.toLocaleString()}` : 'N/A';
            document.getElementById('status').textContent = movie.status;
            document.getElementById('imdbId').textContent = movie.imdb_id;

            // Genres
            const genresContainer = document.getElementById('genres');
            movie.genres.forEach(genre => {
                genresContainer.innerHTML += `
                    <span class="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        ${genre.name}
                    </span>
                `;
            });
        }
          // Load movie details on page load
        if (movieId) {
            fetchMovieDetails();
        } else {
            document.getElementById('loading').innerHTML = '<p class="text-red-500 text-xl">No movie ID provided</p>';
        }
        // Go back function
        function goBack() {
            window.history.back();
        }
