const COHORT = "2309-FTB-ET-WEB-PT";
const API = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/" + COHORT + "/events";

const state = {
  events: [],
}

async function getEvents() {
  const response = await fetch(API);
  const events = await response.json();
  renderEvents(events.data);
  state.events = events.data;
}

getEvents();

const cardsContainer = document.querySelector('#cards-container');

function renderEvents(events) {
  events.forEach(event => {
    const div = document.createElement("div");
    div.className = "card";
    
    const name = document.createElement("h2");
    name.className = "event-name";
    name.innerText = event.name;
    div.appendChild(name);
    
    const date = document.createElement("h3");
    date.innerText = event.date;
    div.appendChild(date);
    
    const time = document.createElement("p");
    time.innerText = event.time;
    div.appendChild(time);
    
    const location = document.createElement("p");
    location.innerText = event.location;
    div.appendChild(location);
    
    const description = document.createElement("p");
    description.innerText = event.description;
    div.appendChild(description);
    
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.innerText = "Delete";
    deleteButton.onclick = () => { 
      deleteEvent(event.id); // Call deleteEvent function passing the event id
      div.remove();
    };
    div.appendChild(deleteButton);
    
    cardsContainer.appendChild(div);
  });

  async function deleteEvent(eventId) {
    const response = await fetch(`${API}/${eventId}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    console.log(data);
  }
};

document.getElementById('event-form').addEventListener('submit', async function(e) {
  e.preventDefault();

  const event = {
    name: document.getElementById('name').value,
    date: document.getElementById('date').value,
    time: document.getElementById('time').value,
    location: document.getElementById('location').value,
    description: document.getElementById('description').value,
  };

  await addEvent(event);

  // Clear the form
  e.target.reset();
});

async function addEvent(event) {
  const response = await fetch(API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(event)
  });
  const data = await response.json();
  console.log(data);
}
