console.log('cilent side is beginning');

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault(); // prevent to refresh the browser
    
    const location = search.value

    const url = '/weather?address=' + location

    messageOne.textContent = 'loading~';
    messageTwo.textContent = '';


    fetch(url).then((response) => (
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error
            }else{
                messageOne.textContent = data.location 
                messageTwo.textContent = data.forecast
                
            }
        })
    ))
})