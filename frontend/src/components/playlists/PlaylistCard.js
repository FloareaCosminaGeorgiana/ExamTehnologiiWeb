import {Card} from "primereact/card";
import {Button} from "primereact/button";
import playlistService from "../../api/PlaylistApiService";
import {useHistory} from "react-router-dom";
import {useState} from "react";

export const PlaylistCard = (props) => {

    const history = useHistory();

    const deleteHandler = () => {
        playlistService.deletePlaylist(props.playlist.id);
        props.refresh();
    }

    const editPlaylist = () => {
        history.push({pathname: "/playlists/registry", state: props.playlist})
    }

    const seeMoreHandler = () => {
        history.push({pathname: `/playlists/${props.playlist.id}`, state: props.playlist})
    }

    const footer = <span>
        <Button label="See songs" style={{marginRight: '.25em'}} className="p-button-primary" onClick={seeMoreHandler}/>
        <Button label="Edit" style={{marginRight: '.25em'}} className="p-button-warning" onClick={editPlaylist}/>
        <Button label="Delete" className="p-button-danger" onClick={deleteHandler}/>
    </span>;

    return (
        <>
           <Card footer={footer} style={{ width: '25rem', marginBottom: '2em' }} title={`Playlist ${props.playlist.id}`} className={"p-mr-2 p-ml-2"}>
               <p className="m-0" style={{lineHeight: '1.5'}}>Descriere: {props.playlist.descriere}</p>
               <p className="m-0" style={{lineHeight: '1.5'}}>Data: {props.playlist.data}</p>
               {props.playlist.songs && <p className="m-0" style={{lineHeight: '1.5'}}>Songs: {props.playlist.songs[0]}</p>}
           </Card>
        </>
    )
}