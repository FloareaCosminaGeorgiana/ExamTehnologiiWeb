import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Navbar} from "./components/Navbar";
import {Page1} from "./pages/Page1";
import {NewPlaylist} from "./pages/NewPlaylist";
import {PlaylistDetails} from "./pages/PlaylistDetails";
import {NewSong} from "./pages/NewSong";


export const App = () => {

    return (
        <Router>
            <Navbar/>
            <Switch>

                <Route path="/playlists" exact component={Page1}/>
                <Route path="/playlists/registry" exact component={NewPlaylist}/>
                <Route path="/playlists/:id" exact component={PlaylistDetails}/>
                <Route path="/playlists/:id/registry" exact component={NewSong}/>
            </Switch>
        </Router>
    );
}

export default App;
