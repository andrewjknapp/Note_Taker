
$( document ).ready(function() {
    showPrevNotes();
});
function showPrevNotes() {

    $.get('/api/notes', function(data) {
        $('#storedNotes').empty();
        
        data = JSON.parse(data);
        for (let i = 0; i < data.length; i++) {
            let currentNote = `
            <div class="prevNote">
                <h4>${data[i].title}<span class="noteDelete"><button index='${i}'>&#215;</button></span></h4>
                <p>${data[i].note}</p>
            </div>
            `
            $('#storedNotes').prepend(currentNote);
        }
    })
}

$('#addBtn').on('click', function(event) {
    event.preventDefault();

    $.get('/api/notes', function(data) {
        $('#note').text(data);
    })

    if ($('#noteInput').val().trim() !== '') {
        let newNote = { 
            title: $('#noteTitle').val().trim(),
            note: $('#noteInput').val().trim()
        };
        $('#noteTitle').val('');
        $('#noteInput').val('');
        $.post('/api/notes', newNote);
    }

    showPrevNotes();
})

$('#delBtn').on('click', function(event) {
    event.preventDefault();
    if ($('#indexDelete').val() !== '') {
        let index = {index: Number($('#indexDelete').val())};
    
        $('#indexDelete').val('')
        $.post('/api/delete', index);
    }
})
