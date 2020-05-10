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
    const star = this.rating < 6.5 ? '<i class="fas fa-star-half-alt"></i>' : '<i class="fas fa-star"></i>';
    const testImg = document.createElement('img');

    if (this.poster === 'N/A') {
      moviePoster.style.backgroundImage = 'url(images/default-poster.png)';
    } else {
      testImg.src = `${this.poster}`;
      testImg.onload = () => { moviePoster.style.backgroundImage = `url(${this.poster})`; };
      testImg.onerror = () => { moviePoster.style.backgroundImage = 'url(images/default-poster.png)'; };
      testImg.remove();
    }

    // add classes, attributes and values to elements
    slideCard.classList.add('swiper-slide', 'd-flex', 'flex-column');
    movieTitle.setAttribute('href', `https://www.imdb.com/title/${this.id}`);
    movieTitle.setAttribute('target', '_blank');
    movieTitle.classList.add('title', 'p-3', 'font-weight-bold');
    movieTitle.innerHTML = this.title;
    moviePoster.classList.add('card-body');
    movieYear.classList.add('year', 'p-3');
    movieYear.innerHTML = this.year;
    movieRating.classList.add('rating', 'px-3', 'pb-4', 'text-warning');
    movieRating.setAttribute('data-id', this.id);
    movieRating.innerHTML = `${star} ${this.rating}`;

    // create slide element
    slideCard.appendChild(movieTitle);
    slideCard.appendChild(moviePoster);
    slideCard.appendChild(movieYear);
    slideCard.appendChild(movieRating);

    return slideCard;
  }
}

export default MovieSlide;
