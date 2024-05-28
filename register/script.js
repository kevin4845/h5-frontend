/**
 * Henter indholdet af "headers.html" og tilføjer det til sidens <head> element.
 */
fetch("./partials/headers.html")
  .then(response => {
    return response.text()
  })
  .then(data => {
    document.getElementsByTagName("head")[0].innerHTML += data;
  });

/**
 * Denne funktion kaldes, når brugeren forsøger at registrere sig.
 * Den forhindrer standardformularindsendelsen, samler formdata og sender en POST-anmodning til API'et for at registrere brugeren.
 * Hvis registreringen er vellykket, gemmes den modtagne adgangstoken i en cookie, og brugeren omdirigeres til hjemmesiden.
 */
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