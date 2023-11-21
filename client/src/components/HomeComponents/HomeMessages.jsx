import axios from "axios";
import React, { useEffect, useState } from "react";
import AddMessage from "./addMessage";
import MessageItem from "./MessageItem";
import HomeLoading from "./HomeLoading";
function HomeMessages() {
    const [messages, setMessages] = useState([]);
    const [Loaded, setLoaded] = useState(false);
    async function getMessages() {
        const response = await fetch("http://localhost:3000/GetMessages", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        if (response.ok) {
            const data = await response.json();
            setMessages(data);
            setLoaded(true)
        } else {
            console.error("Failed to fetch messages.");
        }
    }
    useEffect(() => {
        getMessages();
    }, []);

    return (
        <div className="pl-[291px]">
            {Loaded ? (
                <div>
                    {messages.map((message) => (
                        <MessageItem
                            key={message._id}
                            FirstName={message.Creatore.FirstName}
                            LastName={message.Creatore.LastName}
                            UserName={message.Creatore.UserName}
                            Status={
                                message.Creatore.isAdmin
                                    ? "Admin"
                                    : message.Creatore.isMember
                                    ? "Member"
                                    : "Guest"
                            }
                            Date={message.CreatedDate}
                            title={message.title}
                            text={message.text}
                            Profile_Pic={message.Creatore.ProfilePic}
                        />
                    ))}
                </div>
            ) : (
                <HomeLoading />
            )}
        </div>
    );
}

export default HomeMessages;
