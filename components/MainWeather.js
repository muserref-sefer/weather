import { Link } from "../routes";
import styled from "styled-components";

function MainWeather({weather}) {
  return(
    <Main>
      <Link route='havadurumu' params={{id: weather.id}}>
        <a>
          <WeatherTitle>{weather.name}</WeatherTitle>
          <WeatherDetail>
            <img src={`/assets/img/weather/${weather.weather[0].icon}.svg`} width="130" />
            {Math.ceil(weather.main.temp)}ºC
          </WeatherDetail>
          <div className="title">
            <WeatherSubTitle>{weather.weather[0].main}</WeatherSubTitle>
          </div>
          <MinMaxTempArea>
            <small>{Math.round(weather.main.temp_min)}ºC</small>
            <span className="dot">•</span>
            <small>{Math.round(weather.main.temp_max)}ºC</small>
          </MinMaxTempArea>
        </a>
      </Link>
      <style jsx>{`
        .row {
          width: 100%;
        }
        
        .dot {
          margin: 0 5px;
        }
      `}
      </style>
    </Main>
  )
}

const Main = styled.div`
  background-color: ${({ theme }) => theme.boxBgColor};
  box-shadow: 0 2rem 6rem rgba(0, 0, 0, 0.1);
  padding: 30px 20px;
  margin: 20px 0 40px 0;
  border-radius: 5px;
  width: 100%;
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    transform: translateY(-2px);
  }
`;

const WeatherTitle = styled.h1`
    font-size: 1.2rem;
    font-weight: 400;
    text-align: center;
    margin: 0;
`;

const WeatherDetail = styled.div`
    display: flex;
    font-size: 3rem;
    font-weight: 300;
    text-align: center;
    justify-content: space-evenly;
    align-items: center;
    margin: 25px 0;
    color: ${({ theme }) => theme.mainTempText};
`;

const WeatherSubTitle = styled.h2`
    font-size: 1.1rem;
    font-weight: 400;
    text-align: center;
    margin: 0;
    color: ${({ theme }) => theme.weatherStatusText};
`;

const MinMaxTempArea = styled.div`
    text-align: center;
    font-weight: 600;
    color: ${({ theme }) => theme.minMaxTempText};
`;

export default MainWeather