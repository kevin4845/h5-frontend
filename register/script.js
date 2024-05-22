fetch("./partials/headers.html")
  .then(response => {
    return response.text()
  })
  .then(data => {
    document.getElementsByTagName("head")[0].innerHTML += data;
  });

  function register(evt) {

    console.log("test");

    evt.preventDefault();

    var data={
        email: $('#floatingInput').val(),
        name: $('#floatingInputName').val(),
        password: $('#floatingPassword').val(),
        password_confirmation: $('#floatingPassword2').val(),
    };

    $.ajax({
        //url: 'http://localhost:80/api/auth/register',
        url: 'https://api.h5.kevinmm.dk/api/auth/register',
        type: 'POST',
        headers: { 'Accept': '*/*'},
        data: data,
        success: function(data){
            console.log(data.access_token);
            document.cookie = "token="+data.access_token;
            window.location.href = '/';
        },
    })
    
}