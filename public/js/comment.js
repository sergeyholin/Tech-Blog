// Comment
const newCommentFormHandler = async (event) => {
    event.preventDefault();

    const blog_id = event.target.getAttribute('data-id');
    const body = document.querySelector('#body').value.trim();
  
    const response = await fetch ('/comment', {
      method: 'POST',
      body: JSON.stringify({blog_id, body}),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        // document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    };
  
  document
    .querySelector('.newComment-form')
    .addEventListener('submit', newCommentFormHandler)