const rootDiv = document.getElementById('root');

let userName = '';
let posts = JSON.parse(localStorage.getItem('posts')) || [];

function renderSignUp() {
    rootDiv.innerHTML = `
        <h1>Sign Up</h1>
        <form id="signupForm">
            <label for="name">Name:</label>
            <input type="text" id="name" placeholder="Enter your name"><br>
            <label for="email">Email:</label>
            <input type="email" id="email" placeholder="Enter your email"><br>
            <label for="password">Password:</label>
            <input type="password" id="password" placeholder="Enter your password"><br>
            <button type="button" onclick="handleSignUp()">Sign Up</button>
        </form>
    `;
}

function handleSignUp() {
    const nameInput = document.getElementById('name').value;
    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;

    if (nameInput && emailInput && passwordInput) {
        userName = nameInput;
        localStorage.setItem('userName', userName);
        renderHomePage();
    } else {
        alert('Please fill out all fields');
    }
}

function renderHomePage() {
    userName = localStorage.getItem('userName') || userName;
    rootDiv.innerHTML = `
        <h1>Welcome, ${userName}!</h1>
        <h2>Create a Post</h2>
        <textarea id="postContent" placeholder="What's on your mind?"></textarea><br>
        <button type="button" onclick="handleCreatePost()">Post</button>
        <h3>Your Posts</h3>
        <ul id="postList"></ul>
    `;
    renderPostList();
}

function handleCreatePost() {
    const postContent = document.getElementById('postContent').value;
    
    if (postContent) {
        posts.push({ id: Date.now(), content: postContent });
        localStorage.setItem('posts', JSON.stringify(posts));
        renderPostList();
        document.getElementById('postContent').value = '';
    } else {
        alert('Post content cannot be empty');
    }
}

function renderPostList() {
    const postListElement = document.getElementById('postList');
    postListElement.innerHTML = '';

    posts.forEach((post) => {
        const postItem = document.createElement('li');
        
        const postText = document.createElement('span');
        postText.textContent = post.content;
        postItem.appendChild(postText);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => handleEditPost(post.id);
        postItem.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => handleDeletePost(post.id);
        postItem.appendChild(deleteButton);

        postListElement.appendChild(postItem);
    });
}

function handleEditPost(postId) {
    const post = posts.find(p => p.id === postId);
    const newContent = prompt('Edit your post:', post.content);
    if (newContent) {
        post.content = newContent;
        localStorage.setItem('posts', JSON.stringify(posts));
        renderPostList();
    }
}

function handleDeletePost(postId) {
    posts = posts.filter(post => post.id !== postId);
    localStorage.setItem('posts', JSON.stringify(posts));
    renderPostList();
}

// Initialize the app
if (localStorage.getItem('userName')) {
    renderHomePage();
} else {
    renderSignUp();
}
