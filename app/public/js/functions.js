$(document).ready(function()
  {

//GET simulation
    function getParameterByName(name) {
  	    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  	    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
  	    results = regex.exec(location.search);
  	    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  	}

  var option = getParameterByName('op');

 var pathname = window.location.pathname;


//handler
  switch(option){
      case 'productos':
                  $("#showContent").load('pages/products.php');
      break;

      case 'bancos':

                  $("#showContent").load('pages/bancos.php');
      break;

      case 'clientes':
                  $("#showContent").load('pages/clientes.php');
      break;

      case 'nuevacompra':
                  $("#showContent").load('pages/nuevacompra.php');
      break;

      case 'nuevaventa_ind':
                  $("#showContent").load('pages/nuevaventa_ind.php');
      break;

      case 'ventaemergency':
                  $("#showContent").load('pages/ventaemergency.php');
      break;

      case 'compraemergency':
                  $("#showContent").load('pages/compraemergency.php');
      break;

      case 'nuevacompra_ind':
                  $("#showContent").load('pages/nuevacompra_ind.php');
      break;

      case 'formatos':
                  $("#showContent").load('pages/descargaformatos.php');
      break;

      case 'confirmaCompra':
                  $("#showContent").load('pages/confirmacompra.php');
      break;

      case 'confirmaVenta':
                  $("#showContent").load('pages/confirmaventa.php');
      break;

      case 'paneladmin':
                  $("#showContent").load('pages/paneladmin.php');
      break;

      case 'perfil':
                  $("#showContent").load('pages/perfil.php');
      break;


      case 'editarcuenta':
                  $("#showContent").load('pages/editarcuenta.php');
      break;

      default:
            $("#showContent").load('pages/dashboard.php');

      break;



  }


///listeners

$('#inicio').on('click', function() {
      $("#showContent").load('pages/dashboard.php');
 return false;
});

  $('#productos').on('click', function() {
        $("#showContent").load('pages/products.php');
   return false;
});

$('#bancos').on('click', function() {
      $("#showContent").load('pages/bancos.php');
 return false;
});

$('#clientes').on('click', function() {
      $("#showContent").load('pages/clientes.php');
 return false;
});

$('#nuevacompra').on('click', function() {
      $("#showContent").load('pages/nuevacompra.php');
 return false;
});

$('#nuevacompra_ind').on('click', function() {
      $("#showContent").load('pages/nuevacompra_ind.php');
 return false;
});

$('#confirmacompra').on('click', function() {
      $("#showContent").load('pages/confirmacompra.php');
 return false;
});


$('#nuevaventa').on('click', function() {
      $("#showContent").load('pages/nuevaventa.php');
 return false;
});

$('#nuevaventaind').on('click', function() {
      $("#showContent").load('pages/nuevaventa_ind.php');
 return false;
});


$('#confirmaventa').on('click', function() {
      $("#showContent").load('pages/confirmaventa.php');
 return false;
});


$('#ventaemergency').on('click', function() {
      $("#showContent").load('pages/ventaemergency.php');
 return false;
});

$('#compraemergency').on('click', function() {
      $("#showContent").load('pages/compraemergency.php');
 return false;
});


$('#descargaFormatos').on('click', function() {
      $("#showContent").load('pages/descargaformatos.php');
 return false;
});

$('#paneladmin').on('click', function() {
      $("#showContent").load('pages/paneladmin.php');
 return false;
 });

 $('#perfil').on('click', function() {
       $("#showContent").load('pages/perfil.php');
  return false;
});


$('#editarcuenta').on('click', function() {
      $("#showContent").load('pages/editarcuenta.php');
 return false;
});


  });
