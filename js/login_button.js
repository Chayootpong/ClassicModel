// Get the modal
var login_model = document.getElementById('login_form');

// When the user clicks anywhere outside of the login_model, close it
window.onclick = function(event) {
    if (event.target == login_model) {
        login_model.style.display = "none";
    }
}