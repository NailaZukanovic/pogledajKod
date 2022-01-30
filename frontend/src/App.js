import React, {useState, useEffect} from 'react';

import {
  BrowserRouter,
  Route,
  Routes,
  Navigate
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
import Recipes from './Components/Recipes';
import WeatherApp from './Components/weather/WeatherApp';
import Login from './Components/Login';
import Register from './Components/Register';
import { withAuthenticator } from '@aws-amplify/ui-react';
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
Amplify.configure(awsExports);
const theme = createTheme({
  palette: {
    primary: {
      main: '#fefefe'
    },
    secondary: purple
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



const App = ({user}) => {
  const classes = useStyles();


  return (
    <div>
     <ThemeProvider theme={theme} >
        <BrowserRouter>
        <Layout>
          <Routes>
                {/* <Route path="/" element={<Register/>}/>
                <Route path="/Login" element={<Login/>}/> */}
                <Route path="/Create" element={<Create/>}/>
                <Route path="/Notes" element={<Notes/>}/>
                <Route path="/Calendar" element={<Calendar/>}/>
                <Route path="/news" element={<NewsContainer />}/>
                <Route path="/Game" element={<Game/>}/>
                <Route path="/Weather" element={<WeatherApp />} />
          </Routes>
        </Layout>
        </BrowserRouter>
    </ThemeProvider>   
    </div>
  )
}

export default App;