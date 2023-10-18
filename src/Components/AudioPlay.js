import React, { Component } from "react";

class AudioPlay extends Component{

    constructor(props) {
        super(props);
        this.state = {
          isPlaying: false,
        };
        this.audioRef = React.createRef();
      }
      playAudio=()=>{
        console.log("enter")

        const playaudio=this.audioRef.current;
        this.setState({
            isPlaying:!this.isPlaying
        })
        if(this.state.isPlaying){
            playaudio.play()
        }
        else{
            playaudio.pause()
        }

    }
    render(){
        return(
            <div className="audiosec" onClick={this.playAudio}>
            <div className="custom-audio-player">
                <input type="checkbox" id="audio-toggle" />
                <label htmlFor="audio-toggle" className="audio-icon">
                    <div className="play-icon">▶️</div>
                    <div className="pause-icon">⏸️</div>
                </label>
                <audio id="audio" src={this.props.audio} ref={this.audioRef} />
            </div>


        </div>
        )
    }
}

export default AudioPlay