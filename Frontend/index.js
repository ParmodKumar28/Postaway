// frontend.js

document.addEventListener('DOMContentLoaded', function() {
    // Check if the user is already logged in with a token
    const token = localStorage.getItem('token');
    if (token) {
        showHomePage();
    }

    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const createPostForm = document.getElementById('createPostForm');

    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        try {
            const response = await fetch('http://localhost:5000/api/users/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.status === 200) {
                const data = await response.json();
                const token = data.token;
                localStorage.setItem('token', token);
                showHomePage();
            } else {
                // Handle login error
                console.error('Login failed');
            }
        } catch (error) {
            console.error(error);
        }
    });

    signupForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;

        try {
            const response = await fetch('http://localhost:5000/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (response.status === 201) {
                const data = await response.json();
                const token = data.token;
                localStorage.setItem('token', token);
                showHomePage();
            } else {
                // Handle signup error
                console.error('Signup failed');
            }
        } catch (error) {
            console.error(error);
        }
    });

    createPostForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const postCaption = document.getElementById('postCaption').value;
        const postImage = document.getElementById('postImage').files[0];
        const token = localStorage.getItem('token');

        try {
            // Implement creating a post and sending it to the server
            // Example:
            const formData = new FormData();
            formData.append('caption', postCaption);
            formData.append('image', postImage);

            const response = await fetch('http://localhost:5000/api/posts', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.status === 201) {
                loadPosts();
            } else {
                // Handle create post error
                console.error('Create post failed');
            }
        } catch (error) {
            console.error(error);
        }
    });
});

function showHomePage() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('homePage').style.display = 'block';
    loadPosts();
}

async function loadPosts() {
    const token = localStorage.getItem('token');

    try {
        // Implement fetching posts from the server
        // Example:
        const response = await fetch('http://localhost:5000/api/posts', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            const data = await response.json();
            const posts = data.posts;

            // Handle and display the fetched posts
            const postsFeed = document.getElementById('postsFeed');
            postsFeed.innerHTML = ''; // Clear existing posts

            posts.forEach((post) => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
                    <img src="${post.imageUrl}" alt="Post Image">
                    <p>${post.caption}</p>
                    <p>${post.createdAt}</p>
                `;

                postsFeed.appendChild(postElement);
            });
        } else {
            // Handle load posts error
            console.error('Load posts failed');
        }
    } catch (error) {
        console.error(error);
    }
}
