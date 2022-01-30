import React, {useEffect} from 'react'
import { makeStyles } from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer'
import Typography from '@material-ui/core/Typography'
import { useNavigate, useLocation } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { AddCircleOutlineOutlined, SubjectOutlined } from '@material-ui/icons'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { format } from 'date-fns'
import Avatar from '@material-ui/core/Avatar'
import EventNoteIcon from '@mui/icons-material/EventNote';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import CelebrationIcon from '@mui/icons-material/Celebration';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import {AmplifySignOut} from "@aws-amplify/ui-react";

const drawerWidth = 240

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: '#f9f9f9',
      width: '100%',
      padding: theme.spacing(3),
    },
    root: {
      display: 'flex',
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    active: {
      background: '#f4f4f4'
    },
    title: {
      padding: theme.spacing(2),
    },
  }
})

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const classes = useStyles();


  const menuItems = [
      { 
        text: 'My Notes', 
        icon: <SubjectOutlined color="secondary" />, 
        path: '/notes' 
      },
      { 
        text: 'Create Note', 
        icon: <AddCircleOutlineOutlined color="secondary" />, 
        path: '/create' 
      },
      { 
        text: 'Calendar', 
        icon: <EventNoteIcon color="secondary" />, 
        path: '/calendar' 
      },
      {
        text: 'News',
        icon: <NewspaperIcon color="secondary" />,
        path:'/news'
      },
      // {
      //   text: 'Recipes',
      //   icon: <CelebrationIcon color="secondary" />,
      //   path:'/recipes'
      // },
      {
        text: 'Game',
        icon: <TravelExploreIcon color="secondary" />,
        path:'/game'
      },
      {
        text: 'Weather',
        icon: <NightsStayIcon color="secondary" />,
        path:'/weather'
      },
    ];


  return (
    <div className={classes.root}>
      {/* app bar */}

      {/* side drawer */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
        anchor="left"
      >
        <div>
          <Typography variant="h5" className={classes.title}>
            Nayer
          </Typography>
        </div>

        {/* links/list section */}

        <List className="okvir">
          {menuItems.map((item) => (
            <ListItem
              key={item.text} 
              button
              onClick={() => navigate(item.path)}
              className={location.pathname == item.path ? classes.active : null}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      {/* main content */}
      <div className={classes.page}>
        { children }
      </div>
    </div>
  )
}