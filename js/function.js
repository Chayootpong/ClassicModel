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
        update = 'UPDATE products SET quantityInStock = ? WHERE productCode = ?';
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
					<td class="cell100 column6">` + (results.rows.item(i).quantityOrdered * results.rows.item(i).priceEach).toFixed(2) + ` $<br>(+` + Math.floor((results.rows.item(i).quantityOrdered * results.rows.item(i).priceEach) / 100).toFixed(0) * 3 + ` pts.)</br></td>
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
    const list = document.querySelector('#myTable');
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM products', [], function (tx, results) {
            var len = results.rows.length, i;
            for (i = 0; i < len; i++) {
                pname = results.rows.item(i).productName
                pcode = results.rows.item(i).productCode
                pcat = results.rows.item(i).productLine
                pscale = results.rows.item(i).productScale
                num = results.rows.item(i).quantityInStock
                price = results.rows.item(i).buyPrice
                des = results.rows.item(i).productDescription
                const list = document.querySelector('#diva');
                node = `
                <div id="popup`+ i + `" class="overlay">
                    <div class="popup">
                    <h2>Product Info</h2>
                        <a class="close" href="#">&times;</a>                                                                                 
                            <div align="center">` + pname + `<div>
                            <div class="product_image" align="center"><img src="images/lambo.jpg" width="200px" length="200px"><div>
                            <div align="left">`+ "Code: " + pcode + `<div>
                            <div align="left">` + "Category: " + pcat + `<div>
                            <div align="left">` + "Scale" + pscale + `<div>
                            <div align="left">` + " Detail" + des + `<div>
                            <div align="left">` + "Price: " + "$" + price + `<div>
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
    var e = '';
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

    console.log("SUS");
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

    console.log(cusno);
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
    console.log(crlimit);

    db.transaction(function (tx) {
        var insert = 'INSERT INTO customers VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)';
        tx.executeSql(insert, [cusno, cusname, fname, lname, phone, addr1, addr2, city, state, pc, coun, empno, crlimit]);
    })

    setTimeout(() => window.location.reload(), 600);
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
                            <td  align="center">` + proname + `</td>
                            <td  align="center">` + prodis + `</td>
                            <td  align="center">` + start + `</td>
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