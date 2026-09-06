
const storageKey = "cakeBuilderData";
const data = JSON.parse(localStorage.getItem(storageKey));

if (data) {
    const element = document.getElementById("details");

    element.value = [
        "*** CAKE BUILDER DETAILS ***",
        ...data
            .filter((item) => item.answer)
            .map((item) => `${item.property}: ${item.answer}`)
    ].join("\n");
}

const button = document.getElementById('submitOrderOrInquire');

button.addEventListener('click', function (e) {
    e.preventDefault();

    if (!isValidForm()) {
        return;
    }
    localStorage.removeItem("cakeBuilderData");
    showSuccess();
});

function showSuccess() {
    const dialog = document.getElementById("confirmation-dialog");
    dialog.showModal();
    document.getElementById("close-dialog").addEventListener("click", () => {
        dialog.close();
    });
}


function isValidForm() {

    let isValid = true;


    const selectedRequestType = document.querySelector('input[name="request-type"]:checked');
    const requestTypeError = document.getElementById("request-type-error");
    if (!selectedRequestType) {
        requestTypeError.textContent = "Please select either Pre-order or Inquiry.";
    } else {
        requestTypeError.textContent = "";
    }

    const email = document.getElementById("email");
    const emailError = document.getElementById("email-error");
    if (!isValidEmail(email.value)) {
        emailError.textContent = "Please enter a valid email address.";
        isValid = false;
    } else {
        emailError.textContent = "";
    }

    const name = document.getElementById("name");
    const nameError = document.getElementById("name-error");
    if (!isValidName(name.value)) {
        nameError.textContent = "Please enter a valid name.";
        isValid = false;
    } else {
        nameError.textContent = "";
    }

    const details = document.getElementById("details");
    const detailsError = document.getElementById("details-error");
    if (!isValidDetails(details.value)) {
        detailsError.textContent = "Please enter some details.";
        isValid = false;
    } else {
        detailsError.textContent = "";
    }

    const pickupDate = document.getElementById('pickup-date')
    const pickupDateError = document.getElementById("pickup-date-error");
    if (!isValidPickupDate(pickupDate.value)) {
        pickupDateError.textContent = "Please select today or a future date.";
    } else {
        pickupDateError.textContent = "";
    }

    return isValid;
}

function isValidName(name) {
    return name && name.length > 1;
}

function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email.trim());
}

function isValidDetails(details) {
    return details && details.length > 1;
}

function isValidPickupDate(value) {
    if (!value) {
        return true;
    }

    const selectedDate = new Date(`${value}T00:00:00`);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    return (
        !Number.isNaN(selectedDate.getTime()) &&
        selectedDate >= today
    );
}

