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
                list.innerHTML += `
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
            }
        }, null);
    });
}

function test() {
    console.log("TEST!!!")
}