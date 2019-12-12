//CHECK DIGITS
$('span[id ^= "amountC"]').keypress(function (e) {
    if (isNaN(String.fromCharCode(e.which))) e.preventDefault();
});

$('span[id ^= "orderC"]').keypress(function (e) {
    if (isNaN(String.fromCharCode(e.which))) e.preventDefault();
});

$('.service').click(function (e) {
    e.preventDefault();
});

function createMBSPTable() {

    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);

    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM customers', [], function (tx, results) {

            var len = results.rows.length;
            var insert = "INSERT INTO MBSP VALUES (?,?)";           

            tx.executeSql('CREATE TABLE IF NOT EXISTS MBSP (code INTEGER UNIQUE, point INTEGER)');

            for (var i = 0; i < len; i++) {

                var code = parseInt(results.rows.item(i).customerNumber)
                tx.executeSql(insert, [code, 0]);
            }
        }, null);
    })
}

function addMBSP() { //FROM OLD DATA

    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);

    db.transaction(function (tx) {
        tx.executeSql('SELECT O.customerNumber, SUM(OD.priceEach * OD.quantityOrdered) AS totalPoint FROM orderdetails AS OD, orders AS O WHERE O.orderNumber = OD.orderNumber GROUP BY O.customerNumber', [], function (tx, results) {

            var len = results.rows.length;
            var update = 'UPDATE MBSP SET point = ? WHERE code = ?';

            for (var i = 0; i < len; i++) {

                var point = parseInt((results.rows.item(i).totalPoint) * 3 / 10 )
                var code = results.rows.item(i).customerNumber
                tx.executeSql(update, [point, code]);
            }
        }, null);
    })
}

function delMBSP() { //FROM OLD DATA

    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);

    db.transaction(function (tx) {
        tx.executeSql('DROP TABLE IF EXISTS MBSP');
    })
}

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

function addProduct() {

    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);

    var name = document.getElementById('nameA').value;
    var code = document.getElementById('codeA').value;
    var catalog = document.getElementById('catalogA').value;
    var scale = document.getElementById('scaleA').value;
    var vendor = document.getElementById('vendorA').value;
    var des = document.getElementById('desA').value;
    var amount = document.getElementById('amountA').value;
    var price = document.getElementById('priceA').value;
    var msrp = document.getElementById('msrpA').value;

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
        var insert = 'INSERT INTO products VALUES (?,?,?,?,?,?,?,?,?)';
        tx.executeSql(insert, [code, name, catalog, scale, vendor, des, amount, price, msrp]);
    })

    setTimeout(() => window.location.reload(), 600);
}

function updateProduct(id) {

    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);

    var name = document.getElementById('nameP' + id).value;
    var oldCode = document.getElementById('codeOP' + id).innerHTML;
    var code = document.getElementById('codeP' + id).value;
    var catalog = document.getElementById('catalogP' + id).value;
    var scale = document.getElementById('scaleP' + id).value;
    var vendor = document.getElementById('vendorP' + id).value;
    var des = document.getElementById('desP' + id).value;
    var amount = document.getElementById('amountP' + id).value;
    var price = document.getElementById('priceP' + id).value;
    var msrp = document.getElementById('msrpP' + id).value;

    db.transaction(function (tx) {
        var update
        update = 'UPDATE products SET productName = ? WHERE productCode = ?';
        tx.executeSql(update, [name, oldCode]);
        update = 'UPDATE products SET productLine = ? WHERE productCode = ?';
        tx.executeSql(update, [catalog, oldCode]);
        update = 'UPDATE products SET productScale = ? WHERE productCode = ?';
        tx.executeSql(update, [scale, oldCode]);
        update = 'UPDATE products SET productVendor = ? WHERE productCode = ?';
        tx.executeSql(update, [vendor, oldCode]);
        update = 'UPDATE products SET productDescription = ? WHERE productCode = ?';
        tx.executeSql(update, [des, oldCode]);
        update = 'UPDATE products SET quantityInStock = quantityInStock + ? WHERE productCode = ?';
        tx.executeSql(update, [amount, oldCode]);
        update = 'UPDATE products SET buyPrice = ? WHERE productCode = ?';
        tx.executeSql(update, [price, oldCode]);
        update = 'UPDATE products SET MSRP = ? WHERE productCode = ?';
        tx.executeSql(update, [msrp, oldCode]);
        update = 'UPDATE products SET productCode = ? WHERE productName = ?';
        tx.executeSql(update, [code, name]);
    })

    setTimeout(() => window.location.reload(), 600);
}

function deleteProduct(id) {

    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);

    db.transaction(function (tx) {
        var del = 'DELETE FROM products WHERE productCode = ?';
        var code = document.getElementById('codeOP' + id).innerHTML;
        tx.executeSql(del, [code]);
    })

    setTimeout(() => window.location.reload(), 600);
}

function createLot(type, id)
{
    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);
    var lotNumber, productCode, amount

    if (type == 'A') {
        lotNumber = document.getElementById("lotA").value;
        productCode = document.getElementById("codeA").value;
        amount = document.getElementById("amountA").value;
    }

    else if (type == 'P'){ 
        lotNumber = document.getElementById("lotP").value;
        productCode = document.getElementById("codeP" + id).value;
        amount = document.getElementById("amountP" + id).value;
    }

    console.log(lotNumber)
    console.log(productCode)
    console.log(amount)
    
    db.transaction(function (tx) {
        var insert = "INSERT INTO lots (lotNumber, productCode, date, amount, employeeNumber) VALUES (?,?,DATETIME('now','localtime'),?,'')";
        tx.executeSql('CREATE TABLE IF NOT EXISTS lots (lotNumber UNIQUE, productCode, date, amount INTEGER, employeeNumber)');
        tx.executeSql(insert, [lotNumber, productCode, amount]);
    })
}

