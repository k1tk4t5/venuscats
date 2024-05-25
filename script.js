// Get the value of the name input from the form and update the greeting
let cat_form = $("#cat_form");

const greetingText = document.querySelector("#greeting");                   // get greeting element
const inputElement = document.querySelector("#exampleFormControlInput1");   // get input element
const btn = document.querySelector("#exampleFormBtn");                      // get the element with id = 'exampleFormBtn'
btn.addEventListener('click', function() {                                  // add an event to the button: whenever the button is pressed, update the greeting name
    greetingText.innerHTML = `Hello, ${inputElement.value}`;                // this is a templated string in Javscript! https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals 
});


function submitCatForm(formSubmitEvent) {
    console.log("submit cat form");

    formSubmitEvent.preventDefault();

    const apiUrl = "https://cataas.com/cat?json=true";
    const catImage = document.getElementById('cat');
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
        catImage.src = "https://cataas.com/cat/" + data['_id'];
    })
    .catch(error => {
        catFormError.textContent = 'Error:' + error;
    });
}

cat_form.submit(submitCatForm);