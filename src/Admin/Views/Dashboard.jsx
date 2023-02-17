import React, { useState, useEffect } from "react";
import { db } from "./../../firebase";
import { query, collection, onSnapshot, doc, addDoc, deleteDoc, updateDoc, serverTimestamp } from "firebase/firestore";

import { Layout } from './../Layout';

import { Button, LinkExternalButton, FormField } from './../Components';

export const Dashboard = ({ children, ...props }) =>
{
    const [ configs, setConfigs ] = useState({});
    const [ savedForm, setSavedForm ] = useState({ main: false, social: false });

    useEffect(() => {
        onSnapshot(collection(db,"configs"), (snapshot) =>
        {
            const data = Object.fromEntries(snapshot.docs.map((doc, i) => {
                return ([[doc.data().name], {
                    id: doc.id,
                    ...doc.data()
                }])
            }));

            setConfigs({ 
                ...configs,
                ...data
            });
        });
    }, []);

    const updateMainSettings = (e, id) =>
    {
        e.preventDefault();
        setConfigs({...configs, [id]: { saved: true }});
        setSavedForm({ ...savedForm, [id]: true })
        updateDoc(doc(db, "configs", configs[id].id),
        {
            ...configs[id],
            timestamp: serverTimestamp()
        })
    }

    const changeValue = (e, id) =>
    {
        const newData = {[id]: { ...configs[id], saved: false, [e.target.name]: e.target.value }};

        setSavedForm({ ...savedForm, [id]: false })
        setConfigs({...configs, ...newData});
    }

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

            { 
                configs?.main &&
                (
                    <form className={`Form ${ savedForm.main ? 'saved' : ''}`}  onSubmit={ (e) => updateMainSettings(e, "main") }>
                        <div className="heading">Allgemein</div>

                        <FormField
                            label="Seitentitel"
                            value={ configs.main.title }
                            onChange={(e) => changeValue(e, "main")}
                            name="title"
                        />
                        <FormField
                            label="E-Mail"
                            value={ configs.main.email }
                            onChange={(e) => changeValue(e, "main")}
                            name="email"
                        />
                        <FormField
                            type="textarea"
                            resize="vertical"
                            label="Beschreibung"
                            value={ configs.main.description }
                            onChange={(e) => changeValue(e, "main")}
                            name="description"
                        />
                        
                        <Button success>Speichern</Button>
                    </form>
                )
            }

            {
                configs?.social &&
                (
                    <form className={`Form ${ savedForm.social ? 'saved' : ''}`}  onSubmit={ (e) => updateMainSettings(e, "social") }>
                        <div className="heading">Soziale Netzwerke</div>

                        <FormField
                            label="Facebook"
                            value={ configs.social.facebook }
                            onChange={(e) => changeValue(e, "social")}
                            name="facebook"
                        />
                        <FormField
                            label="TikTok"
                            value={ configs.social.tiktok }
                            onChange={(e) => changeValue(e, "social")}
                            name="tiktok"
                        />
                        <FormField
                            label="Instagram"
                            value={ configs.social.instagram }
                            onChange={(e) => changeValue(e, "social")}
                            name="instagram"
                        />
                        <FormField
                            label="Whatsapp"
                            value={ configs.social.whatsapp }
                            onChange={(e) => changeValue(e, "social")}
                            name="whatsapp"
                        />

                        <Button success>Speichern</Button>
                    </form>
                )
            }

        </Layout>
    )
}
