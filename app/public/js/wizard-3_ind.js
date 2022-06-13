"use strict";

// Class definition
var KTWizard3 = function () {
	// Base elements
	var wizardEl;
	var formEl;
	var validator;
	var wizard;


	// Private functions
	var initWizard = function () {

				var contador = 1;


		// Initialize form wizard
		wizard = new KTWizard('kt_wizard_v3', {
			startStep: 1,
		});

		// Validation before going to next page
		wizard.on('beforeNext', function(wizardObj) {
			if (validator.form() !== true) {
				wizardObj.stop();  // don't go to the next step
			}else{
				contador++;

					if (contador == 3){
								$("#form_botones").hide();

					}



				if (contador == 4){

							var option = 	$("#sendOption").val();
							$("#t_totales_"+option).empty();
							$("#cl_names").empty();

							//okas



							$("#result_"+option).show();

				switch(option){

								case '11':

								var cl_text = '<span>Los cambios aplicarán de forma idéntica para: &nbsp;</span>';
								$("#cl_text").empty();
								$(cl_text).appendTo("#cl_text");
								$("#cl_names").empty();



							$("#kt_select2_3 option:selected").each(function () {
											var $this = $(this);
											if ($this.length) {
											var selText = $this.text();

											var name = '<strong><a>'+selText+',&nbsp;</a></strong>';

											$(name).appendTo("#cl_names");

											}
											});


												var cuenta = 	$("#cuentas").val();

											//start resumen actualies
													var tipo = 	$("#compraActual").val();
												if(tipo == '1'){

															$.ajax(
																'pages/php/functions.php?action=ListProductosCliente&id_cuenta='+cuenta,

																{
																		success: function(data) {
																					var productos = JSON.parse(data);
																					$.each(productos, function(i,producto){

																							var	atip_comp = $('#Atip_comp_'+producto.id_producto).val();
																							var cantidad = $('#Acant_'+producto.id_producto).val();
																							var fechaLimite = $('#Af_lim_'+producto.id_producto).val();
																							var precioLimite = $('#Ap_lim_'+producto.id_producto).val();

																							if (atip_comp == 1){
																									var tipo = 'u';
																							}else{
																								var tipo = '%';
																							}


																					if(cantidad != '0'){
																								var template =
																							'<tr role="row" class="odd">'+
																								' <td class="sorting_1">'+producto.symbol+'</td>'+
																								'<td>'+producto.nombre+'</td>'+
																							 '	<td>'+producto.isn+'</td>'+
																								'	<td>'+cantidad+tipo+' </td>'+
																								'	<td>'+fechaLimite+'</td>'+
																								'	<td>'+precioLimite+'</td>'+
																								'	</tr>';

																								$(template).appendTo("#t_totales_"+option);
																							}


																								var template ='<span>No hay cambios en los productos actuales: &nbsp;</span>';


																							});
																		},
																		error: function() {
																			alert('Ha habido un problema con la conexión de la Base de Datos. Por favor contacta al Adminstrador de Sistema.');
																		}
																	}
															);
														}




											//end resumen actualies

										//start resumen nuevos
											var foos = $('#kt_select2_4').val();
												$.each(foos, function(i,foo){
															$.ajax(
																'pages/php/functions.php?action=selectProductos&id='+foo,

																{
																		success: function(data) {
																					var productos = JSON.parse(data);
																					$.each(productos, function(i,producto){

																						  var	tip_comp = $('#tip_comp_'+producto.id).val();
																							var cantidad = $('#prod_'+producto.id).val();
																							var fechaLimite = $('#f_lim_'+producto.id).val();
																							var precioLimite = $('#p_lim_'+producto.id).val();

																							var option = 	$("#sendOption").val();


																							if (tip_comp == '1'){
																									var tipon = 'u';
																							}else{
																								var tipon = '%';
																							}


																										var template =
																									'<tr role="row" class="odd">'+
																										' <td class="sorting_1">'+producto.symbol+'</td>'+
																											'<td>'+producto.nombre+'</td>'+
																										'	<td>'+producto.isn+'</td>'+
																										'	<td>'+cantidad+tipon+'</td>'+
																										'	<td>'+fechaLimite+'</td>'+
																										'	<td>'+precioLimite+'</td>'+
																										'	</tr>';

																										var option = 	$("#sendOption").val();
																										$(template).appendTo("#t_totales_"+option);
																							});
																		},
																		error: function() {
																			alert('Ha habido un problema con la conexión de la Base de Datos. Por favor contacta al Adminstrador de Sistema.');
																		}
																	}
															);

												});
										//end resumen nuevos



											break;


									}
								}
							}
		});

		wizard.on('beforePrev', function(wizardObj) {
			if (validator.form() !== true) {
				wizardObj.stop();  // don't go to the next step
			}else{
					contador--;


			}
		});

		// Change event
		wizard.on('change', function(wizard) {
			KTUtil.scrollTop();
		});
	}

	var initValidation = function() {
		validator = formEl.validate({
			// Validate only visible fields
			ignore: ":hidden",


			// Validation rules
			rules: {
				//= Step 1
				'clientes[]': {
					required: true
				}//,

				//= Step 2
				//'producs[]': {
					//required: false
				//},
			},

			// Display error
			invalidHandler: function(event, validator) {
				KTUtil.scrollTop();

				swal.fire({
					"title": "",
					"text": "Favor de ingresar los datos completos.",
					"type": "error",
					"confirmButtonClass": "btn btn-secondary"
				});



			},

			// Submit valid form
			submitHandler: function (form) {

			}
		});
	}

	var initSubmit = function() {
		var btn = formEl.find('[data-ktwizard-type="action-submit"]');

		btn.on('click', function(e) {
			e.preventDefault();


			if (validator.form()) {
				// See: src\js\framework\base\app.js
				KTApp.progress(btn);
				//KTApp.block(formEl);


var tipo = 	$("#operationType").val();



		$.ajax({
					 type: "POST",
					 url: 	'pages/php/functions.php?tipo='+tipo+'&action=AltaCompraInd',
					 data: formEl.serialize(), // serializes the form's elements.
					 success: function(data)
					 {

						 console.log(data);

						 switch(data){
								case 'error':

								swal.fire({
									"title": "",
									"text": "The application has been successfully submitted!",
									"type": "error",
									"confirmButtonClass": "btn btn-secondary"
								})

									break;

								case 'succes':


										KTApp.unprogress(btn);
										//KTApp.unblock(formEl);

										swal.fire({
											"title": "",
											"text": "Orden de operacion registrada exitosamente",
											"type": "success",
											"confirmButtonClass": "btn btn-secondary"
										}).then((result) => {
													if (result.value) {
																$('#first_form').hide();
																$('#last_form_form').show();
													}
												});


									break;
						}


					 }
				 });


}
		});
	}

	return {
		// public functions
		init: function() {
			wizardEl = KTUtil.get('kt_wizard_v3');
			formEl = $('#kt_form');

			initWizard();
			initValidation();
			initSubmit();
		}
	};
}();

jQuery(document).ready(function() {
	KTWizard3.init();
});
