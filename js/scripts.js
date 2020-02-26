// fetch the api
fetch('https://randomuser.me/api/?results=12')
    // make it usable
    .then(response => response.json())
        //pass it to the create gallery app
        .then(data => createGallery(data))
            // wait until the gallery is complete before setting up listeners to open and close modals
            .then(() => modalListener())
            .then(() => closeModalListener())
            .then(() => addForm())
            // for error messages
    .catch(error => console.log("Error with the API", error))

//select the gallery
let gallery = document.querySelector('#gallery');
// clear out the comments first
gallery.innerHTML = '';


function createGallery(data) {
    // console.log(data.results);
    
    for(let i=0; i< data.results.length; i++) {
        // a lot of variables containing user data to be passed into the html template
        let img = data.results[i].picture['medium'];
        let modalImg = data.results[i].picture['large'];
        let firstName = data.results[i].name.first;
        let lastName = data.results[i].name.last;
        let email = data.results[i].email;
        let city = data.results[i].location.city;
        let state = data.results[i].location.state;
        let phone = data.results[i].cell;
        let fullLocation = `${data.results[i].location.street.number} ${data.results[i].location.street.name} ${city} ${state} ${data.results[i].location.postcode} `
        let dob = data.results[i].dob.date;
        let bday = new Date(dob); 
        let birthday = `${bday.getDate()}/${bday.getMonth()}/${bday.getFullYear()}`

        // the modal. Created first so it can be added to the card
        let modal = ` <div class="modal-container" style="display: none;">
                        <div class="modal">
                            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                            <div class="modal-info-container">
                                <img class="modal-img" src="${modalImg}" alt="profile picture">
                                <h3 id="name" class="modal-name cap">${firstName} ${lastName}</h3>
                                <p class="modal-text">${email}</p>
                                <p class="modal-text cap">${city}</p>
                                <hr>
                                <p class="modal-text">${phone}</p>
                                <p class="modal-text">${fullLocation}</p>
                                <p class="modal-text">Birthday: ${birthday}</p>
                            </div>
                        </div>`;

        // the card. This will be different each loop and will be added to the gallery div
        let card = `<div class="card">
                        <div class="card-img-container">
                            <img class="card-img" src="${img}" alt="profile picture">
                        </div>
                        <div class="card-info-container">
                            <h3 id="name" class="card-name cap">${firstName} ${lastName}</h3>
                            <p class="card-text">${email}</p>
                            <p class="card-text cap">${city}, ${state}</p>
                        </div>
                        ${modal}
                    </div>`;
        // card and modal added into the gallery
         gallery.innerHTML += card;
        
    }
}

// set up an event listener on each card.
function modalListener() {
    //loop through all child elements of the gallery
    for(let i=0; i<gallery.children.length; i++) {
        // assign a variable to the card on each loop
        let cardDiv = gallery.children[i];
        // and attach a listener
        cardDiv.addEventListener('click', function() {
            // which when clicked added display none style to the element
            let modalContainer = cardDiv.querySelector('.modal-container');
            modalContainer.style.display = "block";
         })
    }        
}

function closeModalListener() {
    // added on the window, so only one listener that responds to clicks on elements with certain classnames
    window.addEventListener('click', (e) => {
            if(e.target.className === "modal-container") {
                e.target.style.display = "none";
            } else if (e.target.className === "modal-close-btn" ) {
                e.target.parentElement.parentElement.style.display = "none";
                // the x couldn't be clicked on, so have also set a listener for contents of strong tags.
            } else if (e.target.parentElement.className === "modal-close-btn") {
                e.target.parentElement.parentElement.parentElement.style.display = "none";
            }
        })
    
}

function addForm() {
    const headerArea = document.querySelector('.header-inner-container');
    const form = `<form action="#" method="get">
                    <input type="search" id="search-input" class="search-input" placeholder="Search...">
                    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
                </form>`

    headerArea.innerHTML += form;

    
}