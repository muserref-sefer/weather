import Head from "next/head";
import 'antd/dist/antd.css';
import '../assets/css/style.scss';
import { createGlobalStyle } from "styled-components";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from '../utils/theme';
import rootReducer from '../reducers/index';
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import ThemeSwitch from '../components/ThemeSwitch';
import { useEffect, useState } from "react";
import { Layout, Row, Col } from 'antd';

const { Content } = Layout;

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) :
        compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk),
);

const store = createStore(rootReducer, enhancer);

const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Montserrat' !important;
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    padding: 10px;
  }
`;

export default function App({ Component, pageProps }) {
  const [theme, setTheme] = useState(darkTheme);

  useEffect(() => {
    setTheme(localStorage.getItem("darkMode") == "false" ? lightTheme : darkTheme);
  },[])

  return(
     <>
       <Head>
         <title>Hava Durumu</title>
         <link rel="icon" href="/favicon.ico"/>
         <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,700" rel="stylesheet"/>
       </Head>
       <div className={theme == darkTheme ? "dark" : "light"}>
         <ThemeSwitch theme={theme} toggleTheme={setTheme} />
         <div className="row">
           <Row type="flex" justify="center">
             <Col xs={24} sm={24} md={8} lg={8}>
               <Provider store={store}>
                 <ThemeProvider theme={theme}>
                   <GlobalStyles/>
                   <Component {...pageProps} />
                 </ThemeProvider>
               </Provider>
             </Col>
           </Row>
         </div>
       </div>

       <style jsx>{`
        .row {
          text-align: center;
          margin: 20px auto;
        }
      `}
       </style>
     </>
  )
}