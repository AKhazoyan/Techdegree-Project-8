// Global Variables
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector('.grid-container');
const overlay = document.querySelector('.overlay');
const modalContainer = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');
const previous = document.querySelector('.previous');
const next = document.querySelector('.next');
let employeeIndex = 0;



// Main Employee Directory Page Info

// Fetch Data From API
fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err))


function displayEmployees(employeeData) {
    employees = employeeData;

    // Store the Employee HTML
    let employeeHTML = '';

    // Loop Through Each Employee and Create HTML
    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;
    
        employeeHTML += `
            <div class="card" data-index="${index}">
                <div class="avatarWrapper">
                    <img class="avatar" src="${picture.large}" />
                </div>
                <div class="text-container">
                    <h2 class="name">${name.first} ${name.last}</h2>
                    <p class="email">${email}</p>
                    <p class="address">${city}</p>
                </div>
            </div>
        `  
    });

    gridContainer.innerHTML = employeeHTML;
}


// Display Modal
function displayModal(index) {

    let { name, dob, phone, email, location: { street, city, state, postcode
    }, picture } = employees[index];

    let date = new Date(dob.date);
    
    const modalHTML = `
        <img class="avatar" src="${picture.large}" />
        <div class="text-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
            <hr />
            <p>${phone}</p>
            <p class="address">${street.number} ${street.name} ${city}, ${state} ${postcode}</p>
            <p>Birthday: ${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
    `;

    overlay.classList.remove("hidden");
    overlay.classList.add("show");
    modalContainer.innerHTML = modalHTML;

    employeeIndex = parseInt(index);

    if(employeeIndex === 0) {
        previous.style.display = 'none';
    } else {
        previous.style.display = 'block';
    }

    if(employeeIndex === 11) {
        next.style.display = 'none';
    } else {
        next.style.display = 'block';
    }
}


// Card Click Event to Show the Modal
gridContainer.addEventListener('click', function(e) {
    if (e.target !== gridContainer) {
        const card = e.target.closest('.card');
        const index = card.getAttribute('data-index');

        displayModal(index);
    }
});

overlay.addEventListener('click', function(e) {
    if (overlay.classList.contains('show') && e.target === overlay) {
        overlay.classList.remove('show');
        overlay.classList.add('hidden');
    }   
});

modalClose.addEventListener('click', function() {
    if (overlay.classList.contains('show')) {
        overlay.classList.remove('show');
        overlay.classList.add('hidden');
    }
});


// Modal Next and Previous Buttons
previous.addEventListener('click', function() {
    displayModal(employeeIndex - 1)
});
next.addEventListener('click', function() {
    displayModal(employeeIndex + 1)
});


// Employee Search Function
let typedInput = document.querySelector('#searchName');

typedInput.addEventListener('keyup', myFunction);

function myFunction(){
    let endInput = typedInput.value.toLowerCase();
    let names = [];

    for (let i = 0; i < employees.length; i++) {
        let aName = employees[i].name.first + ' ' + employees[i].name.last;
        names.push(aName);
    }

    for (let i = 0; i < names.length; i++) {
        if (names[i].toLowerCase().includes(endInput)) {
            document.querySelectorAll('.card')[i].style.display = 'flex';
        } else {
            document.querySelectorAll('.card')[i].style.display = 'none';
        }
    }
}