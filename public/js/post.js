const postFormHandler = async (event) => {
    event.preventDefault();

    const postName = document.querySelector('.card-header').value.trim();
    const postContent = document.querySelector('.card-content').value.trim();

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
const deleteButtonHandler = async (event) => {
     const id = window.location.toString().split('/')[
       window.location.toString().split('/').length - 1
      ]; 
  
      const response = await fetch(`/api/post/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/post');
      } else {
        alert('Failed to delete project');
      }
    };

const updateButtonHandler = async (event) => {
  const postContent = document.querySelector('.card-content').value.trim();
    
    const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
    ];
    
    const response = await fetch(`/api/post/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ postContent }),
      });
  
      if (response.ok) {
        document.location.replace('/post');
      } else {
        alert('Failed to update project');
      }
    };
  
  document
  .querySelector('.card')
  .addEventListener('submit', postFormHandler);

  document
  .querySelector('.card-footer-delete')
  .addEventListener('click', deleteButtonHandler);

  document
  .querySelector('.card-footer-update')
  .addEventListener('click', updateButtonHandler);

