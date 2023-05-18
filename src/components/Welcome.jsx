import React from 'react'
import styled from 'styled-components'
import Robo from '../assets/robot.gif'

const Welcome = ({ currentUser }) => {

    return (
        <Container>
            <img src={Robo} alt="Robot" />
            <div className='headings'>
                <h1>
                    Welcome, <span>{currentUser.username}!</span>
                </h1>
                <h3>
                    Select a chat and You're Good to GO!!!
                </h3>
            </div>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
    img{
        height: 20rem;
        @media screen and (max-width: 720px){
            height: 13rem;
        }
    }
    .headings{
        span{
            color: #4e04ff;
        }
        display: flex;
        flex-direction: column;
        gap: 1rem;
        text-align: center;
        @media screen and (max-width: 1024px){
            h1,h3{
                padding: 0.5rem; 
                text-align: center;
            }           
        }
        @media screen and (max-width: 720px){
            h3{
                font-size: 1.1rem;
            }
            h1{
                font-size: 1.5rem;
            }
            h1,h3{
                padding: 0.1rem; 
                text-align: center;
            }
        }
    }
`

export default Welcome