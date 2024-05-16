function login(evt) {

    console.log("test");

    evt.preventDefault();

    var data={
        email: $('#floatingInput').val(),
        password: $('#floatingPassword').val(),
    };

    $.ajax({
        //url: 'http://localhost:80/api/auth/login',
        url: 'https://api.h5.kevinmm.dk/login',
        type: 'POST',
        headers: { 'Accept': '*/*'},
        data: data,
        success: function(data){
            window.location.href = '/';
        },
    })

}