document.addEventListener('DOMContentLoaded', () => {
    const signupContainer = document.getElementById('signup-container');
    const loginContainer = document.getElementById('login-container');
    const profileContainer = document.getElementById('profile-container');
    const heading = document.getElementById('heading');
    const loginMessage = document.getElementById('login-message');
    const signupMessage = document.getElementById('signup-message');

    const storedUser = JSON.parse(localStorage.getItem('currentUser'));

    if (storedUser) {
        showProfile(storedUser);
    }

    document.getElementById('signup-form').addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('signup-username').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const firstName = document.getElementById('signup-firstName').value;
        const lastName = document.getElementById('signup-lastName').value;
        const gender = document.getElementById('signup-gender').value;
        var user_cart = [];

        const user = {
            id: Date.now(),
            username: username,
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            image: 'https://dummyjson.com/image/i/products/1/thumbnail.jpg',
            token: 'dummyToken',
            userCart: user_cart
        };

        localStorage.setItem('user-' + username, JSON.stringify(user));
        signupMessage.textContent = 'User signed up successfully!';
        toggleForms();
    });

    document.getElementById('login-form').addEventListener('submit', async function (event) {
        event.preventDefault();

        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        let storedUser = JSON.parse(localStorage.getItem('user-' + username));
        // let userCart = JSON.parse(localStorage.getItem(userCart)); 

        if (storedUser && storedUser.password === password) {
            localStorage.setItem('currentUser', JSON.stringify(storedUser));
            localStorage.setItem("cart", JSON.stringify(storedUser.userCart));
            loginMessage.textContent = 'User logged in successfully!';
            window.location.href = 'index.html'; // Redirect to another page
            showProfile(storedUser);
        } else {

            try {
                const apiUser = await fetchUserFromAPI(username, password);
                if (apiUser && apiUser.password === password) {
                    storedUser = apiUser;
                    localStorage.setItem('user-' + username, JSON.stringify(apiUser));
                    localStorage.setItem('currentUser', JSON.stringify(apiUser));
                    loginMessage.textContent = 'User logged in successfully!';
                    window.location.href = 'index.html'; // Redirect to another page

                    showProfile(storedUser);
                } else {
                    loginMessage.textContent = 'Invalid credentials!';
                }
            } catch (error) {
                console.error('Error fetching user from API:', error.message);
                loginMessage.textContent = 'Invalid credentials!';
            }
        }
    });

    document.getElementById('logout').addEventListener('click', function () {
        let logoutCart = JSON.parse(localStorage.getItem("cart"));
        let currenUser1 = JSON.parse(localStorage.getItem("currentUser"));
        currenUser1.userCart = logoutCart;
        localStorage.setItem('user-' + currenUser1.username, JSON.stringify(currenUser1));
        localStorage.removeItem('currentUser');
        localStorage.removeItem('cart');
        // window.location.reload();
        window.location.href = 'index.html'; // Redirect to another page
    });

    document.getElementById('signup-link').addEventListener('click', function (event) {
        event.preventDefault();
        toggleForms();
    });

    document.getElementById('login-link').addEventListener('click', function (event) {
        event.preventDefault();
        toggleForms();
    });

    function showProfile(user) {
        document.getElementById('profile-username').innerText = user.username;
        document.getElementById('profile-email').innerText = user.email;
        document.getElementById('profile-firstName').innerText = user.firstName;
        document.getElementById('profile-lastName').innerText = user.lastName;
        document.getElementById('profile-gender').innerText = user.gender;
        document.getElementById('profile-image').src = user.image;

        signupContainer.style.display = 'none';
        loginContainer.style.display = 'none';
        profileContainer.style.display = 'block';
        heading.innerText = `Welcome, ${user.firstName}!`;
    }

    function toggleForms() {
        if (signupContainer.style.display === 'none') {
            signupContainer.style.display = 'block';
            loginContainer.style.display = 'none';
        } else {
            signupContainer.style.display = 'none';
            loginContainer.style.display = 'block';
        }
    }

    async function fetchUserFromAPI(username, password) {
        const response = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        if (!response.ok) {
            throw new Error('Invalid credentials');
        }

        const data = await response.json();

        if (data.token) {
            return {
                ...data,
                password: password
            };
        }

        throw new Error('Invalid credentials');
    }
});
