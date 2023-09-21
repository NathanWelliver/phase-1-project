document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.querySelector("#add-friends-or-family");
    const contactContainer = document.querySelector(".container");
    const contactCollection = document.querySelector("#contact-collection");
    const contactForm = document.querySelector(".add-friend-form");
    let addContact = false;
    //Loads contacs from the server and displays them
    fetchContactsAndDisplay();

    addButton.addEventListener("click", () => {
        // Toggle the form for adding contacts
        addContact = !addContact;
        if (addContact) {
            contactContainer.style.display = "block";
        } else {
            contactContainer.style.display = "none";
        }
    });

    // Function to fetch and display contacts
function fetchContactsAndDisplay() {
    fetch("http://localhost:3000/contacts")
      .then(response => response.json())
      .then(contacts => {
        contacts.forEach(contact => {
          displayContact(contact);
        });
      });
  }
  
  // Function to display a contact card
  function displayContact(contact) {
    const card = createContactCard(contact);
    contactCollection.appendChild(card);
  }
    

    // Function to create a contact card with an alert button
    function createContactCard(contact) {
        const card = document.createElement("div");
        card.className = "contact-card";

        const h2 = document.createElement("h2");
        h2.textContent = contact.name;

        const img = document.createElement("img");
        img.src = contact.image;
        img.className = "contact-picture";

        const pPhoneNumber = document.createElement("p");
        pPhoneNumber.textContent = `Phone Number: ${contact['phone-number']}`

        const alertButton = document.createElement("button");
        alertButton.className = "alert-button";
        alertButton.textContent = "Send Alert";
        

        alertButton.addEventListener("click", () => {
            alert(`Alert was sent to ${contact.name}`);
        });

        card.appendChild(h2);
        card.appendChild(img);
        card.appendChild(pPhoneNumber);
        card.appendChild(alertButton);

        return card;
    }

    //function to handle form submission and add new contact
    contactForm.addEventListener("submit", event => {
        event.preventDefault();
        const name = event.target.name.value;
        const image = event.target.image.value;

        const newContact = {
            name: name,
            image: image,
            'phone-number': event.target['phone-number'].value
        };

        fetch("http://localhost:3000/contacts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(newContact)
        })
        .then(response => response.json())
        .then(contact => {
            const card = createContactCard(contact);
            contactCollection.appendChild(card);
            contactForm.reset();
        });
    });

    const toggleLightDarkButton = document.querySelector("#toggle-mode-button");
    const body = document.body;

    toggleLightDarkButton.addEventListener("click", () => {
        body.classList.toggle("dark-mode");

        const currentMode = body.classList.contains("darkmode") ? "dark" : "light";
        localStorage.setItem("mode", currentMode);

        const savedMode = localStorage.getItem("mode");
        if (savedMode === "dark") {
            body.classList.add("dark-mode");
        }
    })

});
