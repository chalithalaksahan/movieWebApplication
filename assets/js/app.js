console.log("jsloaded!!")

 let menuButton = document.getElementById('menuButton');
 let mobileMenu = document.getElementById('mobileMenu');

    menuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

 let categoryBtns = document.querySelectorAll('.category-btn');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => {
                b.classList.remove('active', 'bg-red-600');
                b.classList.add('bg-[#0D2851]');
            });
            btn.classList.add('active', 'bg-red-600');
            btn.classList.remove('bg-[#0D2851]');
        });
    });

    // Api config
    const API_KEY ='c5b6f95dd3cd3e52f088fba760aa6302';
    const BASE_URL = 'https://api.themoviedb.org/3';
    const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

    let currentCategory = 'now_playing';
    let currentGenre='all';
    let allMovies =[];

    const movieContainer = document.getElementById('movieContainer');
    const loading = document.getElementById('loading');
    const noResults = document.getElementById('noResults');
    const sectionTitle = document.getElementById('sectionTitle');
    const searchInput = document.getElementById('searchInput');
    
    //fetch Api

    async function fetchMovies(category){
        showLoading();

        const res = await fetch(`${BASE_URL}/movie/${category}?api_key=${API_KEY}&language=en-US&page=1`);
        const data = await res.json();

        allMovies = data.results;
        displayMovies(allMovies);

    }

    //Movies Load into card

    function displayMovies(movies){
        hideLoading();
        movieContainer.innerHTML='';
        
        if(movies.length===0){
            showNoResults();
            return;
        }

        hideNoResults();

      

        movies.forEach(movie =>{
            const movieCard = createMovieCard(movie);
            movieContainer.innerHTML += movieCard;
            
        });
    }

    // create html card
    function createMovieCard(movie){
        const posterPath = movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}`: 'https://via.placeholder.com/300x450/1a2942/ffffff?text=No+Image';
        const rating = movie.vote_average ? movie.vote_average.toFixed(1): 'N/A';
        const year = movie.release_date ? movie.release_date.split('-')[0]: 'N/A';
        console.log(movie);


        return `
        <div class="bg-[#0D2851] rounded-xl overflow-hidden border border-[#1a3d6b] hover:scale-105 transition cursor-pointer">
                    <div class="h-96 bg-gray-700">
                        <img src="${posterPath}" alt="${movie.title}" class="w-full h-full object-cover" onerror="this.src='https://via.placeholder.com/300x450/1a2942/ffffff?text=No+Image'">
                    </div>
                    <div class="p-4">
                        <h3 class="text-white font-semibold text-lg mb-2 line-clamp-1">${movie.title}</h3>
                        <div class="flex items-center gap-2 text-sm text-gray-400">
                            <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                            <span>${rating}</span>
                            <span>•</span>
                            <span>${year}</span>
                        </div>
                    </div>
        </div>
        `;
    }
     // Filter movies by genre
        function filterByGenre(genreId) {
            if (genreId === 'all') {
                displayMovies(allMovies);
            } else {
                const filtered = allMovies.filter(movie => 
                    movie.genre_ids.includes(parseInt(genreId))
                );
                displayMovies(filtered);
            }
        }
        
        // Search movies
        async function searchMovies(query) {
            if (!query.trim()) {
                displayMovies(allMovies);
                return;
            }

            const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`);
            const data = await res.json();

            if (data.results && data.results.length > 0) {
                displayMovies(data.results);
            } else {
                displayMovies([]);
            }
        }
        
        // Show/Hide loading
        function showLoading() {
            loading.classList.remove('hidden');
            movieContainer.classList.add('hidden');
            noResults.classList.add('hidden');
        }
        
        function hideLoading() {
            loading.classList.add('hidden');
            movieContainer.classList.remove('hidden');
        }
        
        function showNoResults() {
            noResults.classList.remove('hidden');
            movieContainer.classList.add('hidden');
            loading.classList.add('hidden');
        }
        
        function hideNoResults() {
            noResults.classList.add('hidden');
        }
        
        // Update section title
        function updateTitle(category) {
            const titles = {
                'now_playing': 'Now Playing',
                'popular': 'Popular Movies',
                'top_rated': 'Top Rated',
                'upcoming': 'Upcoming Movies'
            };
            sectionTitle.textContent = titles[category] || 'Movies';
        }
      
      // Event Listeners
        
        // Desktop navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                currentCategory = e.target.dataset.category;
                currentGenre = 'all';
                
                // Reset genre buttons
                document.querySelectorAll('.category-btn').forEach(btn => {
                    btn.classList.remove('active', 'bg-red-600');
                    btn.classList.add('bg-[#0D2851]');
                });
                document.querySelector('[data-genre="all"]').classList.add('active', 'bg-red-600');
                document.querySelector('[data-genre="all"]').classList.remove('bg-[#0D2851]');
                
                updateTitle(currentCategory);
                fetchMovies(currentCategory);
            });
        });
        
        // Mobile navigation links
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                currentCategory = e.target.dataset.category;
                currentGenre = 'all';
                
                // Close mobile menu
                mobileMenu.classList.add('hidden');
                
                // Reset genre buttons
                document.querySelectorAll('.category-btn').forEach(btn => {
                    btn.classList.remove('active', 'bg-red-600');
                    btn.classList.add('bg-[#0D2851]');
                });
                document.querySelector('[data-genre="all"]').classList.add('active', 'bg-red-600');
                document.querySelector('[data-genre="all"]').classList.remove('bg-[#0D2851]');
                
                updateTitle(currentCategory);
                fetchMovies(currentCategory);
            });
        });
        
        // Genre filter buttons
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active from all
                document.querySelectorAll('.category-btn').forEach(b => {
                    b.classList.remove('active', 'bg-red-600');
                    b.classList.add('bg-[#0D2851]');
                });
                
                // Add active to clicked
                btn.classList.add('active', 'bg-red-600');
                btn.classList.remove('bg-[#0D2851]');
                
                currentGenre = btn.dataset.genre;
                filterByGenre(currentGenre);
            });
        });
        
        searchInput.addEventListener('input', async (e) => {
                const query = e.target.value.trim();

                // If empty → show category movies again
                if (!query) {
                    displayMovies(allMovies);
                    hideSuggestions();
                    return;
                }

                // Fetch suggestions
                showSuggestions(query);

                // live search in whole database
                searchMovies(query);
            });
            
            async function showSuggestions(query) {

            const suggestionBox = document.getElementById("suggestionBox");

            const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`);
            const data = await res.json();

            // No results
            if (!data.results || data.results.length === 0) {
                suggestionBox.classList.add("hidden");
                return;
            }

            // Build suggestion list
            suggestionBox.innerHTML = data.results
                .slice(0, 8)
                .map(item => `
                    <div class="px-4 py-2 cursor-pointer hover:bg-gray-200">
                        ${item.title}
                    </div>
                `).join("");

            suggestionBox.classList.remove("hidden");

            // Click suggestion
            Array.from(suggestionBox.children).forEach((child, i) => {
                child.addEventListener("click", () => {
                    const selected = data.results[i].title;
                    searchInput.value = selected;

                    suggestionBox.classList.add("hidden");

                    searchMovies(selected);
                });
            });
        }

        function hideSuggestions() {
            document.getElementById("suggestionBox").classList.add("hidden");
        }
        // Initial load
        fetchMovies(currentCategory);
    