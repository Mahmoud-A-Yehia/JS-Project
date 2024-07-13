// Function to fetch product details
let local=localStorage.getItem('cart');
if(local == null){
var cart = [];
}else{
var cart = JSON.parse(local);
}

function fetchProductDetails(productId) {
    fetch(`https://dummyjson.com/products/${productId}`)
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then(product => {
            // Store product details in sessionStorage for use in details.html
            sessionStorage.setItem('productDetails', JSON.stringify(product));

            // Open details page
            window.open('details.html', '_blank');
        })
        .catch(error => {
            console.error('Error fetching product details:', error);
        });
}

// Function to display products based on category or all categories
function displayProducts(products) {
    const productListDiv = document.getElementById('product-list');
    productListDiv.innerHTML = '';

    products.products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        // Product Image
        const img = document.createElement('img');
        img.src = product.images[0];
        img.alt = product.name;
        img.width = 200;
        productDiv.appendChild(img);

        // Product Details
        const detailsDiv = document.createElement('div');
        detailsDiv.classList.add('details');

        // Product Name
        const nameElement = document.createElement('h2');
        nameElement.textContent = product.name;
        detailsDiv.appendChild(nameElement);

        // Product Price
        const priceElement = document.createElement('h2');
        priceElement.textContent = `Price: $${product.price}`;
        detailsDiv.appendChild(priceElement);

        // Product Description
        const descElement = document.createElement('p');
        descElement.textContent = product.description;
        detailsDiv.appendChild(descElement);

        // Add to Cart Button
        //const addToCartBtn = document.createElement('button');
        //addToCartBtn.classList.add('add-to-cart');
        //addToCartBtn.innerHTML = `<button class="remove" onclick="addtocart(${product.id})"></button>`;
        //detailsDiv.appendChild(addToCartBtn);
        //add to cart 
        const addToCartBtn = document.createElement('button');
        addToCartBtn.classList.add('add-to-cart');
        addToCartBtn.textContent = 'BUY NOW'
        addToCartBtn.addEventListener('click', () => {
            addtocart(product.id);
        });
        detailsDiv.appendChild(addToCartBtn);
        // Product Details Button
        const detailsBtn = document.createElement('button');
        detailsBtn.classList.add('product-details-btn');
        detailsBtn.textContent = 'Product Details';
        detailsBtn.addEventListener('click', () => {
            fetchProductDetails(product.id); // Assuming product has an 'id' property
        });
        detailsDiv.appendChild(detailsBtn);

        productDiv.appendChild(detailsDiv);
        productListDiv.appendChild(productDiv);
    });
}

// Function to perform search based on input value
function performSearch() {
    var searchTerm = document.getElementById('searchInput').value;
    fetch(`https://dummyjson.com/products/search?q=${searchTerm}`)
        .then(res => res.json())
        .then(data => {
            displayProducts(data); 
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            displayError();
        });
}



const categories = new Set();
fetch('https://dummyjson.com/products/categories')
    .then(response => response.json())
    .then(data => {
        // Extract categories from the data
        data.forEach(product => {
            categories.add(product.slug);
        });
    });

// Function to fetch categories and populate dropdown
fetch('https://dummyjson.com/products')
    .then(response => response.json())
    .then(data => {
        console.log(categories)

        // Populate dropdown with categories including a default option
        const dropdown = document.getElementById('categoryDropdown');
        // Add default option "All Categories" at the beginning
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'All Categories';
        dropdown.appendChild(defaultOption);

        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            dropdown.appendChild(option);
        });

        // Event listener for dropdown change
        dropdown.addEventListener('change', () => {
            const selectedCategory = dropdown.value;
            if (selectedCategory === '') {
                displayProducts(data); // Display all products
            } else {
                // Filter products by selected category
                fetch('https://dummyjson.com/products/category/' + selectedCategory)
                    .then(res => res.json())
                    .then(dat => displayProducts(dat));;
            }
        });

        // Display all products initially
        displayProducts(data); // Display all products by default

    })
    .catch(error => {
        console.error('Error fetching or parsing data:', error);
        displayError();
    });

// Function to display error message
function displayError() {
    const productListDiv = document.getElementById('product-list');
    productListDiv.innerHTML = '<p>Error fetching data. Please try again later.</p>';
}


function addtocart(idd) {
    let t = false;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == idd) {
            cart.splice(i, 1, {
                id: idd,
                quantity: cart[i].quantity + 1,
            })
            t = true;
            break;
        }
    }
    if (t == false) {
        cart.push({
            id: idd,
            quantity: 1,
        });
    }
    localStorage.setItem('cart', JSON.stringify(cart))
}