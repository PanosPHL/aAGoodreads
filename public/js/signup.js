const form = document.getElementById('signup');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const email = formData.get('email');
  const name = formData.get('name');
  const password = formData.get('password');

  const body = { name, email, password };

  const res = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  if (!res.ok) {
    const { message, errors } = data;
    let errorStr = '';
    for (let error of errors) {
      if (errorStr.length === 0) {
        errorStr += `• ${error}`;
      } else {
        errorStr += `\n• ${error}`;
      }
    }
    alert(errorStr);
    return;
  }

  window.location.href = '/my-books';
});
