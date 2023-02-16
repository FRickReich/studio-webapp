import React, { useState, useEffect, useContext } from "react";
import { collection, onSnapshot, doc, addDoc, deleteDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import MDEditor from '@uiw/react-md-editor';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFeather } from '@fortawesome/free-solid-svg-icons';

import { db } from "./../../firebase";
import { Layout } from './../Layout';

import { AuthContext } from '../../userContext';
import { FloatingButton } from "../Components";
import { useNavigate } from "react-router";

export const Blog = ({ children, ...props }) =>
{
    const [ form, setForm ] = useState({
        title: "",
        body: "",
        user: "",
        timestamp: null,
    });

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const recipesCollectionRef = collection(db, "blogs");

    const handleSubmit = (e) =>
    {
        e.preventDefault();

        if(
            !form.title || 
            !form.body
        )
        {
            alert("please fill in that stuff");
            return;
        }

        form.user = user?.uid;
        form.timestamp = serverTimestamp();

        console.log(form);

        addDoc(recipesCollectionRef, form);

        setForm({
            title: "",
            body: "",
        });
    }

    const handleOpenEditor = () =>
    {
        
    }

    return (
        <Layout title="Blog">

            <form onSubmit={ handleSubmit }>
                <h2>New blog entry</h2>

                <input 
                    type="text" 
                    placeholder="title" 
                    value={ form.title } 
                    onChange={ e => setForm({ ...form, title: e.target.value })}
                />

                <div className="container">
                    <MDEditor
                        value={form.body}
                        onChange={(e) => setForm({ ...form, body: e})}
                        preview="edit"
                    />
                    </div>

                <button type="submit">Submit</button>
            </form>

            <h2>Bisherige Blogeinträge</h2>
            
            <FloatingButton
                primary
                path="/dashboard/blog/create"
            >
                <FontAwesomeIcon
                    className="icon"
                    icon={faFeather}
                />
            </FloatingButton>

        </Layout>
    )
}


{/* <MDEditor.Markdown source={form.body} style={{ whiteSpace: 'pre-wrap' }} /> */}