$('#showNotes').on('click', function(event) {
    
    $.get('/api/notes', function(data) {
        $('#note').text(data);
    })
})

$('#addBtn').on('click', function(event) {
    event.preventDefault();
    let newNote = { note: $('#noteInput').val().trim()};

    $.post('/api/notes', newNote);
})
