import { Switch } from 'antd';
import {darkTheme, lightTheme} from "../utils/theme";

function ThemeSwitch({ theme, toggleTheme }) {

  const changeTheme = (checked) => {
    localStorage.setItem("darkMode", checked);
    toggleTheme(localStorage.getItem("darkMode") == "true" ? darkTheme : lightTheme);
  }

  return(
    <>
      <span className="mode">Karanlık Mod:</span>
      <Switch checked={theme == darkTheme} onChange={changeTheme} />
      <style jsx>{`
        .mode {
          padding-right: 7px;
        }
      `}
      </style>
    </>
  )
}

export default ThemeSwitch