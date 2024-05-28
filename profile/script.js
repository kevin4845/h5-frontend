function onBodyLoad() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if (urlParams.get('id') === null) {
        
        fetchUser();
        document.getElementById('edit-profile-btn-container').innerHTML = `
            <div class="container">
                <button type="button" onclick="editProfile(event)" class="btn btn-primary mt-2" >
                    Rediger Profil
                </button>
            </div>
        `;

        document.getElementById('add-timeline-point-btn').innerHTML = `
            <button type="button" onclick="addTimelinePoint(event)" class="btn btn-primary mt-2" >
                +
            </button>
        `;

    } else {
        const id = urlParams.get('id');
        fetchUser(id);
    }

    fetchTimeline();
}

function fetchUser(id) {
    if (id == null) {
        $.ajax({
            url: 'https://api.h5.kevinmm.dk/api/me',
            //url: 'http://localhost:80/api/me',
            type: 'POST',
            data: {
              token: document.cookie.split("=")[1]
            },
            headers: { 'Accept': '*/*'},
            success: function(data) {
                document.getElementById('name').innerText = data.name;
                document.getElementById('role').innerText = data.role;
                document.getElementById('description').innerText = data.description;
            },
            error: function(data) {
              window.location.href = 'login.html';
            }
          });
    } else {
        $.ajax({
            //url: 'http://localhost/api/users/'+id,
            url: `https://api.h5.kevinmm.dk/api/users/`+id,
            type: 'GET',
            headers: { 'Authorization': 'Bearer ' + document.cookie.split("=")[1]},
            success: function(data) {
                document.getElementById('name').innerText = data.name;
                document.getElementById('role').innerText = data.role;
                document.getElementById('description').innerText = data.description;
            }
        });
    }

}

function fetchTimeline() {
    $('#timeline').html('');

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if (urlParams.get('id') === null) {
        
        $.ajax({
            url: 'https://api.h5.kevinmm.dk/api/timelines',
            //url: 'http://localhost:80/api/timelines',
            type: 'GET',
            headers: { 'Authorization': 'Bearer ' + document.cookie.split("=")[1]},
            success: function(data) {
                data.forEach(timeline => {
                    let start = new Date(timeline.start).toLocaleDateString();
                    let end = timeline.end != null ? new Date(timeline.end).toLocaleDateString() : "Nu";
                    $('#timeline').append(`
                        <li id="timeline-${timeline.id}" class="event" data-date="${start} - ${end}">
                            <button onclick="editTimeline(${timeline.id}, '${timeline.start}', '${timeline.end}', '${timeline.title}', '${timeline.description}')" class="btn btn-primary btn-sm"><i class="bi bi-pencil"></i></button>
                            <button onclick="deleteTimeline(${timeline.id})" class="btn btn-danger btn-sm"><i class="bi bi-trash"></i></button>
                            <h3>${timeline.title}</h3>
                            <p>${timeline.description}</p>
                        </li>
                    `);
                });
            },
        });

    } else {
        const id = urlParams.get('id');

        $.ajax({
            url: 'https://api.h5.kevinmm.dk/api/timelines',
            //url: 'http://localhost:80/api/timelines',
            type: 'GET',
            data: { user_id: id },
            headers: { 'Authorization': 'Bearer ' + document.cookie.split("=")[1]},
            success: function(data) {
                data.forEach(timeline => {
                    let start = new Date(timeline.start).toLocaleDateString();
                    let end = timeline.end != null ? new Date(timeline.end).toLocaleDateString() : "Nu";
                    $('#timeline').append(`
                        <li class="event" data-date="${start} - ${end}">
                            <h3>${timeline.title}</h3>
                            <p>${timeline.description}</p>
                        </li>
                    `);
                });
            },
        });
        
    }
}

function editProfile(evt) {
    evt.preventDefault();
    $('#redigereProfilModal').modal('show');
    $('#updateName').val(me.name);
    $('#updateRole').val(me.role);
    $('#updateDescription').val(me.description);
}

