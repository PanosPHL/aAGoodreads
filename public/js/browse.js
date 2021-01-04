const [, , browseType] = window.location.pathname.toString().split('/');

const shelveText = document.getElementsByClassName('body-shelves-container');

function getAvgRating(reviews) {
  // Filter out reviews with no rating
  let ratings = reviews
    .map((review) => review.rating)
    .filter((rating) => rating >= 1);
  if (ratings.length) {
    let avgRating =
      ratings.reduce((accum, val) => (accum += val)) / ratings.length;
    return `avg rating ${avgRating.toFixed(1)}`;
  } else {
    return 'This book has no ratings';
  }
}

function genList(books, bookshelves, userId) {
  let bodyStr = '';
  books.map((book, i) => {
    let rowArr = [
      `<div class="${
        i === books.length - 1 ? 'book-list-item last' : 'book-list-item'
      }">`,
    ];

    rowArr.push(`<img class="book-list-item__cover" src='${book.cover}' />`);

    let authorList = '<span>';

    if (book.Authors.length > 2) {
      let lastAuthor = book.Authors[book.Authors.length - 1];
      authorList += book.Authors.slice(0, book.Authors.length - 1)
        .map((author) => {
          return `<a href='/browse/authors/${id}>${
            author.firstName + ' ' + author.lastName
          }</a>`;
        })
        .join(', ');
      authorList += `, and <a href='/browse/authors/${lastAuthor.id}>${
        lastAuthor.firstName + ' ' + lastAuthor.lastName
      }</a>`;
    } else if (book.Authors.length == 2) {
      authorList += book.Authors.map((author) => {
        return `<a href='/browse/authors/${author.id}>${
          author.firstName + ' ' + author.lastName
        }</a>`;
      }).join(' and ');
    } else {
      authorList += `<a href='/browse/authors/${book.Authors[0].id}'>${
        book.Authors[0].firstName + ' ' + book.Authors[0].lastName
      }</a>`;
    }
    authorList += '</span>';

    rowArr.push(
      `<div class='book-list-item__text-container'>
                <div class='book-list-item__book-and-author'>
                    <h3 class='book-list-item__title'><a href='/books/${
                      book.id
                    }'>${book.title}</a></h3>
                    <span class='book-list-item__authors'>by ${authorList}</span>
                </div>
                <div>
                    <span class='book-list-item__avg-rating-and-pub'>${getAvgRating(
                      book.Reviews
                    )} - published by ${book.Publisher.name}</span>
                </div>
            </div>`
    );

    rowArr.push(
      `<div class='shelve-and-review-container'>
            <div class='body-shelves-container' id='select-shelves-placeholder-${
              book.id
            }'>
                <div id='bookshelves-text-${
                  book.id
                }' class='bookshelves-text'>Manage Bookshelves<span class='self-arrow-placeholder'>▾</span></div>
                <form id='book-${book.id}-shelves'>
                    <div id='shelve-list-container-${
                      book.id
                    }' class='shelve-list-container hidden'>
                        ${genDefaultShelves(book, bookshelves)}
                        ${genCreatedShelves(book, bookshelves)}
                    </div>
                </form>
            </div>
            <div class='review-link-container'>
            ${editOrWriteReview(book, userId)}
            </div>
            </div>`
    );

    rowArr.push('</div>');

    bodyStr += rowArr.join('');
  });
  return bodyStr;
}

function genDefaultShelves(book, bookshelves) {
  const resultArr = ['<ul class="default-shelves">'];

  for (const shelf of bookshelves) {
    if (shelf.defaultShelf) {
      const bookIds = shelf.Books.map((book) => book.id);
      let shelfStr = '<li>';
      let forAndId = shelf.name.split(' ').join('-').toLowerCase();

      shelfStr += `<label>${shelf.name}</label>`;

      if (bookIds.includes(book.id)) {
        shelfStr += `
                <input type='radio' id='${forAndId}-${book.id}' name='defaultShelf' value='${shelf.id}' checked />
                </li>`;
      } else {
        shelfStr += `
                <input type='radio' id='${forAndId}-${book.id}' name='defaultShelf' value='${shelf.id}' /></li>`;
      }

      resultArr.push(shelfStr);
    }
  }
  resultArr.push('</ul>');

  return resultArr.join('');
}

