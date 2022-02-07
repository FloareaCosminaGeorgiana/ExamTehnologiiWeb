import playlistService from "../api/PlaylistApiService";
import {useEffect, useState} from "react";
import {SongCard} from "../components/songs/SongCard";
import {Button} from "primereact/button";
import {useHistory} from "react-router-dom";

export const PlaylistDetails = (props) => {
    const history = useHistory();
    const [playlistDetails, setPlaylistDetails] = useState([]);
    const [refreshPage, setRefreshPage] = useState(false);

    const refresh = () => {
        setRefreshPage((prev) => !prev);
    }

    const createNewSongHandler = () => {
        history.push({pathname: `/playlists/${props.history.location.state.id}/registry`, state: props.history.location.state.id})
    }

    useEffect(() => {
        playlistService.getDetails(props.match.params.id).then(result => {
            setPlaylistDetails(result.data);
        });
    }, [refreshPage])

    return (
        <div className={"p-ml-3"}>
            <Button label={"Create a new song"} className={"p-button-success p-ml-5 p-mt-5"} onClick={createNewSongHandler}/>
            <div className={"p-d-flex p-flex-wrap p-mt-5"}>
                {playlistDetails.songs && <>
                    {playlistDetails.songs.map((el, index) => {
                        return <SongCard key={index} song={el} refresh={refresh}/>
                    })}
                </>}
            </div>
        </div>
    )
}