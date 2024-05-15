$("#submit").on('click',function(evt){

    evt.preventDefault();

    var data={
        email: $('floatingInput').val(),
        password: $('floatingPassword').val(),
    };

    $.ajax({
        url: 'http://localhost:80/auth/login',
        // url: 'https://api.h5.kevinmm.dk/auth/login',
        type: 'POST',
        data: data,
        success: function(data){
            window.location.href = '/';
        },
    })
})