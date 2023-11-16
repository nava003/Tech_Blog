const newBlogFormHandler = async (event) => {
    event.preventDefault();

    const blog_title = document.querySelector('#blog-title').value.trim();
    const blog_message = document.querySelector('#blog-message').value.trim();

    if (blog_title && blog_message) {
        const response = await fetch('/api/blog', {
            method: 'POST',
            body: JSON.stringify({ blog_title, blog_message }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create new blog post!');
        }
    }
};

const updateBlogHandler = async (event) => {

    const blog_title = document.querySelector('#blog-title').value.trim();
    const blog_message = document.querySelector('#blog-message').value.trim();

    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/blog/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ blog_title, blog_message }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to update blog post!');
        }
    }
}

const delBlogButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/blog/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete blog post!');
        }
    }
};

document.querySelector('.new-blog-form').addEventListener('submit', newBlogFormHandler);
document.querySelector('#edit-blog').addEventListener('click', updateBlogHandler);
document.querySelector('#del-blog').addEventListener('click', delBlogButtonHandler);