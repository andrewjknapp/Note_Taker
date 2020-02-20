$('#showNotes').on('click', function(event) {
    
    $.get('/api/notes', function(data) {
        $('#note').text(data);
    })
})

$('#addBtn').on('click', function(event) {
    event.preventDefault();
    let newNote = { 
        title: "New Note",
        note: $('#noteInput').val().trim()
    };
    $('#noteInput').val('');
    $.post('/api/notes', newNote);
})

$('#delBtn').on('click', function(event) {
    event.preventDefault();
    let index = {index: Number($('#indexDelete').val())};
    
    $('#indexDelete').val('')
    $.post('/api/delete', index);
})
