import React from 'react'
import "../style/login.scss"
const FormGroup = ({label,placeholder,value,onChange}) => {
    return (
        <div className="input-group">
            <label htmlFor={label}>{label}</label>
            <input
            value={value}
            onChange={onChange}
            type="text" id={label} name={label} placeholder={placeholder} />
        </div>
    )
}

export default FormGroup