//your code here

const userDetails = document.getElementById('userDetails');
const userPhoto = document.getElementById('userPhoto');
const userName = document.getElementById('userName');
const additionalInfo = document.getElementById('additionalInfo');
const ageInfo = document.getElementById('age');
const emailInfo = document.getElementById('email');
const phoneInfo = document.getElementById('phone');
const getUserButton = document.getElementById('getUser');
const infoButtons = document.querySelectorAll('[data-attr]');

// Function to fetch a random user from the API
async function fetchRandomUser() {
  const response = await fetch('https://randomuser.me/api/');
  const data = await response.json();
  return data.results[0];
}

// Function to display user details (name and photo)
function displayUser(user) {
  userPhoto.src = user.picture.large;
  userName.textContent = `${user.name.first} ${user.name.last}`;
}

// Function to display additional user info (age, email, phone)
function displayAdditionalInfo(user, infoType) {
  switch (infoType) {
    case 'age':
      ageInfo.textContent = `Age: ${user.dob.age}`;
      emailInfo.textContent = ''; // Clear other info
      phoneInfo.textContent = ''; // Clear other info
      break;
    case 'email':
      ageInfo.textContent = ''; // Clear other info
      emailInfo.textContent = `Email: ${user.email}`;
      phoneInfo.textContent = ''; // Clear other info
      break;
    case 'phone':
      ageInfo.textContent = ''; // Clear other info
      emailInfo.textContent = ''; // Clear other info
      phoneInfo.textContent = `Phone: ${user.phone}`;
      break;
  }
}

// Function to clear additional user info
function clearAdditionalInfo() {
  ageInfo.textContent = '';
  emailInfo.textContent = '';
  phoneInfo.textContent = '';
}

// Event listener for info buttons
infoButtons.forEach(button => {
  button.addEventListener('click', async function() {
    const user = await fetchRandomUser();
    const infoType = button.getAttribute('data-attr');
    displayAdditionalInfo(user, infoType);
  });
});

// Event listener for get new user button
getUserButton.addEventListener('click', async function() {
  const user = await fetchRandomUser();
  displayUser(user);
  clearAdditionalInfo();
});

// Initially hide additional user info

// Get the first user and display details
(async function() {
  const user = await fetchRandomUser();
  displayUser(user);
})();