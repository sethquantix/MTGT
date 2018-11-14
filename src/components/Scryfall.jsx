import React, { Component } from 'react';
import Loading from "Components/Loading";

class Scryfall extends Component {

    state = {loaded : false };

    componentDidMount() {
        this.load(this.props.code);
    }

    load = code => {
        fetch(`https://api.scryfall.com/cards/${this.props.set.toLowerCase()}/` + code).then(r => r.json())
            .then(data => {
                console.log(data);
                this.setState({loaded: true, src: data.image_uris.art_crop });
            })
    };

    componentDidUpdate(prevProps, prevState, _) {
        if (this.props.code !== prevProps.code) {
            this.setState({loaded: false});
            this.load(this.props.code);
        }
    }

    render() {
        return <div className={this.props.container}>
            {this.state.loaded ? <img className={this.props.image} src={this.state.src}/> : <Loading/>}
        </div>;
    }
}

export default Scryfall;
