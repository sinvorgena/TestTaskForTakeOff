import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import {Button, Popper} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {useDispatch, useSelector} from "react-redux";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {Redirect} from "react-router-dom";
import {setAuthSuccess} from "../redux/authReduces";


const Header = (props) => {
    const useStyles = makeStyles((theme) => ({
        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up('sm')]: {
                display: 'none',
            },
        },
        menuTitle: {
            flexGrow: 1
        },
        appBar: {
            [theme.breakpoints.up('sm')]: {
                width: `calc(100% - ${props.drawerWidth}px)`,
                marginLeft: props.drawerWidth,
            },
            backgroundColor: 'rgb(50,50,50)',
            height: '64px'
        },
        paper: {
            padding: theme.spacing(1),
            backgroundColor: 'white',
            zIndex: 10000,
        },
    }));
    const classes = useStyles();

    if (props.isNeedToRedirect) {
        props.setIsNeedRedirect(false)
        return <Redirect to={'/'}/>
    }
    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={props.handleDrawerToggle}
                    className={classes.menuButton}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" noWrap className={classes.menuTitle}>
                    Test task for TakeOff
                </Typography>
                <Button aria-describedby={props.id} type="button" onClick={props.handleClick}>
                    Владимир <ExpandMoreIcon/>
                </Button>
                <Popper id={props.id} open={props.open} anchorEl={props.anchorEl} className={classes.paper}>
                    <div className={classes.paper}>
                        {props.isAuth
                            ? <div>
                                <div>Вы авторизованы</div>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    edge="start"
                                    onClick={() => {
                                        props.dispatch(setAuthSuccess(false))
                                        props.setIsNeedRedirect(true)
                                    }}
                                >
                                    <ExitToAppIcon/>
                                </IconButton>
                            </div>
                            : 'Вы не авторизованы'}
                    </div>

                </Popper>
            </Toolbar>
        </AppBar>
    )
}

export default Header