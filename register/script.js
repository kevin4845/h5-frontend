fetch("./partials/headers.html")
  .then(response => {
    return response.text()
  })
  .then(data => {
    document.getElementsByTagName("head")[0].innerHTML += data;
  });

  function registrer(evt) {

    console.log("test");

    evt.preventDefault();
    var password1 = document.getElementById("floatingPassword");
    var password2 = document.getElementById("floatingPassword2");
    if(password2 == password1){
    var data={
        email: $('#floatingInput').val(),
        naven: $('floatingInputName').val(),
        password: $('#floatingPassword').val(),
    };

    $.ajax({
        //url: 'http://localhost:80/api/auth/login',
        url: 'https://api.h5.kevinmm.dk/register',
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
}