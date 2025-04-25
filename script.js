const chave = 'fc1bc8b7851adefe16113f191340ee76';

function buscarClima(){
    const cidade = document.querySelector('input').value;
    const urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${chave}&units=metric&lang=pt_br`;
    

    fetch(urlApi)
        .then((response) => {
            if (!response.ok) throw new Error("Erro ao buscar dados");
            return response.json();
        })
        .then((data) => {

            
            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

            document.getElementById('icone-clima').src = iconUrl;
            document.getElementById('icone-clima').alt = data.weather[0].description;
            
            document.querySelector('.cidade').textContent = `${data.name}`;
            document.querySelector('.temperatura').textContent = `${data.main.temp}°C`;
            document.querySelector('.descricao').textContent = ` ${data.weather[0].description}`;
            document.querySelector('.umi').textContent = `${data.main.humidity}%`;
            document.querySelector('.veloc-vento').textContent = `${data.wind.speed}m/s`;
            document.querySelector('.temp-max').textContent = ` ${data.main.temp_max}°C`;
            document.querySelector('.temp-min').textContent = ` ${data.main.temp_min}°C`;

            const timeZone = data.timezone;
            const dt = data.dt;

            const date = new Date((dt + timeZone) * 1000);
            const hora  = date.getHours();

            if(hora >= 6 && hora < 18){
                document.body.classList.remove('noite');
                document.body.classList.add('dia');
            }else{
                document.body.classList.remove('dia');
                document.body.classList.add('noite');
            }


            



        })
        .catch((error) => {
            alert('Cidade não encontrada');
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
})






