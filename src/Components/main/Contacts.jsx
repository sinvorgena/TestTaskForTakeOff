import React from "react";
import {Redirect} from "react-router-dom";
import CreateNewContact from "./CreateNewContact";
import {Input} from "../utils/FormHelper";
import s from "../../App.module.scss"
import {useFormik} from "formik";
import cn from 'classnames'

let Contacts = props => {
    const formik = useFormik({
        initialValues: {
            find: '',
        },
        onSubmit: () => {
        }
    })
    let formRef = React.useRef()
    if (!props.isAuth) {
        return <Redirect to={''}/>
    } else {
        return (
            <div className={cn(s.contactsBoxXl, {[s.contactsBoxMobileMd]:props.matchesMd, [s.contactsBoxMobileSm]:props.matchesSm})}>
                <CreateNewContact createContact={props.createContact}/>
                <form ref={formRef} onInput={(e)=>{
                    props.setFilterInputValue(e.target?.value)
                    }}>
                    <Input classForDiv={s.textFieldBox}
                           fieldId={"custom-css-outlined-input"} name={"find"}
                           label={"Find"} formik={formik}/>
                </form>
                <div className={s.contactsContainer}>
                    {props.cardsField}
                </div>
            </div>
        )
    }
}

export default React.memo(Contacts)