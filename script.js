document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Check hardcoded credentials (for now)
    if(username === "admin" && password === "admin123") {
        // Redirect to Dashboard or other page after successful login
        window.location.href = "dashboard.html";
    } else {
        document.getElementById('error-message').innerText = "Invalid credentials. Please try again.";
    }
});

const profileForm = document.getElementById('profile-form');
const profileDisplay = document.getElementById('profile-display');
const saveButton = document.getElementById('save-profile');
const editButton = document.getElementById('edit-profile');
const deleteButton = document.getElementById('delete-profile');
// Form fields
const nameInput = document.getElementById('admin-name');
const emailInput = document.getElementById('admin-email');
const passwordInput = document.getElementById('admin-password');
const contactInput = document.getElementById('admin-contact');

// Display fields
const profileName = document.getElementById('profile-name');
const profileEmail = document.getElementById('profile-email');
const profileContact = document.getElementById('profile-contact');

// CRUD Functions

// Create or Update Profile
profileForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const profile = {
        id: Date.now().toString(),
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
        contact: contactInput.value
    };

    // Save or update in LocalStorage
    localStorage.setItem('adminProfile', JSON.stringify(profile));
    alert('Profile saved successfully!');
    displayProfile();
});

// Read Profile
function displayProfile() {
    const profile = JSON.parse(localStorage.getItem('adminProfile'));

    if (profile) {
        // Display profile data
        profileName.textContent = profile.name;
        profileEmail.textContent = profile.email;
        profileContact.textContent = profile.contact;

        // Toggle visibility
        profileDisplay.style.display = 'block';
        profileForm.style.display = 'none';
    } else {
        // Show form if no profile exists
        profileDisplay.style.display = 'none';
        profileForm.style.display = 'block';
    }
}

// Edit Profile
editButton.addEventListener('click', function () {
    const profile = JSON.parse(localStorage.getItem('adminProfile'));

    if (profile) {
        // Populate form with existing data
        nameInput.value = profile.name;
        emailInput.value = profile.email;
        passwordInput.value = profile.password;
        contactInput.value = profile.contact;
        // Toggle visibility
        profileForm.style.display = 'block';
        profileDisplay.style.display = 'none';
    }
});

// Delete Profile
deleteButton.addEventListener('click', function () {
    if (confirm('Are you sure you want to delete your profile?')) {
        localStorage.removeItem('adminProfile');
        alert('Profile deleted successfully!');
        displayProfile();
    }
});

// Load profile on page load
document.addEventListener('DOMContentLoaded', displayProfile);
const customerForm = document.getElementById('customer-form');
const customerTable = document.getElementById('customer-table').getElementsByTagName('tbody')[0];

let customers = JSON.parse(localStorage.getItem('customers')) || [];

// Function to render customer list
function renderCustomerList() {
    customerTable.innerHTML = '';
    customers.forEach((customer, index) => {
        const row = customerTable.insertRow();
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${customer.contact}</td>
            <td>
                <button onclick="editCustomer(${index})">Edit</button>
                <button onclick="deleteCustomer(${index})">Delete</button>
            </td>
        `;
    });
}

// Add or update customer
customerForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const customerId = document.getElementById('customer-id').value;
    const customerName = document.getElementById('customer-name').value;
    const customerEmail = document.getElementById('customer-email').value;
    const customerContact = document.getElementById('customer-contact').value;

    const customerData = { name: customerName, email: customerEmail, contact: customerContact };

    if (customerId) {
        // Update customer
        customers[customerId] = customerData;
    } else {
        // Add new customer
        customers.push(customerData);
    }

    localStorage.setItem('customers', JSON.stringify(customers));
    customerForm.reset();
    renderCustomerList();
});

// Edit customer
function editCustomer(index) {
    const customer = customers[index];
    document.getElementById('customer-id').value = index;
    document.getElementById('customer-name').value = customer.name;
    document.getElementById('customer-email').value = customer.email;
    document.getElementById('customer-contact').value = customer.contact;
}

// Delete customer
function deleteCustomer(index) {
    if (confirm('Are you sure you want to delete this customer?')) {
        customers.splice(index, 1);
        localStorage.setItem('customers', JSON.stringify(customers));
        renderCustomerList();
    }
}

// Load customer list on page load
document.addEventListener('DOMContentLoaded', renderCustomerList);
const sellerForm = document.getElementById('seller-form');
const sellerTable = document.getElementById('seller-table').getElementsByTagName('tbody')[0];

let sellers = JSON.parse(localStorage.getItem('sellers')) || [];

// Function to render the sellers list
function renderSellerList() {
    sellerTable.innerHTML = '';
    sellers.forEach((seller, index) => {
        const row = sellerTable.insertRow();
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${seller.name}</td>
            <td>${seller.email}</td>
            <td>${seller.contact}</td>
            <td>
                <button onclick="editSeller(${index})">Edit</button>
                <button onclick="deleteSeller(${index})">Delete</button>
            </td>
        `;
    });
}

// Add or update seller
sellerForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const sellerId = document.getElementById('seller-id').value;
    const sellerName = document.getElementById('seller-name').value;
    const sellerEmail = document.getElementById('seller-email').value;
    const sellerContact = document.getElementById('seller-contact').value;

    const sellerData = { name: sellerName, email: sellerEmail, contact: sellerContact };

    if (sellerId) {
        // Update existing seller
        sellers[sellerId] = sellerData;
    } else {
        // Add new seller
        sellers.push(sellerData);
    }

    localStorage.setItem('sellers', JSON.stringify(sellers));
    sellerForm.reset();
    renderSellerList();
});

// Edit seller
function editSeller(index) {
    const seller = sellers[index];
    document.getElementById('seller-id').value = index;
    document.getElementById('seller-name').value = seller.name;
    document.getElementById('seller-email').value = seller.email;
    document.getElementById('seller-contact').value = seller.contact;
}

// Delete seller
function deleteSeller(index) {
    if (confirm('Are you sure you want to delete this seller?')) {
        sellers.splice(index, 1);
        localStorage.setItem('sellers', JSON.stringify(sellers));
        renderSellerList();
    }
}

// Load seller list on page load
document.addEventListener('DOMContentLoaded', renderSellerList);




