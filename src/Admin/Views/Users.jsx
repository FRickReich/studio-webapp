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

            {/* <Table/> */}

            <ul className="userlist">
            {
                users && users.map((user, i) =>
                {
                    return(
                        <li key={user.id}>
                            <button
                                onClick={() => handleChangeRole(user.id, user.isAdmin) }
                            >
                                { user.isAdmin ? "ADMIN" : "USER"}
                            </button>&nbsp;
                            { user.email } - { user.name && user.name }
                        </li>
                    )
                })
            }
            </ul>

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