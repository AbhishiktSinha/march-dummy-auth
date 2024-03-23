import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import ErrorMessage from "../../components/ErrorMessage";
import Loader from "../../components/Loader";

import './styles/LoginPage.css'

const initialState = {
    status: 'init',
    message: '',
} // init | success | error | loading

export default function LoginPage() {

    const [ formState, setFormState ] = useState(initialState);
    const {status, message} = formState;

    const navigate = useNavigate();

    useEffect(()=>{
        
        if (status == 'success') {
            navigate('../profile');
        }        

    }, [status])

    function dismissErrorHandler() {
        setFormState({
            status: 'init',
            message: '',
        })
    }


    return (
        <div id="login-page">
            <LoginForm setFormState={setFormState}/>

            {
                status == 'error' && (
                    <ErrorMessage 
                        errorMessage={message}
                        dismissErrorHandler={dismissErrorHandler}
                    />
                )
            }
            {
                status == 'loading' && <Loader />
            }
        </div>
    )
}