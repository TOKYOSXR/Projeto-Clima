const chave = 'fc1bc8b7851adefe16113f191340ee76';

// Função principal de busca do clima
function buscarClima() {
  const cidade = document.querySelector('input').value;
  const input = document.querySelector('input');
  const botao = document.querySelector('.buscar');

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
      const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

      const diaSemana = diasDaSemana[data.getDay()];
      const dia = data.getDate();
      const mes = meses[data.getMonth()];
      const dataAtual = `${diaSemana}, ${dia} de ${mes}`;

      // Atualiza ícone e descrição
      document.getElementById('icone-clima').src = iconUrl;
      document.getElementById('icone-clima').alt = weatherData.weather[0].description;
      const descricao = weatherData.weather[0].description;

      // Segundo fetch para dados detalhados
      fetch(urlApi2)
        .then((response) => {
          if (!response.ok) throw new Error("Erro ao buscar dados");
          return response.json();
        })
        .then((forecastData) => {
          // Dados principais
          const temperatura = forecastData.current.temperature_2m;
          const temperaturaMaxima = forecastData.daily.temperature_2m_max[0];
          const temperaturaMinima = forecastData.daily.temperature_2m_min[0];
          const vento = forecastData.current.wind_speed_10m;
          const umidade = forecastData.current.relative_humidity_2m;
          const codeWeather = forecastData.current.weather_code;

          const bodyMensagem = document.querySelector('.mensagem');

          // Atualiza elementos no DOM
          document.querySelector('.cidade').textContent = `${cidadeAtual}, ${pais}`;
          document.querySelector('.temperatura').textContent = `${temperatura}°C`;
          document.querySelector('.veloc-vento').textContent = `${vento} m/s`;
          document.querySelector('.umi').textContent = `${umidade}%`;
          document.querySelector('.descricao').textContent = descricao;
          document.querySelector('.data').textContent = dataAtual;

          // Mensagem com base no código de clima
          const mensagem = document.querySelector('.aviso');
          if (codeWeather >= 0 && codeWeather < 45) {
            mensagem.textContent = 'Dia Ideal para uma caminhada🏃‍♂️‍➡️';
          } else if (codeWeather >= 45 && codeWeather <= 67) {
            mensagem.textContent = 'Ótimo dia para assistir um filme🎬, leve um guarda-chuva se sair.';
          } else if (codeWeather >= 68 && codeWeather <= 86) {
            mensagem.textContent = 'Leve um guarda-chuva e cuidado com as chuvas intensas.';
          } else if (codeWeather >= 87 && codeWeather <= 100) {
            mensagem.textContent = 'Não saia de casa! Tempestades intensas. Fique em casa e tome um chocolate quente 🍫.';
          }

          // Previsão dos próximos 3 dias
          const previsaoDias = document.querySelector('.previsao_dias');
          previsaoDias.innerHTML = '';

          const temperaturaMaximas = forecastData.daily.temperature_2m_max;
          const temperaturaMinimas = forecastData.daily.temperature_2m_min;
          const diasSemana = forecastData.daily.time;
          const abreDiasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

          for (let i = 0; i < 3; i++) {
            const dataObj = new Date(diasSemana[i]);
            const diaSemana = abreDiasSemana[dataObj.getDay()];
            const dia = dataObj.getDate();
            const mes = meses[dataObj.getMonth()];

            const li = document.createElement('li');
            li.className = 'flex flex-col items-center justify-center space-y-2 bg-blue-200 rounded-md w-40 h-20';
            li.innerHTML = `
              <span>${diaSemana}</span>
              <span class="font-bold text-sm">${temperaturaMaximas[i]}°C / ${temperaturaMinimas[i]}°C</span>
            `;

            previsaoDias.appendChild(li);
            mudarTema(li, forecastData);
          }

          // Aplica tema
          mudarTema(input, forecastData);
          mudarTema(botao, forecastData);
          mudarTema(bodyMensagem, forecastData);
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

// Função que altera o tema de dia/noite
function mudarTema(elemento, forecast) {
  const dia = forecast.current.is_day;

  if (dia === 1) {
    document.body.classList.remove('noite');
    document.body.classList.add('dia');
    elemento.classList.add('bg-blue-200');
    elemento.classList.remove('bg-gray-600');
  } else {
    document.body.classList.remove('dia');
    document.body.classList.add('noite');
    elemento.classList.add('bg-gray-600', 'text-white');
    elemento.classList.remove('bg-blue-200');
  }
}

// Eventos para botão e tecla Enter
document.querySelector('.buscar').addEventListener('click', () => {
  buscarClima();
});

document.querySelector('input').addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    buscarClima();
  }
});
