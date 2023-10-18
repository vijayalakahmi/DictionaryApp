import React, { Component } from "react";
import './dictionary.css'

import axios from 'axios'
import AudioPlay from "../Components/AudioPlay";

class Dictionary extends Component {
    constructor(props) {
        super(props)
        this.state =
        {
            searchval: '',
            definitions: [],
            synonyms: '',
            verb: [],
            source: '',
            success: false,
            word: '',
            phonetic: '',
            font: 'Serif',
            dark: false,
            audio: ''

        }
        this.audioRef = React.createRef();

    }

    handlesearchword = (e) => {
        this.setState(
            {
                searchval: e.target.value
            }
        )

    }


    handleSearch = () => {
        const { searchval } = this.state
        const api = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchval}`
        console.log(api)


        axios.get(api).then(response => {
            console.log(response)
            console.log(response.data[0])
            this.setState({
                definitions: response.data[0].meanings[0].definitions,
                synonyms: response.data[0].meanings[0].synonyms,
                verb: response.data[0].meanings[1].definitions,
                source: response.data[0].sourceUrls[0],
                success: true,
                word: response.data[0].word,
                phonetic: response.data[0].phonetic,
                audio: response.data[0].phonetics[2].audio


            })
        }).catch(error => {
            console.log(error)
        })
    }
    fontChange = (e) => {

        this.setState(
            {
                font: e.target.value
            }
        )
    }
    colorChange = () => {
        this.setState({
            dark: !this.state.dark
        })
        console.log("colorrrr")
        console.log(this.state.dark)
    }
    render() {
        return (
            <div className={`main-bg ${this.state.font} ${this.state.dark ? 'dark' : ''}`}>
                <div className="content-wrapper">

                    <div className="top-section">
                        <div className="image-wrapper">
                            <img src="/dictionary.svg" alt="dictionary" />
                        </div>
                        <div className="flex-right je ac">
                            <select value={this.state.font} onChange={this.fontChange} className={`${this.state.dark ? 'cb cw' : 'select'}`}>
                                <option value="Serif">Serif</option>
                                <option value="Sanserif">Sanserif</option>
                                <option value="monospace">monospace</option>
                            </select>

                            <input type="checkbox" id="slider" onChange={this.colorChange} />

                        </div>

                    </div>

                    <div className="searchbox">
                        <input type="text" value={this.searchval} name="searchval" onChange={this.handlesearchword} className={`${this.state.dark ? 'darkmode' : 'input'}`} />
                        <div className="search-img" onClick={this.handleSearch}>
                            <img src="/search.svg" alt="search" />
                        </div>

                    </div>
                    {
                        this.state.success && (

                            <div>

                                <div className="meaning-sect1 ac">
                                    <div className="searchword">
                                        <h1>{this.state.word}</h1>
                                        <span className="color1">{this.state.phonetic}</span>

                                    </div>
                                    <AudioPlay audio={this.state.audio} />

                                </div>

                                <div className="flex ac">
                                    <h5>noun</h5>
                                    <p className={`${this.state.dark ? 'line darkline' : 'line'}`}></p>
                                </div>
                                <h5 className="color2">Meaning</h5>




                                <ul>
                                    {
                                        this.state.definitions.map((definition, index) => {
                                            return (
                                                <li key={index}>{definition.definition}</li>
                                            )
                                        })
                                    }


                                </ul>

                                {
                                    this.state.synonyms &&
                                    (
                                        <>
                                            <span>Synonyms</span> <span className="color1">{this.state.synonyms}</span>
                                        </>
                                    )
                                }


                                <div className="flex ac">
                                    <h5>verb</h5>
                                    <p className={`${this.state.dark ? 'line darkline' : 'line'}`}></p>
                                </div>
                                <h5 className="color2">Meaning</h5>



                                <ul>
                                    {
                                        this.state.verb.map((verbs, index) => {
                                            return (

                                                <li className="verblist" key={index}><span className="mb">{verbs.definition}</span>
                                                    <span className="color2">{verbs.example}</span>
                                                </li>
                                            )
                                        })
                                    }


                                </ul>



                                <hr />
                                {
                                    this.state.source && (
                                        <>
                                            <span>Source </span>

                                            <span>{this.state.source}</span>
                                        </>
                                    )
                                }

                            </div>
                        )
                    }

                </div>

            </div>
        )
    }
}

export default Dictionary