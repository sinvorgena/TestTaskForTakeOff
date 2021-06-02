import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Login from "./main/Login";
import {Route} from "react-router-dom";
import Contacts from "./main/Contacts";

const Main = (props) => {
    const useStyles = makeStyles(() => ({
        content: {
            flexGrow: 1,
            padding: '75px 10px 0 10px',
            width: '100%',
            height:'100%',
            display: 'flex',

        }
    }));
    const classes = useStyles();
    return (
        <main className={classes.content}>
            <Login isAuth={props.isAuth}  dispatch={props.dispatch} error={props.error}/>
            <Route path={"/contacts"} render={() => <Contacts matchesMd={props.matchesMd} isAuth={props.isAuth} matchesSm={props.matchesSm} setFilterInputValue={props.setFilterInputValue} cardsField={props.cardsField}/>}/>
        </main>
    )
}

export default Main