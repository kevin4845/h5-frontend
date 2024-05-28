
/**
 * Denne funktion kaldes, når sidens body indlæses.
 * Den henter brugere og tjekker, om en user_id parameter er til stede i URL'en.
 * Hvis en user_id er til stede, henter den beskeder for den pågældende bruger.
 */
function onBodyLoad() {
    fetchUsers();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.get('user_id')) {
        $.ajax({
            //url: 'http://localhost/api/users/'+urlParams.get('user_id'),
            url: 'https://api.h5.kevinmm.dk/api/users/'+urlParams.get('user_id'),
            type: 'GET',
            headers: { 'Authorization': 'Bearer ' + document.cookie.split("=")[1]},
            success: function(data) {
                fetchMessages(data);
            }
        });
    }
}

/**
 * Denne funktion henter brugere fra API'et og tilføjer dem til chatlisten.
 * Hver bruger i chatlisten er klikbar og udløser fetchMessages-funktionen, når den klikkes på.
 */
function fetchUsers() {
    
    $.ajax({
        //url: 'http://localhost/api/users',
        url: 'https://api.h5.kevinmm.dk/api/users',
        type: 'GET',
        headers: { 'Authorization': 'Bearer ' + document.cookie.split("=")[1]},
        success: function(data) {
            data.forEach(user => {
                if (user.id != me.id) {
                    $('#chat-list').append(`
                        <div id="user-${user.id}" onclick='fetchMessages(${JSON.stringify(user)})' class="chat-list-item">${user.name}</div>
                    `);
                }
            });
        }
    });
}

/**
 * Denne funktion henter beskeder mellem den indloggede bruger og en anden bruger.
 * Den anden bruger sendes som en parameter til funktionen.
 * Funktionen opdaterer også brugergrænsefladen for at fremhæve den valgte bruger i chatlisten.
 */
function fetchMessages(user) {

    $('#chat-list').children().each(function() {
        $(this).css('backgroundColor', 'white');
    });
    document.getElementById('user-'+user.id).style.backgroundColor = 'lightgrey';
    
    console.log(user);
    $('#chat').html('');
    $('#send-message-btn').html('');
    $.ajax({
        //url: 'http://localhost/api/messages',
        url: 'https://api.h5.kevinmm.dk/api/messages',
        type: 'GET',
        data: { user_id: user.id },
        headers: { 'Authorization': 'Bearer ' + document.cookie.split("=")[1]},
        success: function(data) {
            data.forEach(message => {
                if (message.from_user_id == me.id) {
                    $('#chat').append(`
                        <div class="d-flex align-items-center justify-content-end mb-4">
                            <div>
                                <span id="name">${me.name}</span>
                            </div>
                            <div class="bg-primary text-white rounded-lg p-2 mr-2">
                                <p class="mb-0 small">${message.message}</p>
                            </div>
                        </div>
                    `);
                } else {
                    $('#chat').append(`
                        <div class="d-flex align-items-center justify-content-start mb-4">
                            <div>
                                <span id="name">${user.name}</span>
                            </div>
                            <div class="bg-white rounded-lg p-2 ml-2">
                                <p class="mb-0 small" id="chat-message">${message.message}</p>
                            </div>
                        </div>
                    `);
                }
            });
            $('#send-message-btn').append(`
                <button onclick='sendMessage(${JSON.stringify(user)})' class="btn btn-primary w-100">Send</button>
            `);
        }
    });
}

function sendMessage(user) {
    $.ajax({
        //url: 'http://localhost/api/messages',
        url: 'https://api.h5.kevinmm.dk/api/messages',
        type: 'POST',
        data: {
            message: $('#message').val(),
            to_user_id: user.id
        },
        headers: { 'Authorization': 'Bearer ' + document.cookie.split("=")[1]},
        success: function() {
            fetchMessages(user);
            $('#message').val('');
        }
    });
}