const id = Number(window.location.pathname.split('/')[2]);
let sent = true;
let bookData;
let reviews;
let bookshelves;

const cover = document.getElementById('cover');
const title = document.getElementById('title');
const summary = document.getElementById('summary');
const authors = document.getElementById('author');
const series = document.getElementById('series');
const reviewContent = document.getElementById('review-list');
const reviewCount = document.querySelector('.review-count');
const avgRating = document.querySelector('.avg-rating');
const manageShelves = document.querySelector('.select-shelves-placeholder');

async function getBook() {
  const res = await fetch(`/api/books/${id}`);
  const data = await res.json();
  bookData = data;
  return bookData;
}

function newlinePs(summary) {
  return summary
    .split('\n')
    .map((line) => `<p class="summary-paragraph">${line}</p>`)
    .join('');
}

function populateBookContent() {
  const { book } = bookData;
  const userId = bookData.userId;
  const author = book.Authors[0];
  const seriesData = book.Series;
  const genres = book.Genres;
  const pub = book.Publisher;
  const shelves = book.Bookshelves;
  cover.setAttribute('src', book.cover);
  title.innerHTML = book.title;
  summary.innerHTML = newlinePs(book.summary);
  authors.innerHTML = `By ${author.firstName} ${author.lastName}`;
  series.innerHTML = `${seriesData.name} Series`;
}

async function getReviews() {
  const res = await fetch(`/api/books/${id}/reviews`);
  const data = await res.json();
  reviews = data.reviews;
}

function populateReviewContent() {
  reviews.forEach((review) => {
    console.log(review);
    const {
      rating,
      User: { firstName, lastName, id: userId },
    } = review;

    const revContainer = document.createElement('div');
    revContainer.classList.add('review-row');

    const reviewRowContent = document.createElement('div');

    const reviewDetails = document.createElement('div');

    const userAndRating = document.createElement('div');
    let userRatingStr = `<strong>${firstName} ${lastName}</strong>`;

    if (rating >= 0 && typeof rating === 'number') {
      userRatingStr += ' rated it ';

      const starNums = [1, 2, 3, 4, 5];

      let starStr = starNums
        .map((num) => {
          return `<svg class='star' id='user-${userId}-star-view-${num}' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio>
        <path ${
          num <= review.rating ? 'class="filled-star"' : ''
        } id='user-${userId}-star-path-${num}' d="M54,5 86,105 1,43H107L22,105" fill="#808080"/>
        </svg>`;
        })
        .join('');

      userRatingStr += starStr;
    }

    const reviewDate = document.createElement('span');
    reviewDate.innerText = new Date(review.updatedAt)
      .toString()
      .split(' ')
      .slice(1, 4)
      .join(' ');
    userAndRating.innerHTML = userRatingStr;

    const reviewText = document.createElement('p');

    reviewText.innerText = review.content;

    const userImage = document.createElement('img');

    userImage.src = '/public/images/default-profile-pic.png';

    reviewDetails.append(userAndRating, reviewDate);

    reviewRowContent.append(reviewDetails, reviewText);

    revContainer.append(userImage, reviewRowContent);

    reviewContent.appendChild(revContainer);
  });

  let { average, numRatings } = getAvgRating(reviews);
  avgRating.innerHTML = average;

  let reviewStr = '';
  if (!numRatings) {
    reviewStr = '0 ratings ';
  } else if (numRatings === 1) {
    reviewStr = '1 rating';
  } else {
    reviewStr = `${numRatings} ratings `;
  }

  if (reviews.length === 1) {
    reviewStr += '- 1 review';
  } else if (!reviews.length) {
    reviewStr = 'This book currently has no reviews';
  } else {
    reviewStr += `- ${reviews.length} reviews`;
  }

  reviewCount.innerHTML = reviewStr;

  if (typeof average === 'number') {
    let quotient = Math.floor(average);
    let remainder = average % quotient;

    for (let i = 1; i <= quotient; i++) {
      document.querySelector(`#star-path-${i}`).classList.add('filled-star');
    }

    if (remainder > 0) {
      let innerSVG = `
          <defs>
          <linearGradient id="grad">
          <stop offset="50%" stop-color="yellow"/>
          <stop offset="50%" stop-color="grey" stop-opacity="1" />
      </linearGradient>
      </defs>
      <path id="star-path-${
        quotient + 1
      }" d="M54,5 86,105 1,43H107L22,105" fill="url(#grad)"></path>`;

      document.querySelector(`#star-view-${quotient + 1}`).innerHTML = innerSVG;
    }
  }
}

function getAvgRating(reviews) {
  // Filter out reviews with no rating
  let ratings = reviews
    .map((review) => review.rating)
    .filter((rating) => rating >= 0);
  if (ratings.length) {
    let avgRating =
      ratings.reduce((accum, val) => (accum += val)) / ratings.length;
    return {
      average: Number(avgRating.toFixed(1)),
      numRatings: ratings.length,
    };
  } else {
    return 'This book has no ratings';
  }
}

async function getShelves() {
  const res = await fetch('/api/bookshelves');
  const data = await res.json();
  bookshelves = data.bookshelves;
}

function populateShelves() {
  let shelfStr = '';
  for (const shelf of bookshelves) {
    const bookIds = shelf.Books.map((book) => Number(book.id));
    console.log(shelf);
    if (shelf.defaultShelf) {
      const shelfItem = document.getElementById(
        shelf.name.toLowerCase().split(' ').join('-')
      );
      shelfItem.value = shelf.id;
      if (bookIds.includes(id)) {
        shelfItem.setAttribute('checked', true);
      }
    } else {
      shelfStr += `<li class='created-shelves__list-item created-shelves__list-item--${shelf.name.toLowerCase()}'>
            <label for='${shelf.name.toLowerCase()}'>${shelf.name}</label>`;

      if (!bookIds.includes(id)) {
        shelfStr += `<input type='checkbox' id='${shelf.name}' name='createdShelf' value='${shelf.id}'>
                </li>`;
      } else {
        shelfStr += `<input type='checkbox' id='${shelf.name}' name='createdShelf' value='${shelf.id}' checked>
                </li>`;
      }
    }
  }
  document.querySelector(
    '.shelves__dropdown--created-shelves'
  ).innerHTML = shelfStr;
}

document.addEventListener('DOMContentLoaded', async (event) => {
  await getBook();
  await getReviews();
  await getShelves();

  populateBookContent();
  populateReviewContent();
  populateShelves();

  manageShelves.addEventListener('click', async ({ target }) => {
    if (
      !target.classList.contains('select-shelves-placeholder') &&
      !target.classList.contains('bookshelves-text') &&
      !target.classList.contains('shelf-arrow-placeholder')
    ) {
      return;
    }
    document.querySelector('.shelve-list-container').classList.toggle('hidden');
    const formData = new FormData(document.querySelector('form'));
    if (sent) {
      sent = false;
    } else {
      sent = true;
      const text = document.querySelector('.bookshelves-text');
      text.innerHTML = 'Saving...';
      text.classList.add('saving');
      document.querySelector('.shelf-arrow-placeholder').innerHTML = '';
      const body = {};
      for (let key of formData.keys()) {
        body[key] = formData.getAll(key);
      }

      const res = await fetch(`/api/books/${id}`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        window.location.pathname = '/my-books';
      }
    }
  });
});