function showHistory(name) {

    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);

    db.transaction(function (tx) {
        tx.executeSql('SELECT OD.orderNumber, OD.productCode, OD.quantityOrdered, OD.priceEach, O.orderDate, O.requiredDate, O.shippedDate, O.status FROM orders O, orderdetails OD, customers CT WHERE O.customerNumber = CT.customerNumber AND CT.customerName = "' + name + '" AND O.orderNumber = OD.orderNumber', [], function (tx, results) {
            const list = document.querySelector('#diva');
            node = `<div id="history` + name + `" class="overlay">
                    <div class="popup">
                    <h2>History</h2>
                    <h4>Result: ` + results.rows.length + ` item(s) </h4>
                        <a class="close" href="#">&times;</a>
                    <div class="limiter">
				            <div class="table100 ver1">					            
					            <div class="wrap-table100-nextcols js-pscroll">
						            <div class="table100-nextcols">
							            <table>
								            <thead>
									            <tr class="row100 head">
                                                    <th class="cell100 column1">NO.</th>
										            <th class="cell100 column2">Order NO.</th>
										            <th class="cell100 column3">Product Code</th>
										            <th class="cell100 column4">Amount</th>
										            <th class="cell100 column5">Price</th>
										            <th class="cell100 column6">Total</th>
                                                    <th class="cell100 column7">Order Date</th>
                                                    <th class="cell100 column8">Required Date</th>
                                                    <th class="cell100 column9">Shipped Date</th>
                                                    <th class="cell100 column10">Status</th>
									            </tr>
								            </thead>
								            <tbody>`;

            for (var i = 0; i < results.rows.length; i++) {
                
                node += `             
				<tr class="row100 body">
                    <td class="cell100 column1">`+ (i + 1) + `</td>
					<td class="cell100 column2">` + results.rows.item(i).orderNumber + `</td>
					<td class="cell100 column3">` + results.rows.item(i).productCode + `</td>
					<td class="cell100 column4">` + results.rows.item(i).quantityOrdered + `</td>
					<td class="cell100 column5">` + results.rows.item(i).priceEach + ` $</td>
					<td class="cell100 column6">` + (results.rows.item(i).quantityOrdered * results.rows.item(i).priceEach).toFixed(2) + ` $</td>
					<td class="cell100 column7">` + results.rows.item(i).orderDate + `</td>
					<td class="cell100 column8">` + results.rows.item(i).requiredDate + `</td>
					<td class="cell100 column9">` + results.rows.item(i).shippedDate + `</td>
					<td class="cell100 column10">` + results.rows.item(i).status + `</td>
				</tr>`;                                                                                                                                                                                                                                                                                              
            }

            node += `</tbody>
							  </table>
				            </div>
			            </div>
		            </div>
	            </div>
                    </div>
                </div>`;

            list.insertAdjacentHTML('afterbegin', node)

        }, null);
    });
    
    setTimeout(function () { window.location = '#history' + name }, 100);
}

/*function createCustomersaddressesTable()
{
    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS customersaddresses (customerID, addressLine1, addressLine2, city, state, postalCode, country)');
    })
}*/

function showAddress(id) {
    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);
    db.transaction(function (tx) {      
        tx.executeSql('SELECT CD.addressLine1, CD.addressLine2, CD.city, CD.state, CD.postalCode, CD.country, CD.customerID FROM customersaddresses AS CD, customers AS C WHERE CD.customerID = C.customerNumber AND C.customerNumber = ?', [id], function (tx, results) {
            const list = document.querySelector('#diva');
            console.log('SUS')
            node = `<div id="addresses` + id + `" class="overlay">
                    <div class="popup">
                    <h2>Address</h2>
                    <h4>Result: ` + results.rows.length + ` item(s) </h4>
                        <a class="close" href="#">&times;</a>
                    <div class="limiter">
				            <div class="table100 ver1">					            
					            <div class="wrap-table100-nextcols js-pscroll">
						            <div class="table100-nextcols">
							            <table>
								            <thead>
                                                <tr class="row100 head">
                                                    <th class="cell100 column1">NO.</th>
                                                    <th class="cell100 column11">Address Line 1</th>
										            <th class="cell100 column11">Address Line 2</th>
										            <th class="cell100 column12">City</th>
										            <th class="cell100 column12">State</th>
										            <th class="cell100 column12">Postal</th>
                                                    <th class="cell100 column12">Country</th>
                                                    <th class="cell100 column12"></th>
									            </tr>
								            </thead>
								            <tbody>`;

            for (var i = 0; i < results.rows.length; i++) {               
                node += `             
                <tr class="row100 body">
                    <td class="cell100 column1">` + (i + 1) + `</td>
					<td class="cell100 column11" id="addr1`+i+`">` + results.rows.item(i).addressLine1 + `</td>
					<td class="cell100 column12" id="addr2`+i+`">` + results.rows.item(i).addressLine2 + `</td>
					<td class="cell100 column12" id="city`+i+`">` + results.rows.item(i).city + `</td>
					<td class="cell100 column12" id="state`+i+`">` + results.rows.item(i).state + `</td>
                    <td class="cell100 column12" id="postal`+i+`">` + results.rows.item(i).postalCode + `</td>
                    <td class="cell100 column12" id="country`+i+`">` + results.rows.item(i).country + `</td>
                    <td class="cell100 column12"><div class="product_button_short_red ml-auto mr-auto trans_200" style="display: inline-block" onclick="delAddress(`+i+`)"><a href="#">X</a></div></td>
				</tr>`;                                                                                                                                                                                                                                                                                              
            }

            node += `
            <tr class="row100 body">
                <td class="cell100 column1">Add @</td>
                <td class="cell100 column11"><input type="text" id="addr1"></td>
                <td class="cell100 column11"><input type="text" id="addr2"></td>
                <td class="cell100 column12"><input type="text" id="city"></td>
                <td class="cell100 column12"><input type="text" id="state"></td>
                <td class="cell100 column12"><input type="text" id="postal"></td>
                <td class="cell100 column12"><input type="text" id="country"></td>
                <td class="cell100 column12"><div class="product_button_short ml-auto mr-auto trans_200" style="display: inline-block" onclick="addAddress(`+id+`)"><a href="#">add</a></div></td>
				</tr>
            </tbody>
							  </table>
				            </div>
			            </div>
		            </div>
	            </div>
                    </div>
                </div>`;

            list.insertAdjacentHTML('afterbegin', node)

        }, null);
    });
    
    setTimeout(function () { window.location = '#addresses' + id }, 100);
}

