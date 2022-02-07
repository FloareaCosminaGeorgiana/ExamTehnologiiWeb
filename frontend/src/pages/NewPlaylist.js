import {InputText} from "primereact/inputtext";
import {useEffect, useState} from "react";
import {Button} from "primereact/button";
import playlistService from "../api/PlaylistApiService";
import {useHistory} from "react-router-dom";

export const NewPlaylist = (props) => {

    const history = useHistory();
    const [descriere, setDescriere] = useState("");
    const [data, setData] = useState("");

    useEffect(()=>{
        if(props.location.state) {
            setDescriere(props.location.state.descriere);
            setData(props.location.state.data);
        }
    },[])

    const onSubmitHandler = (event) => {
        event.preventDefault();
        const submitData = {
            descriere,
            data,
        }
        if (props.location.state) {
            playlistService.editPlaylist(props.location.state.id, submitData).then(() => {history.push("/playlists")});
        } else {
            playlistService.createPlaylist(submitData).then(() => {history.push("/playlists")});
        }
    }

    return (
        <div className={"p-d-flex p-mt-5 p-jc-center"}>
            <form className={"p-d-flex p-flex-column p-fluid p-col-6"} onSubmit={onSubmitHandler}>
                <span className="p-input-icon-left p-mb-2">
                    <i className="pi pi-angle-right"/>
                    <InputText value={descriere} onChange={(e) => setDescriere(e.target.value)} placeholder="Descriere"/>
                </span>
                <span className="p-input-icon-left p-mb-2">
                    <i className="pi pi-angle-right"/>
                    <InputText value={data} onChange={(e) => setData(e.target.value)} placeholder="Data Format DD/MM/YYYY"/>
                </span>
                <div className={"p-d-flex"}>
                    <Button label={"Submit"} type={"submit"} className={"p-button p-button-success p-col"}/>
                </div>
            </form>
        </div>
    )
}