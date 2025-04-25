const chave = 'fc1bc8b7851adefe16113f191340ee76';

function buscarClima() {
    const cidade = document.querySelector('input').value;
    const urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${chave}&units=metric&lang=pt_br`;

    fetch(urlApi)
        .then((response) => {
            if (!response.ok) throw new Error("Erro ao buscar dados");
            return response.json();
        })
        .then((weatherData) => {
            const latitude = weatherData.coord.lat;
            const longitude = weatherData.coord.lon;
            const urlApi2 = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,is_day,wind_speed_10m,relative_humidity_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=America/Sao_Paulo&forecast_days=3`;
            const iconCode = weatherData.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            const pais = weatherData.sys.country;
            const cidadeAtual = weatherData.name;
            const data = new Date();


            const diasDaSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
            const diaSemana = diasDaSemana[data.getDay()];
            const dia = data.getDate();
            const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
            const mes = meses[data.getMonth()];


            const dataAtual = `${diaSemana}, ${dia} de ${mes}`;

            document.getElementById('icone-clima').src = iconUrl;
            document.getElementById('icone-clima').alt = weatherData.weather[0].description;
            const descricao = weatherData.weather[0].description;

            fetch(urlApi2)
                .then((response) => {
                    if (!response.ok) throw new Error("Erro ao buscar dados");
                    return response.json();
                })
                .then((forecastData) => {
                    console.log(forecastData);
                    const temperatura = forecastData.current.temperature_2m;
                    const temperaturaMaxima = forecastData.daily.temperature_2m_max[0];
                    const temperaturaMinima = forecastData.daily.temperature_2m_min[0];
                    const vento = forecastData.current.wind_speed_10m;
                    const umidade = forecastData.current.relative_humidity_2m;
                    const dia = forecastData.current.is_day;
                    const codeWeather = forecastData.current.weather_code;


                    const cidadeElement = document.querySelector('.cidade');
                    if (cidadeElement) cidadeElement.textContent = `${cidadeAtual}, ${pais}`;

                    const temperaturaElement = document.querySelector('.temperatura');
                    if (temperaturaElement) temperaturaElement.textContent = `${temperatura}°C`;

                    const tempMaxElement = document.querySelector('.temp-max');
                    if (tempMaxElement) tempMaxElement.textContent = `${temperaturaMaxima}°C`;

                    const tempMinElement = document.querySelector('.temp-min');
                    if (tempMinElement) tempMinElement.textContent = `${temperaturaMinima}°C`;

                    const ventoElement = document.querySelector('.veloc-vento');
                    if (ventoElement) ventoElement.textContent = `${vento} m/s`;

                    const umidadeElement = document.querySelector('.umi');
                    if (umidadeElement) umidadeElement.textContent = `${umidade}%`;

                    const descricaoElement = document.querySelector('.descricao');
                    if (descricaoElement) descricaoElement.textContent = `${descricao}`;

                    const dataElement = document.querySelector('.data');
                    if (dataElement) dataElement.textContent = `${dataAtual}`;

                    if (dia === 1) {
                        document.body.classList.remove('noite');
                        document.body.classList.add('dia');
                    } else {
                        document.body.classList.remove('dia');
                        document.body.classList.add('noite');
                    }
                    console.log(codeWeather);
                    const mensagem = document.querySelector('.aviso');
                    if(codeWeather >= 0 && codeWeather < 45){
                        mensagem.textContent = 'Dia Ideal para uma caminhada🏃‍♂️‍➡️';
                    }else if(codeWeather >= 45 && codeWeather <= 67){
                        mensagem.textContent = 'Otimo dia para para assistir um filme🎬, leve um guarda chuva se sair.';
                    }else if(codeWeather >= 68 && codeWeather <= 86){
                        mensagem.textContent = 'Leve um guarda chuva e cuidado com as chuvas intensas';
                    }else if(codeWeather >= 87 && codeWeather <= 100){
                        mensagem.textContent = 'Não saia de casa, tempestades intensas, fique em casa e tome um chocolate quente 🍫.';

                    }
                })
                .catch((error) => {
                    alert('Cidade não encontrada');
                    console.error(error);
                });
        })
        .catch((error) => {
            alert('Cidade não encontrada');
            console.error(error);
        });
}

document.querySelector('.buscar').addEventListener('click', () => {
    buscarClima();
});

document.querySelector('input').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        buscarClima();
    }
});
