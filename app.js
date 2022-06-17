//1. NAV LOGIC 

// 1.1 SELECTORS 
const searchButton = document.querySelector('.btn');
const inp = document.querySelector('.input');
const burguerBtn = document.querySelector('.burguerBtn');
const navPrimary = document.querySelector('.navigation');
const closeIcon = document.querySelector('.close-icon');
// 1.2 FUNCTIONS 

// 1.3 EVENTS 
// SHOW THE TEXT INPUT
searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    const visibility = input.getAttribute('aria-expanded');
    inp.setAttribute('aria-expanded', true);
    closeIcon.setAttribute('aria-hidden', false);
})

closeIcon.addEventListener('click', (e) => {
    e.preventDefault();
    inp.setAttribute('aria-expanded', false);
    closeIcon.setAttribute('aria-hidden', true);
})
// ENDS HERE

// TOGGLE THE MOBILE NAV
burguerBtn.addEventListener('click', () => {
    const dataValue = navPrimary.getAttribute('data-visible');
    if (dataValue === 'false') {
        navPrimary.setAttribute('data-visible', true);
        burguerBtn.setAttribute('aria-expanded', true);
        searchButton.setAttribute('aria-hidden', true);
        inp.setAttribute('aria-hidden', false);
    } else {
        navPrimary.setAttribute('data-visible', false);
        burguerBtn.setAttribute('aria-expanded', false);
        setTimeout(() => {
            searchButton.setAttribute('aria-hidden', false);
            inp.setAttribute('aria-hidden', true);
        }, 350);
    }
})


// 2. MAKE THE API REQUEST FOR THE:
//  *SEARCH INPUT 
//  ** TRENDING MOVIES
//  *** TRENDING SERIES 

// SELECTORS 
const input = document.querySelector("#tvShow");
const btn = document.querySelector('#submitButton'); //CREO QUE NO EXISTE MAS YA BEREMOS QUE HACER
const form = document.querySelector('#iform');
const showsContainer = document.querySelector('#showsContainer');
const trendingMoviesContainer = document.querySelector('.trendingMoviesContainer');
const trendingSeriesContainer = document.querySelector('.trendingSeriesContainer');
const movie_nav = document.querySelector('#movies');
const serie_nav = document.querySelector('#series');
const pageMark = document.querySelector('#pageMark');
const url_base = 'https://api.themoviedb.org/3';
const api_key = 'api_key=20ee4e0b472407ed4efbeccff9aca29c'
// FUNCTIONS 

//  LOOK WHAT THE USER ENTER IN THE INPUT
const searchShow = async (e) => {
    e.preventDefault();
    // REMOVE OLD SEARCHES   
    discardEverything();

    let searchingShow = input.value;
    pageMark.innerText = `Showing the results of: "${input.value}"`
    let res = await axios.get(`${url_base}/search/multi?${api_key}&query=${searchingShow}`);
    input.value = '';
    showShows(res.data.results);
    // console.log(res.data.results);
}

//  REQUEST FOR THE TRENDING MOVIES
const searchTrendingMovies = async () => {
    discardEverything();
    pageMark.innerText = 'Trending movies of the week'
    let res = await axios.get(`${url_base}/trending/movie/day?${api_key}`);
    showShows(res.data.results);
}
//  REQUEST FOR THE TRENDING SERIES
const searchTrendingSeries = async () => {
    discardEverything();
    pageMark.innerText = 'Trending series of the week'
    let res = await axios.get(`${url_base}/trending/tv/day?${api_key}`);
    showShows(res.data.results);
}


const showShows = (shows) => {
    for (let result of shows) {
        let overview = result.overview;
        if (overview.length >= 200) {
            overview = overview.slice(0, 200) + '...';
        }
        if (result.poster_path !== null) {
            if (result.title !== undefined) {
                showsContainer.insertAdjacentHTML(
                    "beforeend",
                    `<div class="eachSearchContainer slide-up">
                <img src="https://image.tmdb.org/t/p/w500/${result.poster_path}">
                <div class="info">
                    <h2>${result.title}</h2 >
                    <p>${overview}</p>
                </div >
                </div >`);
            } else {
                showsContainer.insertAdjacentHTML(
                    "beforeend",
                    `<div class="eachSearchContainer slide-up">
                <img src="https://image.tmdb.org/t/p/w500/${result.poster_path}">
                <div class="info">
                    <h2>${result.name}</h2 >
                    <p>${overview}</p>
                </div >
                </div >`)
            }
        }
    }
    tl1.play();
}

const discardEverything = () => {
    while (showsContainer.firstChild) {
        showsContainer.firstChild.remove();
    }
}

// EVENTS 
form.addEventListener('submit', searchShow);
searchTrendingMovies();
movie_nav.addEventListener('click', searchTrendingMovies)
serie_nav.addEventListener('click', searchTrendingSeries)

// 5. MAKE THE NAV ELEMENTS WORK 

const home = document.querySelector('#home');

// home.addEventListener('click', () => {
//     discardEverything();
// })




// HOME ANIMATION

const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

tl.to('.text', { y: "0%", duration: 1, stagger: 0.25 });
tl.to('.slider', { y: "-100%", duration: 1.2, delay: 0.1 });
tl.to('.intro', { y: "-100%", duration: 1 }, "-=0.95");
tl.fromTo('li', { opacity: 0 }, { opacity: 1, duration: 1, stagger: 0.2 });
tl.fromTo('.btn', { opacity: 0 }, { opacity: 1, duration: 1 }, "-=0.8");
// tl.fromTo('#pageMark', { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.5");
// tl.fromTo('#showsContainer', { y: "100%" }, { y: "0%", duration: 2, stagger: 0.25 }, "-=1");

const tl1 = gsap.timeline({ defaults: { ease: 'power2.out' }, paused: true });

tl1.fromTo('#showsContainer', { y: "100%" }, { y: "0%", duration: 2, stagger: 0.25, delay: 2 }, "-=1");
tl1.fromTo('#pageMark', { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.5");


