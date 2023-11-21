import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import HomeNav from "./HomeComponents/homeNav";
import HomeLoading from "./HomeComponents/HomeLoading";
import HomeContent from "./HomeComponents/homeContent";

const Home = () => {
    const navigate = useNavigate();
    const [auth, setAuth] = useState(null);
    const [isMember, setIsMember] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [userName, setUserName] = useState("");
    const [userProfilePic, setUserProfilePic] = useState(null);

    useEffect(() => {
        const checkAuthentication = async () => {
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
                    setUserName(response.data.UserName);

                    // Fetch user's profile picture
                    await getProfilePic();
                } else if (response.status === 401) {
                    setAuth(false);
                }
            } catch (error) {
                console.error("Error while checking authentication:", error);
                setAuth(false);
            }
        };

        checkAuthentication();
    }, []);

    const getProfilePic = async () => {
        try {
            const profilePicResponse = await Axios.get(
                "http://localhost:3000/getUserProfilePic",
                {
                    withCredentials: true,
                }
            );

            if (profilePicResponse.status === 200 && profilePicResponse.data) {
                setUserProfilePic(profilePicResponse.data.profilePic);
            }
        } catch (error) {
            console.error("Error getting user profile picture:", error);
        }
    };

    if (auth === null) {
        return <HomeLoading />;
    }

    if (auth) {
        return (
            <>
                <HomeNav
                    isMember={isMember}
                    isAdmin={isAdmin}
                    setIsMember={setIsMember}
                    setIsAdmin={setIsAdmin}
                    userProfilePic={userProfilePic}
                />
                <HomeContent
                    userName={userName}
                    isMember={isMember}
                    isAdmin={isAdmin}
                />
            </>
        );
    }

    navigate("/Auth/login");
    return null;
};

export default Home;