function genCreatedShelves(book, bookshelves) {
  const resultArr = ['<ul class="created-shelves">'];

  for (const shelf of bookshelves) {
    if (!shelf.defaultShelf) {
      const bookIds = shelf.Books.map((book) => book.id);
      let shelfStr = '<li>';

      shelfStr += `<label>${shelf.name}</label>`;

      if (bookIds.includes(book.id)) {
        shelfStr += `<input type='checkbox' id='${shelf.name}-${book.id}' name='createdShelf' value='${shelf.id}' checked/></li>`;
      } else {
        shelfStr += `<input type='checkbox' id='${shelf.name}-${book.id}' name='createdShelf' value='${shelf.id}' /></li>`;
      }

      resultArr.push(shelfStr);
    }
  }

  resultArr.push('</ul>');
  return resultArr.join('');
}

const editOrWriteReview = (book, userId) => {
  if (!book.Reviews.length) {
    return `<a class='review-link' href='/reviews/add/book/${book.id}'>Add a Review</a>`;
  }

  for (const review of book.Reviews) {
    if (review.userId === userId) {
      return `<a class='review-link' href='/reviews/edit/book/${book.id}'>Edit Your Review</a>`;
    }
  }

  return `<a class='review-link' href='/reviews/add/book/${book.id}'>Add a Review</a>`;
};

function compareState(state1, state2) {
  if (typeof state1 === 'string' && typeof state2 === 'string') {
    return state1 !== state2;
  }

  if (state1.length !== state2.length) {
    return true;
  }

  return !state1.every((val) => state2.includes(val));
}

document.addEventListener('DOMContentLoaded', async (event) => {
  const bookRes = await fetch('/api/books/');
  let { books, userId } = await bookRes.json();
  console.log(books);

  const shelfRes = await fetch('/api/bookshelves/');
  let { bookshelves } = await shelfRes.json();

  let prevState;

  document.querySelector('.browse-header').innerHTML = `Browse &gt; By ${
    browseType[0].toUpperCase() + browseType.slice(1)
  }`;
  document.querySelector('.book-list').innerHTML = genList(
    books,
    bookshelves,
    userId
  );
  document.querySelector(
    '.showing'
  ).innerHTML = `Showing 1-${books.length} of ${books.length}`;

  for (const shelf of shelveText) {
    shelf.addEventListener('click', async (event) => {
      const [, , bookId] = event.target.id.split('-');

      if (event.target.id === `currently-reading-${bookId}`) {
        return;
      }

      const originalInnerHTML = `Manage Bookshelves<span class='self-arrow-placeholder'>▾</span>`;

      const formData = new FormData(
        document.getElementById(`book-${bookId}-shelves`)
      );

      const shelveListContainer = document.getElementById(
        `shelve-list-container-${bookId}`
      );
      shelveListContainer.classList.toggle('hidden');

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
        if (
          compareState(prevState['defaultShelf'], body['defaultShelf']) ||
          compareState(prevState['createdShelf'], body['createdShelf'])
        ) {
          event.target.innerHTML = 'Saving...';
          event.target.classList.add('saving');
          event.target.classList.remove('bookshelves-text');
          event.target.classList.add('no-pointer-events');

          const res = await fetch(`/api/books/${bookId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          });

          const { book } = await res.json();

          if (res.ok) {
            const shelfRes = await fetch('/api/bookshelves');
            const shelfData = await shelfRes.json();
            bookshelves = shelfData.bookshelves;

            setTimeout(() => {
              shelveListContainer.innerHTML =
                genDefaultShelves(book, bookshelves) +
                genCreatedShelves(book, bookshelves);
              event.target.innerHTML = originalInnerHTML;
              event.target.classList.add('bookshelves-text');
              event.target.classList.remove('no-pointer-events');
              event.target.classList.remove('saving');
            }, 250);
          }
        }
      }
    });
  }
});
