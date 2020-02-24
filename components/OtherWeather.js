import styled from "styled-components";

function OtherWeather({ weather }) {

  const dateTimeFormatter = (datetime) => (
      new Intl.DateTimeFormat("tr-TR", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: 'numeric',
        minute: 'numeric',
      }).format(new Date(datetime))
  );

  return(
    <SavedWeather>
      {weather.name ?
        <SavedWeatherTitle>{weather.name}, {weather.sys.country}</SavedWeatherTitle> :
        <SavedWeatherTitle>{dateTimeFormatter(weather.dt_txt)}</SavedWeatherTitle>
      }
      <div className="savedWeatherDetail">
        <span className="first">
          <img src={`/assets/img/weather/${weather.weather[0].icon}.svg`} width="65" />
        </span>
        <span className="second">
          <div className="title">
            <SavedWeatherStatus>{weather.weather[0].main}</SavedWeatherStatus>
          </div>
          <MinMaxTempArea>
            <small>{Math.round(weather.main.temp_min)}ºC</small>
            <span className="dot">•</span>
            <small>{Math.round(weather.main.temp_max)}ºC</small>
          </MinMaxTempArea>
        </span>
        <MainTemp>{Math.ceil(weather.main.temp)}ºC</MainTemp>
      </div>
      <style jsx>{`
        .row {
          width: 100%;
        }
        
        .dot {
          margin: 0 5px;
        }
        
        .savedWeatherDetail {
          display: flex;
          align-items: center;
        }
        
        .savedWeatherDetail .first{
          flex: 1;
          font-size: 3rem;
          display: flex;
          justify-content: center;
        }
        
        .savedWeatherDetail .second{
          display: flex;
          flex-direction: column;
          flex: 2;
          align-items: flex-start;
        }
      `}
      </style>
    </SavedWeather>
  )
}

const SavedWeather = styled.div`
  background-color: ${({ theme }) => theme.boxBgColor};
  box-shadow: 0 2rem 6rem rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 5px;
  width: 100%;
  transition: all 0.2s;
  cursor: pointer;
  margin: 20px 0 40px 0;
  &:hover {
    transform: translateY(-2px);
  }
`;

const SavedWeatherTitle = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  margin: 0;
`;

const SavedWeatherStatus = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  margin: 0;
  color: ${({ theme }) => theme.weatherStatusText};
`;

const MinMaxTempArea = styled.div`
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.minMaxTempText};
`;

const MainTemp = styled.div`
  flex: 1;
  font-size: 2rem;
  font-weight: 300;
  display: flex;
  justify-content: center;
  color: ${({ theme }) => theme.mainTempText};
`;

export default OtherWeather