import React from "react";
import {withStyles} from "@material-ui/core/styles";
import {Fab, TextField, Tooltip} from "@material-ui/core";

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'white',
        },
        '& label': {
            color: 'rgb(150,150,150)',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'green',
            color: 'white'
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'black',
            },
            '&:hover fieldset': {
                borderColor: 'rgb(150,150,150)',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'white',
            },
            color: 'rgb(150,150,150)'
        },
    },
})(TextField);
export const Input = (props) => {
    return (
        <div className={props.classForDiv}>
                    <CssTextField
                        variant="outlined"
                        id={props.fieldId}
                        required
                        fullWidth
                        name={props.name}
                        label={props.label}
                        value={props.formik.values[`${props.name}`]}
                        onChange={props.formik.handleChange}
                        error={props.formik.touched[`${props.name}`] && Boolean(props.formik.errors[`${props.name}`])}
                        helperText={props.formik.touched[`${props.name}`] && props.formik.errors[`${props.name}`]}
                        // autoComplete='off'
                    />
        </div>

    )
}

export let CustomTooltip = (props) => {
    const LightTooltip = withStyles(() => ({
        tooltip: {
            fontSize: 16,
        },
    }))(Tooltip);
    return (
        <LightTooltip title={props.toolTitle} aria-label={props.toolTitle}>
            <Fab onClick={props.FabAction} type={props.type} placeholder={props.toolTitle} color="default"
                 aria-label={props.toolTitle} size={props.small}>
                {props.Icon}
            </Fab>
        </LightTooltip>
    )
}