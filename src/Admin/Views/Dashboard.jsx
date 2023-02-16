import React, { useState, useEffect } from "react";
import { db } from "./../../firebase";
import { collection, onSnapshot, doc, addDoc, deleteDoc, updateDoc, serverTimestamp } from "firebase/firestore";

import { Layout } from './../Layout';

import { Form, FormField, LinkExternalButton } from './../Components';

export const Dashboard = ({ children, ...props }) =>
{
    const [ configs, setConfigs ] = useState();

    const collectionRef = collection(db, "configs");
   
    useEffect(() =>
    {
        onSnapshot(collectionRef, snapshot => {
            setConfigs(...snapshot.docs.map(doc => {
                return {
                    [doc.data().name]: 
                    {
                        id: doc.id,
                        ...doc.data()
                    }
                }
            }));

            console.log(configs);
        });
    }, []);

    return (
        <Layout title="Übersicht">
            
            <h2>Wichtige Links</h2>

            <div className="link-list">
                <LinkExternalButton
                    path="https://console.firebase.google.com/u/1/project/tattoo-studio-1bf28/overview"
                    fluid
                >
                    Google Administration
                </LinkExternalButton>

                <LinkExternalButton
                    path="https://console.firebase.google.com/u/1/project/tattoo-studio-1bf28/analytics/app/web:YmM0ZjRmNmMtNzBiMi00ODMxLWJlYmUtMjdlZDI5YTAxYmNl/streamview/~2F%3Ft%3D1676561471210&fpn%3D434152323259&swu%3D1&sgu%3D1&sus%3Dupgraded&cs%3Dapp.m.streamview.overview&g%3D1"
                    fluid
                >
                    Google Analytics
                </LinkExternalButton>

                <LinkExternalButton
                    path="https://console.firebase.google.com/u/1/project/tattoo-studio-1bf28/usage"
                    fluid
                >
                    Google Abrechnung
                </LinkExternalButton>
            </div>

            <h2>Einstellungen</h2>

                {/* // configs && configs[0].main.email
                // configs && configs.map((user, i) => {
                //     console.log(user);
                //     return(
                //         <>
                //             <p key={i}>{ user.main.email }</p>
                //         </>
                //     )
                // })
                */}

                {/* {
                    configs && configs?.main.email
                } */}

                {/* <form action="">

                    <h3>Allgemein</h3>

                    <label htmlFor="pagetitle">Seitentitel</label>
                    <input type="text" id="title"/>

                    <br />

                    <label htmlFor="contactmail">Kontaktemail</label>
                    <input
                        type="text" id="contactemail"
                    />

                    <br />

                    <label htmlFor="description">Kontaktemail</label>
                    <textarea name="description" id="description" cols="30" rows="5"></textarea>

                    <h3>Social Links</h3>

                    <label htmlFor="contactmail">Facebook</label>
                    <input type="text" id="contactemail" />

                    <label htmlFor="contactmail">Instagram</label>
                    <input type="text" id="contactemail" />

                    <label htmlFor="contactmail">TikTok</label>
                    <input type="text" id="contactemail" />

                    <label htmlFor="contactmail">Whatsapp</label>
                    <input type="text" id="contactemail" />

                    <input type="submit" value="Speichern" />
                </form> */}

                <Form>
                    <FormField label="Seitentitel"/>
                    <FormField label="E-Mail"/>
                    <FormField label="Beschreibung"/>
                </Form>

        </Layout>
    )
}

/*
import React, { useState, useEffect } from "react";

import { db } from "./../../firebase";
import { collection, onSnapshot, doc, addDoc, deleteDoc, updateDoc, serverTimestamp } from "firebase/firestore";

import { Layout } from './../Layout';
import { Table } from "../Components";

export const Users = ({ children, ...props }) =>
{
    const [ users, setUsers ] = useState();

    const collectionRef = collection(db, "users");

   
    useEffect(() =>
    {
        onSnapshot(collectionRef, snapshot => {
            setUsers(snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            }));
        });
    }, []);
    
    const handleChangeRole = (id, originalData) => {
        updateDoc(doc(db, "users", id), {
            isAdmin: !originalData,
            timestamp: serverTimestamp()
        })
    }

    return(
        <Layout title="Benutzer">

            <Table/>

        </Layout>
    )
}


// <ul className="userlist">
// {
//         users && users.map((user, i) => {
//             return(
//                 <li key={user.id}>
//                     <button
//                         onClick={() => handleChangeRole(user.id, user.isAdmin) }
//                     >
//                         { user.isAdmin ? "ADMIN" : "USER"}
//                     </button>&nbsp;
//                     { user.email } - { user.name && user.name }
//                 </li>
//             )
//         })
//     }
// </ul>
*/