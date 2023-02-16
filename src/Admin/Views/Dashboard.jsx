import React from "react";

import { Layout } from './../Layout';

import { LinkButton, LinkExternalButton } from './../Components';

export const Dashboard = ({ children, ...props }) =>
{
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


        </Layout>
    )
}
