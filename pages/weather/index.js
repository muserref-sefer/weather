import api from "../../api";
import MainWeather from "../../components/MainWeather";
import OtherWeather from "../../components/OtherWeather";
import { Button } from "antd";
import { Router } from '../../routes';
import Title from "../../components/Title";

function Index({currentWeather, weeklyForecasts}) {

  const removeSavedLocations = () => {
    let savedLocations = JSON.parse(localStorage.getItem('savedLocations'));
    savedLocations.splice(savedLocations.indexOf(currentWeather.id), 1);
    localStorage.setItem('savedLocations',JSON.stringify(savedLocations));

    Router.pushRoute('/')
  };

  return (
    <>
      <Button type="danger" onClick={removeSavedLocations}>Kayıtlı konumlardan kaldır</Button>
      <MainWeather weather={currentWeather} />
      <Title>Haftalık Hava Durumu</Title>
      {weeklyForecasts.list.map(item => (
        <OtherWeather weather={item} key={item.dt} />
      ))}
    </>
  )
}

Index.getInitialProps = async ({query}) => {
  const currentWeather = await api.getSavedLocationById(query.id);
  const weeklyForecasts = await api.getWeeklyWeather(query.id);

  return {
    currentWeather,
    weeklyForecasts
  }
}

export default Index