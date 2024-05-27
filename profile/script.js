function onBodyLoad() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if (urlParams.get('id') === null) {
        
        document.getElementById('name').innerText = me.name;
        document.getElementById('role').innerText = me.role;
        document.getElementById('description').innerText = me.description;

    } else {
        const id = urlParams.get('id');
        fetchUser(id);
    }
}

function fetchUser(id) {
    $.ajax({
        //url: 'http://localhost/api/users/'+id,
        url: 'https://api.h5.kevinmm.dk/api/users/'+id,
        type: 'GET',
        headers: { 'Authorization': 'Bearer ' + document.cookie.split("=")[1]},
        success: function(data) {
            console.log(data);
            document.getElementById('name').innerText = data.name;
            document.getElementById('role').innerText = data.role;
            document.getElementById('description').innerText = data.description;
        }
    });

}