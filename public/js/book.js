const id = Number(window.location.pathname.split('/')[2]);
let sent = true;
const cover = document.getElementById('cover');
const title = document.getElementById('title');
const summary = document.getElementById('summary');
const authors = document.getElementById('author');
const series = document.getElementById('series');
const reviewContent = document.getElementById('reviews')
const manageShelves = document.querySelector('.select-shelves-placeholder');

async function getBook() {
    const res = await fetch(`/api/books/${id}`);
    const data = await res.json();
    const book = data.book;
    const userId = data.userId;
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
};

async function getReviews() {
    const res = await fetch(`/api/books/${id}/reviews`);
    const data = await res.json();
    const reviews = data.reviews;
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

};

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

getBook();
getReviews();
populateShelves();

document.addEventListener('DOMContentLoaded', async event => {

})