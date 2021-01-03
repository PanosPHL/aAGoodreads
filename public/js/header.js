const [http, host, post, main, sub] = new URL(window.location)
  .toString()
  .split('/');
const logout = document.getElementById('logout');

document.addEventListener('DOMContentLoaded', () => {
  const search = document.querySelector('.search-form');
  search.addEventListener('submit', async (event) => {
    const input = document.getElementById('myInput');
    event.preventDefault();
    const res = await fetch(`/browse/titles/${input.value}`);
    if (res.ok) {
      window.location.href = `/search?title=${encodeURIComponent(
        input.value
      )}/`;
    }
  });

  const dropContainer = document.querySelector('.dropContainer');

  dropContainer.addEventListener('click', (event) => {
    document.querySelector('.dropContent').classList.toggle('hidden');
    dropContainer.classList.toggle('selected');
  });

  logout.addEventListener('click', async (e) => {
    const res = await fetch('/api/users/logout', {
      method: 'DELETE',
    });

    if (res.ok) {
      window.location.href = '/';
    }
  });
});
