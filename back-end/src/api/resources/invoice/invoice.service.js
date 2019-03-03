export default {
	getTotal(invoice) {
		let total = 0;
		let subTotal = 0;
		let tax = 20;
		

		if (typeof invoice.qty !== 'undefined' && typeof invoice.price !== 'undefined') {
			subTotal = invoice.qty * invoice.price;
		}
		let salesTax = 0;
		if (typeof invoice.tax !== 'undefined') {
			salesTax = subTotal * tax / 100;
		}

		total = subTotal + salesTax;
	
		return { total, subTotal ,salesTax};
	},

	getTemplateBody(invoice, subTotal, total) {
		const templateBody = `
 
    <div class="container">
	
			
				<div class ="barcode-div pull-right" >
				<h1>Facture N°:</h1>
						<svg id="barcode"></svg>
						
						<script>
							JsBarcode("#barcode", "${invoice.id}", {
								width:0.8,
								height:40,
								fontSize : 14,
								displayValue: true
							});
						</script>
		        </div>				
	            <div class="img-logo">
	        	<img src="http://omegaservices.fr/medias/logo-omega.png">
				</div>
				<hr>
				<br><br>


        <div class="inv-header">
          <div class="row">
               <div class="company pull-left">
                <h2 class="companytitle">O'MEGA Services</h2>
                <ul>
                    <li>400 rue nationale</li>
                    <li>69400, villefranche sur saone</li>
                    <li>0986608980| www.omegaservices.fr</li>
                </ul>
                </div>
                <div class="client pull-right" >
                <h2 class="clienttitle">Facture A : ${invoice.client.name} </h2>
                <ul>
                    <li>${invoice.client.address}</li>
                    <li>${invoice.client.post}${invoice.client.city}</li>
                    <li>${invoice.client.phone} </li>
                </ul>
            </div>
          </div>
		</div>
		</div>
		<br><br><br>
            <div>
                <table class="invdate">
                    <tr>
                        <th>Date facture</th>
                        <td>${invoice.date }</td>
                    </tr>
                    <tr>
                        <th>date livraison</th>
                        <td>${invoice.date }</td>
                    </tr>
                    
                </table>
            </div>
       

		 <br><br>
		 <hr>
        <div class="inv-body">
		<table>
		<thead>
			<tr>
			  <td class="designation-item">Designation </td>
			  <td class="sty-item">Quantité</td>
			  <td class="price-item">Price</td>
			  <td class="tax-item">Tax</td>
			  <td class="subtotal-item">Total HT</td>
			
			</tr>
		  </thead>
		<tbody>
			<tr>
				<td class="designation-item"><h5>${invoice.item}</h5> </td>
				<td class="sty-item">${invoice.qty}</td>
				<td class="price-item">${invoice.price}€</td>
				<td class="tax-item">${invoice.tax}%</td>
				<td class="subtotal-item">${subTotal}€</td>

			</tr>
			
		</tbody>
	</table>
        </div>
        <hr>
        <div class="inv-footer">
          
			<table >
			<tr>
				<th>Total HT</th>
				<td>${subTotal} €</td>
			</tr>
			<tr>
				<th>Total TVA</th>
				<td>${invoice.Tax} € </td>
			</tr>
			<tr>
				<th >Total TTC</th>
				<td class="totalttc">${total} €</td>
			</tr>
			
		</table>
            
        </div>
    </div>
	<div id="bottom-stuff">
	
	<div class="footer">
	<hr>
              <p class="merci">Merci pour votre confiance</p>
    </div>
</div>
    `;
		return templateBody;
	},
	getInvoiceTemplate(templateBody, subTotal, total) {
		const html = `
    <html>
    <head>
    <title> Invoice </title>
	<link href="./style.css" rel="stylesheet">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.8.0/dist/JsBarcode.all.min.js"></script>
	<script src="dist/JsBarcode.all.min.js"></script>
     
     <style>
     /* reset */

* {
	border: 0;
	box-sizing: content-box;
	color: inherit;

	line-height: inherit;
	list-style: none;
	margin: 5;
	padding: 0;
	text-decoration: none;
	vertical-align: top;
}
hr {
	width: 100%;
	height: 6px;
	margin-left: auto;
	margin-right: auto;
	background-color:#666;
	border: 0 none;

	}
.container {
	position: relative;
}

/* content editable */
.img {

}
.barcode-div {

	width: 300px;
	height: 100px;
	float: right;
	margin: 0px 5px;


}
*[contenteditable] {
	border-radius: 0.25em;
	min-width: 1em;
	outline: 0;
}

*[contenteditable] {
	cursor: pointer;
}

*[contenteditable]:hover,
*[contenteditable]:focus,
td:hover *[contenteditable],
td:focus *[contenteditable],
img.hover {
	background: #def;
	box-shadow: 0 0 1em 0.5em #def;
}
.designation-item{
	width : 55% ;
}
span[contenteditable] {
	display: inline-block;
}

/* heading */

h1 {
	font: bold 100% sans-serif;
	letter-spacing: 0.5em;
	text-align: center;
	text-transform: uppercase;
	padding: 0;
	margin : 0;

}
.footer {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	width: 100%;
	background-color: #eeeeee;
	color: black;
	text-align: center;
 }

.company {
	width: 300px;
	height: 100px;
	float: right;
	border-left: 6px solid #666;
	 background-color: #eeeeee;
}
.client {
	width: 300px;
	height: 100px;
	float: left;
	text-align: left;
	border-left: 6px solid #666;
	
	 background-color: #eeeeee;
	
}
.invdate {
	max-width: 300px;
	float: right;
	margin: 5px 5px;
	padding: 10px 10px;
	border: 1px solid black;
}
/* table */
.inv-footer {
	max-width: 300px;
	float: right;

	border-left: 6px solid #666;
}
.invtotal {
	max-width: 300px;
}
table {
	
	font-size: 75%;
	table-layout: fixed;
	width: 100%;
	border-collapse: collapse;
	border-spacing: 0;
	border: 1px solid black;
}

th,
td {
	border-width: 1px;
	padding: 0.5em;
	position: relative;
	text-align: left;
}
th,
td {
	border-radius: 0.25em;
	border-style: solid;
}
th {
	background: #eee;
	border-color: #bbb;
}
td {
	border-color: #ddd;
}

/* page */

html {
	font: 16px/1 sans-serif;
	overflow: auto;
	padding: 0.5in;
}
html {
	background: #999;
	cursor: default;
}

body {
	box-sizing: border-box;
	height: 11in;
	margin: 0 auto;
	overflow: hidden;
	padding: 0.5in;
	width: 8.5in;
}





/* table meta & balance */

table.meta,
table.balance {
	float: right;
	width: 36%;
}
table.meta:after,
table.balance:after {
	clear: both;
	content: "";
	display: table;
}

/* table meta */

table.meta th {
	width: 40%;
}
table.meta td {
	width: 60%;
}

/* table items */

table.inventory {
	clear: both;
	width: 100%;
}
table.inventory th {
	font-weight: bold;
	text-align: center;
}

table.inventory td:nth-child(1) {
	width: 26%;
}
table.inventory td:nth-child(2) {
	width: 38%;
}
table.inventory td:nth-child(3) {
	text-align: right;
	width: 12%;
}
table.inventory td:nth-child(4) {
	text-align: right;
	width: 12%;
}
table.inventory td:nth-child(5) {
	text-align: right;
	width: 12%;
}

/* table balance */

table.balance th,
table.balance td {
	width: 50%;
}
table.balance td {
	text-align: right;
}

/* aside */

aside h1 {
	border: none;
	border-width: 0 0 1px;
	margin: 0 0 1em;
}
aside h1 {
	border-color: #999;
	border-bottom-style: solid;
}

/* javascript */

.add,
.cut {
	border-width: 1px;
	display: block;
	font-size: .8rem;
	padding: 0.25em 0.5em;
	float: left;
	text-align: center;
	width: 0.6em;
}

.add,
.cut {
	background: #9af;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
	background-image: -moz-linear-gradient(#00adee 5%, #0078a5 100%);
	background-image: -webkit-linear-gradient(#00adee 5%, #0078a5 100%);
	border-radius: 0.5em;
	border-color: #0076a3;
	color: #fff;
	cursor: pointer;
	font-weight: bold;
	text-shadow: 0 -1px 2px rgba(0, 0, 0, 0.333);
}

.add {
	margin: -2.5em 0 0;
}

.add:hover {
	background: #00adee;
}

.cut {
	opacity: 0;
	position: absolute;
	top: 0;
	left: -1.5em;
}
.cut {
	-webkit-transition: opacity 100ms ease-in;
}

tr:hover .cut {
	opacity: 1;
}

@media print {
	* {
		-webkit-print-color-adjust: exact;
	}
	html {
		background: none;
		padding: 0;
	}
	body {
		box-shadow: none;
		margin: 0;
	}
	span:empty {
		display: none;
	}
	.add,
	.cut {
		display: none;
	}
}

@page {
	margin: 0;
}

     </style>
    </head>

    <body>
       ${templateBody}
    </body>
    </html>
    `;
		return html;
	}
};
