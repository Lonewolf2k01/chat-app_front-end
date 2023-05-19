import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from '../assets/logoo.png';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { loginRoute } from "../utils/APIRoutes";
import { motion as m } from 'framer-motion'

const Login = () => {

    const navigate = useNavigate()


    const [values, setValues] = useState({
        username: '',
        password: '',
    })

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
    }

    useEffect(() => {
        if (localStorage.getItem("chat-app-user")) {
            navigate('/')
        }
    }, [navigate])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            const { password, username } = values;
            const { data } = await axios.post(loginRoute, {
                username, password
            })

            if (data.status === false) {
                toast.error(data.msg, toastOptions)
            }

            if (data.status === true) {
                localStorage.setItem("chat-app-user", JSON.stringify(data.user))
                navigate("/")
            }

        }

    };

    const handleValidation = () => {
        const { password, username } = values;

        if (password === '' && username === '') {
            toast.error("Please Fill Out the required Fields", toastOptions)
            return false
        } else if (username === "") {
            toast.error("Please Enter a Valid Username", toastOptions)
            return false
        } else if (password === "") {
            toast.error("Please Enter a Valid Password", toastOptions)
            return false
        }
        return true
    }

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }

    return (
        <>
            <FormContainer className="container">
                <m.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    onSubmit={(event) => handleSubmit(event)}
                >
                    <div className="brand">
                        <img src={Logo} alt="Wanna Chat??" />
                        <h1>Wanna Chat??</h1>
                    </div>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={(e) => handleChange(e)}
                        min='3'
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={(e) => handleChange(e)}
                    />
                    <button type="submit">Let's GO!</button>
                    <span>
                        Don't Have an Account ?<Link to="/register">Register</Link>
                    </span>
                </m.form>
            </FormContainer>
            <ToastContainer />
        </>
    );
};

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;
    
    
    .brand{
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        img{
            height: 5rem;
            border-radius: 40px;
        }
        h1{
            color: white;
            text-transform: uppercase;
        }
    }

    form{
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background-color: #0000008a;
        border-radius: 2rem;
        padding: 3rem 5rem;

        input{
            background-color: transparent;
            padding: 1rem;
            border-left: 0.1rem solid #4e04ff;
            border-right: 0.1rem solid #4e04ff;
            border-top: none;
            border-bottom: none;
            border-radius: 1rem;
            color: white;
            font-size: 1rem;
            width: 100%;
            transition: all 0.2s ease-in-out;
            &:hover{
                transform: scale(1.03) translate(1%, 1%);
            }
            &:focus{
                border-top: 0.1rem solid #997af0;
                border-bottom: 0.1rem solid #997af0;
                border-left: none;
                border-right: none;
                outline: none;
            }
        }

        button{
            background-color: transparent;
            color: white;
            padding: 1rem 2rem;
            border-top: 0.1rem solid #997af0;
            border-bottom: 0.1rem solid #997af0;
            border-left: none;
            border-right: none;
            font-weight: bold;
            cursor: pointer;
            border-radius: 1.25rem;
            font-size: 1rem;
            text-transform: uppercase;
            transition: all 0.2s ease-in-out;
            &:hover{
                border-left: 0.1rem solid #997af0;
                border-right: 0.1rem solid #997af0;
                border-top: none;
                border-bottom: none;
                color: #997af0;
                transform: scale(1.03) translate(1%, 1%);
            }
        }

        span{
            color: white;
            text-transform: uppercase;
            display: flex;
            gap: 1rem;
            
            a{
                color: #4e04ff;
                text-decoration: none;
                font-weight: bold;
                display: inline-block;
                position: relative;
                transition: all 0.1s ease-in-out;
                
                &::after{
                    content: '';
                    position: absolute;
                    width: 100%;
                    transform: scaleX(0);
                    height: 2px;
                    bottom: 0;
                    left: 0;
                    background-color: #997af0;
                    transform-origin: bottom right;
                    transition: transform 0.25s ease-out;   
                }

                &:hover::after {
                    transform: scaleX(1);
                    transform-origin: bottom left;
                }

                &:hover{
                    color: #997af0;
                    transform: scale(1.03) translate(1%, 1%);
                }
            }
        }
    }

    @media screen and (max-width: 1024px) {
        form {
            width: 70%;
        }
        form span{
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
    }

    @media screen and (max-width: 720px) {
        form {
            width: 85%;
        }
        form span{
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
    }

    
`;

export default Login;
