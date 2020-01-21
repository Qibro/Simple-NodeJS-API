import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.addSong = this.addSong.bind(this);
    this.state = {
      playlist: [],
      music: {
        id: "",
        Song: "",
        Singer: ""
      }
    };
  }

  componentDidMount() {
    this.getPlaylist();
  }

  getPlaylist() {
    fetch("http://localhost:5000/api/playlist/")
      .then(response => response.json())
      .then(response => this.setState({ playlist: response.data }));
  }

  addSong() {
    const { music } = this.state;
    fetch(
      `http://localhost:5000/api/playlist/add?Song=${music.Song}&Singer=${music.Singer}`
    ).then(response => this.getPlaylist());
    this.setState({
      music: {
        id: "",
        Song: "",
        Singer: ""
      }
    });
  }

  deleteSong(id) {
    console.log(id);
    fetch(`http://localhost:5000/api/playlist/${id}`, {
      method: "delete"
    }).then(response => this.getPlaylist());
  }

  render() {
    const { playlist, music } = this.state;
    return (
      <div>
        <br />
        <img id="img-header" src={require("./playlist.png")} />
        <h4>Song</h4>
        <input
          type="text"
          ref={el => (this.inputSong = el)}
          onChange={e =>
            this.setState({ music: { ...music, Song: e.target.value } })
          }
          value={music.Song}
        />
        <h4>Singer</h4>
        <input
          type="text"
          ref={el => (this.inputSinger = el)}
          onChange={e =>
            this.setState({ music: { ...music, Singer: e.target.value } })
          }
          value={music.Singer}
        />
        <button id="add" onClick={this.addSong}>
          Add Song
        </button>
        <ul>
          {playlist.map(item => (
            <div className="card">
              <div className="container">
                <h4 className="song">
                  <b>{item.Song}</b>
                </h4>
                <p className="singer">{item.Singer}</p>
                <img
                  onClick={this.deleteSong.bind(this, item.id)}
                  id="trash"
                  src={require("./trash.png")}
                ></img>
              </div>
            </div>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
