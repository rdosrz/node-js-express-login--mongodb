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


console.log(formEl.serialize());
		$.ajax({
					 type: "POST",
					 url: 	'pages/php/functions.php?tipo='+tipo+'&action=AltaVentaEmergency',
					 data: formEl.serialize(), // serializes the form's elements.
					 success: function(data){

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
