function createPost() {
    $.ajax({
        //url: 'http://localhost/posts',
        url: 'https://api.h5.kevinmm.dk/posts',
        type: 'POST',
        data: {
            title: $('#title').val(),
            description: $('#description').val(),
            price: $('#price').val()
        },
    });
}