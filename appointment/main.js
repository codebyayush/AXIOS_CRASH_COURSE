// Function to add a contact to the list
function addContact(name, email, phone) {
  const contactList = document.getElementById("contactList");
  const contactDiv = document.createElement("div");

  contactDiv.innerHTML = `
            <strong>Name:</strong> ${name}<br>
            <strong>Email:</strong> ${email}<br>
            <strong>Phone:</strong> ${phone}<br>
            <button onclick="editContact(this)">Edit</button>
            <button onclick="deleteContact(this)">Delete</button>
            <hr>
        `;
  contactList.appendChild(contactDiv);

  localStorage.setItem(email, JSON.stringify({ name, email, phone }));

  axios
    .post(
      "https://crudcrud.com/api/15ba15904bd44102a4b3032346eb7f24/appointmentData",
      { name, email, phone }
    )
    .then((response) => {
      console.log(response);
    })
    .catch((err) => console.log(err));
}

// Function to handle form submission
document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    addContact(name, email, phone);

    // Clear the form inputs
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
  });

// Function to edit a contact
function editContact(button) {
  const contactDiv = button.parentElement;
  currentEditingContact = contactDiv;

  // Populate the form with contact details for editing
  const name = contactDiv
    .querySelector("strong:nth-of-type(1)")
    .nextSibling.textContent.trim();
  const email = contactDiv
    .querySelector("strong:nth-of-type(2)")
    .nextSibling.textContent.trim();
  const phone = contactDiv
    .querySelector("strong:nth-of-type(3)")
    .nextSibling.textContent.trim();

  document.getElementById("name").value = name;
  document.getElementById("email").value = email;
  document.getElementById("phone").value = phone;

  contactDiv.remove();
}

// Function to delete a contact
function deleteContact(button) {
  const contactDiv = button.parentElement;
  contactDiv.remove();
}

window.onload = function () {
  axios
    .get(
      "https://crudcrud.com/api/15ba15904bd44102a4b3032346eb7f24/appointmentData"
    )
    .then((response) => {
      console.log(response);
    })
    .catch((err) => console.log(err));

  for (let i = 0; i < localStorage.length; i++) {
    const email = localStorage.key(i);
    const contactData = JSON.parse(localStorage.getItem(email));
    addContact(contactData.name, email, contactData.phone);
  }
};
