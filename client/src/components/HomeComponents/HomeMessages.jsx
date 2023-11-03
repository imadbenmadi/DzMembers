import axios from "axios";
import React from "react";
import AddMessage from "./addMessage";
import MessageItem from "./MessageItem";
function HomeMessages() {
    async function getMessages() {
        axios.get("");
    }
    return (
        <div className=" pl-[291px] ">
            <MessageItem
                FirstName={"imad"}
                LastName={"Benmadi"}
                UserName={"i991"}
                Status={"Admin"}
                Date={"sep"}
                title={"Hello World"}
                text={"Hi this is a test"}
            />
            <MessageItem
                FirstName={"imad"}
                LastName={"Benmadi"}
                UserName={"i991"}
                Status={"Admin"}
                Date={"sep"}
                title={"Hello World"}
                text={"Hi this is a test"}
            />
            <MessageItem
                FirstName={"imad"}
                LastName={"Benmadi"}
                UserName={"i991"}
                Status={"Admin"}
                Date={"sep"}
                title={"Hello World"}
                text={"Hi this is a test"}
            />
        </div>
    );
}

export default HomeMessages;
