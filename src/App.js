import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weatherForecast, setWeatherForecast] = useState(null);
  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=1af7db9f4ac143f8bc0195756222310&q=${city}&lang=pt`
    )
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .then((data) => {
      setWeatherForecast(data);
      });
  };

  return (
    <div>
      <strong className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <a className="mx-auto navbar-brand text-white text-bold" href="#top">
        Previsão do Clima 🌤
        </a>
      </strong>
      <main className="container">
        <div className="jumbotron">
          <h1>Verifique agora a previsão do tempo da sua cidade!</h1>
          <p className="lead">
            Digite o nome da sua cidade no campo abaixo e em seguida clique em
            pesquisar.
          </p>
          <div className="row mb-4">
            <div className="col-md-6">
              <input
                onChange={handleChange}
                className="form-control"
                value={city}
              />
            </div>
          </div>
          <button onClick={handleSearch} className="btn btn-primary btm-lg">
            Pesquisar
          </button>

          {weatherForecast ? (
            <div>
              <div className="justify-content-center">
              <img src={weatherForecast.current.condition.icon}/>
              </div>
              <div>
                <h1> Temperatura está em: {weatherForecast.current.temp_c}ºC</h1> 
                <h2> Hoje o dia está: {weatherForecast.current.condition.text}</h2>
                <h2> Sensação térmica está em: {weatherForecast.current.feelslike_c}ºC</h2> 
                <h2> Índice UV: {weatherForecast.current.uv}</h2> 
                <h2> Temperatura Máxima: {weatherForecast.forecast.forecastday[0].day.maxtemp_c}ºC</h2> 
                <h2> Temperatura Mínima: {weatherForecast.forecast.forecastday[0].day.mintemp_c}ºC</h2> 
                <h2> Nascer do Sol: {weatherForecast.forecast.forecastday[0].astro.sunrise}</h2> 
                <h2> Pôr do Sol: {weatherForecast.forecast.forecastday[0].astro.sunset}</h2> 
                <h2> Fase da Lua: {weatherForecast.forecast.forecastday[0].astro.moon_phase}</h2>  
                <h2> Probabilidade de Chuva Diária: {weatherForecast.forecast.forecastday[0].day.daily_chance_of_rain}%</h2> 
                <h1> Atualizado em: {weatherForecast.current.last_updated}</h1>   
              </div>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}
export default App;