function updateProfile(){
    $.ajax({
        url: `https://api.h5.kevinmm.dk/api/users/${me.id}`,
        type: 'PUT',
        headers: { 'Authorization': 'Bearer ' + document.cookie.split("=")[1]},
        data:{
            name: $('#updateName').val(),
            role: $('#updateRole').val(),
            description: $('#updateDescription').val()
        },
        success: function(){
            onBodyLoad();
            hideModal();
            fetchUser();
        }
    });
}

function hideModal() {
    $('#redigereProfilModal').modal('hide');
}

function addTimelinePoint() {
    $('#timeline').append(`
        <li class="event" data-date="">
            <div class="grid">
                <div class="row">
                    <div class="col-6">
                        <input type="date" name="timelineStart" id="timelineStart" class="form-control">
                    </div>
                    <div class="col-6">
                        <input type="date" name="timelineEnd" id="timelineEnd" class="form-control">
                    </div>
                </div>
                <div>
                    <input type="text" class="form-control" placeholder="Titel" id="timelineTitle">
                </div>
                <div>
                    <input type="text" class="form-control" placeholder="Beskrivelse" id="timelineDescription">
                </div>
                <div>
                    <button onclick="createTimeline()" class="btn btn-primary text-right">Tilføj</button>
                </div>
            </div>
        </li>
    `);
}

function createTimeline() {
    $.ajax({
        //url: `https://api.h5.kevinmm.dk/api/timelines`,
        url: `http://localhost/api/timelines`,
        type: 'POST',
        headers: { 'Authorization': 'Bearer ' + document.cookie.split("=")[1]},
        data:{
            title: $('#timelineTitle').val(),
            description: $('#timelineDescription').val(),
            start: $('#timelineStart').val(),
            end: $('#timelineEnd').val()
        },
        success: function(){
            fetchTimeline();
            hideModal();
        }
    });
}

function editTimeline(id, start, end, title, description) {
    let startDate = new Date(start);
    let formattedStart = startDate.toISOString().slice(0,10);
    
    let formattedEnd;
    if (end != 'null') {
        let endDate = new Date(end);
        formattedEnd = endDate.toISOString().slice(0,10);
    } else {
        formattedEnd = null;
    }

    $('#timeline-'+id).html(`
        <li class="event" data-date="">
            <div class="grid">
                <div class="row">
                    <div class="col-6">
                        <input value="${formattedStart}" type="date" name="timelineStart" id="timelineStart" class="form-control">
                    </div>
                    <div class="col-6">
                        <input value="${formattedEnd}" type="date" name="timelineEnd" id="timelineEnd" class="form-control">
                    </div>
                </div>
                <div>
                    <input value="${title}" type="text" class="form-control" placeholder="Titel" id="timelineTitle">
                </div>
                <div>
                    <input value="${description}" type="text" class="form-control" placeholder="Beskrivelse" id="timelineDescription">
                </div>
                <div>
                    <button onclick="saveTimeline(${id})" class="btn btn-primary text-right">Gem</button>
                </div>
            </div>
        </li>
    `);
}

function saveTimeline(id) {
    $.ajax({
        //url: `https://api.h5.kevinmm.dk/api/timelines/${id}`,
        url: `http://localhost/api/timelines/${id}`,
        type: 'PUT',
        headers: { 'Authorization': 'Bearer ' + document.cookie.split("=")[1]},
        data:{
            title: $('#timelineTitle').val(),
            description: $('#timelineDescription').val(),
            start: $('#timelineStart').val(),
            end: $('#timelineEnd').val()
        },
        success: function(){
            fetchTimeline();
            hideModal();
        }
    });
}

function deleteTimeline(id) {
    $.ajax({
        //url: `https://api.h5.kevinmm.dk/api/timelines/${id}`,
        url: `http://localhost/api/timelines/${id}`,
        type: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + document.cookie.split("=")[1]},
        success: function(){
            fetchTimeline();
        }
    });
}