document.addEventListener('DOMContentLoaded', () => {
    const loginContainer = document.getElementById('login-container');
    const signupContainer = document.getElementById('signup-container');
    const profileContainer = document.getElementById('profile-container');
    const editProfileContainer = document.getElementById('edit-profile-container');
    const homeContainer = document.getElementById('home-container');
    const loginButton = document.getElementById('login-button');
    const signupButton = document.getElementById('signup-button');
    const logoutButton = document.getElementById('logout-button');
    const heading = document.getElementById('heading');
    const loggedInUser = document.getElementById('logged-in-user');
    const loginMessage = document.getElementById('login-message');
    const signupMessage = document.getElementById('signup-message');

    // Check if there's a user logged in via local storage
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));

    if (storedUser) {
        showHome();
        showProfile(storedUser);
    } else {
        showHome();
    }

    heading.addEventListener('click', () => {
        showHome();
    });

    loginButton.addEventListener('click', () => {
        displayLogin();
    });

    signupButton.addEventListener('click', () => {
        displaySignup();
    });

    logoutButton.addEventListener('click', () => {
        logoutUser();
    });

    document.getElementById('signup-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const username = document.getElementById('signup-username').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const firstName = document.getElementById('signup-firstName').value;
        const lastName = document.getElementById('signup-lastName').value;
        const gender = document.getElementById('signup-gender').value;
        
        // Simulate server-side signup logic
        const user = {
            id: Date.now(),
            username: username,
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            image: 'https://dummyjson.com/image',
            token: 'dummyToken'
        };
        
        localStorage.setItem('user-' + email, JSON.stringify(user));
        signupMessage.textContent = 'User signed up successfully!';
        displayLogin();
    });

    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const username = document.getElementById('username-login').value;
        const password = document.getElementById('password-login').value;
        
        // Simulate server-side login logic
        const fakeUser = {
            id: 1,
            username: username,
            email: 'test@example.com',
            firstName: 'John',
            lastName: 'Doe',
            gender: 'male',
            image: 'https://dummyjson.com/image',
            token: 'dummyToken'
        };

        // Simulate successful login
        localStorage.setItem('currentUser', JSON.stringify(fakeUser));
        loginMessage.textContent = 'User logged in successfully!';
        showHome();
        showProfile(fakeUser);
    });

    function showHome() {
        homeContainer.style.display = 'block';
        loginContainer.style.display = 'none';
        signupContainer.style.display = 'none';
        profileContainer.style.display = 'none';
        editProfileContainer.style.display = 'none';
        loggedInUser.style.display = 'none';
        logoutButton.style.display = 'none';
    }

    function displayLogin() {
        loginContainer.style.display = 'block';
        signupContainer.style.display = 'none';
        profileContainer.style.display = 'none';
        editProfileContainer.style.display = 'none';
        homeContainer.style.display = 'none';
        loginMessage.textContent = '';
        logoutButton.style.display = 'none';
    }

    function displaySignup() {
        signupContainer.style.display = 'block';
        loginContainer.style.display = 'none';
        profileContainer.style.display = 'none';
        editProfileContainer.style.display = 'none';
        homeContainer.style.display = 'none';
        signupMessage.textContent = '';
        logoutButton.style.display = 'none';
    }

    function showProfile(user) {
        document.getElementById('profile-username').innerText = user.username;
        document.getElementById('profile-email').innerText = user.email;
        document.getElementById('profile-firstName').innerText = user.firstName;
        document.getElementById('profile-lastName').innerText = user.lastName;
        document.getElementById('profile-gender').innerText = user.gender;
        document.getElementById('profile-image').src = user.image;

        homeContainer.style.display = 'none';
        loginContainer.style.display = 'none';
        signupContainer.style.display = 'none';
        editProfileContainer.style.display = 'none';
        profileContainer.style.display = 'block';
        loggedInUser.style.display = 'block';
        loggedInUser.textContent = `Logged in as: ${user.username}`;
        logoutButton.style.display = 'block';
    }

    function logoutUser() {
        localStorage.removeItem('currentUser');
        showHome();
    }
});
