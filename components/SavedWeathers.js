import { useEffect, useState } from "react";
import api from '../api/index';
import OtherWeather from './OtherWeather';
import {Link} from "../routes";

export default function SavedWeathers() {
  const [savedWeathers, setSavedWeathers] = useState(null);

  useEffect(() => {
    async function getSavedWeathers() {
      const savedLocationIds = JSON.parse(localStorage.getItem('savedLocations'));
      let savedWeathersFromCache = await Promise.all(Array.from(savedLocationIds).map(id => api.getSavedLocationById(id)));
      setSavedWeathers(savedWeathersFromCache);
    }

    getSavedWeathers();
  }, []);

  return(
    <div>
      {!savedWeathers ?
        <div className="loader">
          <div className="one"></div>
          <div className="two"></div>
        </div> :
        savedWeathers.map(item => (
          <div className="row" key={item.id}>
            <Link route='havadurumu' params={{id: item.id}}>
              <a>
                <OtherWeather weather={item} />
              </a>
            </Link>
          </div>
        ))
      }
    </div>
  )
}