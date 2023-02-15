import React, { useState, useEffect, useContext } from "react";
import { collection, onSnapshot, doc, addDoc, deleteDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import MDEditor from '@uiw/react-md-editor';

import { db } from "./../../firebase";
import { Layout } from './../Layout';

import { AuthContext } from '../../userContext';

export const Blog = ({ children, ...props }) =>
{
    const [ form, setForm ] = useState({
        title: "",
        body: "",
        user: "",
        timestamp: null,
    });

    const { user } = useContext(AuthContext);

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
        }) 
    }

    return (
        <Layout>
            Dashboard - Blog

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

            <h2>All Entries</h2>

            


        </Layout>
    )
}


{/* <MDEditor.Markdown source={form.body} style={{ whiteSpace: 'pre-wrap' }} /> */}