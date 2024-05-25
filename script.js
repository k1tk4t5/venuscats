let cat_form = $("#cat_form");
const catImageFly = document.getElementById('cat-image-fly');

function submitCatForm(formSubmitEvent) {
    console.log("submit cat form");

    formSubmitEvent.preventDefault();

    const apiUrl = "https://cataas.com/cat?json=true";
    const catImage = document.getElementById('cat_image');
    const catFormError = document.getElementById('cat_error_message');
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        return response.json();
    })
    .then(data => {
        console.log(data["_id"])

        // Getting cat form data
        const cat_form_data = new FormData(document.getElementById('cat_form'));
        const cat_text = cat_form_data.get('cat_text');
        const cat_text_color = cat_form_data.get('cat_text_color');

        var cat_url_adds = "";
        if (cat_text != "")  {
            cat_url_adds += "/says/" + cat_text + "?";
            cat_url_adds += "fontColor=" + cat_text_color;
        }

        const catUrl = "https://cataas.com/cat/" + data['_id'] + cat_url_adds
        console.log(catUrl);
        catImage.src = catUrl;
        catImageFly.src = catUrl;
    })
    .catch(error => {
        catFormError.textContent = 'Error:' + error;
    });
}

cat_form.submit(submitCatForm);



const apiKey = 'G5t8OiZEGbXXzZsD4x1rNvExVoraSG6CQfja9USW'; // Replace with your actual NASA API key
const spaceImage = document.getElementById('space-image');
const getRandomImageButton = document.getElementById('launch-button');

getRandomImageButton.addEventListener('click', launchCat);

function launchCat() {
    getRandomSpaceImage();
    animateCat();
}

function getRandomSpaceImage() {
  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=` + generateRandomDate();

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        spaceImage.src = data.url;
    })
    .catch(error => {
      console.error('Error fetching image:', error);
    });
}

function generateRandomDate() {
  const today = new Date();
  const pastYear = today.getFullYear() - 1;
  const randomDays = Math.floor(Math.random() * (today.getDate() - 1) + 1); // Random day between 1 and today's date
  const randomMonth = Math.floor(Math.random() * 12); // Random month (0-11)

  return new Date(pastYear, randomMonth, randomDays).toISOString().slice(0, 10); // Format date string (YYYY-MM-DD)
}

function getRandomDirection() {
    const angle = Math.random() * 2 * Math.PI;
    return {
      x: Math.cos(angle),
      y: Math.sin(angle),
    };
  }

const spaceBackground = document.getElementById("space-image");

let speed = 3.5;
let deltaX = speed * Math.cos(45 * Math.PI/180);
let deltaY = speed * Math.sin(45 * Math.PI/180);

let animationId;

function animateCat() {
    window.cancelAnimationFrame(animationId);
    
    let imageWidth = catImageFly.offsetWidth;
    let imageHeight = catImageFly.offsetHeight;

    let backgroundOffsetX = spaceBackground.offsetLeft;
    let backgroundOffsetY = spaceBackground.offsetTop;

    let backgroundWidth = spaceBackground.offsetWidth;
    let backgroundHeight = spaceBackground.offsetHeight;

    let newLeft = catImageFly.offsetLeft + deltaX;
    let newTop = catImageFly.offsetTop + deltaY;

    // Check for collisions with container edges
    if (newLeft < backgroundOffsetX) {
        deltaX = -deltaX; // Reverse direction if hitting left edge
        newLeft = 0;
    } else if (newLeft + imageWidth > backgroundOffsetX + backgroundWidth) {
        deltaX = -deltaX; // Reverse direction if hitting right edge
        newLeft = backgroundWidth - imageWidth;
    }

    if (newTop < backgroundOffsetY) {
        deltaY = -deltaY; // Reverse direction if hitting top edge
        newTop = 0;
    } else if (newTop + imageHeight > backgroundOffsetY + backgroundHeight) {
        deltaY = -deltaY; // Reverse direction if hitting bottom edge
        newTop = backgroundHeight - imageHeight;
    }

    catImageFly.style.left = `${newLeft}px`;
    catImageFly.style.top = `${newTop}px`;

    animationId = window.requestAnimationFrame(animateCat); // Schedule next animation frame
}

animateCat();