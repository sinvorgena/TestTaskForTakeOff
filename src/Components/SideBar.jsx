import {Hidden} from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import DrawerComp from "./sideBar/DrawerComp";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const SideBar = (props)=>{
    const useStyles = makeStyles((theme) => ({
        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: props.drawerWidth,
                flexShrink: 0,
            },
        },
        drawerPaper: {

            width: props.drawerWidth,
            backgroundColor: 'rgba(50,50,50)'
        },

    }));
    const classes = useStyles();
    return(
        <nav className={classes.drawer}>
            <Hidden smUp implementation="css">
                <Drawer
                    container={props.container}
                    variant="temporary"
                    anchor={props.theme.direction === 'rtl' ? 'right' : 'left'}
                    open={props.mobileOpen}
                    onClose={props.handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true
                    }}
                >
                    <DrawerComp matches={props.matches} handleDrawerToggle={props.handleDrawerToggle} theme={props.theme}/>
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                >
                    <DrawerComp matches={props.matches} handleDrawerToggle={props.handleDrawerToggle} theme={props.theme}/>
                </Drawer>
            </Hidden>
        </nav>
    )
}
export default SideBar