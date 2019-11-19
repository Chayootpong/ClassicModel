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
function addPromotion() {

    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);

    var code = document.getElementById('pcode').value;
    var name = document.getElementById('pname').value;
    var discount = document.getElementById('pdis').value;
    var start_date = document.getElementById('psd').value;
    var end_date = document.getElementById('ped').value;
    console.log(code);
    console.log(name);
    console.log(start_date);
    console.log(end_date);
    db.transaction(function (tx) {
        
        var insert = "INSERT INTO promotions (name, code, discount, startDate, endDate) VALUES (?,?,?,?,?)";
        tx.executeSql('CREATE TABLE IF NOT EXISTS promotions (name, code UNIQUE, discount, startDate, endDate)');
        tx.executeSql(insert, [name, code, discount, start_date, end_date]);
        
    })
    setTimeout(() => window.location.reload(), 600);
}


function deletePromotion(id) {

    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);

    db.transaction(function (tx) {
        var del = 'DELETE FROM promotions WHERE code = ?';
        var number = document.getElementById('oldcode' + id).innerHTML;
        tx.executeSql(del, [number]);
    })

    setTimeout(() => window.location.reload(), 600);
}

function myFunctionPro(value) {
    console.log(value)
    var input, filter, table, tr, td, i, txtValue, fill
    count = 0;
    if (value == 'Name') fill = 1;
    else if (value == 'Code') fill = 0;
    

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

function showPromotion() {
        var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);
        const list = document.querySelector('#myTable');
        db.transaction(function (tx) {
                tx.executeSql('SELECT * FROM promotions', [], function (tx, results) {
                    var len = results.rows.length, i;
                    for (i = 0; i < len; i++) {
                        procode = results.rows.item(i).code
                        proname = results.rows.item(i).name
                        prodis = results.rows.item(i).discount
                        start = results.rows.item(i).startDate
                        end = results.rows.item(i).endDate
                        console.log(procode);
                        node = `
                        <tr>
                            <td  align="center" id="oldcode`+ i + `">` + procode + `</td>
                            <td  align="center">` + proname +`</td>
                            <td  align="center">` + prodis +`</td>
                            <td  align="center">` + start +`</td>
                            <td  align="center">` + end + `</td>
                            <td><div class="product_button_red ml-auto mr-auto trans_200" style="display: inline-block"><a href="#delete`+ i + `">ERASE</a></div></td>
                            
                        </tr>
                        <div id="delete`+ i + `" class="overlay">
                            <div class="popup">
                                <h2>Confirmation</h2>
                                <a class="close" href="#">&times;</a>
                                    <div class="product_button" style="display: inline-block">
                                        <a href="#">Cancel</a>
                                    </div>
                                    <div class="product_button_red" style="display: inline-block" onclick="deletePromotion(`+ i + `)">
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



function test() {
    console.log("TEST!!!")
}