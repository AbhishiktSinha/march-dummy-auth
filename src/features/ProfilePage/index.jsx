import { useState, useEffect } from "react"

import ErrorMessage from "../../components/ErrorMessage";
import Loader from "../../components/Loader";

import { endpoints } from "../../network/endpoints";
import request from "../../network/request";

import './styles/ProfilePage.css'

const initialState = {
    loading: false,
    data: {},
    error: '',
}
export default function ProfilePage() {

    const [profileState, setProfileState] = useState(initialState);

    useEffect(() => {

        (async function () {

            const id = JSON.parse(localStorage.getItem('loginResponseData'))['id'];

            // start network call
            setProfileState({
                ...profileState,
                loading: true
            })

            const httpConfig = {
                url: endpoints.userIdUrl + id,
                method: 'get',
            }

            const { data, error } = await request(httpConfig);

            if (data) {
                setProfileState({
                    loading: false,
                    data: data,
                    error: '',
                })
            }
            else if (error) {
                setProfileState({
                    loading: false,
                    error: error,
                })
            }

        })()


    }, [])

    const { loading, data, error } = profileState;
    console.log(data);

    const {
        firstName, lastName, age, gender,
        email, phone, username, password,
        image,
        address,
        company
    } = data

    return (
        <div id="profile-page">

            <div className='navbar'>

                <div className={"navbar-right" + (loading ? ' loading' : '')}>

                    <div className="profile-icon-container">
                        {
                            image && (
                                <img src={image} alt={firstName + '_' + lastName} />
                            )
                        }
                    </div>

                    <div className="name-chip">
                        <>
                            {
                                firstName && <span>{firstName}</span>
                            }
                            {
                                lastName && <span>{lastName}</span>
                            }
                        </>
                    </div>
                </div>

            </div>


            <div className={"hero-section" + (
                loading ? ' loading' : ''
            )}>

                <div className="profile-image-container">
                    {
                        image && (
                            <img src={image} alt={firstName + '_' + lastName} />
                        )
                    }
                </div>

                <div className="basic-details-container">
                    <div className="name-container">
                        <>
                            {
                                firstName && <span key={'firstName'}>{firstName}</span>
                            }
                            {
                                lastName && <span key={'lastName'}>{lastName}</span>
                            }
                        </>
                    </div>

                    <div className="age-gender-container">
                        <>
                            {
                                age && <span key={'age'}>{age}</span>
                            }
                            {
                                gender && <span key={'gender'}>{gender}</span>
                            }
                        </>
                    </div>
                </div>

            </div>

            <div className={
                "user-details-section" +
                (loading ?
                    ' loading' :
                    '')}
            >

                {
                    loading ? (
                        <div className="table-placeholder"></div>
                    ) :
                        ( Object.keys(data).length > 0 ? 
                            (
                                <table className="user-details-table">

                                    <tbody>

                                        <tr key={'email-field'}>
                                            <td key={'email'}>Email</td>
                                            <td key={'value'}>{email}</td>
                                        </tr>
                                        <tr key={'phone-field'}>
                                            <td key={'phone'}>Phone</td>
                                            <td key={'value'}>{phone}</td>
                                        </tr>

                                        <tr key={'username-field'}>
                                            <td key={'username'}>Username</td>
                                            <td key={'value'}>{username}</td>
                                        </tr>
                                        <tr key={'password-field'}>
                                            <td key={'password'}>Password</td>
                                            <td key={'value'}>{password}</td>
                                        </tr>

                                        <tr key={'address-field'}>
                                            <td key={'address'}>Address</td>
                                            <td key={'value'}>{
                                                address.address + ', ' +
                                                address.city + ', ' +
                                                address.state
                                            }
                                            </td>
                                        </tr>
                                        <tr key={'company-field'}>
                                            <td key={'company'}>Company</td>
                                            <td key={'value'}>{
                                                company.name + ', ' +
                                                company.department
                                            }
                                            </td>
                                        </tr>

                                    </tbody>

                                </table>
                            ) : 
                            <div className="table-placeholder"></div>                   
                        )
                }

            </div>

            {
                loading && <Loader />
            }
        </div>
    )

}