window.onload = () => {

    if (navigator.geolocation.getCurrentPosition) {

        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;

            AppID = '1d97d33b26d84d11baa30a4b48206b58';

            // Fetch data from API
            fetch(`https://api.weatherbit.io/v2.0/current?&lat=${lat}&lon=${lon}&key=${AppID}`)

                .then(res => res.json())
                .then((data) => {


                    // Place data in HTML
                    let weather = data.data[0].weather.icon
                    document.getElementById('img').src = `./img/icons/${weather}.svg`

                    let description = data.data[0].weather.description
                    document.getElementById('condition').innerHTML = description

                    let temp = Math.round(data.data[0].temp);
                    document.getElementById('temp').innerHTML = temp + '&deg'

                    let city = data.data[0].city_name
                    document.getElementById('city').innerHTML = city

                    let msg = new SpeechSynthesisUtterance(`currently in ${city} is ${temp} degrees and ${description}`)
                    speechSynthesis.speak(msg)

                    // 5 days forecast
                    fetch(`https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&key=${AppID}`)
                        .then(res => res.json())
                        .then(data => {

                            // Place data in HTML

                            let output = ''
                            data.data.forEach((day, i) => {
                                output += `<div class="day">
                                        <div class="max">${Math.round(day.app_max_temp)}&deg</div>
                                        <img class="icon" src="./img/icons/${day.weather.icon}.svg">
                                        <div class="description">${day.weather.description}</div>
                                        <div class="min">${Math.round(day.app_min_temp)}&deg</div>
                                    </div>`
                                    if (i < 5){
                                        document.getElementById('days').innerHTML = output;
                                    }
                            });
                        })
                })
        });
    }
}