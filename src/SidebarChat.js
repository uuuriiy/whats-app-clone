import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import db from "./firebase";
import "./SidebarChat.css";

export const SidebarChat = ({ addNewChat, id, data }) => {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt("Please enter name for chat");

    if (roomName) {
      // do some database stuff...
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

  return !addNewChat ? (
    <NavLink to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar
          src={`https://avatars.dicebear.com/4.5/api/human/${seed}.svg`}
        />
        <div className="sidebarChat__info">
          <h2> {data.name} </h2>
          <p> {messages[0]?.message} </p>
        </div>
      </div>
    </NavLink>
  ) : (
    <div className="sidebarChat" onClick={createChat}>
      <h2> Add new Chat </h2>
    </div>
  );
};