function addAddress(cid)
{
    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);
    var addr1 = document.getElementById('addr1').value;
    var addr2 = document.getElementById('addr2').value;
    var city = document.getElementById('city').value;
    var state = document.getElementById('state').value;
    var postal = document.getElementById('postal').value;
    var country = document.getElementById('country').value;
    cid = parseInt(cid).toString()

    console.log(cid);
    console.log(addr1);
    console.log(addr2);
    console.log(city);
    console.log(state);
    console.log(postal);
    console.log(country);   

    db.transaction(function (tx) {
        var insert = "INSERT INTO customersaddresses (customerID, addressLine1, addressLine2, city, state, postalCode, country) VALUES (?,?,?,?,?,?,?)";
        tx.executeSql('CREATE TABLE IF NOT EXISTS customersaddresses (customerID, addressLine1, addressLine2, city, state, postalCode, country)');
        tx.executeSql(insert, [cid, addr1, addr2, city, state, postal, country]);
    })

    setTimeout(() => window.location.reload(), 600);
}

function createAddressTable() {

    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS customersaddresses (customerID, addressLine1, addressLine2, city, state, postalCode, country)');
    })

}

function delAddress(cid)
{
    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);

    var addr1 = document.getElementById('addr1' + cid).innerHTML;
    var addr2 = document.getElementById('addr2' + cid).innerHTML;
    var city = document.getElementById('city' + cid).innerHTML;
    var state = document.getElementById('state' + cid).innerHTML;
    var postal = document.getElementById('postal' + cid).innerHTML;
    var country = document.getElementById('country' + cid).innerHTML;

    console.log(cid);
    console.log(addr1);
    console.log(addr2);
    console.log(city);
    console.log(state);
    console.log(postal);
    console.log(country);

    db.transaction(function (tx) {
        tx.executeSql('DELETE FROM customersaddresses WHERE addressLine1 = "' + addr1 + '" AND addressLine2 = "' + addr2 + '" AND city = "' + city + '" AND state = "' + state + '" AND postalCode = "' + postal + '" AND country = "' + country + '"')
    })

    setTimeout(() => window.location.reload(), 600);
}

function myFunction(value) {

    if (value == 'Shop') fill = 1;
    else if (value == 'Name') fill = 2;

    var input = document.getElementById('inpt_search').value.toUpperCase();

    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);

    console.log(input);
    //console.log(document.getElementById("shopM1").innerHTML.toUpperCase());

    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM customers', [], function (tx, results) {

            var count = results.rows.length;

            for (var i = 0; i < count; i++) {

                if (fill == 1 && document.getElementById("shopM" + i).innerHTML.toUpperCase().indexOf(input) > -1) document.getElementById("inner" + i).style.display = "";
                else if (fill == 2 && document.getElementById("nameM" + i).innerHTML.toUpperCase().indexOf(input) > -1) document.getElementById("inner" + i).style.display = "";
                else document.getElementById("inner" + i).style.display  = "none";
            }

        }, null);
    });
}

function myFunction2(value) {

    if (value == 'Name') fill = 1;
    else if (value == 'Code') fill = 2;
    else if (value == 'Category') fill = 3;
    else if (value == 'Scale') fill = 4;
    else if (value == 'Vendor') fill = 5;

    var input = document.getElementById('inpt_search').value.toUpperCase();

    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);

    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM products', [], function (tx, results) {

            var count = results.rows.length;

            for (var i = 0; i < count; i++) {

                if (fill == 1 && document.getElementById("nameP" + i).value.toUpperCase().indexOf(input) > -1) document.getElementById("inner" + i).style.display = "";
                else if (fill == 2 && document.getElementById("codeP" + i).value.toUpperCase().indexOf(input) > -1) document.getElementById("inner" + i).style.display = "";
                else if (fill == 3 && document.getElementById("catt" + i).innerHTML.toUpperCase().indexOf(input) > -1) document.getElementById("inner" + i).style.display = "";
                else if (fill == 4 && document.getElementById("sc" + i).innerHTML.toUpperCase() == input) document.getElementById("inner" + i).style.display = "";
                else if (fill == 5 && document.getElementById("vendorP" + i).value.toUpperCase().indexOf(input) > -1) document.getElementById("inner" + i).style.display = "";
                else document.getElementById("inner" + i).style.display = "none";
            }

        }, null);
    });
}

function myFunction3(value) {

    if (value == 'Name') fill = 1;
    else if (value == 'Code') fill = 2;
    else if (value == 'Category') fill = 3;
    else if (value == 'Scale') fill = 4;
    else if (value == 'Vendor') fill = 5;

    var input = document.getElementById('inpt_search').value.toUpperCase();

    console.log(document.getElementById("nameOP1"))

    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);

    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM products', [], function (tx, results) {

            var count = results.rows.length;

            for (var i = 0; i < count; i++) {

                if (fill == 1 && document.getElementById("nameOP" + i).innerHTML.toUpperCase().indexOf(input) > -1) document.getElementById("inner" + i).style.display = "";
                else if (fill == 2 && document.getElementById("codeOP" + i).innerHTML.toUpperCase().indexOf(input) > -1) document.getElementById("inner" + i).style.display = "";
                else if (fill == 3 && document.getElementById("catt" + i).innerHTML.toUpperCase().indexOf(input) > -1) document.getElementById("inner" + i).style.display = "";
                else if (fill == 4 && document.getElementById("sc" + i).innerHTML.toUpperCase() == input) document.getElementById("inner" + i).style.display = "";
                else if (fill == 5 && document.getElementById("vendorP" + i).value.toUpperCase().indexOf(input) > -1) document.getElementById("inner" + i).style.display = "";
                else document.getElementById("inner" + i).style.display = "none";
            }

        }, null);
    });
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

function showSearching() {

    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);
    const list = document.querySelector('#diva');
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM products', [], function (tx, results) {
            var len = results.rows.length, i;
            for (i = 0; i < len; i++) {
                var pname = results.rows.item(i).productName
                var pcode = results.rows.item(i).productCode
                var pcat = results.rows.item(i).productLine
                var pscale = results.rows.item(i).productScale
                //var num = results.rows.item(i).quantityInStock
                var price = results.rows.item(i).buyPrice
                var des = results.rows.item(i).productDescription
                var node = `
                <div id="popup`+ i + `" class="overlay">
                    <div class="popup">
                    <h2>Product Info</h2>
                        <a class="close" href="#">&times;</a>                                                                                 
                            <div align="center"><h4>` + pname + `</h4><div>
                            <div class="product_image" align="center"><img src="images/lambo.jpg" width="400px" length="400px"><div>
                            <div align="left" style="font-family: poppins; font-size: 15px">`+ "Code: &emsp;&ensp;&nbsp;&emsp;&ensp;&ensp;"  + pcode + `<div>
                            <div align="left">` + "Category: &emsp;&ensp;&nbsp;" + pcat + `<div>
                            <div align="left">` + "Scale: &emsp;&ensp;&nbsp;&ensp;&ensp;&ensp;&ensp;" + pscale + `<div>
                            <div align="left">` + " Detail: &emsp;&ensp;&nbsp;&emsp;&ensp;&nbsp;" + des + `<div>
                            <div align="left">` + "Price: &emsp;&ensp;&nbsp;&ensp;&ensp;&ensp;&ensp;&nbsp;" + "$" + price + `<div>
                        </div>
                </div>`;
                list.insertAdjacentHTML('beforeend', node)
            }
        }, null);
    });
}

