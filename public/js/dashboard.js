document.addEventListener('DOMContentLoaded', () => {
    const addPostBtn = document.querySelector('#add-post-btn');
    const newPostForm = document.querySelector('#new-post-form');
  
    addPostBtn.addEventListener('click', () => {
      newPostForm.style.display = 'block';
      addPostBtn.style.display = 'none';
    });
  
    const newFormHandler = async (event) => {
      event.preventDefault();
  
      const name = document.querySelector('#post-name').value.trim();
      const description = document.querySelector('#post-desc').value.trim();
  
      if (name && description) {
        const response = await fetch(`/api/posts`, {
          method: 'POST',
          body: JSON.stringify({ name, description }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          alert('Failed to create post');
        }
      }
    };
  
    const delButtonHandler = async (event) => {
      if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
  
        const response = await fetch(`/api/posts/${id}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          alert('Failed to delete post');
        }
      }
    };
  
    const updateFormHandler = async (event) => {
      event.preventDefault();
  
      const id = document.querySelector('#update-post-id').value.trim();
      const name = document.querySelector('#update-post-name').value.trim();
      const description = document.querySelector('#update-post-desc').value.trim();
  
      console.log(`Updating post with ID: ${id}`);
  
      if (id && name && description) {
        const response = await fetch(`/api/posts/${id}`, {
          method: 'PUT',
          body: JSON.stringify({ name, description }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          // Update the DOM with the new post data
          document.querySelector(`.post[data-id="${id}"] .post-name`).innerText = name;
          document.querySelector(`.post[data-id="${id}"] .post-description`).innerText = description;
          document.querySelector('#update-form-container').style.display = 'none';
        } else {
          alert('Failed to update post');
        }
      }
    };
  
    const showUpdateForm = (event) => {
      const id = event.target.getAttribute('data-id');
      const name = event.target.getAttribute('data-name');
      const description = event.target.getAttribute('data-description');
  
      console.log(`Showing update form for post with ID: ${id}`);
  
      document.querySelector('#update-post-id').value = id;
      document.querySelector('#update-post-name').value = name;
      document.querySelector('#update-post-desc').value = description;
  
      document.querySelector('#update-form-container').style.display = 'block';
    };
  
    document
      .querySelector('.new-post-form')
      .addEventListener('submit', newFormHandler);
  
    document
      .querySelector('.post-list')
      .addEventListener('click', async (event) => {
        if (event.target.classList.contains('update-button')) {
          console.log('Update button clicked');
          showUpdateForm(event);
        } else if (event.target.classList.contains('btn-danger')) {
          await delButtonHandler(event);
        }
      });
  
    document
      .querySelector('.update-post-form')
      .addEventListener('submit', updateFormHandler);
  });