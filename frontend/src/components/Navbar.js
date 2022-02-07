import React from 'react';
import {Menubar} from 'primereact/menubar';
import {Link} from "react-router-dom";
import "./Navbar.css"


export const Navbar = () => {


    const items = [
        {
            template: () => {
                return (
                    <Link className={"p-menuitem-link"} to="/playlists">
                        Playlists
                    </Link>
                )
            }
        },
        {
            template: () => {
                return (
                    <Link className={"p-menuitem-link"} to="/playlists/registry">
                        Create a new Playlist
                    </Link>
                )
            }
        }
    ];

    const start = <img alt="logo" src="showcase/images/logo.png"
                       onError={(e) => e.target.src = 'https://www.freepnglogos.com/uploads/apple-music-logo-circle-png-28.png'}                        height="35" className="p-mr-2"/>;

    return <Menubar model={items} start={start}/>


}