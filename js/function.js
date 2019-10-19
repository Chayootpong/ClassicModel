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