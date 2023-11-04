import React, { useState } from "react";
import HomeMessages from "./HomeMessages";
import HomeLeftBar from "./homeLeftBar";
export default function HomeContent({ UserName, IsAdmin, IsMember }) {
    const [messages, setMessages] = useState([]);
    return (
        <div className=" pt-[65px]">
            <HomeLeftBar
                UserName={UserName}
                IsAdmin={IsAdmin}
                IsMember={IsMember}
            />
            <HomeMessages />
        </div>
    );
}
