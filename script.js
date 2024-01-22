document.addEventListener('DOMContentLoaded', function () {
    const userSelect = document.getElementById('userSelect');
    const postsContainer = document.getElementById('postsContainer');
    const commentsContainer = document.getElementById('commentsContainer');
    const profileInfo = document.getElementById('profileInfo');

    let users = []; // Corrected: Use a global variable to store users

    // Fetch Users
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(userData => { 
            users = userData;
            // Populate user select box
            users.forEach(user => {
                const option = document.createElement('option');
                option.value = user.id;
                option.text = user.name;
                userSelect.add(option);

                if (user.id === 1) {
                    displayUserProfile(user);
                }
            });
        })
        .catch(error => console.error('Error fetching users:', error));

    // Event listener for user select
    userSelect.addEventListener('change', function () {
        const selectedUserId = parseInt(userSelect.value);
        displayUserPosts(selectedUserId);

        // Display profile for the selected user
        const selectedUser = users.find(user => user.id === selectedUserId);
        displayUserProfile(selectedUser)
    });

    // Function to display user profile
    function displayUserProfile(user) {
        profileInfo.innerHTML = `
            <p> ${user.name}</p>
            <p> @${user.username}</p>
            <p> ${user.company.catchPhrase}</p>
            <p> ${user.address.city}</p>
        `;
    }

    // Function to display user posts
    function displayUserPosts(userId) {
        // Fetch posts for the selected user
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
            .then(response => response.json())
            .then(posts => {
                // Display posts
                postsContainer.innerHTML = '';
                posts.forEach(post => {
                    const postElement = document.createElement('div');
                    postElement.classList.add('post');
                    postElement.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
                    postElement.addEventListener('click', () => displayPostComments(post.id));
                    postsContainer.appendChild(postElement);
                });

                // Display comments for the first post (if available)
                if (posts.length > 0) {
                    displayPostComments(posts[0].id);
                } else {
                    commentsContainer.innerHTML = '';
                }
            })
            .catch(error => console.error('Error fetching posts:', error));
    }

    // Function to display post comments
    function displayPostComments(postId) {
        // Fetch comments for the selected post
        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
            .then(response => response.json())
            .then(comments => {
                // Display comments
                commentsContainer.innerHTML = '';
                comments.forEach(comment => {
                    const commentElement = document.createElement('div');
                    commentElement.classList.add('comment');
                    commentElement.innerHTML = `<strong>${comment.name}</strong>: ${comment.body}`;
                    commentsContainer.appendChild(commentElement);
                });
            })
            .catch(error => console.error('Error fetching comments:', error));
    }
});
