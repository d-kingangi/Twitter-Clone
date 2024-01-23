document.addEventListener('DOMContentLoaded', function () {
    const userSelect = document.getElementById('userSelect');
    const postsContainer = document.getElementById('postsContainer');
    const commentsContainer = document.getElementById('commentsContainer');
    const profileInfo = document.getElementById('profileInfo');

    let users = []; 

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
                    displayUserPosts(1);
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
            <p><?xml version="1.0" encoding="utf-8"?><svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3 18C3 15.3945 4.66081 13.1768 6.98156 12.348C7.61232 12.1227 8.29183 12 9 12C9.70817 12 10.3877 12.1227 11.0184 12.348C11.3611 12.4703 11.6893 12.623 12 12.8027C12.3107 12.623 12.6389 12.4703 12.9816 12.348C13.6123 12.1227 14.2918 12 15 12C15.7082 12 16.3877 12.1227 17.0184 12.348C19.3392 13.1768 21 15.3945 21 18V21H15.75V19.5H19.5V18C19.5 15.5147 17.4853 13.5 15 13.5C14.4029 13.5 13.833 13.6163 13.3116 13.8275C14.3568 14.9073 15 16.3785 15 18V21H3V18ZM9 11.25C8.31104 11.25 7.66548 11.0642 7.11068 10.74C5.9977 10.0896 5.25 8.88211 5.25 7.5C5.25 5.42893 6.92893 3.75 9 3.75C10.2267 3.75 11.3158 4.33901 12 5.24963C12.6842 4.33901 13.7733 3.75 15 3.75C17.0711 3.75 18.75 5.42893 18.75 7.5C18.75 8.88211 18.0023 10.0896 16.8893 10.74C16.3345 11.0642 15.689 11.25 15 11.25C14.311 11.25 13.6655 11.0642 13.1107 10.74C12.6776 10.4869 12.2999 10.1495 12 9.75036C11.7001 10.1496 11.3224 10.4869 10.8893 10.74C10.3345 11.0642 9.68896 11.25 9 11.25ZM13.5 18V19.5H4.5V18C4.5 15.5147 6.51472 13.5 9 13.5C11.4853 13.5 13.5 15.5147 13.5 18ZM11.25 7.5C11.25 8.74264 10.2426 9.75 9 9.75C7.75736 9.75 6.75 8.74264 6.75 7.5C6.75 6.25736 7.75736 5.25 9 5.25C10.2426 5.25 11.25 6.25736 11.25 7.5ZM15 5.25C13.7574 5.25 12.75 6.25736 12.75 7.5C12.75 8.74264 13.7574 9.75 15 9.75C16.2426 9.75 17.25 8.74264 17.25 7.5C17.25 6.25736 16.2426 5.25 15 5.25Z" fill="#080341"/></svg></p>
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
