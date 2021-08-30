import {Avatar, IconButton} from "@material-ui/core";
import React, {useContext, useEffect, useState} from "react";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import "./Chat.css";
import {useParams} from "react-router-dom";
import db from "../firebase/firebase";
import {useStateValue} from "../stateProvider/StateProvider";
import firebase from "firebase";
import {ChatHeaderContext} from "../context";

export const Chat = () => {
    const [seed, setSeed] = useState("");
    const [input, setInput] = useState("");
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const context = useContext(ChatHeaderContext);
    const [{user}, dispatch] = useStateValue();

    useEffect(() => {
        if (roomId) {
            db.collection("rooms")
                .doc(roomId)
                .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

            db.collection("rooms")
                .doc(roomId)
                .collection("messages")
                .orderBy("timestamp", "asc")
                .onSnapshot((snapshot) =>
                    setMessages(snapshot.docs.map((doc) => doc.data()))
                );
        }
    }, [roomId]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();

        db.collection("rooms").doc(roomId).collection("messages").add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

        setInput("");
    };
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar
                    src={`https://avatars.dicebear.com/4.5/api/human/${seed}.svg`}
                />
                <div className="chat__headerInfo">
                    <h3> {roomName} </h3>
                    <p>
                        {" "}
                        last seen{" "}
                        {new Date(
                            messages[messages.length - 1]?.timestamp?.toDate()
                        ).toUTCString()}{" "}
                    </p>
                </div>
                <div className="chat__headerRight">
                    {
                        !!context.length && context.map(({id, Icon}) => (
                            <IconButton key={id}>
                                {
                                    Icon
                                }
                            </IconButton>
                        ))
                    }
                </div>
            </div>
            <div className="chat__body">
                {!!messages.length &&
                messages.map((message) => (
                    <p
                        className={`chat__message  ${
                            message.name === user.displayName && "chat__reciever"
                        }`}
                    >
                        <span className="chat__name">{message.name}</span>
                        {message.message}
                        <span className="chat__timestamp">
                {new Date(message.timestamp?.toDate()).toUTCString()}
              </span>
                    </p>
                ))}
            </div>
            <div className="chat__footer">
                <InsertEmoticonIcon/>
                <form>
                    <input
                        type="text"
                        placeholder="Type a message"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button onClick={sendMessage} type="submit">
                        {" "}
                        Send a message{" "}
                    </button>
                </form>
                <MicIcon/>
            </div>
        </div>
    );
};
