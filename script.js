let cat_form = $("#cat_form");

// Cat text font
var fontSelection = document.getElementById("cat_text_font");

function changeSelectFont(){
    fontSelection.style.fontFamily = 
    fontSelection.options[fontSelection.selectedIndex].style.fontFamily;
}

changeSelectFont(); // Do when ready
fontSelection.onchange = changeSelectFont; // And do it on change

// Cat text size
var fontSize = document.getElementById("cat_text_size");
// console.log("here is the font size")
// console.log(fontSize);

fontSize.addEventListener('input', function() {
    console.log("AAAAAAAAAAAAAAAAAAAA");
    var size = fontSize.value + "px";
    console.log("size: " + size);


    document.getElementById("cat_text_size_example").style.fontSize = size;
    console.log(document.getElementById("cat_text_size_example").style)
})

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
        const cat_text_size = cat_form_data.get('cat_text_size');
        const cat_text_font = cat_form_data.get('cat_text_font');
        const cat_text_color = cat_form_data.get('cat_text_color');

        console.log("cat text size" + cat_text_size);
        var cat_url_adds = "";
        if (cat_text != "")  {
            cat_url_adds += "/says/" + cat_text + "?";
            cat_url_adds += "font=" + cat_text_font + "&";

            if (cat_text_color != "") {
                cat_url_adds += "fontColor=" + cat_text_color;
            }
            else {
                cat_url_adds += "fontColor=white";
            }

            cat_url_adds += "fontSize=" + cat_text_size + "&";
        }

        

        const catUrl = "https://cataas.com/cat/" + data['_id'] + cat_url_adds
        console.log(catUrl);
        catImage.src = catUrl;
    })
    .catch(error => {
        catFormError.textContent = 'Error:' + error;
    });
}

cat_form.submit(submitCatForm);