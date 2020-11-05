const id = Number(window.location.pathname.split('/')[2]);
let sent = true;
let bookData;
let reviews;

const cover = document.getElementById('cover');
const title = document.getElementById('title');
const summary = document.getElementById('summary');
const authors = document.getElementById('author');
const series = document.getElementById('series');
const reviewContent = document.getElementById('reviews')
const reviewCount = document.querySelector('.review-count');
const avgRating = document.querySelector('.avg-rating');
const manageShelves = document.querySelector('.select-shelves-placeholder');

async function getBook() {
    const res = await fetch(`/api/books/${id}`);
    const data = await res.json();
    bookData = data;
    return bookData;
};

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
    summary.innerHTML = book.summary;
    authors.innerHTML = `By ${author.firstName} ${author.lastName}`;
    series.innerHTML = `${seriesData.name} Series`;
}

async function getReviews() {
    const res = await fetch(`/api/books/${id}/reviews`);
    const data = await res.json();
    reviews = data.reviews;
};

function populateReviewContent() {
    reviews.forEach(review => {
        const revContainer = document.createElement('tr');
        const rev = document.createElement('td');
        const userInfo = document.createElement('td');
        const user = review.User;
        revContainer.setAttribute('id', 'review-row');
        rev.setAttribute('id', 'review');
        userInfo.setAttribute('id', 'user-info');
        userInfo.innerHTML = `- ${user.firstName} ${user.lastName}`;
        rev.innerHTML = review.content;
        reviewContent.appendChild(revContainer);
        revContainer.appendChild(rev);
        revContainer.appendChild(userInfo);
    });

    if (reviews.length === 1) {
        reviewCount.innerHTML = '1 review';
    } else if (!reviews.length) {
        reviewCount.innerHTML = 'This book currently has no reviews';
    } else {
        reviewCount.innerHTML = `${reviews.length} reviews`;
    }
    let average = getAvgRating(reviews);
    avgRating.innerHTML = average;

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
    <path id="star-path-4" d="M54,5 86,105 1,43H107L22,105" fill="url(#grad)"></path>`;

        document.querySelector(`#star-view-${quotient + 1}`).innerHTML = innerSVG;
    }
}

function getAvgRating(reviews) {
    // Filter out reviews with no rating
    let ratings = reviews.map((review) => review.rating).filter((rating) => rating >= 1);
    if (ratings.length) {
        let avgRating = ratings.reduce((accum, val) => accum += val) / ratings.length;
        return avgRating.toFixed(1);
    } else {
        return "This book has no ratings";
    }
}

const populateShelves = async () => {
    const res = await fetch('/api/bookshelves');
    const data = await res.json();
    const bookshelves = data.bookshelves;
    let shelfStr = '';
    for (const shelf of bookshelves) {
        const bookIds = shelf.Books.map((book) => Number(book.id));
        if (shelf.defaultShelf) {
            const shelfItem = document.getElementById(shelf.name.toLowerCase().split(' ').join('-'));
            shelfItem.value = shelf.id;
            if (bookIds.includes(id)) {
                shelfItem.setAttribute('checked', true);
            }
        } else {
            shelfStr += `<li class='created-shelves__list-item created-shelves__list-item--${shelf.name.toLowerCase()}'>
            <label for='${shelf.name.toLowerCase()}'>${shelf.name}</label>`

            if (!bookIds.includes(id)) {
                shelfStr += `<input type='checkbox' id='${shelf.name}' name='${shelf.name}'>
                </li>`;
            } else {
                shelfStr += `<input type='checkbox' id='${shelf.name}' name='${shelf.name}' checked>
                </li>`;
            }
        }
    }
    document.querySelector('.shelves__dropdown--created-shelves').innerHTML = shelfStr;
}

// getReviews();
// populateShelves();

document.addEventListener('DOMContentLoaded', async event => {
    await getBook();
    await getReviews();

    populateBookContent();
    populateReviewContent();

    manageShelves.addEventListener('click', async event => {
        const target = event.target;
        console.log(target.classList.contains('bookshelves-text'));
        if (!target.classList.contains('select-shelves-placeholder') && !target.classList.contains('bookshelves-text') && !target.classList.contains('shelf-arrow-placeholder')) {
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
            const body = {
            };
            for (let key of formData.keys()) {
                body[key] = formData.get(key);
            }

            const res = await fetch(`/api/books/${id}`, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (res.ok) {
                window.location.pathname = '/my-books';
            }
        }
    })
})