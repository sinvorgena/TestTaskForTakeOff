import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    toolbar:
        {...theme.mixins.toolbar,}
    ,
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    divider:{
        margin: '100px 0 0 0'
    }

}));
const DrawerComp = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.divider}>
            {props.matches &&
            <div className={classes.drawerHeader}>
                <IconButton onClick={props.handleDrawerToggle}>
                    <ChevronLeftIcon/>
                </IconButton>
            </div>
            }
            <Divider/>
        </div>
    )
}

export default DrawerComp