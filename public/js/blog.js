const newBlogFormHandler = async (event) => {
    event.preventDefault();

    const blogTitle = document.querySelector('#blog-title').value.trim();
    const blogMessage = document.querySelector('#blog-message').value.trim();

    if (blogTitle && blogMessage) {
        const response = await fetch('/api/blog', {
            method: 'POST',
            body: JSON.stringify({ blogTitle, blogMessage }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create new blog post!');
        }
    }
};

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
document.querySelector('.blog-list').addEventListener('click', delBlogButtonHandler);