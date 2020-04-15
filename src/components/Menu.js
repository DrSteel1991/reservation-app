import React from 'react';
import { useDispatch } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import Link from '@material-ui/core/Link';

import { userActions } from '../actions';


export default function Menu () {
  const dispatch = useDispatch();
  return (
    <div>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <Link color="inherit" href="/"><ListItemText primary="Dashboard" /></Link>
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <Link color="inherit" href="/reservations"><ListItemText primary="Reservations" /></Link>
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <Link 
          color="inherit" 
          onClick={() => {
            dispatch(userActions.logout());
          }}
        >
          <ListItemText primary="Logout" />
        </Link>
      </ListItem>
    </div>
  );
}
