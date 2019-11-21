// Include script for encrypt/decrypt
var script = document.createElement('script');
script.type = 'text/javascript';

script.src = 'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js';
    document.body.appendChild(script);

var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);

function login_check() {
    event.preventDefault(); // cancel default behavior
    var username = $("#login_username").val();
    var password = $("#login_userpassword").val();

    // Encrypt
    var encrypted = CryptoJS.AES.encrypt(password, "Secret Passphrase");

    // Decrypt
    password = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase");

    db.transaction(function (tx) {
        
        // Search for user information
        tx.executeSql('SELECT * FROM login WHERE password=? AND employeeNumber=?',
        [password, username],
        function (tx, results) {

            // If login successfully
            if (results.rows.length > 0) {
                alert("Logged in");

                tx.executeSql(
                    "CREATE TABLE IF NOT EXISTS loginSession AS SELECT * FROM employees WHERE employeeNumber=?",
                    [username],
                    null,
                    function (transaction, error) {
                        console.log('error on table create: ' + error.message);
                    });

                // Redirect to specific page
                window.location = "Searching.html";
            } else {
                alert("Invalid username or password");
            }
        }, errorCB);
    });
}

function errorCB(tx, err) {
    alert("Error processing SQL: " + err.code);
}