import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoutes";
import { Buffer } from "buffer";
import { motion as m } from "framer-motion"

const SetAvatar = () => {
  const navigate = useNavigate();

  const dataFetchedRef = useRef(false);
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate('/login')
    }
  }, [navigate])

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an Avatar", toastOptions)
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"))
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      })

      if (data.isSet) {
        user.isAvatarImageSet = true
        user.avatarImage = data.image
        localStorage.setItem("chat-app-user", JSON.stringify(user))
        navigate('/')
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions)
      }
    }


  };

  const fetchData = async () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const rand = Math.ceil(Math.random() * 10000);
      const api = `https://api.multiavatar.com/${rand}.png?apikey=tXgDqIEQsSFldB`;

      try {
        const response = await axios.get(api, { responseType: "arraybuffer" });
        const buffer = Buffer.from(response.data, "binary").toString("base64");
        data.push(buffer);
      } catch (error) {
        console.error(`Error fetching image ${i}:`, error);
      }
    }
    setAvatars(data);
    setIsLoading(false)
  };

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchData();
  }, []);

  return (
    <>
      {
        isLoading ?
          <Container>
            <img src={Loader} alt="loader" className="loader" />
          </Container> :
          (
            <Container>
              <m.div initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="title_container"
              >
                <h1>Pick an Avatar as your Profile Picture</h1>
              </m.div>
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="avatars"
              >
                {avatars.map((avatar, index) => {
                  return (
                    <div
                      key={index}
                      className={`avatar 
                    ${selectedAvatar === index ? "selected" : ""}`}
                    >
                      <img
                        key={index}
                        src={`data:image/png;base64,${avatar}`}
                        alt="avatar"
                        onClick={() => setSelectedAvatar(index)}
                      />
                    </div>
                  );
                })}
              </m.div>
              <button onClick={() => setProfilePicture()}>
                Set as Profile Picture</button>
            </Container>
          )
      }
      <ToastContainer />
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  justify-content: center;
  align-items: center;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }

  .title_container {
    h1 {
      color: white;
    }
  }

  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      padding: 0.4 rem;
      border: 0.4rem solid transparent;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.4s ease-in-out;
      filter: blur(0.4px);

      img {
        height: 5.8rem;
        transition: all 0.4s ease-in-out;
        &:hover {
          transform: scale(1.05);
        }
      }
    }
    .selected {
      border: 0.4rem solid white;
      filter: blur(0px);
    }
  }

  button {
    background-color: transparent;
    color: white;
    margin-top: 2rem;
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
    &:hover {
      border-left: 0.1rem solid white;
      border-right: 0.1rem solid white;
      border-top: none;
      border-bottom: none;
      color: #997af0;
      transform: scale(1.03) translate(1%, 1%);
    }
  }

  @media screen and (max-width: 1024px) {
    .loader{
      max-inline-size: 90%;
    }

  }

  @media screen and (max-width: 720px) {
    .loader{
      max-inline-size: 80%;
    }
    .title_container {
      h1 {
        text-align: center;
      }
  }
    .avatars{
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
    
  }
`;

export default SetAvatar;
