import React, { useEffect, useState } from "react";
import HomeNav from "./HomeComponents/homeNav";
import { useNavigate, Outlet } from "react-router-dom";
import Axios from "axios";
import HomeLoading from "./HomeComponents/HomeLoading";
import HomeContent from "./HomeComponents/homeContent";
export default function Home() {
    const Navigate = useNavigate();
    const [IsMember, setIsMember] = useState(false);
    const [IsAdmin, setIsAdmin] = useState(false);
    const [UserName, SetUserName] = useState("");
    const [Auth, setAuth] = useState(null); // Use null to indicate loading initially

    useEffect(() => {
        async function testAuth() {
            try {
                const response = await Axios.get(
                    "http://localhost:3000/homePage",
                    {
                        withCredentials: true,
                    }
                );

                if (response.status === 200 && response.data) {
                    setAuth(true);
                    setIsMember(response.data.isMember);
                    setIsAdmin(response.data.isAdmin);
                    SetUserName(response.data.UserName);
                } else if (response.status === 401) {
                    setAuth(false);
                }
            } catch (error) {
                console.error("Error while checking authentication:", error);
                setAuth(false);
            }
        }

        testAuth();
    }, []);

    if (Auth === null) {
        return <HomeLoading />;
    }

    if (Auth === true) {
        return (
            <>
                <HomeNav
                    IsMember={IsMember}
                    IsAdmin={IsAdmin}
                    setIsMember={setIsMember}
                    setIsAdmin={setIsAdmin}
                />
                <HomeContent
                    UserName={UserName}
                    IsMember={IsMember}
                    IsAdmin={IsAdmin}
                />
            </>
        );
    }

    Navigate("/Auth/login");
    return null;
}
