function newComment() {
    const commentButton = document.getElementById('comment-button');
    const commentForm = document.getElementById('comment-form');
  
    if (!commentButton || !commentForm) {
      console.error('Comment button or form not found');
      return;
    }
  
    commentButton.addEventListener('click', () => {
      commentForm.style.display = 'block';
    });
  
    commentForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const commentText = document.getElementById('comment-text').value.trim();
      const postId = window.location.pathname.split('/').pop();
  
      if (commentText) {
        const response = await fetch(`/api/posts/comments`, {
          method: 'POST',
          body: JSON.stringify({ post_id: postId, comment_text: commentText }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          const newComment = await response.json();
          displayNewComment(newComment);
          commentForm.style.display = 'none';
          document.getElementById('comment-text').value = ''; 
        } else {
          alert('Failed to add comment');
        }
      }
    });
  }
  
  function displayNewComment(comment) {
    const commentsContainer = document.getElementById('comments-container');
  
    if (!commentsContainer) {
      console.error('Comments container not found');
      return;
    }
  
    const newCommentDiv = document.createElement('div');
    newCommentDiv.classList.add('comment');
  
    newCommentDiv.innerHTML = `
      <p>${comment.comment_text}</p>
      <p><small>Posted by ${comment.user.name} on ${new Date(comment.createdAt).toLocaleString()}</small></p>
    `;
  
    commentsContainer.appendChild(newCommentDiv);
  }
  
  document.addEventListener('DOMContentLoaded', newComment);