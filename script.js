const temperature_mappings = [
    [10, 'rgba(15, 10, 150, 0.6)'],
    [20, 'rgba(160, 221, 235, 0.6)'],
    [30, 'rgba(255, 225, 0, 0.6)'],
    [40, 'rgba(255, 77, 0, 0.7)'],
    [50, 'rgba(197, 13, 13, 0.6)'] 
];

const days = ['Sun','Mon','Tue','Wed','Thur','Fri','Sat'];

// setting background color of page dynamically regarding the current temperature;
let current_temperature = 44;
let bg_color;
let userInput = 'Berlin';

let API_URL = `https://api.openweathermap.org/data/2.5/forecast?units=metric&q=`
const API_KEY = '98a5256208b5874975431759e837851c';


let input_field = document.querySelector('.input-field');
async function handleSubmit () {
    userInput = input_field.value;
    console.log(API_URL);
    input_field.value = '';

    getWeather(userInput);

}
 

function setBackground (){
    for (let i = temperature_mappings.length -1 ; i>= 0 ; i--){
        if ( current_temperature >= temperature_mappings[i][0] ){
            console.log('here')
            bg_color = temperature_mappings[i][1];
            break;
        }
        if (i == 0){
            bg_color = temperature_mappings[i][1]
        }
        console.log('here' ,i, current_temperature)
    }    
    let background_container = document.querySelector('.container');
    background_container.style.backgroundImage = `linear-gradient(${bg_color}, white)`;
}



let show_temp = document.querySelector('.current-temp-container > h1')
let show_desc = document.querySelector('.current-temp-container > h5')
let show_feel = document.querySelector('.current-temp-container > h2')
let show_loc = document.querySelector('.current-temp-container > h4')
let show_time = document.querySelector('.current-temp-container > h6')


let show_temp_forecast = document.querySelectorAll('.forecast > h1')
let show_desc_forecast = document.querySelectorAll('.forecast > h5')
let show_loc_forecast = document.querySelectorAll('.forecast > h4')
let show_time_forecast = document.querySelectorAll('.forecast > h2')
console.log(show_desc_forecast)

// GETTING WEATHER REPORT:

async function getWeather(city) {
    const res = await fetch(API_URL + city + `&appid=${API_KEY}`)
    const data = await res.json();
    console.log(data)

    current_temperature = Math.round(data['list']['0']['main']['temp'])
    show_temp.innerHTML = `${current_temperature} <sup>&deg;</sup>C`;
    show_feel.innerHTML = 'feels like ' + Math.round(data['list']['0']['main']['feels_like']) + `<sup>&deg;</sup>C`;
    show_desc.innerHTML = data['list']['0']['weather']['0']['main'];
    show_loc.innerHTML = data['city']['name'];
    show_time.innerHTML = data['city']['country']

    let counter = 0;
    let forecast_cards = document.querySelectorAll('.forecast'); 
    for (let i = 0; i < 40 ; i+=8){
        console.log("i", i , 'c' , counter)
        let temperature = Math.round(data['list'][i]['main']['temp'])
        console.log(temperature)
        show_temp_forecast[counter].innerHTML = `${temperature} <sup>&deg;</sup>C`;
        show_desc_forecast[counter].innerHTML = data['list'][i]['weather']['0']['description'];
        show_loc_forecast[counter].innerHTML = data['city']['name'];
        show_time_forecast[counter].innerHTML = days[((new Date().getDay() + counter) % 7)] 
   
        counter++;
    }


    setBackground();
}

//console.log('2023-7-14'.getDay())

//setBackground()
// getWeather();
console.log(new Date().getDay())