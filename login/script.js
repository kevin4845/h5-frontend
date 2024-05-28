function login(evt) {

    console.log("test");

    evt.preventDefault();

    var data={
        email: $('#floatingInput').val(),
        password: $('#floatingPassword').val(),
    };

    $.ajax({
        url: 'http://localhost:80/api/auth/login',
        //url: 'https://api.h5.kevinmm.dk/api/auth/login',
        type: 'POST',
        headers: { 'Accept': '*/*'},
        data: data,
        success: function(data){
            console.log(data.access_token);
            document.cookie = "token="+data.access_token;
            window.location.href = '/mainPage.html';
        },
    })

}