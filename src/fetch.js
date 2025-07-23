import fetch from "node-fetch"
fetch("https://jsonplaceholder.typicode.com/todos/1")
.then( response => {
    if(!response.ok) {
        throw new Error('Not found!');
    }
    return response.json();
})
.then(data => {
    console.log(data.title);
})
.catch (err => {
    console.log(err);
})