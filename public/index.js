$('#showNotes').on('click', function(event) {
    
    $.get('/api/notes', function(data) {
        $('#note').text(data);
    })
})
