import React, {useState} from "react";
import {Fab, Tooltip, withStyles} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import {useFormik} from "formik";
import s from "../../App.module.scss";
import * as yup from "yup";
import SaveIcon from '@material-ui/icons/Save';
import {CustomTooltip, Input} from "../utils/FormHelper";
import {useDispatch} from "react-redux";
import {createContact} from "../../redux/contactsReducer";

const phoneRegExp = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/
const validationSchema = yup.object({
    name: yup
        .string('Enter name')
        .required('Name is required'),
    phone: yup
        .string().matches(phoneRegExp, 'Phone number is not valid')
        .required('Phone is required'),

});

let CreateNewContact = (props) => {
    const LightTooltip = withStyles(() => ({
        tooltip: {
            fontSize: 16,
            margin: '10px'
        },
    }))(Tooltip);
    let [editMode, setEditMode] = useState(false)
    let dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            phone: '',
            name: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(createContact(values))
            setEditMode(!editMode)
        }
    })
    return (
        <div className={s.createContact}>
            <form onSubmit={formik.handleSubmit}>
                {!editMode &&
                <LightTooltip title="Create new contact" aria-label="Create new contact">
                    <Fab onClick={() => setEditMode(!editMode)} placeholder={'create new contact'} color="default"
                         aria-label="add">
                        <AddIcon/>
                    </Fab>
                </LightTooltip>
                }
                {editMode &&
                        <div>
                            {props.error && <div>{props.error}</div>}
                            <div className={s.createContactButton}>
                                <CustomTooltip type={'submit'} toolTitle={"Create new contact"} FabAction={()=>{}} Icon={<SaveIcon />}/>
                            </div>
                            <Input classForDiv={s.textFieldBox} fieldId={"custom-css-outlined-input"} name={"phone"} label={"Phone number"} formik={formik}/>
                            <Input classForDiv={s.textFieldBox} fieldId={"custom-css-outlined-input"} name={"name"} label={"Name"} formik={formik}/>
                        </div>
                }
            </form>
        </div>
    )
}

export default CreateNewContact
