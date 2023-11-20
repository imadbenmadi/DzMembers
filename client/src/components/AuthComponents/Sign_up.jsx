import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Axios from "axios";
export default function Sign_up() {
    const Navigate = useNavigate();
    async function handleRegestration(values, { setSubmitting }) {
        const formData = new FormData();
        formData.append("FirstName", values.FirstName);
        formData.append("LastName", values.LastName);
        formData.append("UserName", values.UserName);
        formData.append("Email", values.Email);
        formData.append("Password", values.Password);
        formData.append("ProfilePic", values.ProfilePic); // Append the profile picture

        try {
            const response = await fetch("http://localhost:3000/Auth/Sign_up", {
                method: "POST",
                body: formData,
                credentials: "include",
            });

            if (response.status === 400) {
                Swal.fire(
                    "Username already exists",
                    "Please try to use another Username",
                    "error"
                );
            } else if (response.status === 200) {
                Swal.fire(
                    "Done!",
                    "Your account has been created Successfully",
                    "success"
                );
                Navigate("/Auth/Login");
            } else if (response.status === 500) {
                Swal.fire(
                    "Error!",
                    "Internal server error. Please try again",
                    "error"
                );
            } else {
                Swal.fire(
                    "Error!",
                    "Something Went Wrong. Please try again",
                    "error"
                );
            }
        } catch (error) {
            console.error("Error uploading profile picture:", error);

            Swal.fire(
                "Error!",
                "Something Went Wrong. Please try again",
                "error"
            );
        }

        setSubmitting(false);
    }

    return (
        <div>
            <h1>Sign Up</h1>
            <Formik
                initialValues={{
                    FirstName: "",
                    LastName: "",
                    UserName: "",
                    Email: "",
                    Password: "",
                    ProfilePic: null,
                }}
                validate={(values) => {
                    const errors = {};
                    if (!values.FirstName) {
                        errors.FirstName = "Required";
                    }
                    if (!values.LastName) {
                        errors.LastName = "Required";
                    }
                    if (!values.UserName) {
                        errors.UserName = "Required";
                    }
                    if (!values.Email) {
                        errors.Email = "Required";
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                            values.Email
                        )
                    ) {
                        errors.Email = "Invalid email address";
                    }
                    if (!values.Password) {
                        errors.Password = "Required";
                    }
                    return errors;
                }}
                onSubmit={handleRegestration}
            >
                {({ isSubmitting }) => (
                    <Form style={formStyle}>
                        <div>
                            <Field
                                type="text"
                                name="FirstName"
                                placeholder="First Name"
                                style={inputStyle}
                                disabled={isSubmitting}
                            />
                            <ErrorMessage
                                name="FirstName"
                                component="div"
                                style={errorInputMessage}
                            />
                        </div>
                        <div>
                            <Field
                                type="text"
                                name="LastName"
                                placeholder="Last Name"
                                style={inputStyle}
                                disabled={isSubmitting}
                            />
                            <ErrorMessage
                                name="LastName"
                                component="div"
                                style={errorInputMessage}
                            />
                        </div>
                        <div>
                            <Field
                                type="text"
                                name="UserName"
                                placeholder="User Name"
                                style={inputStyle}
                                disabled={isSubmitting}
                            />
                            <ErrorMessage
                                name="UserName"
                                component="div"
                                style={errorInputMessage}
                            />
                        </div>
                        <div>
                            <Field
                                type="text"
                                name="Email"
                                placeholder="Email"
                                style={inputStyle}
                                disabled={isSubmitting}
                            />
                            <ErrorMessage
                                name="Email"
                                component="div"
                                style={errorInputMessage}
                            />
                        </div>
                        <div>
                            <Field
                                type="password"
                                name="Password"
                                placeholder="Password"
                                style={inputStyle}
                                disabled={isSubmitting}
                            />
                            <ErrorMessage
                                name="Password"
                                component="div"
                                style={errorInputMessage}
                            />
                        </div>
                        <div>
                            <label htmlFor="profilePic">Profile Picture:</label>
                            <Field
                                type="file"
                                id="profilePic"
                                name="ProfilePic"
                                accept="image/*"
                                onChange={(event) =>
                                    setFieldValue(
                                        "ProfilePic",
                                        event.currentTarget.files[0]
                                    )
                                }
                                style={inputStyle}
                                disabled={isSubmitting}
                            />
                            <ErrorMessage
                                name="ProfilePic"
                                component="div"
                                style={errorInputMessage}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            style={buttonStyle}
                        >
                            {isSubmitting ? (
                                <div className="spinner"></div>
                            ) : (
                                "Submit"
                            )}
                        </button>
                    </Form>
                )}
            </Formik>
            <div style={{ fontSize: "13px", marginTop: "10px" }}>
                Alredy Have an account ?<Link to="/Auth/Login">Create One</Link>
            </div>
        </div>
    );
}

const formStyle = {
    display: "flex",
    flexDirection: "column",
    maxWidth: "300px", // Adjust the form width as needed
    margin: "0 auto",
};

const inputStyle = {
    margin: "8px 0",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
};

const buttonStyle = {
    background: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "4px",
    cursor: "pointer",
};
const errorInputMessage = {
    fontSize: "12px",
    color: "red",
};
