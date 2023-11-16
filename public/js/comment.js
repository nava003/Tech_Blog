const newCommentHandler = async (event) => {
    event.preventDefault();

    const comment_message = document.querySelector('#comment-message').value.trim();

    if (comment_message) {
        if (event.target.hasAttribute('data-id')) {
            const blog_id = event.target.getAttribute('data-id');
            const response = await fetch('/api/comment', {
                method: 'POST',
                body: JSON.stringify({ comment_message, blog_id }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                document.location.reload();
            } else {
                alert('Failed to create new blog post!');
            }
        }
    }
};

document.querySelector('#new-comment-button').addEventListener('click', newCommentHandler);