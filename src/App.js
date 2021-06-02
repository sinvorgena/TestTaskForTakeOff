import {useTheme} from '@material-ui/core/styles';
import {useMediaQuery} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import s from './App.module.scss'
import Main from "./Components/Main";
import SideBar from "./Components/SideBar";
import Header from "./Components/Header";
import {useDispatch, useSelector} from "react-redux";
import Contact from "./Components/main/Contact";

function App(props) {
    const drawerWidth = 240;
    const {window} = props;
    const theme = useTheme();
    const matches = useMediaQuery('(max-width:600px)');
    const handleDrawerToggle = () => {setMobileOpen(!mobileOpen)}
    const [mobileOpen, setMobileOpen] = React.useState(false)
    const container = window !== undefined ? () => window().document.body : undefined
    const [anchorEl, setAnchorEl] = React.useState(null)
    const handleClick = (event) => {setAnchorEl(anchorEl ? null : event.currentTarget)}
    const open = Boolean(anchorEl)
    const id = open ? 'simple-popper' : undefined
    let isAuth = useSelector(state => state?.auth.isAuth)
    let [isNeedToRedirect, setIsNeedRedirect] = useState(false)
    let dispatch = useDispatch()
    let error = useSelector(state => state?.auth.errorAuth)
    let [cardsField, setCardsField] = useState()
    let [filterInputValue, setFilterInputValue] = useState("")
    let contactsData = useSelector(state => state?.contacts.contactsData)
    let filterData = ()=> contactsData.filter(el => {
        if(el.fullName.toLowerCase().includes(filterInputValue.toLowerCase()) || el.phoneNumber.toLowerCase().includes(filterInputValue.toLowerCase()))return el})
    let contactsReactItems = (data)=> data.map((el) => <Contact editMode={editMode} setEditMode={setEditMode} dispatch={dispatch} deleteContact={props.deleteContact} el={el} key={el.id}/>)
    const matchesMd = useMediaQuery('(max-width:600px)');
    const matchesSm = useMediaQuery('(max-width:400px)');
    let [editMode, setEditMode] = useState(false)


    useEffect(() => {
        if(filterInputValue.length === 0){
            setCardsField(contactsReactItems(contactsData))
        } else {
            setCardsField(contactsReactItems(filterData()))
        }
    }, [filterInputValue, contactsData.length])
    return (
    <div className={s.App}>
        <Header id={id} isNeedToRedirect={isNeedToRedirect} handleClick={handleClick} setIsNeedRedirect={setIsNeedRedirect} handleDrawerToggle={handleDrawerToggle} drawerWidth={drawerWidth} open={open} anchorEl={anchorEl} isAuth={isAuth} dispatch={dispatch}/>
        <SideBar drawerWidth={drawerWidth} container={container} theme={theme} mobileOpen={mobileOpen}
                 handleDrawerToggle={handleDrawerToggle} matches={matches}/>
        <Main matchesMd={matchesMd} setFilterInputValue={setFilterInputValue} matchesSm={matchesSm} isAuth={isAuth} dispatch={dispatch} error={error} cardsField={cardsField}/>
    </div>
    );
}

export default App;
