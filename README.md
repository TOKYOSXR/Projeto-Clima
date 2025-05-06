# ☀️ Weather Now - App de Clima

Aplicativo simples feito com HTML, CSS e JavaScript que permite ao usuário buscar o clima atual e a previsão para os próximos 3 dias de qualquer cidade, usando o nome da cidade
(ex: `São Paulo`).

---

## 🧠 Funcionalidades

- 🔎 Busca por cidade + país (ex: `Lisboa`).
- 📅 Exibe a data atual da consulta.
- 🌡️ Mostra a temperatura atual.
- 🌥️ Ícone representando o clima (ensolarado, nublado, chuva, etc).
- 💬 Mensagem dinâmica com base no clima atual (ex: “Leve um guarda-chuva!”).
- 📆 Previsão de temperatura para os **próximos 3 dias**.
- 🌗 **Mudança de tema**: O tema do site muda automaticamente de acordo com o ciclo dia/noite da cidade pesquisada.

---

## 🔗 APIs Utilizadas

1. **OpenWeather API**  
   Para obter informações detalhadas sobre o clima atual e a previsão.
   - Endpoint para clima atual:
    https://api.openweathermap.org/data/2.5/weather?q={cidade}&appid={API_KEY}&units=metric&lang=pt_br

2. **OpenMeteor API**  
Usada para verificar o ciclo dia/noite da cidade e alterar o tema da página de acordo.
- Endpoint para determinar o ciclo:
https://api.open-meteor.com/city/{cidade}/sun


---

## 📂 Tecnologias usadas

- **HTML5**
- **CSS3**
- **JavaScript Vanilla**
- **OpenWeather API (REST)**
- **OpenMeteor API (REST)**

---

## 🖼️ Layout

- Interface clean e intuitiva.
- Design responsivo (Mobile e Desktop).
- Tema claro ou escuro dependendo da hora do dia da cidade.
- Fonte recomendada: **"Poppins"** ou **"Roboto"** (Google Fonts).

---

## 💡 Lógica extra (mensagem dinâmica)

Exemplo de mensagens conforme o clima:

- `clear` → “Dia perfeito pra sair!”
- `rain` → “Não esqueça o guarda-chuva!”
- `clouds` → “Tempo nublado, mas sem chuva.”
- `snow` → “Vai nevar! Agasalhe-se bem.”
- `mist` → “Neblina no ar, dirija com cuidado.”

---

## 📦 Como rodar o projeto

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/weather-now.git
Gere uma chave gratuita na OpenWeatherMap

Gere uma chave gratuita na OpenMeteor

Substitua {API_KEY} no seu JavaScript pelas chaves de API.

Abra o index.html no navegador e pronto!

🧰 Melhorias futuras
Geolocalização automática do usuário.

Autocomplete de cidades na busca.

Escolher entre °C e °F.

Armazenar últimas buscas no localStorage.

Modo escuro.

📄 Licença
Projeto com fins educativos, livre para uso e modificação.
Licença MIT.

Feito com por TOKYO.
