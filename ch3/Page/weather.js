const API_KEY = "241051bf13976dd3ddf8b8d9f247255e";
const COORDS = 'coords';

function getWeather(lat, lng){
    fetch(`https://openweathermap.org/data/2.5/weather?${lat}&lon=${lng}&appid=${API_KEY}`);
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoError(err){
    console.log(err);
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    }
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }
    else{
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);      
    }
}

function init() {
    loadCoords();
}

init();