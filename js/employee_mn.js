function log(id) {
    console.log(id)

    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);

    var name = document.getElementById('nameRow' + id).innerHTML;
    var code = document.getElementById('codeRow' + id).innerHTML;
    var cat = document.getElementById('catRow' + id).innerHTML;
    var scale = document.getElementById('scaleRow' + id).innerHTML;
    var num = document.getElementById('numRow' + id).innerHTML;
    var price = document.getElementById('priceRow' + id).innerHTML.substring(1, document.getElementById('priceRow' + id).innerHTML.length);

    console.log(name);
    console.log(code);
    console.log(cat);
    console.log(scale);
    console.log(num);
    console.log(price);

    db.transaction(function (tx) {
        var insert = "INSERT INTO TESTS (name, code, catagory, scale, amount, price) VALUES (?,?,?,?,?,?)";
        tx.executeSql('CREATE TABLE IF NOT EXISTS TESTS (name, code UNIQUE, catagory, scale, amount INTEGER, price DOUBLE)');
        tx.executeSql(insert, [name, code, cat, scale, num, price]);
        //tx.executeSql('DROP TABLE IF EXISTS TESTS');
        //tx.executeSql('DELETE FROM LOGS WHERE log = "Chayootpong"');
    })
}
function addEmployee() {

    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);

    var fname = document.getElementById('fnameA').value;
    var lname = document.getElementById('lnameA').value;
    var number = document.getElementById('empNoA').value;
    var extension = document.getElementById('exA').value;
    var email = document.getElementById('emailA').value;
    var report = document.getElementById('reportA').value;
    var office = document.getElementById('officeA').value;
    var position = document.getElementById('posA').value;
    

    /*console.log(name);
    console.log(code);
    console.log(catalog);
    console.log(scale);
    console.log(vendor);
    console.log(des);
    console.log(amount);
    console.log(price);
    console.log(msrp);*/

    db.transaction(function (tx) {
        var insert = 'INSERT INTO employees VALUES (?,?,?,?,?,?,?,?)';
        tx.executeSql(insert, [number, lname, fname, extension, email, office, report, position]);
    })
    
    setTimeout(() => window.location.reload(), 600);
}

function updateEmployee(id) {

    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);

    var fname = document.getElementById('Fname' + id).value;
    var lname = document.getElementById('Lname' + id).value;
    var olden = document.getElementById('oldnum' + id).innerHTML;
    console.log(olden)
    var employee_no = document.getElementById('codeE' + id).value;
    var position = document.getElementById('poE' + id).value;
    

    db.transaction(function (tx) {
        var update
        update = 'UPDATE employees SET lastname = ? WHERE employeeNumber = ?';
        tx.executeSql(update, [lname, olden]);
        update = 'UPDATE employees SET firstname = ? WHERE employeeNumber = ?';
        tx.executeSql(update, [fname, olden]);
        update = 'UPDATE employees SET lastname = ? WHERE employeeNumber = ?';
        tx.executeSql(update, [lname, olden]);
        update = 'UPDATE employees SET jobTitle = ? WHERE employeeNumber = ?';
        tx.executeSql(update, [position, olden]);
        update = 'UPDATE employees SET employeeNumber = ? WHERE lastname = ? AND firstname = ?';
        tx.executeSql(update, [employee_no, lname, fname]);
    })

    setTimeout(() => window.location.reload(), 600);
}

function dismissEmployee(id) {

    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);

    db.transaction(function (tx) {
        var del = 'DELETE FROM employees WHERE employeeNumber = ?';
        var number = document.getElementById('oldnum' + id).innerHTML;
        tx.executeSql(del, [number]);
    })

    setTimeout(() => window.location.reload(), 600);
}

function myFunctionEmp(value) {
    console.log(value)
    var input, filter, table, tr, td, i, txtValue, fill
    count = 0;
    if (value == 'Employee No.') fill = 0;
    else if (value == 'Name') fill = 1;
    

    console.log(fill)
    input = document.getElementById("inpt_search");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[fill];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
                count++;
            } else {
                tr[i].style.display = "none";
            }
        }
    }
    console.log(count);
}

function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("myTable");
    switching = true;
    dir = "asc";

    while (switching) {

        switching = false;
        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];

            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;

        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