function showCatalog() {
    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);
    let msg = "";
    const list = document.querySelector('#div1');

    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM products', [], function (tx, results) {
            var len = results.rows.length, i;
            for (i = 0; i < len; i++) {
                msg = results.rows.item(i).productName
                msg2 = results.rows.item(i).productCode
                msg3 = results.rows.item(i).productLine
                msg4 = results.rows.item(i).productScale
                vendor = results.rows.item(i).productVendor
                price = results.rows.item(i).buyPrice
                if (msg4 == "1:10") {
                    scale = "oneo";
                } else if (msg4 == "1:12") {
                    scale = "onetwo";
                } else if (msg4 == "1:18") {
                    scale = "oneeight";
                } else if (msg4 == "1:24") {
                    scale = "twofour";
                } else if (msg4 == "1:32") {
                    scale = "threetwo";
                } else if (msg4 == "1:50") {
                    scale = "fiveo";
                } else if (msg4 == "1:72") {
                    scale = "seventwo";
                } else {
                    scale = "sevenoo";
                }
                if (vendor == "Welly Diecast Productions") {
                    vendor_fill = "wdp";
                } else if (vendor == "Unimax Art Galleries") {
                    vendor_fill = "uag";
                } else if (vendor == "Studio M Art Models") {
                    vendor_fill = "sma";
                } else if (vendor == "Second Gear Diecast") {
                    vendor_fill = "sgd";
                } else if (vendor == "Red Start Diecast") {
                    vendor_fill = "rsd";
                } else if (vendor == "Motor City Art Classics") {
                    vendor_fill = "mca";
                } else if (vendor == "Min Lin Diecast") {
                    vendor_fill = "mld";
                } else if (vendor == "Highway 66 Mini Classics") {
                    vendor_fill = "hmc";
                } else if (vendor == "Gearbox Collectibles") {
                    vendor_fill = "gc";
                } else if (vendor == "Exoto Designs") {
                    vendor_fill = "ed";
                } else if (vendor == "Classic Metal Creations") {
                    vendor_fill = "cmc";
                } else if (vendor == "Carousel DieCast Legends") {
                    vendor_fill = "cdl";
                } else {
                    vendor_fill = "asd";
                }
                console.log(msg4);
                console.log(vendor_fill);
                list.innerHTML += `
                <div class="product grid-item`+ " " + scale + " " + vendor_fill + `">
                    <div class="product_inner">                    
                        <div class="product_image">
                            <img src="images/lambo.jpg" alt="">                                                          
                                <div class="product_tag">` + msg4 + `</div>
                            </div>
                            <div class="product_content text-center">
                                <div class="text_box">
                                    <div class="product_title" id="XXXX" ><a href="product.html">` + msg + `</a></div>
                            </div>
                            <div>
                            <ul align='left' >
                                <li><span>Code: </span> 
                                ` + msg2 + ` </li>
                                <li><span>Category: </span> 
                                ` + msg3 + ` </li>
                                <li><span>Vendor: </span> 
                                ` + vendor + ` </li>
                                <li class="product_price"> 
                                $`  + price + ` </li>
                            
                            </ul>                            
                            </div>
                        </div>
                    </div>
                </div>`;
            }

        }, null);
    });
}

function addCustomer() {

    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);

    var cusno = document.getElementById('customernumber').value;
    var cusname = document.getElementById('customername').value;
    var fname = document.getElementById('firstname').value;
    var lname = document.getElementById('lastname').value;
    var phone = document.getElementById('phone').value;
    var addr1 = document.getElementById('addressLine1').value;
    var addr2 = document.getElementById('addressLine2').value;
    var city = document.getElementById('city').value;
    var state = document.getElementById('state').value;
    var pc = document.getElementById('postalcode').value;
    var coun = document.getElementById('country').value;
    var empno = document.getElementById('emp_no').value;
    var crlimit = document.getElementById('creditlimit').value;

    /*console.log(cusno);
    console.log(cusname);
    console.log(fname);
    console.log(lname);
    console.log(phone);
    console.log(addr1);
    console.log(addr2);
    console.log(city);
    console.log(state);
    console.log(pc);
    console.log(coun);
    console.log(empno);
    console.log(crlimit);*/

    db.transaction(function (tx) {
        var insert = 'INSERT INTO customers VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)';
        var insertx = "INSERT INTO MBSP VALUES (?,?)";
        tx.executeSql(insert, [cusno, cusname, fname, lname, phone, addr1, addr2, city, state, pc, coun, empno, crlimit]);       
        tx.executeSql(insertx, [cusno, 0]);
    })

    setTimeout(() => window.location.reload(), 600);
}

