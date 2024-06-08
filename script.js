
// let typeOfClassPrice = {
//     Yoga: 50,
//     Pilates: 60,
//     Zumba: 45
//   };
let cost = 20
document.querySelector('#gymForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const Name = document.querySelector('#Name').value.trim();
    const Age = parseInt(document.querySelector('#Age').value.trim());
    const phoneNumber = document.querySelector('#phoneNumber').value.trim();
    const Email = document.querySelector('#Email').value.trim();
    const dateOfClass = document.querySelector('#dateOfClass').value;
    const timeOfClass = document.querySelector('#timeOfClass').value;
    const typeOfClass = document.querySelector('#typeOfClass').value;
    const numberOfPersons = parseInt(document.querySelector('#numberOfPersons').value.trim());

    const availableSlots = document.querySelector('#availableSlots');
    const detailedSummary = document.querySelector('#detailedSummary');

    // Clear previous messages
    availableSlots.style.display = 'none';
    detailedSummary.style.display = 'none';

    let valid = true;
    const name_error = document.querySelector('#name_error');
    const age_error = document.querySelector('#age_error');
    const phone_error = document.querySelector('#phone_error');
    const email_error = document.querySelector('#email_error');
    const persons_error = document.querySelector('#persons_error');

    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(Name)) {
        name_error.style.display = 'block';
        valid = false;
    } else {
        name_error.style.display = 'none';
    }

    if (!Age || isNaN(Age) || Age <= 0) {
        age_error.style.display = 'block';
        valid = false;
    } else {
        age_error.style.display = 'none';
    }

    if ( !/^\d{10}$/.test(phoneNumber)) {
        phone_error.style.display = 'block';
        valid = false;
    } else {
        phone_error.style.display = 'none';
    }

    if (!Email || !validateEmail(Email)) {
        email_error.style.display = 'block';
        valid = false;
    } else {
        email_error.style.display = 'none';
    }

    if (!numberOfPersons || isNaN(numberOfPersons) || numberOfPersons <= 0) {
        persons_error.style.display = 'block';
        valid = false;
    } else {
        persons_error.style.display = 'none';
    }

    if (!typeOfClass) {
        persons_error.style.display = 'block';
        valid = false;
    } else {
        persons_error.style.display = 'none';
    }

    if (!valid) {
        return;
    }

    const bookingDetails = {
        Name,
        Age,
        phoneNumber,
        Email,
        typeOfClass,
        dateOfClass,
        timeOfClass,
        numberOfPersons
    };


    // const cost = details.numberOfPersons * typeOfClassPrice

    checkAvailability(bookingDetails);
    

});





function validateEmail(Email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(String(Email).toLowerCase());
}

function checkAvailability(details) {
    const availableSlotsData = {
        "Yoga": { "2024-06-10": ["10:00", "11:00"], "2024-06-11": ["12:00"] },
        "Pilates": { "2024-06-10": ["09:00", "10:00"], "2024-06-12": ["14:00"] },
        "Zumba": { "2024-06-10": ["08:00"], "2024-06-13": ["15:00", "16:00"] }
    };

    const { typeOfClass, dateOfClass, timeOfClass } = details;
    const slots = availableSlotsData[typeOfClass][dateOfClass];

    if (slots && slots.includes(timeOfClass)) {
        displayDetailedSummary(details);
    } else {
        displayAvailableSlots('No slots available for the selected class and time.', 'error');
    }
}

function displayAvailableSlots(message, type) {
    const availableSlots = document.getElementById('availableSlots');
    availableSlots.style.display = 'block';
    availableSlots.innerText = message;
    availableSlots.className = type;
}

function displayDetailedSummary(details) {
    const detailedSummary = document.getElementById('detailedSummary');
    detailedSummary.style.display = 'block';
    detailedSummary.style.backgroundColor = 'rgba(139, 99, 65, 0.856)';
    detailedSummary.innerHTML = `
        <h2>Booking Summary</h2>
        <p>Name: ${details.Name}</p>
        <p>Age: ${details.Age} (${details.Age < 18 ? 'Minor' : 'Adult'})</p>
        <p>Phone: ${details.phoneNumber}</p>
        <p>Email: ${details.Email}</p>
        <p>Class Type: ${details.typeOfClass}</p>
        <p>Class Date: ${details.dateOfClass}</p>
        <p>Class Time: ${details.timeOfClass}</p>
        <p>Number of Participants: ${details.numberOfPersons}</p>
        <p>Total Cost: $${details.numberOfPersons * cost}</p>
       

        
          
    `;
    document.getElementById('availableSlots').style.display = 'none';
}

