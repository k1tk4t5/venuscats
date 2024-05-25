let cat_form = $("#cat_form");

// Cat text font
var fontSelection = document.getElementById("cat_text_font");

function changeSelectFont(){
    var cat_text_size_example = document.getElementById("cat_text_size_example");

    fontSelection.style.fontFamily = 
    fontSelection.options[fontSelection.selectedIndex].style.fontFamily;
    cat_text_size_example.style.fontFamily =
    fontSelection.options[fontSelection.selectedIndex].style.fontFamily;
}

changeSelectFont(); // Do when ready
fontSelection.onchange = changeSelectFont; // And do it on change

// Cat text size
var fontSize = document.getElementById("cat_text_size");

fontSize.addEventListener('input', function() {
    var size = fontSize.value + "px";


    document.getElementById("cat_text_size_example").style.fontSize = size;
})

// Cat download button
let cat_download = document.getElementById("cat_download");
cat_download.addEventListener("click", function() {
    window.open(cat_download.getAttribute("download"));
})

function submitCatForm(formSubmitEvent) {
    const catImage = document.getElementById('cat_image');
    const catFormError = document.getElementById('cat_error_message');

    console.log("submit cat form");
    catImage.src = "cat-loading.gif";
    cat_download.setAttribute("hidden", "hidden");

    formSubmitEvent.preventDefault();

    console.log(document.querySelector('input[name="picgif"]:checked').value);
    const format = document.querySelector('input[name="picgif"]:checked').value;
    var apiUrl = "";
    if (format == "gif") {
        apiUrl = "https://cataas.com/cat/gif?json=true";
    }
    else {
        apiUrl = "https://cataas.com/cat?json=true";
    }

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
        const cat_text_font = cat_form_data.get('cat_text_font');
        const cat_text_color = cat_form_data.get('cat_text_color');

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

            cat_url_adds += "&fontSize=" + cat_text_size.value;
        }

        

        const catUrl = "https://cataas.com/cat/" + data['_id'] + cat_url_adds
        console.log(catUrl);
        catImage.src = catUrl;
        cat_download.setAttribute("download", catUrl);
        cat_download.setAttribute("href", catUrl);
        cat_download.removeAttribute("hidden");
    })
    .catch(error => {
        catFormError.textContent = 'Error:' + error;
    });
}

cat_form.submit(submitCatForm);