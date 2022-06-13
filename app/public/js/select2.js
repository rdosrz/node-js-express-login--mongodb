// Class definition
var KTSelect2 = function() {
    // Private functions
    var demos = function() {

        // multi select
        $('#kt_select2_3, #kt_select2_3_validate').select2({
            placeholder: "Selecciona una cuenta",
        });
        // multi select
        $('#kt_select2_4, #kt_select2_4_validate').select2({
            placeholder: "Selecciona un producto",
        });

    }


    // Public functions
    return {
        init: function() {
            demos();

        }
    };
}();

// Initialization
jQuery(document).ready(function() {
    KTSelect2.init();
});
