$("#submit").on('click',function(){

    var data={
        email: $('floatingInput').val(),
        password: $('floatingPassword').val(),
    };

    $.ajax({
        url: 'https://api.h5.kevinmm.dk/login',
        type: 'POST',
        data: data,
        success:console.log("success"),
    })
})