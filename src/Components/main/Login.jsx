import React from "react";
import {Redirect} from "react-router-dom";
import s from "../../App.module.scss"
import {logIn} from "../../redux/authReduces";
import {Button} from "@material-ui/core";
import {useFormik} from 'formik';
import * as yup from 'yup';
import {Input} from "../utils/FormHelper";

let Login = (props) => {
    const validationSchema = yup.object({
        email: yup
            .string('Enter your email')
            .email('Enter a valid email')
            .required('Email is required'),
        password: yup
            .string('Enter your password')
            .min(2, 'Password should be of minimum 2 characters length')
            .required('Password is required'),
    });
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values,{resetForm}) => {
            props.dispatch(logIn(values.email, values.password))
            resetForm({})
        }
    })
    if (props.isAuth) {
        return <Redirect to={'/contacts'}/>
    } else {
        return (
            <div className={s.loginBox}>
                <form onSubmit={formik.handleSubmit}>
                    <Input classForDiv={s.textFieldBox}
                           fieldId={"custom-css-outlined-input"} name={"email"}
                           label={"Email"} formik={formik}/>
                    <Input classForDiv={s.textFieldBox}
                           fieldId={"custom-css-outlined-input"} name={"password"}
                           label={"Password"} formik={formik}/>
                    {props.error && <div className={s.allFormError}>{props.error}</div>}
                    <Button color="default" variant="contained" fullWidth type="submit">
                        Log in
                    </Button>
                </form>
            </div>
        )
    }
}

export default React.memo(Login)