const form = document.getElementById('login');
const demoButton = document.getElementById('demo');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');

    const body = { email, password };

    const res = await fetch('/api/users/token', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await res.json();
    if (!res.ok) {
        alert(data.message);
        return;
    }

    window.location.href = '/my-books';
});

demoButton.addEventListener('click', async e => {
    const body = { email: 'santa@gmail.com', password: 'password' };

    const res = await fetch('/api/users/token', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (res.ok) {
        window.location.href = '/my-books';
    }
});
