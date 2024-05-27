function onBodyLoad() {
    fetchUsers();
}

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
                        <div onclick='fetchMessages(${JSON.stringify(user)})' class="chat-list-item">${user.name}</div>
                    `);
                }
            });
        }
    });
}

function fetchMessages(user) {
    
    console.log(user);
    $('#chat').html('');
    $('#send-message-btn').html('');
    $.ajax({
        //url: 'http://localhost/api/messages',
        url: 'https://api.h5.kevinmm.dk/api/users'+id,
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
        }
    });
}