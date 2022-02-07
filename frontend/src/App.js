import React, {useState, useEffect} from 'react';

import {
  BrowserRouter,
  Route,
  useNavigate,
  Navigate,
  Routes
} from 'react-router-dom';

import {
  createTheme,
  makeStyles,
  ThemeProvider} from '@material-ui/core';
import { purple } from '@mui/material/colors';
import NewsContainer from './Components/NewsContainer';
import Auth from './Components/auth/Auth';
import Calendar from './Components/Calendar';
import Layout from './Components/Layout';
import Create from './Components/pages/Create';
import Notes from './Components/pages/Notes';
import Game from './Components/Game';
import WeatherApp from './Components/weather/WeatherApp';
import AuthContext, { AuthContextProvider } from './Components/user/AuthContext';
import PageNotFound from './Components/PageNotFound';
import { useContext } from 'react';


const theme = createTheme({
  palette: {
    primary: {
      main: '#fefefe'
    },
    secondary: purple,
    pink: '#FFC0CB'
  },

  typography: {
    fontFamily: 'Quicksand',

    fontWightLight: 400,

    fontWightRegular: 500,

    fontWightMedium: 600,

    fontWightBold: 700
  },
});


const useStyles = makeStyles({
  page: 
  {
    background: '#f9f9f9',
    width: '100%' 
  },
  
  field: {
    marginTop: 20,
    marginBotton: 20,
    display: 'block'
  }
});



const App = () => {
  const classes = useStyles();
  return (
    <AuthContextProvider>
     <ThemeProvider theme={theme} >
        <BrowserRouter>
        <Layout>
          <Routes>
                    <Route path="/Create" element={<Create/>}/>
                    <Route path="/Notes" element={<Notes/>}/>
                    <Route path="/Calendar" element={<Calendar/>}/>
                    <Route path="/news" element={<NewsContainer />}/>
                    <Route path="/" exact element={<Game/>}/>
                    <Route path="/Weather" element={<WeatherApp />} />
                    <Route path="*" element={<PageNotFound/>} /> 
          </Routes>
        </Layout>
        </BrowserRouter>
      
      </ThemeProvider>   
    </AuthContextProvider>
  )
}

export default App;