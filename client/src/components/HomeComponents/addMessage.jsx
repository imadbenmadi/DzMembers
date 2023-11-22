import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import Swal from "sweetalert2";
import HomeMessages from "./HomeMessages";
import { BiRefresh } from "react-icons/bi";

export default function AddMessage() {
    const [changed, setchanged] = useState(false);
    function reloadPage() {
        window.location.reload();
    }
    async function handleSubmit(values, { setSubmitting }) {
        try {
            const response = await fetch("http://localhost:3000/AddMessage", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });
            if (response.status === 200) {
                Swal.fire(
                    "Done",
                    "Your Message has been sent successfully",
                    "success"
                );
                setchanged(true);
                

            }
        } catch (error) {
            if (error.response.status === 401) {
                Swal.fire("Not Authenticated", "", "error");
            }
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <>
            <div className="w-full max-w-md mx-auto">
                <div className="text-2xl font-semibold text-center mb-4">
                    Add a Message
                </div>
                <Formik
                    initialValues={{
                        title: "",
                        text: "",
                    }}
                    validate={(values) => {
                        const errors = {};

                        if (!values.title) {
                            errors.title = "Title is required";
                        }

                        if (!values.text) {
                            errors.text = "Message is required";
                        }

                        return errors;
                    }}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="mb-4">
                                <label
                                    htmlFor="title"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Title
                                </label>
                                <Field
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="Title"
                                    className="form-input w-full border border-gray-300 rounded-md p-2"
                                />
                                <ErrorMessage
                                    name="title"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="text"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Message
                                </label>
                                <Field
                                    type="text"
                                    id="text"
                                    name="text"
                                    placeholder="Message"
                                    className="form-input w-full border border-gray-300 rounded-md p-2"
                                />
                                <ErrorMessage
                                    name="text"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
                                disabled={isSubmitting}
                            >
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
            {/* Refresh the Page btn  */}
            {changed && (
                <div className="cursor-pointer" onClick={reloadPage}>
                    <div className="bg-red-600 p-2 w-fit rounded mt-6">
                        <BiRefresh className="text-white text-xl font-bold" />
                    </div>
                    <span className="text-[12px] text-red-500">
                        Refresh the page to see Your Message
                    </span>
                </div>
            )}
        </>
    );
}
