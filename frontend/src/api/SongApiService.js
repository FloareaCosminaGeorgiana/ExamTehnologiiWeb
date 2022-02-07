import api from "./Api";

const getSong = () => {
    return api.get(`/playlists`);
}

const getDetails = (id) => {
    return api.get(`/playlists/${id}`);
}

const createSong = (playListId, data) => {
    return api.post(`/playlists/${playListId}/songs`, data);
}

const editSong = (playListId, songId, data) => {
    return api.put(`/playlists/${playListId}/songs/${songId}`, data);
}

const deleteSong = (playListId, songId) => {
    return api.delete(`/playlists/${playListId}/songs/${songId}`);
}

const songApiService = {
    getSong,
    createSong,
    deleteSong,
    getDetails,
    editSong
};


export default songApiService;