function sortTableNumber(n) {

    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("myTable");
    switching = true;

    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if (Number(x.innerHTML) > Number(y.innerHTML)) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

function showEmployee() {
        var pos = "president"
        var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);
        const list = document.querySelector('#myTable');
        if(pos == "president"){
            db.transaction(function (tx) {
                tx.executeSql('SELECT * FROM employees,offices WHERE employees.officeCode = offices.officeCode AND employees.jobTitle != "President"', [], function (tx, results) {
                    var len = results.rows.length, i;
                    for (i = 0; i < len; i++) {
                        empNo = results.rows.item(i).employeeNumber
                        fname = results.rows.item(i).firstName
                        lname = results.rows.item(i).lastName
                        job = results.rows.item(i).jobTitle
                        office = results.rows.item(i).officeCode
                        country = results.rows.item(i).country
                        city = results.rows.item(i).city
                        node = `
                        <tr>
                            <td  align="center" id="oldnum`+ i + `">` + empNo + `</td>
                            <td  align="center">` + fname + " " + lname +`</td>
                            <td  align="center">` + job + `</td>
                            
                            
                            <td> <div class="product_button ml-auto mr-auto trans_200" style="display: inline-block""><a href="#update`+ i + `">Update</a></div></button>
                                
                            </td>
                            <td><div class="product_button_red ml-auto mr-auto trans_200" style="display: inline-block"><a href="#delete`+ i + `">dismiss</a></div></td>
                        </tr>
                        <div id="update`+ i + `" class="overlay">
                            <div class="popup">
                                <h2>Promote/Demote</h2>
                                <a class="close" href="#">&times;</a>
                                <h6>First Name</h6>
                                    <input type="text" id="Fname`+ i + `" value="` + fname + `">
                                <h6>Last Name</h6>
                                    <input type="text" id="Lname`+ i + `" value="` + lname + `">
                                <h6>Employee No.</h6>
                                    <input type="text" id="codeE` + i + `" value="` + empNo + `">
                                <h6>Position</h6>
                                    <input type="text" id="poE` + i + `" value="` + job + `">
                                
                                <br><br><br>
                                <div class="product_button_new ml-auto mr-auto trans_200" style="display: inline-block" onclick="updateEmployee(`+ i + `)">
                                    <a href="#">Update</a>
                                </div>
                            </div>
                        </div>
                        <div id="delete`+ i + `" class="overlay">
                            <div class="popup">
                                <h2>Dismiss Confirmation</h2>
                                <a class="close" href="#">&times;</a>
                                    <div class="product_button" style="display: inline-block">
                                        <a href="#">Cancel</a>
                                    </div>
                                    <div class="product_button_red" style="display: inline-block" onclick="dismissEmployee(`+ i + `)">
                                        <a href="#">Confirm</a>
                                    </div>
                            </div>
                        </div>
                        `;
                        list.insertAdjacentHTML('beforeend', node)
                    }
                }, null);
            });
        }
        else if(pos == "vp"){
            db.transaction(function (tx) {
                tx.executeSql('SELECT * FROM employees,offices WHERE employees.officeCode = offices.officeCode AND employees.jobTitle != "President" AND employees.jobTitle NOT LIKE "VP%" ', [], function (tx, results) {
                    var len = results.rows.length, i;
                    for (i = 0; i < len; i++) {
                        empNo = results.rows.item(i).employeeNumber
                        fname = results.rows.item(i).firstName
                        lname = results.rows.item(i).lastName
                        job = results.rows.item(i).jobTitle
                        office = results.rows.item(i).officeCode
                        country = results.rows.item(i).country
                        city = results.rows.item(i).city
                        node = `
                        <tr>
                            <td  align="center" id="oldnum`+ i + `">` + empNo + `</td>
                            <td  align="center">` + fname + " " + lname +`</td>
                            <td  align="center">` + job + `</td>
                            
                            
                            <td> <div class="product_button ml-auto mr-auto" style="display: inline-block ><a href="#update`+ i + `">update</a></div></button></td>
                            <td><div class="product_button_red ml-auto mr-auto trans_200" style="display: inline-block"><a href="#delete`+ i + `">dismiss</a></div>
                             </td>
                        </tr>
                        <div id="update`+ i + `" class="overlay">
                            <div class="popup">
                                <h2>Promote/Demote</h2>
                                <a class="close" href="#">&times;</a>
                                <h6>First Name</h6>
                                    <input type="text" id="Fname`+ i + `" value="` + fname + `">
                                <h6>Last Name</h6>
                                    <input type="text" id="Lname`+ i + `" value="` + lname + `">
                                <h6>Employee No.</h6>
                                    <input type="text" id="codeE` + i + `" value="` + empNo + `">
                                <h6>Position</h6>
                                    <input type="text" id="poE` + i + `" value="` + job + `">
                                
                                <br><br><br>
                                <div class="product_button_new ml-auto mr-auto trans_200" style="display: inline-block" onclick="updateEmployee(`+ i + `)">
                                    <a href="#">Update</a>
                                </div>
                                
                            </div>
                        </div>
                        <div id="delete`+ i + `" class="overlay">
                            <div class="popup">
                                <h2>Dismiss Confirmation</h2>
                                <a class="close" href="#">&times;</a>
                                    <div class="product_button" style="display: inline-block">
                                        <a href="#">Cancel</a>
                                    </div>
                                    <div class="product_button_red" style="display: inline-block" onclick="dismissEmployee(`+ i + `)">
                                        <a href="#">Confirm</a>
                                    </div>
                            </div>
                        </div>
                        `;
                        list.insertAdjacentHTML('beforeend', node)
                    }
                }, null);
            });
        }
        else if(pos == "manager"){
            db.transaction(function (tx) {
                tx.executeSql('SELECT * FROM employees,offices WHERE employees.officeCode = offices.officeCode AND employees.jobTitle != "President" AND employees.jobTitle NOT LIKE "VP%" AND employees.jobTitle NOT LIKE "%Manager%"', [], function (tx, results) {
                    var len = results.rows.length, i;
                    for (i = 0; i < len; i++) {
                        empNo = results.rows.item(i).employeeNumber
                        fname = results.rows.item(i).firstName
                        lname = results.rows.item(i).lastName
                        job = results.rows.item(i).jobTitle
                        office = results.rows.item(i).officeCode
                        country = results.rows.item(i).country
                        city = results.rows.item(i).city
                        node = `
                        <tr>
                            <td  align="center" id="oldnum`+ i + `">` + empNo + `</td>
                            <td  align="center">` + fname + " " + lname +`</td>
                            <td  align="center">` + job + `</td>
                            
                            
                            <td> <div class="product_button ml-auto mr-auto" style="display: inline-block" ><a href="#update`+ i + `">update</a></div></button></td>
                            <td><div class="product_button_red ml-auto mr-auto trans_200" style="display: inline-block"><a href="#delete`+ i + `">dismiss</a></div>
                             </td>
                        </tr>
                        <div id="update`+ i + `" class="overlay">
                            <div class="popup">
                                <h2>Promote/Demote</h2>
                                <a class="close" href="#">&times;</a>
                                <h6>First Name</h6>
                                    <input type="text" id="Fname`+ i + `" value="` + fname + `">
                                <h6>Last Name</h6>
                                    <input type="text" id="Lname`+ i + `" value="` + lname + `">
                                <h6>Employee No.</h6>
                                    <input type="text" id="codeE` + i + `" value="` + empNo + `">
                                <h6>Position</h6>
                                    <input type="text" id="poE` + i + `" value="` + job + `">
                                
                                <br><br><br>
                                <div class="product_button_new ml-auto mr-auto trans_200" style="display: inline-block" onclick="updateEmployee(`+ i + `)">
                                    <a href="#">Update</a>
                                </div>
                                
                            </div>
                        </div>
                        <div id="delete`+ i + `" class="overlay">
                            <div class="popup">
                                <h2>Dismiss Confirmation</h2>
                                <a class="close" href="#">&times;</a>
                                    <div class="product_button" style="display: inline-block">
                                        <a href="#">Cancel</a>
                                    </div>
                                    <div class="product_button_red" style="display: inline-block" onclick="dismissEmployee(`+ i + `)">
                                        <a href="#">Confirm</a>
                                    </div>
                            </div>
                        </div>
                        `;
                        list.insertAdjacentHTML('beforeend', node)
                    }
                }, null);
            });
        }
        else if(pos == "sale"){
            db.transaction(function (tx) {
                tx.executeSql('SELECT * FROM employees', [], function (tx, results) {
                    var len = results.rows.length, i;
                    for (i = 0; i < len; i++) {
                        empNo = results.rows.item(i).employeeNumber
                        fname = results.rows.item(i).firstName
                        lname = results.rows.item(i).lastName
                        job = results.rows.item(i).jobTitle
                        office = results.rows.item(i).officeCode
                        
                        node = `
                        <tr>
                            <td  align="center" id="oldnum`+ i + `">` + empNo + `</td>
                            <td  align="center">` + fname + " " + lname +`</td>
                            <td  align="center">` + job + `</td>
                            
                            
                            <td> <div class="product_button ml-auto mr-auto" style="display: inline-block" ><a href="#">Not Allowed</a></div></button></td>
                            <td><div class="product_button_red ml-auto mr-auto trans_200" style="display: inline-block"><a href="#">Not Allowed</a></div>
                             </td>
                        </tr>
                        <div id="update`+ i + `" class="overlay">
                            <div class="popup">
                                <h2>Promote/Demote</h2>
                                <a class="close" href="#">&times;</a>
                                <h6>First Name</h6>
                                    <input type="text" id="Fname`+ i + `" value="` + fname + `">
                                <h6>Last Name</h6>
                                    <input type="text" id="Lname`+ i + `" value="` + lname + `">
                                <h6>Employee No.</h6>
                                    <input type="text" id="codeE` + i + `" value="` + empNo + `">
                                <h6>Position</h6>
                                    <input type="text" id="poE` + i + `" value="` + job + `">
                                
                                <br><br><br>
                                <div class="product_button_new ml-auto mr-auto trans_200" style="display: inline-block" onclick="updateEmployee(`+ i + `)">
                                    <a href="#">Update</a>
                                </div>
                                
                            </div>
                        </div>
                        <div id="delete`+ i + `" class="overlay">
                            <div class="popup">
                                <h2>Dismiss Confirmation</h2>
                                <a class="close" href="#">&times;</a>
                                    <div class="product_button" style="display: inline-block">
                                        <a href="#">Cancel</a>
                                    </div>
                                    <div class="product_button_red" style="display: inline-block" onclick="dismissEmployee(`+ i + `)">
                                        <a href="#">Confirm</a>
                                    </div>
                            </div>
                        </div>
                        `;
                        list.insertAdjacentHTML('beforeend', node)
                    }
                }, null);
            });
        }
}



function test() {
    console.log("TEST!!!")
}