// Wait for the page to load
window.addEventListener('DOMContentLoaded', (event) => {
    // Show the login container after a delay (e.g., 3 seconds)
    setTimeout(showLoginContainer, 1500);
  });
  
  function showLoginContainer() {
    // Hide the image container
    document.getElementById('image-container').style.display = 'none';
  
    // Show the login container
    document.getElementById('login-container').style.display = 'block';
  } 

  document.addEventListener('DOMContentLoaded', function() {
    // Attach event listener to the sign-in button
    document.querySelector('.sign-in').addEventListener('click', function() {
      window.location.href = 'Social.html';
    });
  });

  function uploadPhoto(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
      var uploadedPhoto = document.getElementById('uploaded-photo');
      uploadedPhoto.src = e.target.result;
      uploadedPhoto.alt = "Photo uploaded";
      uploadedPhoto.style.height = '100%';
      uploadedPhoto.style.width = 'auto';
      uploadedPhoto.style.maxWidth = '100%';
      uploadedPhoto.style.maxHeight = '100%';
      uploadedPhoto.style.objectFit = 'cover';
      uploadedPhoto.style.borderRadius = '50%';
      document.getElementById('register-image').style.display = 'none';
    };
    reader.readAsDataURL(file);
  }

  // Function to display friends in the friend list
function displayFriends() {
  const friendList = document.getElementById('friend-list');
  friendList.innerHTML = '';

  friends.forEach(friend => {
    const listItem = document.createElement('li');
    listItem.classList.add('friend-item');

    const profilePic = document.createElement('img');
    profilePic.src = 'path/to/profile-pic.jpg'; // Replace with the actual profile picture source
    profilePic.alt = 'Profile Picture';

    const friendDetails = document.createElement('div');
    friendDetails.classList.add('friend-details');

    const friendName = document.createElement('div');
    friendName.classList.add('friend-name');
    friendName.textContent = friend;

    const lastMessage = document.createElement('div');
    lastMessage.classList.add('last-message');
    lastMessage.textContent = 'Last message'; // Replace with the actual last message

    friendDetails.appendChild(friendName);
    friendDetails.appendChild(lastMessage);

    listItem.appendChild(profilePic);
    listItem.appendChild(friendDetails);

    friendList.appendChild(listItem);
  });
}

// Initial display of friends
displayFriends();

  