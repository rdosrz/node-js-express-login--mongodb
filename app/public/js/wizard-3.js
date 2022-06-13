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



											var foos = $('#kt_select2_4').val();


												$.each(foos, function(i,foo){


															$.ajax(
																'pages/php/functions.php?action=selectProductos&id='+foo,

																{
																		success: function(data) {
																					var productos = JSON.parse(data);


																					$.each(productos, function(i,producto){

																							var cantidad = $('#prod_'+producto.id).val();
																							var fechaLimite = $('#f_lim_'+producto.id).val();
																							var precioLimite = $('#p_lim_'+producto.id).val();


																							var option = 	$("#sendOption").val();

																										var template =
																									'<tr role="row" class="odd">'+
																										' <td class="sorting_1">'+producto.symbol+'</td>'+
																											'<td>'+producto.nombre+'</td>'+
																										'	<td>'+producto.isn+'</td>'+
																										'	<td>'+cantidad+'</td>'+
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

											break;

										case '12':

									$("#kt_select2_3 option:selected").each(function () {
													var $this = $(this);
													if ($this.length) {
													var selText = $this.text();
													var selVal = $this.val();

													var name = '<span>Los cambios aplicarán de la siguiente manera: &nbsp;</span>';
													$("#cl_names").empty();
													$(name).appendTo("#cl_names");


													var foos = $('#kt_select2_4').val();

														$.each(foos, function(i,foo){

																	$.ajax(
																		'pages/php/functions.php?action=selectProductos&id='+foo,

																		{
																				success: function(data) {
																							var productos = JSON.parse(data);


																							$.each(productos, function(i,producto){

																									var cantidad = $('#prod_'+selVal+'_'+producto.id).val();
																									var fechaLimite = $('#f_lim_'+selVal+'_'+producto.id).val();
																									var precioLimite = $('#p_lim_'+selVal+'_'+producto.id).val();



																									var option = 	$("#sendOption").val();

																												var template =
																											'<tr role="row" class="odd">'+
																											' <td class="sorting_1">'+selText+'</td>'+
																												' <td class="sorting_1">'+producto.symbol+'</td>'+
																													'<td>'+producto.nombre+'</td>'+
																												'	<td>'+producto.isn+'</td>'+
																												'	<td>'+cantidad+'</td>'+
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



													}
													});


										break;

						       case '21':


									 var cl_text = '<span>Los cambios aplicarán de forma porcentual idéntica para: &nbsp;</span>';
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



												 var foos = $('#kt_select2_4').val();


													 $.each(foos, function(i,foo){


																 $.ajax(
																	 'pages/php/functions.php?action=selectProductos&id='+foo,

																	 {
																			 success: function(data) {
																						 var productos = JSON.parse(data);


																						 $.each(productos, function(i,producto){

																								 var cantidad = $('#prod_'+producto.id).val();
																								 var fechaLimite = $('#f_lim_'+producto.id).val();
																								 var precioLimite = $('#p_lim_'+producto.id).val();


																								 var option = 	$("#sendOption").val();

																											 var template =
																										 '<tr role="row" class="odd">'+
																											 ' <td class="sorting_1">'+producto.symbol+'</td>'+
																												 '<td>'+producto.nombre+'</td>'+
																											 '	<td>'+producto.isn+'</td>'+
																											 '	<td>'+cantidad+' %</td>'+
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



										break;


										case '22':

										$("#kt_select2_3 option:selected").each(function () {
														var $this = $(this);
														if ($this.length) {
														var selText = $this.text();
														var selVal = $this.val();

														var name = '<span>Los cambios aplicarán de la siguiente manera: &nbsp;</span>';
														$("#cl_names").empty();
														$(name).appendTo("#cl_names");


														var foos = $('#kt_select2_4').val();

															$.each(foos, function(i,foo){

																		$.ajax(
																			'pages/php/functions.php?action=selectProductos&id='+foo,

																			{
																					success: function(data) {
																								var productos = JSON.parse(data);


																								$.each(productos, function(i,producto){

																										var cantidad = $('#prod_'+selVal+'_'+producto.id).val();
																										var fechaLimite = $('#f_lim_'+selVal+'_'+producto.id).val();
																										var precioLimite = $('#p_lim_'+selVal+'_'+producto.id).val();



																										var option = 	$("#sendOption").val();

																													var template =
																												'<tr role="row" class="odd">'+
																												' <td class="sorting_1">'+selText+'</td>'+
																													' <td class="sorting_1">'+producto.symbol+'</td>'+
																														'<td>'+producto.nombre+'</td>'+
																													'	<td>'+producto.isn+'</td>'+
																													'	<td>'+cantidad+'%</td>'+
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



														}
														});


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
				},


				'producs[]': {
					required: false
				},
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

			var option = 	$("#sendOption").val();


			if (validator.form()) {
				// See: src\js\framework\base\app.js
				KTApp.progress(btn);
				//KTApp.block(formEl);


var tipo = 	$("#operationType").val();



		$.ajax({
					 type: "POST",
					 url: 	'pages/php/functions.php?tipo='+tipo+'&action=AltaCompra'+option,
					 data: formEl.serialize(), // serializes the form's elements.
					 success: function(data)
					 {

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
