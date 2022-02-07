import playlistApiService from "../api/PlaylistApiService";
import {useEffect, useState} from "react";
import {PlaylistCard} from "../components/playlists/PlaylistCard";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";

export const Page1 = () => {

    const [refreshPage, setRefreshPage] = useState(false);
    const [playlists, setPlaylists] = useState([]);
    const [order, setOrder] = useState("desc");
    const [field1Value, setField1Value] = useState("");
    const [field2Value, setField2Value] = useState("");

    useEffect(()=> {
        playlistApiService.getPlaylist(order).then(result => setPlaylists(result.data));
    }, [refreshPage, order])

    const refresh = () => {
        setRefreshPage((prev) => !prev);
    }
    const sortOrderHandler = () => {
        setOrder(prev => prev === "desc" ? "asc" : "desc");
    }
    const searchByFiltersHandler = () => {
        playlistApiService.getPlaylistByFilter(field1Value, field2Value).then(result => setPlaylists(result.data));
        setField1Value("");
        setField2Value("");
    }

    return (
        <div className={"p-ml-3"}>
            <p className={"p-d-flex"}>
                <Button onClick={sortOrderHandler} label={`Sort order by ID: ${order}`} className={"p-mr-3"}/>
                <span className="p-float-label">
                    <InputText value={field1Value} onChange={(e) => setField1Value(e.target.value)} placeholder={"Descriere (obligatoriu)"} className={"p-mr-1"}/>
                </span>
                <span className="p-float-label">
                    <InputText value={field2Value} onChange={(e) => setField2Value(e.target.value)} placeholder={"ID (obligatoriu)"} className={"p-mr-1"}/>
                </span>
                <Button onClick={searchByFiltersHandler} label={`Search by filters`}/>
            </p>
            <div className={"p-d-flex p-flex-wrap p-mt-5"}>
                {playlists.map((el, index) => {
                    return <PlaylistCard playlist={el} key={index} refresh={refresh}/>
                })}
            </div>
        </div>
    )
}