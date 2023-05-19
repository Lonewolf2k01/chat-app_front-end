import React, { useState } from 'react'
import styled from 'styled-components'
import Picker from 'emoji-picker-react'
import { BiMailSend } from 'react-icons/bi'
import { BsEmojiSunglasses } from 'react-icons/bs'
import { motion as m } from 'framer-motion'

const ChatInput = ({ handleSendMsg }) => {

    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [msg, setMsg] = useState("")

    const handleEmojiPicker = () => {
        setShowEmojiPicker(!showEmojiPicker)
    }

    const sendChat = (event) => {
        event.preventDefault()
        if (msg.length > 0) {
            handleSendMsg(msg)
            setMsg('')
        }
    }

    return (
        <Container>
            <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="button-container"
            >
                <div className="emoji">
                    <BsEmojiSunglasses onClick={() => handleEmojiPicker()} />
                    {showEmojiPicker && <Picker width="20em" height="400px" onEmojiClick={(emojiObject) => setMsg((prevMsg) => prevMsg + emojiObject.emoji)} />}
                </div>
            </m.div>

            <m.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="input-container"
                onSubmit={(e) => sendChat(e)}
            >
                <input
                    type="text"
                    placeholder='Your Message should be written here'
                    onChange={(e) => setMsg(e.target.value)}
                    value={msg} />
                <button className="submit">
                    <BiMailSend />
                </button>
            </m.form>
        </Container>
    )
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 5% 95%;
    align-items: center;
    background-color: #080420;
    padding: 0 2rem;
    padding-bottom: 0.3rem;
    @media screen and (max-width: 1024px){
        padding: 0 1rem;
        gap: 1rem;
    }
    @media screen and (max-width: 720px){
        display: flex;
        gap: 1rem;
    }
    .button-container{
        display: flex;
        align-items: center;
        color: white;
        gap: 1rem;
        .emoji{
            position: relative;
            @media screen and (max-width: 720px){
                display: none;
            }
            svg{
                font-size: 1.5rem;
                color: #ffff00c8;
                cursor: pointer;

            }
            .EmojiPickerReact{
                border-radius: 2rem;
                position: absolute;
                top: -430px;
                background-color: transparent;
                box-shadow: 0 5px 10px #9a86f3;
                border-color: #9a86f3;
                ::-webkit-scrollbar{
                    scroll-behavior: smooth;
                    background-color: #080420;
                    width: 5px;
                    &-thumb{
                        background-color: #9a86f3;
                        border-radius: 5px;
                    }
                }
                .epr-search,.epr-emoji-category-label{
                    background-color: transparent;
                    color: #9a86f3;
                    border-color: #9a86f3;
                    border-radius: 2rem;
                }
                button.epr-emoji{
                    border-radius: 80px;
                }
            }
        }
    }
    .input-container{
        width: 98%;
        border-radius: 2rem;
        display: flex;
        align-items: center;
        gap: 2rem;
        background-color: #ffffff34;
        input{
            width: 90%;
            height: 60%;
            background-color: transparent;
            border: none;
            color: white;
            padding: 0.2rem;
            padding-left: 1rem;
            font-size: 1.2rem;
            @media screen and (max-width: 1024px){
                padding: 0.8rem;
            }

            @media screen and (max-width: 720px){
                padding: 0.8rem;
            }

            &::selection{
                background-color: #9a86f3;
            }
            &:focus{
                outline: none;
            }
        }
        button{
            border-radius: 2rem;
            padding: 0.3rem 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #9a86f3;
            border: none;
            svg{
                font-size: 2rem;
                color: white;
            }
            @media screen and (max-width: 1024px){
                padding: 0.5rem 2rem;
                
            }
            @media screen and (max-width: 720px){
               padding: 0.5rem 2rem;
            }
        }
    }
`

export default ChatInput