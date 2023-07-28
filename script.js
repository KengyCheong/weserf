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

  document.addEventListener("DOMContentLoaded", function() {
    var backButton = document.getElementById("backButton");

    backButton.addEventListener("click", function() {
        window.history.back();
    });
});

const fileInputs = [];
const mediaPreviews = [];
const commentBoxes = [];
let likeCount;
let isLiked = false;
let likedStatus = [false, false, false];
let commentStatus = [false, false, false];
let activePostIndex = null;

window.addEventListener('DOMContentLoaded', () => {
    likeCount = parseInt(document.getElementById("likeCount").textContent);
});

function toggleLike(postIndex) {
    const heartIcon = document.querySelector(`#likeButton${postIndex} .heart-icon`);
    const likeButton = document.getElementById(`likeButton${postIndex}`);
    let isLiked = likedStatus[postIndex];
        
    if (isLiked) {
        document.getElementById(`likeCount${postIndex}`).textContent--;
    } else {
        document.getElementById(`likeCount${postIndex}`).textContent++;
    }

    likedStatus[postIndex] = !isLiked;
    updateHeartIconColor(heartIcon, likedStatus[postIndex]);
}

function updateHeartIconColor(heartIcon, isLiked) {
    if (isLiked) {
        heartIcon.classList.add("fas");
        heartIcon.classList.remove("far");
        heartIcon.style.color = "red";
    } else {
        heartIcon.classList.add("far");
        heartIcon.classList.remove("fas");
        heartIcon.style.color = "#888";
    }
}

function toggleCommentBox(postIndex) {
    const commentBox = document.querySelectorAll(".comment-box")[postIndex];
    const commentButton = document.getElementById(`commentButton${postIndex}`);
    const mediaPreview = commentBox.querySelector(".media-preview");

    if (activePostIndex !== null && activePostIndex !== postIndex) {
        document.querySelectorAll(".comment-box")[activePostIndex].style.display = "none";
        commentStatus[activePostIndex] = false;
    }

    if (commentStatus[postIndex]) {
        commentBox.style.display = "none";
        mediaPreview.innerHTML = "";
    } else {
        commentBox.style.display = "block";
    }

    commentStatus[postIndex] = !commentStatus[postIndex];
    activePostIndex = commentStatus[postIndex] ? postIndex : null;
}


function submitComment(postIndex) {
    const commentTextArea = commentBoxes[postIndex].querySelector('textarea');
    const comment = commentTextArea.value;
    console.log(`Comment submitted for post ${postIndex}:`, comment);

    const fileInput = document.getElementById("fileInput");
    const selectedFile = fileInput.files[0]; 
    if (selectedFile) {
        console.log("Selected file:", selectedFile);
        const mediaPreview = document.querySelector(".media-preview");
    if (selectedFile.type.includes("image")) {
        const reader = new FileReader();
        reader.onload = function (event) {
            mediaPreview.innerHTML = "";
            const img = document.createElement("img");
            img.src = event.target.result;
            mediaPreview.appendChild(img);
            mediaPreview.style.display = "block";
        };
        reader.readAsDataURL(selectedFile);
    } else if (selectedFile.type.includes("video")) {
        mediaPreview.innerHTML = "";
        const video = document.createElement("video");
        video.src = URL.createObjectURL(selectedFile);
        video.controls = true;
        mediaPreview.appendChild(video);
        mediaPreview.style.display = "block";
    }
}
}
window.addEventListener('DOMContentLoaded', () => {
    for (let i = 0; i < 3; i++) {
        fileInputs.push(document.getElementById(`fileInput${i}`));
        mediaPreviews.push(document.getElementById(`mediaPreview${i}`));
        commentBoxes.push(document.getElementById(`commentBox${i}`));
    }
});

function showPreview(postIndex) {
    const fileInput = fileInputs[postIndex];
    const mediaPreview = mediaPreviews[postIndex];
    const commentBox = commentBoxes[postIndex];

    const selectedFiles = fileInput.files;
    mediaPreview.innerHTML = '';

    for (const file of selectedFiles) {
        const mediaContainer = document.createElement('div');
        mediaContainer.className = 'media-container';

        if (file.type.includes('image')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = document.createElement('img');
                img.src = event.target.result;
                mediaContainer.appendChild(img);
            };
            reader.readAsDataURL(file);
        } else if (file.type.includes('video')) {
            const video = document.createElement('video');
            video.src = URL.createObjectURL(file);
            video.controls = true;
            mediaContainer.appendChild(video);
        }

        mediaPreview.appendChild(mediaContainer);
    }

    mediaPreview.style.display = 'block';
}


function setupLightbox() {
    const lightboxGallery = document.querySelector(".lightbox-gallery");
    const lightbox = document.querySelector(".lightbox");
    const lightboxContent = document.querySelector(".lightbox-content");

    const mediaContainers = document.querySelectorAll(".media-container");
    mediaContainers.forEach((container) => {
        container.addEventListener("click", () => {
            const mediaClone = container.cloneNode(true);
            mediaClone.querySelector(".close-button").remove();
            lightboxContent.innerHTML = "";
            lightboxContent.appendChild(mediaClone);
            lightbox.style.display = "flex";
        });
    });

    const lightboxCloseButton = document.querySelector(".lightbox-close-button");
    lightboxCloseButton.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            lightbox.style.display = "none";
        }
    });

    const closeButton = document.querySelectorAll(".close-button");
    closeButton.forEach((button) => {
        button.addEventListener("click", (event) => {
            event.stopPropagation();
            const mediaContainer = event.currentTarget.closest(".media-container");
            mediaContainer.remove();
            if (!document.querySelector(".media-container")) {
                document.querySelector(".media-preview").style.display = "none";
            }
        });
    });
}

function sharePost() {
if (navigator.share) {
    navigator.share({
        title: 'Your post title', 
        text: 'Your post description', 
        url: 'https://example.com/your-post-url' 
    })
    .then(() => {
        console.log('Successfully shared');
    })
    .catch((error) => {
        console.error('Error sharing:', error);
    });
} else {
    alert('Web Share API is not supported in this browser. You can manually share the post.');
}
}