import React, { useState } from 'react';
import { connect } from 'react-redux';

import { userActions } from '../actions';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Menu from '../components/Menu';
import Chart from '../components/Chart';
import { Alert } from '@material-ui/lab';
import { getTodayDate } from '../helpers';

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    form: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 500,
        },
        marginBottom: 14,
    },
    alert: {
      marginBottom: 25,
    }
}));

function HomePage(props) {
    let [client, setClient] = useState({
        firstName: '',
        lastName: '',
        datetime: getTodayDate().toString(),
        outlet: '',
    });

    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    let handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        client[name] = value;
        setClient(client);
    }

    let save = (e) => {
        e.preventDefault();
        if (client.firstName && client.lastName && client.datetime && client.outlet) {
            props.addReservation(client);
            document.getElementById("myForm").reset();
        }
    }

    return (
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
              >
                <MenuIcon />
              </IconButton>
              <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                Welcome {props.user.firstName} {props.user.lastName}
              </Typography>
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
            }}
            open={open}
          >
            <div className={classes.toolbarIcon}>
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <List><Menu/></List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
              <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12}>
                  <Paper className={fixedHeightPaper}>
                    <Chart/>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>  
                    <Typography variant="h6" gutterBottom>
                        Add Reservation
                    </Typography>
                    {props.alert.message &&
                            <Alert className={classes.alert} severity={`${props.alert.type}`}>{props.alert.message}</Alert>
                        }
                    <Grid container spacing={3}>
                        <form className={classes.form} onSubmit={save} id="myForm" noValidate={false} autoComplete="off">
                            <div>
                                <TextField
                                    required
                                    id="firstName"
                                    name="firstName"
                                    label="First Name"
                                    variant="outlined"
                                    onChange={handleChange}
                                />
                                <TextField
                                    required
                                    id="lastName"
                                    name="lastName"
                                    label="Last Name"
                                    variant="outlined"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <TextField
                                    id="datetime-local"
                                    label="Next appointment"
                                    type="datetime-local"
                                    name="datetime"
                                    defaultValue={getTodayDate().toString()}
                                    className={classes.textField}
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    onChange={handleChange}
                                    required
                                />
                                <TextField
                                    required
                                    id="outlet"
                                    label="Outlet"
                                    name="outlet"
                                    variant="outlined"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                              <Button
                                  type="submit"
                                  variant="contained"
                                  color="primary"
                                  className={classes.submit}
                              >
                                  Add Reservation
                              </Button>
                            </div>
                        </form>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
              <Box pt={4}>
                <Copyright />
              </Box>
            </Container>
          </main>
        </div>
      );
}

function mapState(state) {
    const { authentication } = state;
    const { alert } = state;
    const { user } = authentication;
    return { user, alert };
}

const actionCreators = {
    addReservation: userActions.addReservation
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };