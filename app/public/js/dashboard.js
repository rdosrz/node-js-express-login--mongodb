$(document).ready(function() {
              
        $.ajax({
            url: "/api/auth/tickets",
            type:"GET",
            dataType:"json",
            contentType: "application/json",
            
        })
        .done(function(response){
           
            $('#tcontent').empty();
            $('#tupdate').empty();

                           var newHTML='';
                           var updateHTML='';
        
                    $.each(response, function( i ) {
                                
                            newHTML+='<tr role="row" class="odd"> <td>'+this.idticket+'</td><td>'+this.customername+'</td> <td>'+this.ticketdetails+'</td><td>'+this.date+'</td> <td><span class="kt-badge  kt-badge--success kt-badge--inline kt-badge--pill">'+this.priority+'</span></td><input type="hidden" id="idb" name="idb" value="'+this._id+'" required/> <td><a id="delete" class="btn btn-sm btn-clean btn-icon btn-icon-md" onClick="showDiv('+this.idticket+');" title="Eliminar"><img src="images/icon-trash.png" width="13px"></a></td> </tr>' ;
                            
                            updateHTML+='<tr role="row" class="odd"><form  class="kt-form" method="post"  id="formnewTicket" /></form>'+
                                        '<td><input  type="text" id="id'+this.idticket+'" name="id" maxlength="2" value="'+this.idticket+'" required /></td>'+
                                        '<td><input type="text" id="usuario'+this.idticket+'" name="usuario" maxlength="30" value="'+this.customername+'" required/></td>'+
                                        '<td><input type="text" id="ticket'+this.idticket+'" name="ticket" size="50" maxlength="100" value="'+this.ticketdetails+'" required/></td>'+
                                        '<td><input type="date" id="fecha'+this.idticket+'" name="fecha" value="'+this.date+'" required></td>'+
                                        '<td>'+
                                        '   <span class="">'+
                                        '      <select name="prioridad" id="prioridad'+this.idticket+'" required>'+
                                        '       <option value="'+this.priority+'">Seleccionar</option>' + 
                                        '       <option value="alta">Alta</option>'+
                                        '         <option value="media">Media</option>'+
                                        '         <option value="baja">Baja</option>'+
                                        '      </select>'+
                                        '   </span>'+
                                        '</td>'+
                                        '<td><button id="kt_newTicket'+this.idticket+'" onClick="updateTicket('+this.idticket+');"  class="btn btn-brand btn-elevate">Actualizar</button></td>'+
                                        '</form></tr>';
                                       
                                       
                            
                            $('#tcontent').html( newHTML);
                            $('#tupdate').html( updateHTML);

                        });
                        
                        
               
             }).fail(function(xhr, textStatus, errorThrown){
                        
                console.log("ERROR: ",xhr.responseText)
       return xhr.responseText;

  });

});
  


  $('#logout').click(function(e) {
    e.preventDefault();

 
    $.ajax({
        url: "/api/auth/signout",
        type:"POST",
        dataType:"json",
        contentType: "application/json",
        
    })
    .done(function(response){
        $(location).prop('href', 'http://localhost:8080/')
    })
    .fail(function(xhr, textStatus, errorThrown){
          
       
        
        console.log("ERROR: ",xhr.responseText)
          return xhr.responseText;

           
         });


});



$('#kt_newTicket').click(function(e) {
    e.preventDefault();


     var btn = $(this);
 
    

    var newData = {
        idticket: $("#id").val(),
        customername:$("#usuario").val(),
        ticketdetails:$("#ticket").val(), 
        date:$("#fecha").val(), 
        priority:$("#prioridad").val()                                         
    }

    
    $.ajax({
        url: "/api/auth/newticket",
        type:"POST",
        dataType:"json",
        contentType: "application/json",
        data: JSON.stringify(newData),
    })
    .done(function(response){
        $(location).prop('href', 'http://localhost:8080/')
    })
    .fail(function(xhr, textStatus, errorThrown){
          
        setTimeout(function() {
            btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
            alert("Ocurrio un error  en el guardado. Intenta Más tarde");
          }, 1000);
                      
        console.log("ERROR: ",xhr.responseText)
          return xhr.responseText;

           
         });

       
});


function showDiv(pageid)
{
      
    var newData = {
        _id: pageid                                      
    }

    $.ajax({
        url: "/api/auth/deleteticket",
        type:"POST",
        dataType:"json",
        contentType: "application/json",
        data: JSON.stringify(newData),
    })
    .done(function(response){
        $(location).prop('href', 'http://localhost:8080/')
    })
    .fail(function(xhr, textStatus, errorThrown){

                     
        console.log("ERROR: ",xhr.responseText)
          return xhr.responseText;

           
         });
}

function updateTicket(idticket)
{
    

      var newData = {
        idticket: $("#id"+idticket).val(),
        customername:$("#usuario"+idticket).val(),
        ticketdetails:$("#ticket"+idticket).val(), 
        date:$("#fecha"+idticket).val(), 
        priority:$("#prioridad"+idticket).val()                                         
    }
    console.log(newData);
    
    $.ajax({
        url: "/api/auth/updateticket",
        type:"POST",
        dataType:"json",
        contentType: "application/json",
        data: JSON.stringify(newData),
    })
    .done(function(response){
        $(location).prop('href', 'http://localhost:8080/')
    })
    .fail(function(xhr, textStatus, errorThrown){

                     
        console.log("ERROR: ",xhr.responseText)
          return xhr.responseText;

           
         });
}





