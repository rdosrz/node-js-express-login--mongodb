$('#kt_login_signin_submit').click(function(e) {
        e.preventDefault();
        var btn = $(this);
        var form = $(this).closest('form');

        form.validate({
            rules: {
                username: {
                    required: true
                    
                },
                password: {
                    required: true
                }
            }
        });

        if (!form.valid()) {
            return;
        }

        btn.addClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', true);


        var signData = {
            username: $("#username").val(),
            password:$("#password").val()           
        }

        $.ajax({
            url: "/api/auth/signin",
            type:"POST",
            dataType:"json",
            contentType: "application/json",
            data: JSON.stringify(signData),
        })
        .done(function(response){
            $(location).prop('href', '/')
        })
        .fail(function(xhr, textStatus, errorThrown){
              
            setTimeout(function() {
                btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
               
              }, 1000);
              $('#errort').show();
            
      
              return xhr.responseText;

               
             });


    });







