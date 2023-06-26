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
  