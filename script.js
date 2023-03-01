// Targeting html elements for searching button and for city being searched
let searchIN = document.getElementById("lookUpCity")
let searchBTN = document.getElementById("btnS")

// Array for previous cities
let listCities = []



// Event listener on click search button sets up local storage for previous cities
searchBTN.addEventListener("click",search)
function search() {
    let city = searchIN.value
    listCities.push(city)
    localStorage.setItem('Previous Searches',JSON.stringify(listCities))
    getApi(city)
    console.log(city)

}
// get API setting for city and using imperial format for numbers
function getApi(city) {
    let urlRequest ="https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=dc343b9765250b6d21dfd17c4cba48a5&units=imperial";
    fetch(urlRequest)
    .then(function (response) {
      return response.json();
    })
    // Setting up jquery to input temp,wind speed, and humidity
    .then(function (data) {
        $("#yourCity").html(city)
        $("#presentDay").text(dayjs().format('(MMM/D/YYYY)'))
        $("#tempNow").html(data.main.temp + "℉")
        $("#windNow").html(data.wind.speed + " MPH") 
        $("#humidNow").html(data.main.humidity + "%")
    })
}

// function to render te previous cities that the user searches for
function renderPreviousCities() {
    let previousCities = JSON.parse(localStorage.getItem('Previous Searches'))
    if (previousCities !== null) {
        document.getElementById("pastCities").innerHTML = previousCities
    } else {
        return
    }
}
// On click display previous cities
searchBTN.addEventListener("click", renderPreviousCities)




