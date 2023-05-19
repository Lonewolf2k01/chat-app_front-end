import React from 'react'
import { RiLogoutCircleRLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'

const Logout = () => {
    const navigate = useNavigate()
    const handleClick = async () => {
        localStorage.clear()
        navigate("/login")
    }
    return (
        <Button onClick={() => handleClick()}>
            <RiLogoutCircleRLine />
        </Button>
    )
}

const Button = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    border-radius: 1rem;
    background-color: #9a86f3;
    border: none;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    svg{
        font-size: 1.3rem;
        color: #ebe7ff;
    }
    &:hover{
        transform: scale(1.1);
    }
`

export default Logout