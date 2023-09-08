const postFormHandler = async (event) => {
    event.preventDefault();

    const postName = document.querySelector('#post-name').value.trim();
    const postContent = document.querySelector('#post-content').value.trim();

    if (postName && postContent) {
        const response = await fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify({ postName, postContent}),
            headers: { 'Content-Type': 'application/json'},
        });

        if (response.ok){
            document.location.replace('/');
        }else{
            alert('unable to login');
        }
    }
}
const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/post/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/post');
      } else {
        alert('Failed to delete project');
      }
    }
  };
const updateButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/post/${id}`, {
        method: 'UPDATE',
      });
  
      if (response.ok) {
        document.location.replace('/post');
      } else {
        alert('Failed to update project');
      }
    }
  };
  
  document
  .querySelector('.card')
  .addEventListener('submit', postFormHandler);

  document
  .querySelector('.delete')
  .addEventListener('click', delButtonHandler);

  document
  .querySelector('.update')
  .addEventListener('click', updateButtonHandler);

