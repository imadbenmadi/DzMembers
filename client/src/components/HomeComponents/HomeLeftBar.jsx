import React, { useEffect, useState } from "react";
import AddMessage from "./addMessage";

export default function HomeLeftBar({ UserName, IsAdmin, IsMember }) {
    const [divHeight, setDivHeight] = useState(0);
    useEffect(() => {
        const calculateHeight = () => {
            const viewportHeight = window.innerHeight;
            const newHeight = viewportHeight -65 ; // Adjust the height as needed
            setDivHeight(newHeight);
        };
        calculateHeight();
        window.addEventListener("resize", calculateHeight);
        return () => {
            window.removeEventListener("resize", calculateHeight);
        };
    }, []);

    return (
        <div
            className="fixed bg-gray-200 p-10"
            style={{ height: divHeight + "px" }}
        >
            <div>
                <strong>Username : </strong>"{UserName}"
            </div>
            <div className="mb-10">
                <strong>Status : </strong>
                {IsAdmin ? (
                    <span className="text-green-500 font-bold">Admin</span>
                ) : IsMember ? (
                    <span className="text-green-500 font-bold">Member</span>
                ) : (
                    "Guest"
                )}
            </div>
            <AddMessage />
        </div>
    );
}
