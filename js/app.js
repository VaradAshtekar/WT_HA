//console.log('hi');
showNotes();

//if user adds a node, add it to the local storage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let apptitle = document.getElementById("apptitle");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: apptitle.value,
        text: addTxt.value
    }

    notesObj.push(myObj);

    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    apptitle.value = "";
    showNotes();
})


function showNotes() {                             // this function is to display elements from localstorage
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";

    notesObj.forEach(function (element, index) {
        // let a= apptitle.value;
        //let b= addTxt.value;
        html += ` 
                  <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                        <div class="card-body">
                
                          <h5 id= "apptitle" class="card-title"> ${element.title}</h5>
                          <p class="card-text"> ${element.text} </p>
                          <button attr=${index} onclick = deleteNote(this.id) class="btn btn-danger"><i class="fa fa-trash" aria-hidden="true"></i></button>

                        </div>
                  </div>`
        //On writting this.id id of an element goes into onclick 
        console.log(element.title);
    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {

        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show ! Please add notes`;
    }
}

//function to delete a note
function deleteNote(index) {
    //    console.log('I am deleting', index); 

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

//search func

let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})

