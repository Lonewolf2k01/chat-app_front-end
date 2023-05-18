import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { allUsersRoute, host } from '../utils/APIRoutes';
import Contact from '../components/Contact';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import { io } from 'socket.io-client'
import { motion as m } from 'framer-motion'

const Chat = () => {
    const socket = useRef()
    const [contacts, setContacts] = useState([])
    const [currentUser, setCurrentUser] = useState(undefined)
    const [currentChat, setCurrentChat] = useState(undefined)
    const [isLoaded, setIsLoaded] = useState(false)

    const navigate = useNavigate();

    const getUsers = async () => {
        if (!localStorage.getItem("chat-app-user")) {
            navigate('/login')
        } else {
            setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")))
            setIsLoaded(true)
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    useEffect(() => {
        if (currentUser) {
            socket.current = io(host)
            socket.current.emit("add-user", currentUser._id)
        }
    }, [currentUser])

    const fetchData = async () => {
        if (currentUser) {
            if (currentUser.isAvatarImageSet) {
                const data = await axios.get(`${allUsersRoute}/${currentUser._id}`)
                setContacts(data.data)
            } else {
                navigate('/setAvatar')
            }
        }
    }

    useEffect(() => {
        fetchData()
    }, [currentUser]);



    const handleChatChange = (chat) => {
        setCurrentChat(chat)
    }

    return (
        <Container>
            <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="container"
            >
                <Contact
                    contacts={contacts}
                    currentUser={currentUser}
                    changeChat={handleChatChange}
                />
                {
                    isLoaded && currentChat === undefined ? (
                        <Welcome currentUser={currentUser} />
                    ) : (
                        <ChatContainer
                            currentChat={currentChat}
                            currentUser={currentUser}
                            socket={socket}
                        />
                    )
                }
            </m.div>
        </Container>
    )
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;

    .container{
        height: 85vh;
        width: 85vw;
        background-color: #0000008a;
        display: grid;
        grid-template-columns: 30% 70%;
        border-radius: 1rem;

        @media screen and (max-width: 1024px){
            grid-template-columns: 40% 60%;
        }
        @media screen and (max-width: 720px){
            display: flex;
            flex-direction: column;
        }
    }
`

export default Chat