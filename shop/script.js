function createPost() {
    $.ajax({
        //url: 'http://localhost/api/posts',
        url: 'https://api.h5.kevinmm.dk/api/posts',
        type: 'POST',
        data: {
            title: $('#title').val(),
            description: $('#description').val(),
            price: $('#price').val()
        },
    });
}