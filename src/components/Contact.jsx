import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import Logo from "../assets/logoo.png";

const Contact = ({ contacts, currentUser, changeChat }) => {

  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index)
    changeChat(contact)
  };

  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h3>Wanna Chat??</h3>
          </div>

          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={index}
                  className={`
                      contact ${index === currentSelected ? "selected" : ""
                    }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      key={index}
                      src={`data:image/png;base64,${contact.avatarImage}`}
                      alt="avatar"
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}

          </div>

          <div className="current_user">
            <div className="avatar">
              <img
                src={`data:image/png;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  border-radius: 1rem;
  
  @media screen and (max-width: 720px) {
    display: flex;
    flex-direction: column; 
    height: 25%;
    margin: 2rem;
    overflow: scroll;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
      border-radius: 40px;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
    @media screen and (max-width: 720px) {
        display: flex;
        flex-direction: row;    
        padding: 1rem;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    transition: all 0.5s ease-in-out;
    gap: 1rem;
    @media screen and (max-width: 720px){
      display: flex;
      flex-direction: row;
      justify-content: center;
      overflow: scroll;
    }

    &::-webkit-scrollbar:horizontal{
      height: 0.2rem;
      &-thumb {
        background-color: #9a86f3;
        width: 5px;
        border-radius: 1rem;
      }
    }

    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #9a86f3;
        width: 5px;
        border-radius: 1rem;
      }
    }
    

    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 85%;
      border-radius: 1rem;
      padding: 0.5rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.2s ease-in-out;
      @media screen and (max-width: 720px){
        justify-content: center;
        width: 15%;
        margin-bottom: 0.5rem;
        background-color: transparent;
        border-radius: 50%;
      }
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
        @media screen and (max-width: 720px){
          display: none;
        }
        
      }
      &:hover {
        transform: scale(1.03);
      }
      
    }
    .selected {
      background-color: #9a86f3;
      @media screen and (max-width: 720px){
        background-color: transparent;
      }
            
    }
  }
  .current_user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    border-radius: 1rem;
    .avatar {
      img {
        height: 4rem;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
  }
  @media screen and (max-width: 1024px) {
    .current_user {
      gap: 1rem;
      .username {
        h2 {
          font-size: 1.5rem;
        }
      }
    }
  }
  @media screen and (max-width: 720px) {
    .current_user {
      display: none;
    }
  }
`;

/* 
const Container = styled.div`
    display: grid;
    grid-template-rows: 10% 75% 15%;
    overflow: hidden;
    background-color: #080420;
    .brand{
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        img{
            height: 2rem;
            align-items: center;
        }
        h3{
            text-align: center;
            color: white;
            text-transform: uppercase;
        }
    }

    .contacts{
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        gap: 0.8rem;
        .contact{
            background-color: #ffffff39;
            min-height: 5rem;
            width: 90%;
            cursor: pointer;
            border-radius: 1rem;
            padding: 0.4rem;
            gap: 1rem;
            align-items: center;
            display: flex;
        
        .avatar{
            img{
                height: 3rem;
            }
        }
    }
    }
`
 */

export default Contact;
