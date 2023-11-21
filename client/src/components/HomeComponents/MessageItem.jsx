import React from "react";

export default function MessageItem({
    FirstName,
    LastName,
    UserName,
    Status,
    Date,
    title,
    text,
    Profile_Pic,
}) {
    return (
        <div className="flex border w-[90%] m-auto min-h-[50px] mt-4 mb-4 rounded-md">
            <div className="bg-gray-200 flex-[25%] p-2">
                <div>
                    <img
                        src={`http://localhost:3000/images/${Profile_Pic}`}
                        style={{
                            width: "35px",
                            height: "35px",
                            borderRadius: "50%",
                            objectFit: "cover",
                        }}
                        alt=""
                        className=" w-10 "
                    />
                </div>
                <div>
                    {FirstName} {LastName}
                </div>
                <div>{UserName}</div>
                <div className=" text-green-500 font-bold">{Status}</div>
                <div>{Date}</div>
            </div>
            <div className="bg-gray-100 flex-[75%] p-6">
                <div className="text-2xl font-bold p-2">{title}</div>
                <hr />
                <div className=" p-2">{text}</div>
            </div>
        </div>
    );
}
