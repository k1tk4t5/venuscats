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

// Cat text color
var fontColor = document.getElementById("cat_text_color");
function changeColor() {
    var color = fontColor.value;
    document.getElementById("cat_text_size_example").style.color = color;
}
fontColor.onchange = changeColor;
fontColor.oninput = changeColor;

// Cat download button
let cat_download = document.getElementById("cat_download");
cat_download.addEventListener("click", function() {
    downloadImage(cat_download.getAttribute("download"));
})

const fetchImage = async url => {
    const response = await fetch(url)
    const blob = await response.blob()
    
    return blob
  }

const downloadImage = async url => {
    const imageBlob = await fetchImage(url)
    const imageBase64 = URL.createObjectURL(imageBlob)
    
    const a = document.createElement('a')
    a.style.setProperty('display', 'none')
    document.body.appendChild(a)
    // a.download = url.replace(/^.*[\\\/]/, '')
    a.download = "cat";
    a.href = imageBase64
    a.click()
    a.remove()
  }

function submitCatForm(formSubmitEvent) {
    const catImage = document.getElementById('cat_image');
    const catFormError = document.getElementById('cat_error_message');

    // console.log("submit cat form");
    catImage.src = "cat-loading.gif";
    cat_download.setAttribute("hidden", "hidden");

    formSubmitEvent.preventDefault();

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
        // console.log(data["_id"])

        // Getting cat form data
        const cat_form_data = new FormData(document.getElementById('cat_form'));
        const cat_text = cat_form_data.get('cat_text');
        const cat_text_font = cat_form_data.get('cat_text_font');

        var cat_url_adds = "";
        if (cat_text != "")  {
            cat_url_adds += "/says/" + cat_text + "?";
            cat_url_adds += "font=" + cat_text_font + "&";

            var currentColor = JSON.stringify(fontColor.value).replace("#", "%23");
            currentColor = currentColor.substring(1, currentColor.length - 1);
            cat_url_adds += "fontColor=" + currentColor;

            cat_url_adds += "&fontSize=" + cat_text_size.value;
        }

        

        const catUrl = "https://cataas.com/cat/" + data['_id'] + cat_url_adds
        // console.log(catUrl);
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