
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
                <h4 index='${i}'>${data[i].title}<span class="noteDelete"><button>&#215;</button></span></h4>
                <p>${data[i].note}</p>
            </div>
            `
            $('#storedNotes').append(currentNote);
        }
    })
}

function addNote() {
    if ($('#noteInput').val().trim() !== '') {
        
        let newNote = { 
            title: $('#noteTitle').val().trim(),
            note: $('#noteInput').val().trim()
        };
        $('#noteTitle').val('');
        $('#noteInput').val('');
        $.post('/api/notes', newNote, function(data) {
            
            showPrevNotes();
       });
    }
}

$('#addBtn').on('click', function(event) {
    event.preventDefault();

    addNote();

    
})

$('#editNote').on('click', function(event) {

    $.post('/api/delete', {index: 0}, function(data) {
        addNote();
        showPrevNotes();
   });


})

$('#storedNotes').on('click', function(event) {
    if(event.target.matches('button')) {
        
        let index = Number(event.target.parentElement.parentElement.getAttribute('index'));
        let indObj = {
            index: index
        };

        $.post('/api/delete', indObj, function(data) {
            
            showPrevNotes();
            
       });

       
        
    }

    if(event.target.matches('h4')) {
        let index = Number(event.target.getAttribute('index'));
        
        $.get('/api/notes', function(data) {
            data = JSON.parse(data);
            
            $('#noteTitle').val(data[index].title);
            $('#noteInput').val(data[index].note);
        })
        

        let indObj = {
            index: index
        };

        $.post('/api/current', indObj, function(data) {
             showPrevNotes();
        });
    }
})