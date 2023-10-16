const button = document.querySelector('button');
const div = document.querySelector('div');

div.addEventListener('click', () => {
    console.log('Div Clicked');
}, true);

button.addEventListener('click', (e)=>{
    console.log('Button Clicked');
    e.stopPropagation();
}, true)