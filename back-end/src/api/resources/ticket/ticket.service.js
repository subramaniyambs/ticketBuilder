import Joi from 'joi';
import { now } from 'moment';
const moment = require('moment');

const dateToStore = '2018-01-27 10:30';
const momentDate = moment(dateToStore, 'YYYY-MM-DD HH:mm');
// momentObject(2018-01-27T10:30:00.000)

export default {
	validateCreateSchema(body) {
		const schema = Joi.object().keys({
			client: Joi.string().optional(),
			category: Joi.string().optional(),
			brand: Joi.string().optional(),
			model: Joi.string().optional(),
			task: Joi.string().optional(),
			missing: Joi.string().optional(),

			price: Joi.number().optional(),
			serial: Joi.string().optional(),
			reception_date: Joi.dateToStore().required(),
			delivery_date: Joi.dateToStore().required()
		});

		const { error, value } = Joi.validate(body, schema);
		if (error && error.details) {
			return { error };
		}
		return { value };
	},

	getTemplateBody(ticket, user) {
		const templateBody = `
	
<div class="maincontainer">

		  <div class="inv-title">
		  <img src="http://omegaservices.fr/medias/logo-omega.png">
		  <div class="svg">
		   </div>
	        </div>
	         
		<hr>
		<table >
		<tr>
		<div class="guarantie">
				<p>400 Rue nationale
					<br>
					69400, Villefranche sur saone
					<br>
					tel : 0986608980 - www.omegaservices.fr
				</p>
		     </div>
		</tr>
		  <tr>
			<td class="column-title">Date: </td>
			<td>${ticket.reception_date}</td>
		   </tr>
		  <tr>
			<td class="column-title">client: </td>
			<td>${ticket.client['name']}</td>
		  </tr>
		   <tr>
			 <td class="column-title">Telephone: </td>
			<td>${ticket.client['phone']}</td>
			</tr>  
			<tr>
			   <td class="column-title">model: </td>
			   <td>${ticket.model}</td>
			</tr>
			<tr>
			  <td class="column-title">task: </td>
			  <td>${ticket.task}</td>
			 </tr>
			 <tr>
			  <td class="column-title">Price: </td>
			  <td>${ticket.price}€</td>
			 </tr>
			 <tr>
				<td class="column-title">Missing: </td>
				<td>${ticket.missing}</td>
			</tr>
			</table>

			<div class ="barcode-div">
			<svg id="barcode"></svg>
			 <script>
				 JsBarcode("#barcode", "${ticket.id}", {
					 
					 width:0.8,
					 height:40,
					 fontSize : 14,
					 displayValue: true
				   });
			 </script>
		   </div>
		   <p>*** MERCI POUR VOTRE FIDELITE ***</p>
</div>
    `;
		return templateBody;
	},
	getTicketTemplate(templateBody, user) {
		const html = `
<html>
   <head>
  
   <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
   <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
   <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.8.0/dist/JsBarcode.all.min.js"></script>
   <script src="dist/JsBarcode.all.min.js"></script>


	
	    
	 <style>
	 
	 body {
		font-family: Roboto,"Helvetica Neue",sans-serif;
        font-size: 13px;
      }
.inv-title img {
		width: 100px;
		height: 60px;
	
	}
.barcode-div{
	max-width: 200px;
}
	 .maincontainer{
	width:80mm;
	
	    text-align: center;
		height: 550px;

		background-color: transparent ;
		border-style: solid
		border-width: 0.25px;
	    border: 1px solid #cccccc;
		padding: 0 2px;
	}
	.guarantie  {
		border-style: solid;
		border-width: 0.25px;
	}
	
	table {
		margin-buttom:15px;
		font-size: 14px;
		border-spacing: 5px;
		border-collapse: collapse;
		margin-left : 15px;
		margin-top: 5px;
		max-width: 100%;
		margin-bottom: 10px;
		width: 90%;
		
		background-color: transparent; /* Change the background-color of table here */
		text-align: left; /* Change the text-alignment of table here */
	}
	tbody tr:nth-child(odd) {
		width: 25px;
		background-color: rgb(255, 255, 255);
	  }
	  
	  tbody tr:nth-child(even) {
		background-color:  rgb(242, 243, 243);
	  }
	td:nth-of-type(2) {
		margin-right: 5px;
	}
	.column-title {
		font-weight: bold;
	}
	// .mat-card-title {
	// 	-moz-text-size-adjust: 1rem;
	// }
	.p {
		size: 10px;
		text-align: center;
	}
	
	/* CSS Snippet For Responsive Table - Stylized */
	
	/* Basic */
	
	* {
		box-sizing: border-box;
	}
	
	th {
		font-weight: bold;
		border: 1px solid #cccccc; /* Change the border-color of heading here */
		padding: 2px;
	}
	
	td {
		border: 1px solid #cccccc; /* Change the border-color of cells here */
		padding: 2px;
	}
	
	/* Stylized */
	
	
	

	
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
