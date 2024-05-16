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