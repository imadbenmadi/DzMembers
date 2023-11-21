import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function HomeNav({
    IsMember,
    IsAdmin,
    setIsMember,
    setIsAdmin,
    userProfilePic,
}) {
    const Navigate = useNavigate();

    async function LogOut() {
        try {
            const response = await fetch("http://localhost:3000/Logout", {
                method: "POST",
                credentials: "include",
            });

            if (response.status === 200) {
                document.cookie =
                    "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

                window.location.reload();
            }
        } catch (error) {
            Swal.fire("Error", "Something went wrong", "error");
        }
    }

    async function ChangeToMember() {
        try {
            const response = await fetch(
                "http://localhost:3000/changeToMember",
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                Swal.fire(
                    "Congratulations!",
                    "You are a Member now!",
                    "success"
                );
                setIsMember(true);
            } else if (response.status === 500) {
                Swal.fire("Error", "Something went wrong", "error");
            } else {
                console.log(response.status);
            }
        } catch (error) {
            Swal.fire("Error", "Something went wrong", "error");
        }
    }
    async function RemoveMember() {
        try {
            const response = await fetch("http://localhost:3000/RemoveMember", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                Swal.fire("Done!", "You are Not a Member ", "success");
                setIsMember(false);
            } else if (response.status === 500) {
                Swal.fire("Error", "Something went wrong", "error");
            } else {
                console.log(response.status);
            }
        } catch (error) {
            Swal.fire("Error", "Something went wrong", "error");
        }
    }

    async function changeToAdmin() {
        try {
            const response = await fetch(
                "http://localhost:3000/changeToAdmin",
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                Swal.fire(
                    "Congratulations!",
                    "You are an admin now!",
                    "success"
                );
                setIsAdmin(true);
            } else if (response.status === 500) {
                Swal.fire("Error", "Something went wrong", "error");
            } else {
                console.log(response.status);
            }
        } catch (error) {
            Swal.fire("Error", "Something went wrong", "error");
        }
    }
    async function RemoveAdmin() {
        try {
            const response = await fetch("http://localhost:3000/RemoveAdmin", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                Swal.fire(
                    "Congratulations!",
                    "You are an admin now!",
                    "success"
                );
                setIsAdmin(false);
            } else if (response.status === 500) {
                Swal.fire("Error", "Something went wrong", "error");
            } else {
                console.log(response.status);
            }
        } catch (error) {
            Swal.fire("Error", "Something went wrong", "error");
        }
    }

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                padding: "10px",
                backgroundColor: "#9affa787",
                position: "fixed",
                width: "100%",
                height: "65px",
            }}
        >
            <div style={{ fontSize: "23px", fontWeight: "bold" }}>
                <span style={{ color: "green" }}>Only</span>
                Members
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <img
                    style={{ width: "35px",height: "35px",borderRadius:"50%",objectFit:"cover" }}
                    src={`http://localhost:3000/images/${userProfilePic}`}
                    alt=""
                />
                <div
                    style={{
                        color: "red",
                        cursor: "pointer",
                        fontWeight: "bold",
                    }}
                    onClick={LogOut}
                >
                    Log Out
                </div>
            </div>
            {!IsMember ? (
                <div
                    style={{
                        background: IsAdmin ? "#c9c9c9" : "#0cff00b3",
                        color: IsAdmin ? "#858585" : "black",
                        padding: "10px",
                        borderRadius: "10px",
                        cursor: IsAdmin ? "default" : "pointer",
                        fontWeight: "bold",
                    }}
                    onClick={IsAdmin ? null : ChangeToMember}
                >
                    Be a Member
                </div>
            ) : (
                <div
                    style={{
                        fontWeight: "bold",
                        color: IsAdmin ? "gray" : "red",
                        cursor: IsAdmin ? "default" : "pointer",
                    }}
                    onClick={IsAdmin ? null : RemoveMember}
                >
                    Remove Membership
                </div>
            )}

            {!IsAdmin ? (
                <div
                    style={{
                        background: "#0cff00b3",
                        color: "black",
                        padding: "10px",
                        borderRadius: "10px",
                        cursor: "pointer",
                        fontWeight: "bold",
                    }}
                    onClick={changeToAdmin}
                >
                    Be an Admin
                </div>
            ) : (
                <div
                    className=" font-bold text-red-600 cursor-pointer"
                    onClick={RemoveAdmin}
                >
                    Quite Admin Mood
                </div>
            )}
        </div>
    );
}
