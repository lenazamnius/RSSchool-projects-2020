class MovieSlide {
  constructor(id, title, poster, year, rating) {
    this.id = id;
    this.title = title;
    this.poster = poster;
    this.year = year;
    this.rating = rating;
  }

  createSlideHtmlElements() {
    const slideCard = document.createElement('div');
    const movieTitle = document.createElement('a');
    const moviePoster = document.createElement('div');
    const movieYear = document.createElement('div');
    const movieRating = document.createElement('div');
    const star = this.rating < 7 ? '<i class="fas fa-star-half-alt"></i>' : '<i class="fas fa-star"></i>';

    // add classes, attributes and values to elements
    slideCard.classList.add('swiper-slide', 'd-flex', 'flex-column');
    movieTitle.setAttribute('href', `https://www.imdb.com/title/${this.id}`);
    movieTitle.setAttribute('target', `_blank`);
    movieTitle.classList.add('title', 'p-3', 'text-muted', 'font-weight-bold');
    movieTitle.innerHTML = this.title;
    moviePoster.classList.add('card-body');
    moviePoster.style.backgroundImage = `url(${this.poster})`;
    movieYear.classList.add('year', 'p-3');
    movieYear.innerHTML = this.year;
    movieRating.classList.add('rating', 'px-3', 'pb-4', 'text-warning');
    movieRating.setAttribute('data-id', this.id);
    movieRating.innerHTML = star;

    // create slide
    slideCard.appendChild(movieTitle);
    slideCard.appendChild(moviePoster);
    slideCard.appendChild(movieYear);
    slideCard.appendChild(movieRating);

    return slideCard;
  }
}

export default MovieSlide;

// http://www.omdbapi.com/?apikey=3b910c7f&i=tt3896198&
// https://www.imdb.com/title/<imdbID'> to get a link to the movie