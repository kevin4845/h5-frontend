function showProfile(id) {
    window.location.href = 'profile.html?id='+id;
}

function fetchUsers() {
    $('#users').html('');
    $.ajax({
        //url: 'http://localhost/api/users',
        url: 'https://api.h5.kevinmm.dk/api/users',
        type: 'GET',
        headers: { 'Authorization': 'Bearer ' + document.cookie.split("=")[1]},
        success: function(data) {
            data.forEach(user => {
                if (user.id != me.id) {
                    $('#users').append(`
                    <div class="col-4">
                        <div class="card" style="width: 100%;">
                            <div class="card-body">
                            <h5 class="card-title">${user.name}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${user.role}</h6>
                            <p class="card-text">${user.description}</p>
                            <button type="button" class="btn btn-primary">Chat</button>
                            <button onclick="showProfile(${user.id})" type="button" class="btn btn-primary">Vis Profil</button>
                            </div>
                        </div>
                    </div>
                `);
                }
            });
        }
    });

}

function onBodyLoad() {
    fetchUsers();
}