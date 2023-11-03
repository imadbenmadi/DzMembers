import React from "react";
import { Outlet } from "react-router-dom";

export default function Auth() {
    return (
        <>
            <div
                style={{
                    display: "flex",
                    // justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "80vh",
                    flexDirection: "column",
                    fontSize: "24px",
                }}
            >
                <div style={{ fontSize: "2em", marginBottom: "30px" }}>
                    <span style={{ color: "green" }}>Only</span> Membes
                </div>
                <Outlet />
            </div>
        </>
    );
}
