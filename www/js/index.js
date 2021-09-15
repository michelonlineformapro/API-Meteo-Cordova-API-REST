

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
    getWeather();
}

//Variables
//La méthode getItem() de l'interface Storage renvoie la valeur associée à la clé passée en paramètre.
let city  = localStorage.getItem("city")
//Recup de la carte resultat
let cardSelector = document.getElementById("card");

//Fonction API REST datas meteo
function getWeather(){
    //Si aucune ville
    if(city === null){
        cardSelector.append(`Merci d'entrer le nom d'une ville !`);
    }else{
        document.querySelector("div").id = "card";
        document.querySelector('div').removeAttribute('id');
    }

    //id de API
    let myAPID = "7e181b27cf94564bb5e54c5402ff9bb7";

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myAPID}`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data)
            let ville = data.name;
            let weatherType = data.weather[0].main;
            let icone = data.weather[0].icon;
            let temperature = data.main.temp;
            //En degre celcius = La méthode toFixed() permet de formater un nombre en notation à point-fixe.
            let tempCelsius = (temperature - 273.15).toFixed(1)

            //Afficher les données dans la carte
            const meteoBlock = `
                    <ul class="collection">
                        <li  class="collection-item center-align">
                            <img id="icone-weather" src="https://openweathermap.org/img/wn/${icone}@2x.png" alt="Icone temps" title="Temps" width="80px" height="80px">
                        </li>
                        <li class="collection-item red-text lighten-1"><h5>Ville : <h4 class="orange-text lighten-1"><b>${ville}</b></h4></h5></li>
                        <li class="collection-item red-text lighten-1"><h5>Temps : <h4 class="blue-text lighten-1"><b>${weatherType}</b></h4></h5></li>
                        <li class="collection-item red-text lighten-1"><h5>Température : <h4 class="green-text lighten-1"><b>${tempCelsius}°</b></h4></h5></li>
                    </ul>                   
                        `

            cardSelector.innerHTML = meteoBlock;
            //cardSelector.append(meteoBlock);
        })
        .catch(err =>  {
            console.log("Erreur : " + err);
        })
}

//Le formulaire
function validerFormulaire(){
    let inputCity = document.getElementById('city').value;
    if(inputCity.length >= 3){
        localStorage.setItem("city", inputCity);
        city = inputCity
        getWeather();
    }else{
        alert("Merci d'enter une ville !")
    }
}

//Au toucher sur le bouton
const btnValider = document.getElementById('getWeather');
btnValider.addEventListener('touchstart', () => {
    validerFormulaire();
});

let form = document.getElementById("meteoForm");
form.addEventListener('submit', (event) => {
    event.preventDefault();
    validerFormulaire();
})









