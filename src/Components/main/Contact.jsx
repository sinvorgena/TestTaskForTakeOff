import React from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import {CustomTooltip, Input} from "../utils/FormHelper";
import s from "../../App.module.scss"
import SaveIcon from "@material-ui/icons/Save";
import {useFormik} from "formik";
import {deleteContact, updateContact} from "../../redux/contactsReducer";

let Contact = props => {
    const formik = useFormik({
        initialValues: {
            phone: props.el.phoneNumber,
            name: props.el.fullName,
        },
        // validationSchema: validationSchema,
        onSubmit: (values) => {
            props.dispatch(updateContact(props.el.id, values.phone, values.name))
            props.setEditMode(!props.editMode)

        }
    })
    return (
        <div>
            {props.editMode
                ? <form className={s.contact} onSubmit={formik.handleSubmit}>
                    <div className={s.contactName}>
                        <Input classForDiv={s.textFieldBox} fieldId={"custom-css-outlined-input"} name={"phone"}
                               label={"Phone number"} formik={formik}/>
                    </div>
                    <div className={s.contactPhone}>
                        <Input classForDiv={s.textFieldBox} fieldId={"custom-css-outlined-input"} name={"name"}
                               label={"Name"} formik={formik}/>
                    </div>
                    <div className={s.contactBtn}>
                        <CustomTooltip type={'submit'} toolTitle={"Create new contact"} Icon={<SaveIcon/>}/>
                    </div>
                </form>
                : <div className={s.contact}>
                    <div className={s.contactName}>
                        {props.el.phoneNumber}
                    </div>
                    <div className={s.contactPhone}>
                        {props.el.fullName}
                    </div>
                    <div className={s.contactBtn}>
                        <CustomTooltip toolTitle={"Update contact"} FabAction={() => props.setEditMode(!props.editMode)}
                                       Icon={<CreateIcon/>}/>
                        <CustomTooltip toolTitle={"Delete contact"}
                                       FabAction={() => props.dispatch(deleteContact(props.el.id))}
                                       Icon={<DeleteIcon/>}/>
                    </div>
                </div>}
        </div>
    )
}

export default React.memo(Contact)