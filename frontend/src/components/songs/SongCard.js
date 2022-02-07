import {Card} from "primereact/card";
import {Button} from "primereact/button";
import playlistService from "../../api/PlaylistApiService";
import {useHistory} from "react-router-dom";
import songApiService from "../../api/SongApiService";

export const SongCard = (props) => {

    const history = useHistory();

    const deleteHandler = () => {
        songApiService.deleteSong(props.song.playlistId, props.song.id);
        props.refresh();
    }

    const editPlaylist = () => {
        history.push({pathname: `/playlists/${props.song.playlistId}/registry/`, state: props.song})
    }

    const footer = <span>
        <Button label="Edit" style={{marginRight: '.25em'}} className="p-button-warning" onClick={editPlaylist}/>
        <Button label="Delete" className="p-button-danger" onClick={deleteHandler}/>
    </span>;

    return (
        <>
            <Card footer={footer} style={{ width: '25rem', marginBottom: '2em' }} title={props.song.titlu} className={"p-mr-2 p-ml-2"}>
                <p className="m-0" style={{lineHeight: '1.5'}}>URL: <a href={props.song.url}>Click here</a></p>
                <p className="m-0" style={{lineHeight: '1.5'}}>Stil: {props.song.stil}</p>

            </Card>
        </>
    )
}