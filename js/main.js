let elMovieCardTemplate = document.querySelector("#movie_card").content;
let elMoviesWrapper = document.querySelector(".movies_wrapper");
let elForm = document.querySelector(".form");
let elRating = document.querySelector(".movie__rating");
let search = document.getElementById("movie__search")
let movieSelect = document.getElementById("movie__select")
let movieReating = document.getElementById("movie__number")
let elResult = document.querySelector(".result");

console.log(elMovieCardTemplate);

let newMovies = movies.slice(0, 151)

function normolize(array) {
    let normolizedArray = []
    
    array.forEach(function (item) {
        let newItem = {}
        
        newItem.title = item.Title.toString();
        newItem.movieYear = item.movie_year;
        newItem.categories = item.Categories.split("|");
        newItem.rating = item.imdb_rating;
        newItem.img =  `https://i.ytimg.com/vi/${item.ytid}/mqdefault.jpg`;
        newItem.videoUrl =  `https://www.youtube.com/watch?v=${item.ytid}`;
        
        
        normolizedArray.push(newItem)
        
    });
    
    return normolizedArray
}

let normolizedArray = newMovies.map(function (item) {
    return {
        title: item.Title.toString(),
        movieYear: item.movie_year,
        categories: item.Categories.split("|"),
        rating: item.imdb_rating,
        img:  `https://i.ytimg.com/vi/${item.ytid}/mqdefault.jpg`,
        videoUrl:  `https://www.youtube.com/watch?v=${item.ytid}`
    }
});

function generateCategories(array) {
    let newCategoriesArray = []
    
    for (let item of array) {
        for (let categoryItem of item.categories) {
            if (!newCategoriesArray.includes(categoryItem)) {
                newCategoriesArray.push(categoryItem)
            }
        }
    }
    
    return newCategoriesArray
}

let categoryList = generateCategories(normolizedArray);

function renderMovies(array) {
    elMoviesWrapper.innerHTML = null;
    elResult.textContent = array.length
    
    let elFragment = document.createDocumentFragment();
    
    for (const item of array) {
        let movieCard = elMovieCardTemplate.cloneNode(true);
        
        movieCard.querySelector(".card-img-top").src = item.img;
        movieCard.querySelector(".card__heading").textContent = item.title;
        movieCard.querySelector(".movie__year").textContent = item.movieYear;
        movieCard.querySelector(".movie__rating").textContent = item.categories;
        movieCard.querySelector(".movie__link").href = item.videoUrl;
        movieCard.querySelector(".movie__link").setAttribute("target", "blank");
        
        elFragment.appendChild(movieCard);     
    }
    
    elMoviesWrapper.appendChild(elFragment);      
}

renderMovies(normolizedArray);

form.addEventListener("submit", e =>{
    e.preventDefault()
    
    let regex = new RegExp(search.value.trim(), "gi")
    let filterMovie = movies
    
    if(search.value.length > 3){
        filterMovie = movies.filter(item => String(item.title).match(regex))
    }
    
    if (movieReating.value){
        filterMovie = filterMovie.filter(film => film.imdbRating >= Number(movieReating.value))
    }
    
    if (movieSelect.value){
        if (movieSelect.value !== "All") {
            filterMovie = filterMovie.filter(film => film.categories.includes(movieSelect.value))
        } 
    }
    
    moviRender(filterMovie)
})