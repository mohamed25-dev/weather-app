const weatherForm = document.querySelector('form');
const search      = document.querySelector('input');

const message_1   = document.querySelector('#message-1');
const message_2   = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e)=> {
    e.preventDefault();

    message_1.textContent = 'Loading ..';
    message_2.textContent = ' ';

    const location = search.value;

    fetch('http://localhost:3000/weather?search='+location).then((res)=> {
        res.json().then((data)=> {
            message_1.textContent = ' ';
            if(data.error) {
                console.log("error happened " + data.error);
                message_2.textContent = data.error;
            } else {
                console.log(data);
                message_2.textContent = data.forecast;
            }
        });
    });
});