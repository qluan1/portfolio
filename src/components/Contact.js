import React, { useState, useEffect } from 'react';
import './Contact.css';
import handleRequest from './apis';

export default Contact;

const contactDes = (
    'Please feel free to contact me if you\'d like to discuss work opportunities with me. ' +
    'You are also welcome to use the following contact form '+
    'if you have novel ideas for collaboration, '+ 
    'if you\'d like to know more about my projects,'+ 
    'or if you have any questions or requests.'
);

function Contact (props) {

    let [name, setName] = useState('');
    let [email, setEmail] = useState('');
    let [message, setMessage] = useState('');
    let [nameCheck, setNameCheck] = useState('');
    let [emailCheck, setEmailCheck] = useState('');
    let [messageCheck, setMessageCheck] = useState('');
    let [submitResult, setSubmitResult] = useState('');

    const isNameValid = (s) => {
        return (
            typeof(s) === 'string' &&
            s.length !== 0
        );
    };

    const isMessageValid = (s) => {
        return (
            typeof(s) === 'string' &&
            s.length !== 0
        );
    };

    const isEmailValid = (s) => {
        if (
            typeof(s) !== 'string' ||
            s.length < 3
        ) {
            return false;
        }
        let i = s.indexOf('@');
        if (
            i === -1 ||
            i === 0 ||
            i === s.length - 1
        ) {
            return false;
        }
        // check for space in the middle of string
        let newS = s.trim();
        let j = newS.indexOf(' ');
        if (
            j !== -1
        ) {
            return false;
        }
        return true;
    };

    const checkInfoValid = () => {
        let isValid = true;
        if (!isNameValid(name)) {
            setNameCheck('name field cannot be empty');
            isValid = false;
        } else {
            setNameCheck('');
        }
        if (!isEmailValid(email)){
            setEmailCheck('invalid email address');
            isValid = false;
        } else {
            setEmailCheck('');
        }
        if (!isMessageValid(message)){
            setMessageCheck('message field cannot be empty');
            isValid = false;
        } else {
            setMessageCheck('');
        }

        return isValid;
    }

    const handleSubmitSuccess = () => {
        setSubmitResult('Your message is successfully delivered!');
        let sm = document.querySelector('.contact-submit-message');
        if (sm === null) return;
        sm.classList.add('display');
        setTimeout(() => {
            sm.classList.remove('display');
        }, 3000);
    };

    const handleSubmitError = () => {
        setSubmitResult('We encountered an error delivering your message. Please try again later.');
        let sm = document.querySelector('.contact-submit-message');
        if (sm === null) return;
        sm.classList.add('display');
        setTimeout(() => {
            sm.classList.remove('display');
        }, 3000);
    };

    async function handleSubmit() {
        if (checkInfoValid()){
            let data = {};
            data.Name = name.trim();
            data.Email = email.trim();
            data.Message = message.trim();
            let res = await handleRequest(data);
            if (res.result === 'success') {
                handleSubmitSuccess();
            } else {
                handleSubmitError();
            }
        }
    }

    return (
        <div
            className = 'content-section flex-column'
            id = 'contact'
        >
            <div
                className = 'contact-title'
            >
                {'Contact Me'}
            </div>
            <div
                className = 'contact-description'
            >
                {contactDes}
            </div>
            <div
                className = 'flex-column'
                id = 'contact-form'
            >
                <span>
                    {nameCheck}
                </span>
                <div
                    className = 'input-container'
                >
                    <input
                        id = 'contact-name'
                        type = 'text'
                        placeholder = 'Name'
                        value = {name}
                        onChange = {
                            (e) => {
                                setName(e.currentTarget.value);
                                if (
                                    isNameValid(e.currentTarget.value)
                                ) {
                                    setNameCheck('');
                                } else {
                                    setNameCheck('name field cannot be empty')
                                }
                            }
                        }
                        onFocus = {
                            (e) => {
                                e.currentTarget.parentNode.querySelector('.underline').classList.add('display');
                            }
                        }
                        onBlur = {
                            (e) => {
                                e.currentTarget.parentNode.querySelector('.underline').classList.remove('display');
                            }
                        }
                    />
                    <div className = 'underline'></div>
                </div>
                <span>
                    {emailCheck}
                </span>
                <div
                    className = 'input-container'
                >
                    <input
                        id = 'contact-email'
                        type = 'text'
                        placeholder = 'Email'
                        value = {email}
                        onChange = {
                            (e) => {
                                setEmail(e.currentTarget.value);
                                if (
                                    isEmailValid(e.currentTarget.value)
                                ) {
                                    setEmailCheck('');
                                } else {
                                    setEmailCheck('invalid email address');
                                }
                            }
                        }
                        onFocus = {
                            (e) => {
                                e.currentTarget.parentNode.querySelector('.underline').classList.add('display');
                            }
                        }
                        onBlur = {
                            (e) => {
                                e.currentTarget.parentNode.querySelector('.underline').classList.remove('display');
                            }
                        }
                    />
                    <div className = 'underline'></div>
                </div>
                <span>
                    {messageCheck}
                </span>
                <div
                    className = 'input-container'
                >
                    <textarea
                        id = 'contact-message'
                        value = {message}
                        placeholder = 'Message'
                        onChange = {
                            (e) => {
                                setMessage(e.currentTarget.value);
                                if (
                                    isMessageValid(e.currentTarget.value)
                                ) {
                                    setMessageCheck('');
                                } else {
                                    setMessageCheck('message field cannot be empty');
                                }
                            }
                        }
                        onFocus = {
                            (e) => {
                                e.currentTarget.parentNode.querySelector('.underline').classList.add('display');
                            }
                        }
                        onBlur = {
                            (e) => {
                                e.currentTarget.parentNode.querySelector('.underline').classList.remove('display');
                            }
                        }
                    />
                    <div className = 'underline'></div>
                </div>
                <button
                    id = 'contact-submit'
                    onClick = {handleSubmit}
                >
                    {'Submit'}
                </button>
            </div>
            <div
                className = 'contact-submit-message'
            >
                {submitResult}
            </div>
        </div>

    );
}

