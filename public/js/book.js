const id = Number(window.location.pathname.split('/')[2]);
let sent = true;
let bookData;
let reviews;
let bookshelves;
let currentUserId;
let prevState = {};

const cover = document.getElementById('cover');
const title = document.getElementById('title');
const summary = document.getElementById('summary');
const authors = document.getElementById('author');
const series = document.getElementById('series');
const reviewContent = document.getElementById('review-list');
const reviewCount = document.querySelector('.review-count');
const avgRating = document.querySelector('.avg-rating');
const manageShelves = document.querySelector('.select-shelves-placeholder');
const reviewLink = document.querySelector('.review-link-button');
const shelveListContainer = document.querySelector('.shelve-list-container');

async function getBook() {
  const res = await fetch(`/api/books/${id}`);
  const data = await res.json();
  bookData = data;
  return bookData;
}

function compareState(state1, state2) {
  if (typeof state1 === 'string' && typeof state2 === 'string') {
    return state1 !== state2;
  }

  if (state1.length !== state2.length) {
    return true;
  }

  return !state1.every((val) => state2.includes(val));
}

function newlinePs(summary) {
  return summary
    .split('\n')
    .map((line) => `<p class="summary-paragraph">${line}</p>`)
    .join('');
}

function getReviewRow(review, i) {
  const {
    rating,
    User: { firstName, lastName, id: userId },
  } = review;

  if (currentUserId === userId) {
    reviewLink.innerText = 'Edit Your Review';
    reviewLink.href = `/reviews/edit/book/${id}`;
  }

  const revContainer = document.createElement('div');
  revContainer.classList.add('review-row');

  if (i === 0) {
    revContainer.classList.add('first-review-row');
  }

  const reviewRowContent = document.createElement('div');
  reviewRowContent.classList.add('review-row-content');

  const reviewDetails = document.createElement('div');
  reviewDetails.classList.add('review-row-info');

  const userAndRating = document.createElement('div');
  let userRatingStr = `<h4 class='user-name'>${firstName} ${lastName}</h4>`;

  if (rating >= 0 && typeof rating === 'number') {
    userRatingStr += ' rated it ';

    const starNums = [1, 2, 3, 4, 5];

    let starStr = starNums
      .map((num) => {
        return `<svg class='user-star' id='user-${userId}-star-view-${num}' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio>
        <path ${
          num <= review.rating ? 'class="filled-user-star"' : ''
        } id='user-${userId}-star-path-${num}' d="M54,5 86,105 1,43H107L22,105" fill="#808080"/>
        </svg>`;
      })
      .join('');

    userRatingStr += `<div class='user-stars'>${starStr}</div>`;
  }

  const reviewDate = document.createElement('span');
  reviewDate.classList.add('review-date');
  reviewDate.innerText = new Date(review.updatedAt)
    .toString()
    .split(' ')
    .slice(1, 4)
    .join(' ');
  userAndRating.innerHTML = userRatingStr;

  const reviewText = document.createElement('p');
  reviewText.classList.add('review-text');

  reviewText.innerText = review.content;

  const userImage = document.createElement('img');

  userImage.src = '/public/images/default-profile-pic.png';

  reviewDetails.append(userAndRating, reviewDate);

  reviewRowContent.append(reviewDetails, reviewText);

  revContainer.append(userImage, reviewRowContent);

  reviewContent.appendChild(revContainer);
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
  series.innerHTML = seriesData ? `${seriesData.name} Series` : '';
}

async function getReviews() {
  const res = await fetch(`/api/books/${id}/reviews`);
  const data = await res.json();
  reviews = data.reviews;
  currentUserId = data.userId;
}

function populateReviewContent() {
  if (reviews.length) {
    reviews.forEach((review, i) => getReviewRow(review, i));
  } else {
    reviewContent.setAttribute('id', 'no-reviews');
    reviewContent.innerHTML =
      '<h2 class="no-review-header" style="text-align: center;">This book does not currently have any reviews</h2>';
  }

  let { average, numRatings } = getAvgRating(reviews);
  avgRating.innerHTML = average ? average.toFixed(1) : 0;

  let reviewStr = '';
  if (!numRatings) {
    reviewStr = '0 ratings ';
  } else if (numRatings === 1) {
    reviewStr = '1 rating';
  } else {
    reviewStr = `${numRatings} ratings `;
  }

  if (reviews.length === 1) {
    reviewStr += ' - 1 review';
  } else if (!reviews.length) {
    reviewStr = 'No reviews';
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
      average: avgRating,
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

  if (!reviewLink.innerText) {
    reviewLink.innerText = 'Add a Review';
    reviewLink.href = `/reviews/add/book/${id}`;
  }

  manageShelves.addEventListener('click', async ({ target }) => {
    console.log(target);
    if (
      !target.classList.contains('select-shelves-placeholder') &&
      !target.classList.contains('bookshelves-text') &&
      !target.classList.contains('shelf-arrow-placeholder')
    ) {
      return;
    }

    const originalInnerHTML =
      'Manage Booshelves <span class="shelf-arrow-placeholder">▾</span>';

    document.querySelector('.shelve-list-container').classList.toggle('hidden');
    const formData = new FormData(document.querySelector('.shelf-form'));

    if (!shelveListContainer.classList.contains('hidden')) {
      prevState = {
        defaultShelf: formData.getAll('defaultShelf'),
        createdShelf: formData.getAll('createdShelf'),
      };
    } else {
      const body = {
        defaultShelf: formData.getAll('defaultShelf'),
        createdShelf: formData.getAll('createdShelf'),
      };

      console.log(body, prevState);

      if (
        compareState(prevState['defaultShelf'], body['defaultShelf']) ||
        compareState(prevState['createdShelf'], body['createdShelf'])
      ) {
        manageShelves.innerHTML = 'Saving...';
        manageShelves.classList.add('no-pointer-events');
        manageShelves.classList.add('saving');

        const res = await fetch(`/api/books/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });

        if (res.ok) {
          setTimeout(() => {
            manageShelves.innerHTML = `Manage Bookshelves<span class='self-arrow-placeholder'>▾</span>`;
            manageShelves.classList.remove('no-pointer-events');
            manageShelves.classList.remove('saving');
          }, 250);
        }
      }
    }
  });
});
