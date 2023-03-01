
let searchIN = document.getElementById("lookUpCity")
let searchBTN = document.getElementById("btnS")

let listCities = []



searchBTN.addEventListener("click",search)
function search() {
    let city = searchIN.value
    listCities.push(city)
    localStorage.setItem('Previous Searches',JSON.stringify(listCities))
    getApi(city)
    console.log(city)

}

function getApi(city) {
    let urlRequest ="https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=dc343b9765250b6d21dfd17c4cba48a5&units=imperial";
    fetch(urlRequest)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        $("#yourCity").html(city)
        $("#presentDay").text(dayjs().format('(MMM/D/YYYY)'))
        $("#tempNow").html(data.main.temp + "℉")
        $("#windNow").html(data.wind.speed + " MPH") 
        $("#humidNow").html(data.main.humidity + "%")
    })
}

function renderPreviousCities() {
    let previousCities = JSON.parse(localStorage.getItem('Previous Searches'))
    if (previousCities !== null) {
        document.getElementById("pastCities").innerHTML = previousCities
    } else {
        return
    }
}

searchBTN.addEventListener("click", renderPreviousCities)




