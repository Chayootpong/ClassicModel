function scaleFilter() {
    var x = document.getElementById("scale_filter").value;
    var y = document.getElementById("vendor_filter").value;
    console.log(x)
    console.log(y)
    var db = openDatabase('mydata', '1.0', 'Test DB', 2 * 1024 * 1024);
    let msg = "";
    var e = '';
    const list = document.querySelector('#div1');
    const list2 = document.querySelector('#div1');
    list2.innerHTML = "";
    list.innerHTML = "";
    if(x == 'All' && y == 'All'){
        db.transaction(function (tx) {
            tx.executeSql("SELECT * FROM products", [], function (tx, results) {
                var len = results.rows.length, i;
                for (i = 0; i < len; i++) {
                    msg = results.rows.item(i).productName
                    msg2 = results.rows.item(i).productCode
                    msg3 = results.rows.item(i).productLine
                    msg4 = results.rows.item(i).productScale
                    msg5 = results.rows.item(i).productDescription
                    msg6 = results.rows.item(i).quantityInStock
                    msg7 = results.rows.item(i).buyPrice
                    msg8 = results.rows.item(i).MSRP
                    vendor = results.rows.item(i).productVendor
                    
                    list.innerHTML += `
                        <div class="product grid-item sale" id="bigProduct`+ i + `" style="display: inline-block">
                        <div class="product_inner" id="inner` + i + `">
                            <div class="product_image">
                                <img src="images/lambo.jpg" alt="">
                                    <div class="product_tag" id="sc`+i+`">` + msg4 + `</div>
                            </div>
                            <div class="product_content text-center">
                                <div class="text_box">
                                    <div class="product_title" id="XXXX" ><a href="product.html">` + msg + `</a></div>
                                </div>
                                <div>
                                    <ul align='left'>
                                        <li><span>Code: </span><span id="codeOP`+ i + `">` + msg2 + `</span></li>
                                        <li><span>Catagory: </span><span id="catt`+ i + `">` + msg3 + `</span></li>
                                        <li><span>Vendor: </span><span id="catt`+ i + `">` + vendor + `</span></li>
                                        <li><span>Price: </span><span id="catt`+ i + `">` + "$"+ msg7 + `</span></li>
                                    </ul>
                                </div>
        
                                </div>
                            </div>
                        </div>`;
                    }
        
                }, null);
            });
    
    }else if(x == 'All' && y != 'All'){
        db.transaction(function (tx) {
            tx.executeSql("SELECT * FROM products WHERE productVendor = '" + y + "'", [], function (tx, results) {
                var len = results.rows.length, i;
                for (i = 0; i < len; i++) {
                    msg = results.rows.item(i).productName
                    msg2 = results.rows.item(i).productCode
                    msg3 = results.rows.item(i).productLine
                    msg4 = results.rows.item(i).productScale
                    msg5 = results.rows.item(i).productDescription
                    msg6 = results.rows.item(i).quantityInStock
                    msg7 = results.rows.item(i).buyPrice
                    msg8 = results.rows.item(i).MSRP
                    vendor = results.rows.item(i).productVendor
                    
                    list.innerHTML += `
                        <div class="product grid-item sale" id="bigProduct`+ i + `" style="display: inline-block">
                        <div class="product_inner" id="inner` + i + `">
                            <div class="product_image">
                                <img src="images/lambo.jpg" alt="">
                                    <div class="product_tag" id="sc`+i+`">` + msg4 + `</div>
                            </div>
                            <div class="product_content text-center">
                                <div class="text_box">
                                    <div class="product_title" id="XXXX" ><a href="product.html">` + msg + `</a></div>
                                </div>
                                <div>
                                    <ul align='left'>
                                        <li><span>Code: </span><span id="codeOP`+ i + `">` + msg2 + `</span></li>
                                        <li><span>Catagory: </span><span id="catt`+ i + `">` + msg3 + `</span></li>
                                        <li><span>Vendor: </span><span id="catt`+ i + `">` + vendor + `</span></li>
                                        <li><span>Price: </span><span id="catt`+ i + `">` + "$"+ msg7 + `</span></li>
                                    </ul>
                                </div>
        
                                </div>
                            </div>
                        </div>`;
                    }
        
                }, null);
            });
    }else if(x != 'All' && y == 'All'){
        db.transaction(function (tx) {
            tx.executeSql("SELECT * FROM products WHERE productScale = '" + x + "'", [], function (tx, results) {
                var len = results.rows.length, i;
                for (i = 0; i < len; i++) {
                    msg = results.rows.item(i).productName
                    msg2 = results.rows.item(i).productCode
                    msg3 = results.rows.item(i).productLine
                    msg4 = results.rows.item(i).productScale
                    msg5 = results.rows.item(i).productDescription
                    msg6 = results.rows.item(i).quantityInStock
                    msg7 = results.rows.item(i).buyPrice
                    msg8 = results.rows.item(i).MSRP
                    vendor = results.rows.item(i).productVendor
                    
                    list.innerHTML += `
                        <div class="product grid-item sale" id="bigProduct`+ i + `" style="display: inline-block">
                        <div class="product_inner" id="inner` + i + `">
                            <div class="product_image">
                                <img src="images/lambo.jpg" alt="">
                                    <div class="product_tag" id="sc`+i+`">` + msg4 + `</div>
                            </div>
                            <div class="product_content text-center">
                                <div class="text_box">
                                    <div class="product_title" id="XXXX" ><a href="product.html">` + msg + `</a></div>
                                </div>
                                <div>
                                    <ul align='left'>
                                        <li><span>Code: </span><span id="codeOP`+ i + `">` + msg2 + `</span></li>
                                        <li><span>Catagory: </span><span id="catt`+ i + `">` + msg3 + `</span></li>
                                        <li><span>Vendor: </span><span id="catt`+ i + `">` + vendor + `</span></li>
                                        <li><span>Price: </span><span id="catt`+ i + `">` + "$"+ msg7 + `</span></li>
                                    </ul>
                                </div>
        
                                </div>
                            </div>
                        </div>`;
                    }
        
                }, null);
            });
    }else{
        console.log("all clear");
        db.transaction(function (tx) {
            tx.executeSql("SELECT * FROM products WHERE productScale = '" + x + "' AND productVendor = '" + y + "'", [], function (tx, results) {
                var len = results.rows.length, i;
                for (i = 0; i < len; i++) {
                    msg = results.rows.item(i).productName
                    msg2 = results.rows.item(i).productCode
                    msg3 = results.rows.item(i).productLine
                    msg4 = results.rows.item(i).productScale
                    msg5 = results.rows.item(i).productDescription
                    msg6 = results.rows.item(i).quantityInStock
                    msg7 = results.rows.item(i).buyPrice
                    msg8 = results.rows.item(i).MSRP
                    vendor = results.rows.item(i).productVendor
                    const list = document.querySelector('#div1');

                    list.innerHTML += `
                        <div class="product grid-item sale" id="bigProduct`+ i + `" style="display: inline-block">
                        <div class="product_inner" id="inner` + i + `">
                            <div class="product_image">
                                <img src="images/lambo.jpg" alt="">
                                    <div class="product_tag" id="sc`+i+`">` + msg4 + `</div>
                            </div>
                            <div class="product_content text-center">
                                <div class="text_box">
                                    <div class="product_title" id="XXXX" ><a href="product.html">` + msg + `</a></div>
                                </div>
                                <div>
                                    <ul align='left'>
                                        <li><span>Code: </span><span id="codeOP`+ i + `">` + msg2 + `</span></li>
                                        <li><span>Catagory: </span><span id="catt`+ i + `">` + msg3 + `</span></li>
                                        <li><span>Vendor: </span><span id="catt`+ i + `">` + vendor + `</span></li>
                                        <li><span>Price: </span><span id="catt`+ i + `">` + "$"+ msg7 + `</span></li>
                                    </ul>
                                </div>
        
                                </div>
                            </div>
                        </div>`;
                    }
        
                }, null);
            });
    }
}

