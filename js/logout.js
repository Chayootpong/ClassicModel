var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);

window.onload =  function(){
    login_onLoad();
};

function login_onLoad() {

    alert("Loading session.");

    event.preventDefault(); // cancel default behavior

    db.transaction(function (tx) {
        
        // Search for login information
        tx.executeSql('SELECT * FROM loginSession LIMIT 1;',
        null,
        function (tx, results) {

            // If login session found
            if (results.rows.length > 0) {
                alert(results.rows.item(0).employeeNumber);
                document.querySelector('#logout_dropdownMenuButton').textContent = 'Welcome, ' + results.rows.item(0).firstName + '.';
            } else {
                alert("Warning. You are not logged in.");
            }
        },
        function (transaction, error) {
            alert('Warning. You are not logged in. Redirecting to login page.');
            window.location = "login_page.html";
            console.log('login session not found');
        });
    });
}

function logout() {

    db.transaction(function (tx) {

        // Delete 'loginSession' table previously created by logging in
        tx.executeSql("DROP TABLE loginSession", null,
            function (tx, results) {
                console.log("Successfully Dropped")
            },
            function (tx, error) {
                console.log("Could not delete")
            }
        );
    });
    
    alert('Successfully logged out.');

    window.location = "login_page.html";
}