function addPromotion() {

    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);

    var code = document.getElementById('pcode').value;
    var name = document.getElementById('pname').value;
    var discount = document.getElementById('pdis').value;
    var amount = document.getElementById('psd').value;
    var expiredDate = document.getElementById('ped').value;
    console.log(code);
    console.log(name);
    console.log(amount);
    console.log(expiredDate);
    db.transaction(function (tx) {

        var insert = "INSERT INTO promotions (name, code, discount, amount, expiredDate) VALUES (?,?,?,?,?)";
        tx.executeSql('CREATE TABLE IF NOT EXISTS promotions (name, code UNIQUE, discount, amount, expiredDate)');
        tx.executeSql(insert, [name, code, discount, amount, expiredDate]);

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
                pamount = results.rows.item(i).amount
                end = results.rows.item(i).expiredDate
                console.log(procode);
                node = `
                        <tr>
                            <td  align="center" id="oldcode`+ i + `">` + procode + `</td>
                            <td  align="center">` + proname + `</td>
                            <td  align="center">` + prodis + `</td>
                            <td  align="center">` + pamount + `</td>
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

function showEmployee() {
    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM loginSession', [], function (tx, results) {
            epos = results.rows.item(0).jobTitle
            console.log(epos);
            //var epos = "President";
    const list = document.querySelector('#myTable');
    if(epos == "President"){
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
                        
                        
                        <td> <div class="product_button ml-auto mr-auto "><a href="#update`+ i + `">Update</a></div></button>
                            
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
    else if(epos == "VP Sales"){
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
                        
                        
                        <td> <div class="product_button ml-auto mr-auto "><a href="#update`+ i + `">Update</a></div></button>
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
    else if(epos == "VP Marketing"){
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
                        
                        
                        <td> <div class="product_button ml-auto mr-auto "><a href="#update`+ i + `">Update</a></div></button>
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
    else if(epos == "Sales Manager (APAC)"){
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
    else if(epos == "Sales Manager (EMEA)"){
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
    else if(epos == "Sales Manager (NA)"){
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
    else if(pos == "Sales Rep"){
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
        }, null);
     });
}


function test() {
    console.log("TEST!!!")
    console.log(randomNumber())
}

function alertCheck(text) {  
    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM loginSession', [], function (tx, results) {
            var jTitle = results.rows.item(0).jobTitle;
            console.log(jTitle)
            if (jTitle == "President") this.location.href = text + '.html'
            else if (jTitle == "VP Sales" & (text == "Finding" || text == "Membership" || text == "Management" || text == "Stocking")) this.location.href = text + '.html'
            else if (jTitle == "VP Marketing" & (text == "Finding" || text == "Promotion" || text == "Management")) this.location.href = text + '.html'
            else if (jTitle == "Sales Manager (APAC)" & (text == "Finding" || text == "Membership" || text == "Management" || text == "Stocking" || text == "Order_Status" || text == "Payment" || text == "Cart")) this.location.href = text + '.html'
            else if (jTitle == "Sales Manager (EMEA)" & (text == "Finding" || text == "Membership" || text == "Management" || text == "Stocking" || text == "Order_Status" || text == "Payment" || text == "Cart")) this.location.href = text + '.html'
            else if (jTitle == "Sales Manager (NA)" & (text == "Finding" || text == "Membership" || text == "Management" || text == "Stocking" || text == "Order_Status" || text == "Payment" || text == "Cart")) this.location.href = text + '.html'
            else if (jTitle == "Sales Rep" & (text == "Finding" || text == "Membership" || text == "Management" || text == "Stocking" || text == "Order_Status" || text == "Payment" || text == "Cart" || text == "Register")) this.location.href = text + '.html'
            else alert("Access denied, your position is not permit.")
        }, null);
    });
}

function clearAllPromotion() {
    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql('DROP TABLE IF EXISTS promotions');
    })
    setTimeout(() => window.location.reload(), 600);
}

function showOrderStatus(orderNum){

    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);

    db.transaction(function (tx) {
        tx.executeSql('SELECT O.status FROM orders O WHERE O.orderNumber = "'+orderNum+'"', [], function (tx, results) {
            const list = document.querySelector('#theOrder');
            node = `<div id="order` + orderNum + `" class="overlay">
                    <div class="popup">
                    <h2>Order Number : `+orderNum+`</h2>
                    <a class="close" href="#">&times;</a>
                    <h4>Current Status : <div style="color: green">`+results.rows.item(0).status+`</div></h4>
                    <h4>Update Status to&ensp;
                    <div class="product_button ml-auto mr-auto trans_200" style="display: inline-block; color: green;" onclick="updateOrderStatus(` + orderNum + `,'Shipped')"><a href="#">Shipped</a></div>&ensp;
                    <div class="product_button ml-auto mr-auto trans_200" style="display: inline-block; color: blue;" onclick="updateOrderStatus(` + orderNum + `,'Resolved')"><a href="#">Resolved</a></div>&ensp;
                    <div class="product_button ml-auto mr-auto trans_200" style="display: inline-block; color: black;" onclick="updateOrderStatus(` + orderNum + `,'Cancelled')"><a href="#">Cancelled</a></div>&ensp;
                    <div class="product_button ml-auto mr-auto trans_200" style="display: inline-block; color: grey" onclick="updateOrderStatus(` + orderNum + `,'On Hold')"><a href="#">On Hold</a></div>&ensp;
                    <div class="product_button ml-auto mr-auto trans_200" style="display: inline-block; color: red;" onclick="updateOrderStatus(` + orderNum + `,'Disputed')"><a href="#">Disputed</a></div>&ensp;
                    <div class="product_button ml-auto mr-auto trans_200" style="display: inline-block; color: yellow;" onclick="updateOrderStatus(` + orderNum + `,'In Process')"><a href="#">In Process</a></div>&ensp;
                    </h4>
                    </div>
                    </div>`;

            list.insertAdjacentHTML('afterbegin', node)

        }, null);
    });
    
    setTimeout(function () { window.location = '#order' + orderNum }, 100);
}

function updateOrderStatus(id,newstatus){

    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);

    db.transaction(function (tx) {
        var update
        update = 'UPDATE orders SET status = ? WHERE orderNumber = ?';
        tx.executeSql(update, [newstatus, id]);

    })

    window.location.reload();
}

function testSum(offset, id) {
    if (document.getElementById("amountC" + id).innerHTML == 1 && offset == 1) offset = 0;

    console.log(document.getElementById("priceC" + id).innerHTML)
    console.log(document.getElementById("amountC" + id).innerHTML - offset) 

    document.getElementById("totalC" + id).innerHTML = (document.getElementById("priceC" + id).innerHTML * ((document.getElementById("amountC" + id).innerHTML) - offset)).toFixed(2).toString()
    document.getElementById("amountC" + id).innerHTML = document.getElementById("amountC" + id).innerHTML - offset

    testSumTotal()
    discountDisplay()
}

function testSumTotal() {
    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);

    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM cartitems ', [], function (tx, results) {
            var len = results.rows.length, i, sum = 0.0;
            for (i = 0; i < len; i++) {
                sum += parseFloat(document.getElementById("totalC" + i).innerHTML)
            }
            document.getElementById("subtotalC").innerHTML = sum.toFixed(2)
            document.getElementById("totalC").innerHTML = document.getElementById("subtotalC").innerHTML
            document.getElementById("mbspadd").innerHTML = parseInt(document.getElementById("subtotalC").innerHTML * 3 / 10)
        }, null);
    });
}

function discountDisplay() {
    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);
    var code = document.getElementById("coupon_id").value;
    console.log(code)
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM promotions WHERE code = "' + code + '" ', [], function (tx, results) {
            var msg = "", amount = 0.0;
            msg = results.rows.item(0).discount
            console.log(msg)
            amount = document.getElementById("subtotalC").innerHTML * (msg / 100)
            console.log(amount)
            document.getElementById("discountC").innerHTML = amount.toFixed(2)
            discountDisplayAmount = parseFloat(document.getElementById("subtotalC").innerHTML) - parseFloat(document.getElementById("discountC").innerHTML)
            console.log(discountDisplayAmount)
            document.getElementById("subtotalC").innerHTML = document.getElementById("subtotalC").innerHTML
            document.getElementById("discountC").innerHTML = document.getElementById("discountC").innerHTML
            document.getElementById("totalC").innerHTML = discountDisplayAmount.toFixed(2)
            document.getElementById("mbspadd").innerHTML = parseInt(discountDisplayAmount * 3 / 10)
        }, function (transaction, error) {
            console.log("promotion code fail");
            //alert('This promotion code is not exist');
            window.location = "#";
        });
    });
}

function addToCart(id)
{
    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);

    var name = document.getElementById('nameOP' + id).innerHTML;
    var code = document.getElementById('codeOP' + id).innerHTML;
    var scale = document.getElementById('sc' + id).innerHTML;
    var price = document.getElementById('price' + id).innerHTML;

    console.log(name);
    console.log(code);
    console.log(scale);
    console.log(price);

    db.transaction(function (tx) {
        var insert = "INSERT INTO cartitems (name, code, scale, price) VALUES (?,?,?,?)";
        tx.executeSql('CREATE TABLE IF NOT EXISTS cartitems (name, code UNIQUE, scale, price DOUBLE)');
        tx.executeSql(insert, [name, code, scale, price]);
    })
}

function showCart()
{
    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);

    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM cartitems ', [], function (tx, results) {
            var len = results.rows.length, i;
            for (i = 0; i < len; i++) {
                msg = results.rows.item(i).name
                msg2 = results.rows.item(i).code
                msg3 = results.rows.item(i).scale
                msg4 = results.rows.item(i).price
                const list = document.querySelector('#divv');
                node = `
                <li class="cart_item item_list d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-start">
                            <div class="product d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-start">
                                <div><div class="product_image"><img src="images/lambo.jpg" width="150" height="100" alt=""></div></div>
                                <div class="product_name"><a href="product.html">` + msg + `</a></div>
                            </div>
                            <div class="product_color text-lg-center product_text" id="cartC`+i+`">` + msg2 + `</div>
                            <div class="product_size text-lg-center product_text">` + msg3 + `</div>
                            <div class="product_total text-lg-center product_text">$<text id="priceC`+i+`">` + msg4 + `</text></div>
                            <div class="product_quantity_container">
                                <div class="product_quantity ml-lg-auto mr-lg-auto text-center">
                                    <span class="product_text product_num" contenteditable="true" id="amountC`+ i + `" onkeyup="testSum(0,` + i +`)">1</span>
                                    <div class="qty_sub qty_button trans_200 text-center" onclick="testSum(1,`+i+`)"><span>-</span></div>
                                    <div class="qty_add qty_button trans_200 text-center" onclick="testSum(-1,`+i+`)"><span>+</span></div>
                                </div>
                            </div>
                            <div class="product_total text-lg-center product_text">$<text id="totalC`+ i +`">` + msg4 + `</text></div>
                            <div class="product_button_short_red ml-auto mr-auto service trans_200" style="display: inline-block" onclick="delCart(`+i+`)"><a href="#">X</a></div>
                        </li>
                    </ul>
                </div>
                `;
                list.insertAdjacentHTML('afterbegin', node)
            }
        }, null);
    });
}

function delCart(cid) {
    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);

    var addr1 = document.getElementById('cartC' + cid).innerHTML;

    console.log(cid);

    db.transaction(function (tx) {
        tx.executeSql('DELETE FROM cartitems WHERE code = "' + addr1 + '"')
    })

    setTimeout(() => window.location.reload(), 600);
}

function dropCart() {

    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);

    db.transaction(function (tx) {
        tx.executeSql('DELETE FROM cartitems')
    })

    setTimeout(() => window.location.reload(), 600);
}

function checkCustomerCart() {

    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);

    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM customercart ', [], function (tx, results) {
            var len = results.rows.length;
            if (len == 0) {
                alert("Choose customer before go to this page.")
                this.location.href = 'Membership.html'
            }
        }, null);
    });
}

function setInOrder(id) {

    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);
    var name = document.getElementById("shopM" + id).innerHTML
    var code = document.getElementById("idM" + id).innerHTML

    db.transaction(function (tx) {
        tx.executeSql('DROP TABLE IF EXISTS customercart');
        var insert = "INSERT INTO customercart (name, code) VALUES (?,?)";
        tx.executeSql('CREATE TABLE IF NOT EXISTS customercart (name, code)');
        tx.executeSql(insert, [name, code]);        
    })
}

/*function createCustomerCart() {

    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);

    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS customercart (name, code)');
    })
}*/

function getMainCustomerAddress() {

    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);

    db.transaction(function (tx) {
        tx.executeSql('SELECT C.addressLine1, C.addressLine2, C.city, C.state, C.postalCode, C.country, CC.name FROM customers AS C, customercart AS CC WHERE C.customerNumber = CC.code', [], function (tx, results) {

            var msg = "", msg1 = " ", msg2 = ", ", msg3 = " ", msg4 = " ", msg5 = " "; 

            if (results.rows.item(0).addressLine1 != null) msg = results.rows.item(0).addressLine1
            if (results.rows.item(0).addressLine2 != null) msg1 += results.rows.item(0).addressLine2
            if (results.rows.item(0).city != null) msg2 += results.rows.item(0).city
            if (results.rows.item(0).state != null) msg3 += results.rows.item(0).state
            if (results.rows.item(0).postalCode != null) msg4 += results.rows.item(0).postalCode
            if (results.rows.item(0).country != null) msg5 += results.rows.item(0).country

            var fullAddress = msg + msg1 + msg2 + msg3 + msg4 + msg5
            document.getElementById("mainaddr").innerHTML = fullAddress
            document.getElementById("headName").innerHTML = results.rows.item(0).name + "'s Cart"
        }, 
        function (transaction, error) {
            console.log("fail");
            alert('Please select customer before make any action in this page.');
            window.location = "membership.html";
        });
    });
}

function getSubCustomerAddress() {

    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);

    //console.log(document.getElementById('subaddr').innerHTML)

    db.transaction(function (tx) {
        tx.executeSql('SELECT C.addressLine1, C.addressLine2, C.city, C.state, C.postalCode, C.country FROM customersaddresses AS C, customercart AS CC WHERE C.customerID = CC.code', [], function (tx, results) {

            var msg = "", msg1 = " ", msg2 = ", ", msg3 = " ", msg4 = " ", msg5 = " ";
            var node = `<select class="cssAddr" id="subAddrs">
                        <option selected disabled hidden>Choose...</option>`
            var len = results.rows.length, i;
            const list = document.querySelector('#subaddr');

            for (i = 0; i < len; i++) {
               
                if (results.rows.item(i).addressLine1 != null) msg = results.rows.item(i).addressLine1
                if (results.rows.item(i).addressLine2 != null) msg1 += results.rows.item(i).addressLine2
                if (results.rows.item(i).city != null) msg2 += results.rows.item(i).city
                if (results.rows.item(i).state != null) msg3 += results.rows.item(i).state
                if (results.rows.item(i).postalCode != null) msg4 += results.rows.item(i).postalCode
                if (results.rows.item(i).country != null) msg5 += results.rows.item(i).country

                /*console.log(msg)
                console.log(msg1)
                console.log(msg2)
                console.log(msg3)
                console.log(msg4)
                console.log(msg5)*/

                var fullAddress = msg + msg1 + msg2 + msg3 + msg4 + msg5
                node += `
                    <option value="`+ fullAddress + `">` + fullAddress +`</option>
                `;               
            }
            node += `</select>`
            list.insertAdjacentHTML('beforebegin', node)
        }, null);
    });
}

function getMBSP() {
    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql('SELECT M.point FROM MBSP AS M, customercart AS CC WHERE CC.code = M.code', [], function (tx, results) {
            var len = results.rows.length
            console.log(len)
            document.getElementById("mbsppt").innerHTML = results.rows.item(0).point
        }, null);
    });
}

function cantgoCart(){
    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql('DROP TABLE IF EXISTS customercart');   
        alert('Please select customer before make any action in this page.');
        window.location = "Membership.html";  
    })
}

function checkOrderDuplicate() {

    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);
    var order = document.getElementById("orderC").innerHTML

    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM orderdetails WHERE orderNumber = ' + order, [], function (tx, results) {
            var len = results.rows.length
            if (len >= 1) alert("Duplicate Order ID")
            else cartToOrder();

        }, null);
    });
}

function cartToOrder() {

    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);
    var order = document.getElementById("orderC").innerHTML

    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM cartitems', [], function (tx, results) {
            var len = results.rows.length,
                i;
            for (i = 0; i < len; i++) {
                var code = document.getElementById("cartC" + i).innerHTML
                var amount = document.getElementById("amountC" + i).innerHTML
                var price = document.getElementById("priceC" + i).innerHTML

                var insert = "INSERT INTO orderdetails VALUES (?,?,?,?,?)";
                tx.executeSql(insert, [order, code, amount, price, -1]);
            }
        }, null);
    });

    setPaymentOrder(order);

    return alertCheck('Payment');
}

function setPaymentOrder(id) {

    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);

    var name = document.getElementById("headName").innerHTML;
    console.log(name);

    var couponcode = document.getElementById("coupon_id").value; //NOT SURE
    console.log(couponcode);
    var disc_price = document.getElementById("discountC").innerHTML;
    console.log(disc_price);
    var t_price = document.getElementById("totalC").innerHTML;
    console.log(t_price);
    var finaladdr = null;

    db.transaction(function (tx) {
        if (document.getElementById("radio_1").checked == true) {
            finaladdr = document.getElementById("mainaddr").innerHTML;
        }
        if (document.getElementById("radio_2").checked == true) {
            finaladdr = document.getElementById("subAddrs").value;
        }
        //for sub address , another else if here

        tx.executeSql('DROP TABLE IF EXISTS PaymentOrder');
        var insert = "INSERT INTO PaymentOrder (orderNumber,name,couponcode,discountprice,totalprice,sendingaddress) VALUES (?,?,?,?,?,?)";
        tx.executeSql('CREATE TABLE IF NOT EXISTS PaymentOrder (orderNumber,name,couponcode,discountprice,totalprice,sendingaddress TEXT)');
        tx.executeSql(insert, [id, name, couponcode, disc_price, t_price, finaladdr]);
    })
}

function showPayment() {
    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);

    db.transaction(function (tx) {
        tx.executeSql('SELECT OD.productCode, OD.quantityOrdered, OD.priceEach, P.productName, P.productScale FROM orderdetails AS OD, products AS P WHERE OD.orderLineNumber = -1 AND P.productCode = OD.productCode', [], function (tx, results) {
            var len = results.rows.length, i;
            for (i = 0; i < len; i++) {
                msg = results.rows.item(i).productName
                msg2 = results.rows.item(i).productCode
                msg3 = results.rows.item(i).priceEach
                msg4 = results.rows.item(i).productScale
                msg5 = results.rows.item(i).quantityOrdered
                const list = document.querySelector('#payv');
                node = `
                <li class="cart_item item_list d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-start">
                            <div class="product d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-start">
                                <div><div class="product_image"><img src="images/lambo.jpg" width="150" height="100" alt=""></div></div>
                                <div class="product_name"><a href="product.html">` + msg + `</a></div>
                            </div>
                            <div class="product_color text-lg-center product_text">` + msg2 + `</div>
                            <div class="product_size text-lg-center product_text">` + msg4 + `</div>
                            <div class="product_total text-lg-center product_text">$<text>` + msg3 + `</text></div>
                            <div class="product_total text-lg-center product_text">` + msg5 + `</span></div>
                            <div class="product_total text-lg-center product_text">$<text>` + (msg3 * msg5).toFixed(2) + `</text></div>
                        </li>
                    </ul>
                </div>
                `;
                list.insertAdjacentHTML('afterbegin', node)
            }
        }, null);

        tx.executeSql('SELECT * FROM customercart ', [], function (fx, results) {
            document.getElementById("codeEIEI").innerHTML = results.rows.item(0).code
        })

        tx.executeSql('SELECT * FROM PaymentOrder ', [], function (fx, results) {
            document.getElementById("tprice").innerHTML = results.rows.item(0).totalprice;
            document.getElementById("mbspadd").innerHTML = parseInt(results.rows.item(0).totalprice * 3 / 10);
            if (results.rows.item(0).couponcode != '') {
                document.getElementById("tdiscount").innerHTML = results.rows.item(0).couponcode + ` / ` + results.rows.item(0).discountprice;
            } else {
                document.getElementById("tdiscount").innerHTML = `No coupon used / ` + results.rows.item(0).discountprice;
            }
            document.getElementById("addr").innerHTML = results.rows.item(0).sendingaddress;
            document.getElementById("orderPayment").innerHTML = results.rows.item(0).orderNumber;
            document.getElementById("headName").innerHTML = results.rows.item(0).name;
         
            var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

            fx.executeSql('DROP TABLE IF EXISTS forOrderPayment',);
            fx.executeSql('CREATE TABLE IF NOT EXISTS forOrderPayment (orderNumber integer,orderDate,requiredDate,shippedDate,status,comments TEXT,customerNumber integer,checkNumber,paymentDate,amount)');
            var insert = 'INSERT INTO forOrderPayment VALUES (?,?,?,?,?,?,?,?,?,?)'; 
            fx.executeSql(insert, [document.getElementById("orderPayment").innerHTML,date,null,null,"In Process",null,null,null,null,document.getElementById("tprice").innerHTML])
            
            fx.executeSql('SELECT * FROM customercart ', [], function (zx, results) {
                zx.executeSql('UPDATE forOrderPayment SET  customerNumber = '+results.rows.item(0).code)
            },null);

        }, null);

    });
}

function dropPayment() {

    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);

    db.transaction(function (tx) {
        tx.executeSql('DELETE FROM PaymentOrder')
        tx.executeSql('DELETE FROM orderdetails WHERE orderLineNumber = -1')
    })

    setTimeout(() => window.location.reload(), 600);
}

function checkPayment() {
    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);
    var order = document.getElementById("orderPayment").innerHTML

    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM orders WHERE orderNumber = ' + order, [], function (tx, results) {
            var len = results.rows.length
            if (len >= 1) alert("Duplicate Order ID")
            else {
                payPaymentOrder();
            }

        }, null);
    });

    //setTimeout(() => window.location.reload(), 600);
}

function payPaymentOrder() {
    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);

    var comm = document.getElementById("comments").value;
    var checkNo = document.getElementById("checkNumber").value;
    var reqdate = document.getElementById("requireddate").value;
    
    db.transaction(function (tx) {

        tx.executeSql('SELECT * FROM forOrderPayment',[],function(fx,results){

            var insert = 'INSERT INTO orders VALUES (?,?,?,?,?,?,?)'
            fx.executeSql(insert, [results.rows.item(0).orderNumber,results.rows.item(0).orderDate,reqdate,null,results.rows.item(0).status,comm,results.rows.item(0).customerNumber])

            var insert2 = 'INSERT INTO payments VALUES (?,?,?,?)'
            fx.executeSql(insert2, [results.rows.item(0).customerNumber,checkNo,results.rows.item(0).orderDate,results.rows.item(0).amount])

        })
        
    })
}

function haveMoney() {
    var total = document.getElementById("tprice").innerHTML
    var code = document.getElementById("codeEIEI").innerHTML
    console.log(code);
    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM customers WHERE customerNumber = ' + code, [], function (fx, results) {
            credit = results.rows.item(0).creditLimit
            if (credit < total) alert("Your Credit limit are not enough, Please check your list again");
            else haveProduct()
        }, null);
    })
}

function haveProduct() {
    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);
    var isEnough = true;

    db.transaction(function (tx) {
        tx.executeSql('SELECT OD.quantityOrdered, P.quantityInStock FROM orderdetails AS OD, products AS P WHERE OD.orderLineNumber = -1 AND OD.productCode = P.productCode', [], function (fx, results) {
            var len = results.rows.length, i;
            for (i = 0; i < len; i++) {
                var requestAmount = results.rows.item(i).quantityOrdered
                var standbyAmount = results.rows.item(i).quantityInStock
                if (requestAmount > standbyAmount) {
                    alert();
                    isEnough = false;
                    break;
                }
            }           
        })  
        if (isEnough) calProduct()
    })
}

function calProduct() {

    console.log("SUS")
    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);
    var update = 'UPDATE orderdetails SET orderLineNumber = ? WHERE orderLineNumber = -1'
    var update2 = 'UPDATE products SET quantityInStock = quantityInStock - ? WHERE productCode = ?'

    db.transaction(function (tx) {
        tx.executeSql('SELECT OD.quantityOrdered, P.quantityInStock, P.productCode FROM orderdetails AS OD, products AS P WHERE OD.orderLineNumber = -1 AND OD.productCode = P.productCode', [], function (fx, results) {
            var len = results.rows.length, i;
            for (i = 0; i < len; i++) {
                var qtt = results.rows.item(i).quantityOrdered
                console.log(qtt)
                var code = results.rows.item(i).productCode
                console.log(code)
                tx.executeSql(update2, [qtt, code])                
            }
        })
        tx.executeSql(update, [randomNumber()]);
    })
    
    checkPayment();
    reducePromotion();
    addMBSPnew();
}

function randomNumber() {
    return (Math.floor(Math.random() * 20) + 1).toString()
}

function reducePromotion() { //IN promotions
    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM paymentOrder', [], function (tx, results) {
            var coupon = results.rows.item(0).couponcode
            var update = 'UPDATE promotions SET amount = amount-1 WHERE code = ?';
            tx.executeSql(update, [coupon]);

        }, null);
    })
}

function updateShipdate(order) {
    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql('UPDATE orders SET shippedDate = ? WHERE orderNumber = ?', [document.getElementById("sd" + order).innerHTML, order])

    })
}

function addMBSPnew() {
    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);
    var point = document.getElementById("mbspadd").innerHTML
    var code = document.getElementById("codeEIEI").innerHTML
    console.log(point)
    console.log(code)
    db.transaction(function (tx) {
        tx.executeSql('UPDATE MBSP SET point = point + ? WHERE code = ?', [point, code])
    })
}