import { useRef } from "react";
import '../styles/FormInput.css'
import { useState } from "react";

export default function FormInput({inputDetails}) {

    const { name, label, type, placeholder, required } = inputDetails;

    const inputRef = useRef();
    const [isFocused, setIsFocused] = useState(false);

    function formInputClickHandler() {
        inputRef.current.focus();
    }
    function focusChangeHandler(e) {
        setIsFocused(!isFocused);
    }

    return (
        <div
            onClick={formInputClickHandler}
            className={"form-input-container" + (
                isFocused ? ' focused' : ''
            )}
        >

            <label htmlFor={name}>{label}</label>

            <input
                name={name}
                id={name}
                required={required}
                type={type}
                ref={inputRef}
                onFocus={focusChangeHandler}
                onBlur={focusChangeHandler}
                {
                ...(placeholder ?
                    { placeholder: placeholder } :
                    { placeholder: label })
                }
            />

        </div>
    )
}
