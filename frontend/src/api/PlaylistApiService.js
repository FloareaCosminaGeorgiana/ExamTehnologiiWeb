import api from "./Api";

const getPlaylist = (order="desc", ) => {
    return api.get(`/playlists?sortBy=id&order=${order}`);
}
const getPlaylistByFilter = (descriere, id) => {
    return api.get(`/playlists?descriere=${descriere}&id=${id}`);
}

const getDetails = (id) => {
    return api.get(`/playlists/${id}`);
}

const createPlaylist = (data) => {
    return api.post(`/playlists`, data);
}

const editPlaylist = (id, data) => {
    return api.put(`/playlists/${id}`, data);
}

const deletePlaylist = (id) => {
    return api.delete(`/playlists/${id}`);
}

const playlistService = {
    getPlaylist,
    getPlaylistByFilter,
    createPlaylist,
    deletePlaylist,
    getDetails,
    editPlaylist
};


export default playlistService;