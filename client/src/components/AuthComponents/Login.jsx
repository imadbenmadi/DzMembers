import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios"; 


export default function Login() {
    const Navigate = useNavigate();
    
    async function handleLogin(values, { setSubmitting }) {
        try {
            let response = await axios.post(
                "http://localhost:3000/Auth/Login",

                values,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    validateStatus: () => true,
                }
            );

            if (response.status === 200) {
                Swal.fire("Logged in Successfully!", "", "success");
                Navigate("/");
            } else if (response.status === 409) {
                Swal.fire(
                    "Error!",
                    "UserName Or Password isn't correct. Please try again",
                    "error"
                );
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

            setSubmitting(false);
        } catch (error) {
                Swal.fire(
                    "Error!",
                    "Something Went Wrong. Please try again",
                    "error"
                );
            setSubmitting(false);
        }
    }

    return (
        <div>
            <h1>Log In</h1>
            <Formik
                initialValues={{
                    UserName: "",
                    Password: "",
                }}
                validate={(values) => {
                    const errors = {};

                    if (!values.UserName) {
                        errors.UserName = "Required";
                    }

                    if (!values.Password) {
                        errors.Password = "Required";
                    }
                    return errors;
                }}
                onSubmit={handleLogin}
            >
                {({ isSubmitting }) => (
                    <Form style={formStyle}>
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
                Don't Have an account ?<Link to="/Sign_up">Create One</Link>
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
