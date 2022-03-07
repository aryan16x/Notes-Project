console.log("Notes App")
showNote()

let addBtn = document.getElementById('addBtn')
addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById('addTxt')
    let notes = localStorage.getItem('notes')
    if (notes == null) {
        notesObj = []
    }
    else {
        notesObj = JSON.parse(notes)
    }
    notesObj.push(addTxt.value)
    localStorage.setItem('notes', JSON.stringify(notesObj))
    addTxt.value = ""
    console.log(notesObj)
    showNote()

})

function showNote() {
    let notes = localStorage.getItem('notes')
    if (notes == null) {
        notesObj = []
    }
    else {
        notesObj = JSON.parse(notes)
    }
    let html = ""
    notesObj.forEach(function (element, index) {
        html += `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Note ${index + 1}</h5>
                        <p class="card-text">${element}</p>
                        <button class="btn btn-primary" id="${index}" onclick="delNote(this.id)">Delete Note</button>
                    </div>
                </div>`
    });
    let notesElm = document.getElementById('notes')
    if (notesObj.length == 0) {
        notesElm.innerHTML = `Nothing to show!!`
    }
    else {
        notesElm.innerHTML = html
    }
}

function delNote(index) {
    let notes = localStorage.getItem('notes')
    if (notes == null) {
        notesObj = []
    }
    else {
        notesObj = JSON.parse(notes)
    }

    notesObj.splice(index - 1, 1)
    localStorage.setItem('notes', JSON.stringify(notesObj))
    showNote()
}

let search = document.getElementById('searchTxt')
search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase()
    let noteCards = document.getElementsByClassName('noteCard')
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block"
        }
        else {
            element.style.display = "none"
        }
    })
})
