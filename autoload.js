fetch("./partials/headers.html")
  .then(response => {
    return response.text()
  })
  .then(data => {
    document.getElementsByTagName("head")[0].innerHTML += data;
  });

fetch("./partials/navbar.html")
  .then(response => {
    return response.text()
  })
  .then(data => {
    document.querySelector("navbar").innerHTML = data;
  });


var me;


$.ajax({
  url: 'https://api.h5.kevinmm.dk/api/me',
  url: 'http://localhost:80/api/me',
  type: 'POST',
  data: {
    token: document.cookie.split("=")[1]
  },
  headers: { 'Accept': '*/*'},
  success: function(data) {
    me = data;
  },
  error: function(data) {
    window.location.href = 'login.html';
  }
});