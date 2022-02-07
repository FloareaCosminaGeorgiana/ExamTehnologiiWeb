import {InputText} from "primereact/inputtext";
import {useEffect, useState} from "react";
import {Button} from "primereact/button";
import songApiService from "../api/SongApiService";
import {useHistory} from "react-router-dom";
import {Dropdown} from "primereact/dropdown";

export const NewSong = (props) => {
    console.log(props)
    const history = useHistory();
    const [titlu, setTitlu] = useState('');
    const [url, setUrl] = useState('');
    const [stil, setStil] = useState('');
    const stiluri = ['POP', 'ALTERNATIVE','ROCK','TRAP']

    useEffect(()=>{
        if(props.location.state) {
            setTitlu(props.location.state.titlu);
            setUrl(props.location.state.url);
            setStil(props.location.state.stil);
        }
    },[])

    const onSubmitHandler = (event) => {
        event.preventDefault();
        const submitData = {
            titlu,
            url,
            stil
        }

        if (typeof props.location.state === "object") {
            songApiService.editSong(props.location.state.playlistId, props.location.state.id, submitData).then(() => {history.push(`/playlists/${props.location.state.playlistId}`)});
        } else {
            songApiService.createSong(props.location.state, submitData).then(() => {history.push(`/playlists/${props.location.state}`)});
        }
    }

    return (
        <div className={"p-d-flex p-mt-5 p-jc-center"}>
            <form className={"p-d-flex p-flex-column p-fluid p-col-6"} onSubmit={onSubmitHandler}>
                <span className="p-input-icon-left p-mb-2">
                    <i className="pi pi-angle-right"/>
                    <InputText value={titlu} onChange={(e) => setTitlu(e.target.value)} placeholder="Titlu"/>
                </span>
                <span className="p-input-icon-left p-mb-2">
                    <i className="pi pi-angle-right"/>
                    <InputText value={url} onChange={(e) => setUrl(e.target.value)} placeholder="URL"/>
                </span>
                <span className="p-input-icon-left p-mb-2">
                    <i className="pi pi-angle-right"/>
                    <Dropdown value={stil} options={stiluri} onChange={(e) => setStil(e.target.value)} placeholder="Stil"/>
                </span>
                <div className={"p-d-flex"}>
                    <Button label={"Submit"} type={"submit"} className={"p-button p-button-success p-col"}/>
                </div>
            </form>
        </div>
    )
}