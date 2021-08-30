import React, {useContext, useEffect, useState} from "react";
import "./Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import { SidebarChat } from "../SidebarChat/SidebarChat";
import db from "../firebase/firebase";
import { useStateValue } from "../stateProvider/StateProvider";
import {SidebarHeaderContext} from "../context";

export const Sidebar = () => {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const context = useContext(SidebarHeaderContext);

  useEffect(() => {
    const unsubscribe = db.collection("rooms").onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar__headerRight">
            {
                !!context.length && context.map( ({ id, Icon }) => (
                    <IconButton key={id}>
                        {
                            Icon
                        }
                    </IconButton>
                ) )
            }
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {!!rooms.length &&
          rooms.map(({ id, data }) => (
            <SidebarChat key={id} id={id} data={data} />
          ))}
      </div>
    </div>
  );
};
