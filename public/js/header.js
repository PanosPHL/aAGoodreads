const [http, host, post, main, sub] = new URL(window.location).toString().split('/');
const logout = document.getElementById('logout');

document.addEventListener('DOMContentLoaded', () => {
    const search = document.getElementById("myInput");
    search.addEventListener('keyup', async (event) => {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            event.preventDefault();
            const res = await fetch(`/browse/titles/${search.value}`);
            if (res.ok) {
                window.location.href = `/browse/titles/${search.value}`;
            }
        }
    });

    const dropContainers = document.getElementsByClassName('dropContainer');
    console.log(dropContainers);

    dropContainers[0].addEventListener('click', event => {
        document.querySelector('.dropContent').classList.toggle('hidden');
        dropContainer.classList.toggle('selected');
    });

    dropContainers[1].addEventListener('click', event => {
        document.querySelector('.dropProfileContent').classList.toggle('hidden');
        dropContainer.classList.toggle('selected');
    });
});

logout.addEventListener('click', async e => {
    const res = await fetch('/api/users/logout', {
        method: 'DELETE'
    });

    if (res.ok) {
        window.location.href = '/';
    }
});
