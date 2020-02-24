import Title from "../components/Title";
import CurrentWeather from "./CurrentWeather";
import { GoLocation } from 'react-icons/go';
import { FiMap } from 'react-icons/fi';
import AddLocation from "./AddLocation";
import {Button, Icon} from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { setIsOpenAddLocation, setSavedLocations } from "../actions";
import SavedWeathers from "./SavedWeathers";
import {useEffect, useState} from "react";

export default function App() {
  const [savedOtherLocation, setSavedOtherLocation] = useState(null);
  const isOpenAddLocation = useSelector(state => state.isOpenAddLocation);
  const dispatch = useDispatch();
  const savedLocations = useSelector(state => state.savedLocations);

  useEffect(() => {
    setSavedOtherLocation(localStorage.getItem("savedLocations"));
  },[]);

  const removeAllSavedLocations = () => {
    localStorage.removeItem("savedLocations");
    setSavedOtherLocation(null);
    dispatch(setSavedLocations(""));
  }

  return (
    <>
      {!isOpenAddLocation ?
        <>
          <div className="title">
            <Title><GoLocation/>Konumunuz</Title>
          </div>
          <CurrentWeather/>

          <div className="title">
            <Title><FiMap/> Diğer Konumlarınız</Title>
          </div>

          {savedLocations || savedOtherLocation ?
            <div>
              <SavedWeathers/>
              <Button type="danger" onClick={removeAllSavedLocations}>Kayıtlı tüm konumları kaldır</Button>
            </div>:
            <div className="row">
              <p className="error">Kayıtlı konumunuz bulunamadı. Eklemek için butona tıklayın.</p>
            </div>
          }

          <Icon type="plus-circle"
                onClick={() => dispatch(setIsOpenAddLocation(true))}
                style={{ fontSize: '32px', color: '#ccc', marginTop: '30px' }} />
        </> :
        <AddLocation/>
      }


    <style jsx>{`
      :root {
        --color-primary: #2b7a78;
        --color-primary-light: #3aafa9;
      }
      .row {
        text-align: center;
        margin: 20px auto;
      }
      .error {
        color: red;
      }
    `}
    </style>
    </>
  );
}