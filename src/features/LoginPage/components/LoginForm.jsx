import { inputs } from "../inputs";
import request from '../../../network/request'
import { endpoints } from "../../../network/endpoints";
import FormInput from "./FormInput";

import '../styles/LoginForm.css'

const inputsKeys = Object.keys(inputs);

export default function LoginForm({setFormState}) {

    async function formSubmitHandler(e) {
        e.preventDefault();
        const form = e.target;

        const httpConfig = {
            url: endpoints.loginUrl,
            
            method: 'POST',

            headers: {
                'content-type' : 'application/json'
            },

            data: {
                "username": form.username.value,
                "password": form.password.value,
                "expiresInMins": '5'
            }
        }

        setFormState({
            status: 'loading',
            message: '',
        })

        const {data, error} = await request(httpConfig);

        if (data) {          
            const {id, token} = data;
            localStorage.setItem('loginResponseData', JSON.stringify(
                {
                    id: id,
                    token: token
                }
            ))

            setFormState({
                status: 'success',
                message: ''
            });
        }
        else if(error) {
            setFormState({
                status: 'error',
                message: error,
            });
        }
    }

    return(
        <div className="login-form-container">
            <form
                onSubmit={formSubmitHandler}
            >
                
                {
                    inputsKeys.map( key =>{
                        const inputDetails = inputs[key];

                        const {name} = inputDetails;
                        return (
                            <FormInput 
                                key={name}
                                inputDetails={inputDetails}
                            />
                        )
                    })
                }

                <button
                    type="submit"
                    className="login-button"
                >
                    Login
                </button>

            </form>
        </div>
    )
}