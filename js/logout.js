var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);

// Script for loading function on page load (easier code maintenance)
window.onload = function () {
    login_onLoad();
};

// login_onLoad function for loading info of user
function login_onLoad() {

    console.log("login_onLoad function loaded");

    event.preventDefault(); // cancel default behavior

    db.transaction(function (tx) {

        // Search for login information
        tx.executeSql('SELECT * FROM loginSession LIMIT 1;',
            null,
            function (tx, results) {

                // If login session found, then maintain access to the page, and change button display
                if (results.rows.length > 0) {
                    console.log("login successfully as " + results.rows.item(0).employeeNumber);
                    document.querySelector('#logout_dropdownMenuButton').textContent = 'Welcome, ' + results.rows.item(0).firstName + '.';
                }
            },
            // If no login session found, then no access to the page, and redirect to login page
            function (transaction, error) {
                console.log("failed to login: no login session found");
                alert('Warning. You are not logged in. Redirecting to login page.');
                window.location = "login_page.html";
            });
    });
}

// logout function for deleting user info on logout, and removing access to the page
function logout() {

    console.log("logout function loaded");

    db.transaction(function (tx) {

        // Delete 'loginSession' table previously created by logging in
        tx.executeSql("DROP TABLE loginSession", null,
            function (tx, results) {
                console.log("successfully dropped loginSession table");
                window.location = "login_page.html";
            },
            function (tx, error) {
                console.log("cloud not delete loginSession talbe");
                window.location = "login_page.html";
            }
        );
    });
}
