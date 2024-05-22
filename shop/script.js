function createPost() {
    $.ajax({
        //url: 'http://localhost/api/posts',
        url: 'https://api.h5.kevinmm.dk/api/posts',
        type: 'POST',
        headers: { 'Authorization': 'Bearer ' + document.cookie.split("=")[1]},
        data: {
            title: $('#title').val(),
            description: $('#description').val(),
            price: $('#price').val()
        },
        success: function() {
            fetchPosts();
            hideModal();
        }
    });
}

function fetchPosts() {
    $('#posts').html('');
    $.ajax({
        //url: 'http://localhost/api/posts',
        url: 'https://api.h5.kevinmm.dk/api/posts',
        type: 'GET',
        headers: { 'Authorization': 'Bearer ' + document.cookie.split("=")[1]},
        success: function(data) {
            console.log(data);
            data.forEach(post => {
                $('#posts').append(`
                    <div class="col-4">
                        <div class="card" style="width: 100%;">
                            <div class="card-body">
                            <h5 class="card-title">${post.title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${post.price} DKK</h6>
                            <p class="card-text">${post.description}</p>
                            ${me.id == post.user_id ? '' : '<button type="button" class="btn btn-primary">Kontakt Sælger</button>'}
                            ${me.id == post.user_id ? `<button onclick="deletePost(${post.id})" type="button" class="btn btn-danger"><i class="bi bi-trash"></i></button>` : ''}
                            </div>
                        </div>
                    </div>
                `);
            });
        }
    });

}

function deletePost(id) {
    $.ajax({
        //url: `http://localhost/api/posts/${id}`,
        url: `https://api.h5.kevinmm.dk/api/posts/${id}`,
        type: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + document.cookie.split("=")[1]},
        success: function() {
            fetchPosts();
        }
    });
}

function hideModal() {
    $('#createPostModal').modal('hide');
}

function onLoad() {
    fetchPosts();
}