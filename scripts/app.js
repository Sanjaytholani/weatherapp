const cityForm=document.querySelector('form');
const details=document.querySelector('.details');
const card=document.querySelector('.card');
const time=document.querySelector('img.time');
const icon=document.querySelector('.icon img');
const updateCity = async (city) => {
    const cityDetails=await getCity(city);
    const weather= await getWeather(cityDetails.Key);
    return{
        cityDetails,
        weather
    }
}


const updateUI =  (data)=>{
    const cityDetails=data.cityDetails;
    const weather=data.weather;
    details.innerHTML=`
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>

    `;
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
    let timesrc=null;
    if(weather.IsDayTime){
        timesrc='img/day.svg';
    }
    else{
        timesrc='img/night.svg';
    }
    time.setAttribute('src',timesrc);
    const iconsrc=`img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src',iconsrc);
}
cityForm.addEventListener('submit',event => {
    event.preventDefault();
    const city = cityForm.city.value;
    cityForm.reset();
    updateCity(city).then(data=>{updateUI(data)}).catch(err => console.log(err));
});