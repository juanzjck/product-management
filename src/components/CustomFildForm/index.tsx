import React, { ChangeEvent } from "react";

interface customFieldProps {
    error: Boolean;
    errorMesage: string;
    value: string | number;
    label: string;
    onChange: (value: ChangeEvent<HTMLInputElement>) => void;
}

const CustomFieldForm: React.FC< customFieldProps> = ({error, errorMesage, value, onChange, label }) => {
    
    return (
        <div className="form-group">
            <label htmlFor="id">{label}</label>
            <input type="text" id="id" name="id" value={value} onChange={onChange} required />
            {error && <div className="error">{errorMesage}</div>}
        </div>
    );
}

export default CustomFieldForm;