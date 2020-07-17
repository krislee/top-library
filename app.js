let myLibrary = []
const submit = document.querySelector('#submit')
const modalButton = document.querySelector('#addModal')
const list = document.querySelector("#bookList")
const bookTitle = document.querySelector('#inputTitle')
const bookAuthor = document.querySelector('#inputAuthor')
const bookPages = document.querySelector('#inputPages')
const readOptions = document.querySelector('select')

//Constructor to create book objects:
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read 
}

//New book objects are stored in an array:
function addBookToLibrary(){
    console.log(typeof (bookPages.value))
    //in order to always update new input values everytime we submit
    //we need to retrieve values(by setting the .value) inside the function 
    //because the function runs everytime we hit submit
    if(bookTitle.value && bookAuthor.value && readOptions.value && bookPages.value) {
        if(!isNaN(Number(bookPages.value))){
            myLibrary.push(new Book(bookTitle.value, bookAuthor.value, bookPages.value, readOptions.value)) 
        } else {
            alert("Please enter the number of pages")
        }
    } else {
        alert("Please enter all information")
    }
}


//Display book:
function displayBooks(book){
    const row = document.createElement('tr')
    const createTitle = document.createElement('td')
    const createAuthor = document.createElement('td')
    const createPages = document.createElement('td')
    const createStatus = document.createElement('td')
    createTitle.innerHTML = book.title
    createAuthor.innerHTML = book.author
    createPages.innerHTML = book.pages
    createStatus.innerHTML = `<button class="statusButton"> ${book.read} </button>`
    //row.innerHTML = `<td>${book.author}<td><td>${book.pages}<td><td>${book.read}<td>`
    //above code I formatting was weird, will try back using this code
    row.appendChild(createTitle)
    row.appendChild(createAuthor)
    row.appendChild(createPages)
    row.appendChild(createStatus)
    list.appendChild(row)

    createTitle.classList.add('deleteRow')

    createAuthor.classList.add('authorClass')
}

//Event Listeners:

submit.addEventListener('click', (e) => {
    addBookToLibrary()
    if(bookTitle.value && bookAuthor.value && readOptions.value && bookPages.value) {
        if(!isNaN(Number(bookPages.value))){
        displayBooks(myLibrary[myLibrary.length-1])
        }
    }
    document.querySelector('#modal').style.display = "none"
    const input = document.querySelectorAll('input') 
    input.forEach((eachInput) => {
        eachInput.value = ""
    })
})

//Remove books with event propagation:
list.addEventListener('click', function removeBook(e){
    if(e.target.classList.contains('deleteRow')){
        if(confirm("Are you sure you want to remove the book?")){
            let eachIndex = e.target.parentElement.rowIndex-1
            e.target.parentElement.remove() 
            myLibrary.forEach((book, index) => {
                if(index === eachIndex){
                    myLibrary.splice(eachIndex,1)
                }
            })
        }
    }
})

Book.prototype.status = function(){
    if(this.read === "Read"){
        this.read = "Not Read"
    } else if (this.read === "In Progress"){
        this.read = "Read"
    } else if (this.read === "Not Read"){
        this.read = "In Progress"
    }
}



//The following is commented out because a loop is run before buttons are created - the buttons
//are being created after we click submit (since the buttons are not created in the html template) 
//- but by then the loop has been ran:
    // const statusButtons = document.querySelectorAll('.statusButton')
    // statusButtons.forEach((button, index) => {
    //     button.addEventListener('click', (e) => {
    //         console.log("hi")

//Update status using event delegation:
    document.body.addEventListener('click', (e) => {
        if(e.target.classList.contains ('statusButton')){
            let buttonIndex = e.target.parentElement.parentElement.rowIndex-1
            myLibrary.forEach((book,index) => {
                if(buttonIndex === index){ //needed this conditional statement or else 
                //it only changed once and the last button wouldn't work... 
                //this is because ??
                myLibrary[buttonIndex].status() //updated status in myLibrary array
                e.target.innerHTML = book.read
                }
            })
            console.log(myLibrary)
        }
    })          

//https://dev.to/akhil_001/adding-event-listeners-to-the-future-dom-elements-using-event-bubbling-3cp1
//https://stackoverflow.com/questions/34896106/attach-event-to-dynamic-elements-in-javascript

// list.addEventListener('click', (e) =>{
//         if(e.target.classList.contains ('statusButton')){
//             let buttonIndex = e.target.parentElement.parentElement.rowIndex-1
//             myLibrary.forEach((book, index) => {
//             if(index === buttonIndex){
//                 myLibrary[buttonIndex].status()
//             }
//         })
//         }
//     })

modalButton.addEventListener('click', (e) => {
    document.querySelector('#modal').style.display = "block"
})
document.querySelector('.close').addEventListener('click', (e) =>{
    document.querySelector('#modal').style.display = "none"
})

//not responding:
window.addEventListener('click', (e) => {
    if(e.target == document.querySelector('#modal')){
        document.querySelector('#modal').style.display = "none"
    }
})

/*Still need to work on: 
1) Centering Enter book info in pop up - don't know how, but display-inline block 
had something to do with it
2) figure out why div is not adding when written in html - worked later on by itself...
3) figure out to make sure user only adds numbers to pages - resolved
4) how to make window.eventListener work */

//Study on Event Listener Delegations and Propragations Examples



// Inspired by https://github.com/constantinginga/library
