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

function myFunction(value) {
    console.log(value)
    var input, filter, table, tr, td, i, txtValue, fill
    count = 0;
    if (value == 'Name') fill = 0;
    else if (value.substring(0, value.length - 1) == 'Code') fill = 1;
    else if (value == 'Category') fill = 2;
    else if (value == 'Scale') fill = 3;

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

function myFunction2(value) {
    console.log(value)
    var input, filter, p, div, div2,div3,ul2,span, i, txtValue, fill;
    count = 0;
    if (value == 'Name') fill = 1;
    else if (value == 'Code') fill = 2;
    else if (value == 'Category') fill = 3;
    else if (value == 'Scale') fill = 4;
    else if (value == 'Vendor') fill = 5;

    console.log(fill)
    
    input = document.getElementById('inpt_search1');
    filter = input.value.toUpperCase();
    div = document.getElementById("diva");
    div2 = div.getElementsByTagName('div');
    
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < div2.length; i++) {
        console.log(div2)
        p = div2[i].getElementsByTagName("p")[fill];
        txtValue = p.textContent || p.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            div2[i].style.display = "";
        } else {
            div2[i].style.display = "none";
        }
    }
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
                node = `
                <tr>
                    <td align="left"><a href="#popup`+ i + `"><img src="images/lambo.jpg" alt="" width="100" length="100"></a> &nbsp; &nbsp;<span id="nameRow` + i + `">` + pname + `</span></td>
                    <td id="codeRow`+ i + `" align="center">` + pcode + `</td>
                    <td id="catRow`+ i + `" align="center">` + pcat + `</td>
                    <td id="scaleRow`+ i + `" align="center">` + pscale + `</td>
                    <td id="numRow`+ i + `" align="center">` + num + `</td>
                    <td id="priceRow`+ i + `"  align="center">` + "$" + price + `</td>
                    <td> <div class="product_button ml-auto mr-auto" id="`+ i + `" onclick="log(this.id)"><a href="#">Add to Cart<a></div></button></td>
                </tr>
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

function test() {
    console.log("TEST!!!")
}