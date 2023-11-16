const newCommentHandler = async (event) => {
    event.preventDefault();

    const commentMessage = document.querySelector('#blog-message').value.trim();

    if (commentMessage) {
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({ commentMessage }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create new blog post!');
        }
    }
};

document.querySelector('#new-comment-button').addEventListener('click', newCommentHandler);