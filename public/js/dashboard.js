async function postFormHandler(event) {
    event.preventDefault();

    const postName = document.querySelector('.card-header').value.trim();

    if (postName) {
        const response = await fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify({ postName }),
            headers: { 'Content-Type': 'application/json'},
        });

        if (response.ok){
            document.location.replace('/dashboard/:username');
        }else{
            alert('unable to post');
        }
    }
}

document
.querySelector('.card')
.addEventListener('submit', postFormHandler);


