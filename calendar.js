const dates = document.querySelector(".dates");
const monthAndYear = document.querySelector('.monthAndYear');
const heading = document.querySelectorAll('.heading .fa-solid');
const addEventButton = document.getElementById("addEventButton");

const calendar = {
  months: [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ],
  days: [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ]
};

let objDate = new Date();
let currentMonth = objDate.getMonth();
let currentYear = objDate.getFullYear();
let currentDate = objDate.getDate();

const eventsData = {
  12: [
    { title: "Commander Night", time: "6pm" },
    { title: "Team Meeting", time: "3pm" }
  ],
};

function renderCalendar() {
  let month = calendar.months[currentMonth];
  let year = currentYear;

  monthAndYear.innerHTML = `${month} ${year}`;

  let firstDay = new Date(currentYear, currentMonth, 1).getDay();
  let lastDayofMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  let days = "";

  for (let i = 0; i < firstDay; i++) {
    days += `<li class="empty"></li>`;
  }
  
  for (let i = 1; i <= lastDayofMonth; i++) {
    let dayContent = i;
    if (eventsData[i]) {
      dayContent += ' <i class="fas fa-calendar-check"></i>';
    }
    if (i === objDate.getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()) {
      days += `<li class="active" data-day="${i}"><img class="image" src="chess-removebg-preview.png">${dayContent}</li>`;
    } else if (i % 2 !== 0) {
      days += `<li class="white" data-day="${i}">${dayContent}</li>`;
    } else {
      days += `<li data-day="${i}">${dayContent}</li>`;
    }
  }

  const totalDays = firstDay + lastDayofMonth;
  const remainingDays = 35 - totalDays;
  for (let i = 0; i < remainingDays; i++) {
    days += `<li class="empty"></li>`;
  }

  dates.innerHTML = days;

  document.querySelectorAll('.dates li').forEach(li => {
    li.addEventListener('click', () => {
      if (!li.classList.contains('empty')) {
        const day = li.dataset.day;
        displayEventDetails(day);
        selectedDay = day;
      }
    });
  });
}

function displayEventDetails(day) {
  const eventContainer = document.querySelector('.events');
  eventContainer.innerHTML = '';

  const dayEvents = eventsData[day];

  if (dayEvents) {
    dayEvents.forEach(event => {
      eventContainer.innerHTML += `
        <div class="event">
          <div class="event_date">
            <h3>${calendar.days[new Date(currentYear, currentMonth, day).getDay()]} ${calendar.months[currentMonth]} ${day}, ${currentYear}</h3>
          </div>
          <div class="event_details">
            <div class="event">
              <div class="title">
                <i class="fas fa-calendar-check"></i>
                <h3 class="event-title">${event.title}</h3>
              </div>
              <div class="time">${event.time}</div>
            </div>
          </div>
        </div>
      `;
    });
  } else {
    eventContainer.innerHTML = `<div class="event"><h3>No events for this day.</h3></div>`;
  }
}

heading.forEach((btns) => {
  btns.addEventListener('click', () => {
    currentMonth = btns.id === "prev" ? currentMonth - 1 : currentMonth + 1;
    if (currentMonth < 0 || currentMonth > 11) {
      currentYear += (currentMonth < 0) ? -1 : 1;
      currentMonth = (currentMonth < 0) ? 11 : 0;
    }
    renderCalendar();
  });
});

let selectedDay = null;

addEventButton.addEventListener('click', () => {
  if (selectedDay) {
    const eventTitle = prompt("Enter event title:");
    const eventTime = prompt("Enter event time:");

    if (eventTitle && eventTime) {
      if (!eventsData[selectedDay]) {
        eventsData[selectedDay] = [];
      }
      eventsData[selectedDay].push({ title: eventTitle, time: eventTime });
      renderCalendar(); // Re-render calendar to show the new event
      displayEventDetails(selectedDay); // Display details of the selected day
    }
  } else {
    alert("Please select a date first.");
  }
});

renderCalendar();



