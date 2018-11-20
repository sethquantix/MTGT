import React, {Component} from 'react'
import Button from "@material-ui/core/es/Button/Button";
import {connect} from "react-redux";
import {getRemoveStream} from "Reducers/Streams";

class SingleStream extends Component {


    EMBED_URL = 'https://embed.twitch.tv/embed/v1.js';

    componentDidMount() {

        let embed;
        const script = document.createElement('script');
        script.setAttribute(
            'src',
            this.EMBED_URL
        );
        script.addEventListener('load', () => {
            embed = new window.Twitch.Embed("twitch-embed", {...this.props});
            this._addEventListeners(embed);
        });

        document.body.appendChild(script);
    }

    close() {
        this.props.changeValue(this.props.index);
        this.props.removeStream(this.props.stream);
    }


    _addEventListeners(embed) {
        embed.addEventListener(window.Twitch.Embed.AUTHENTICATE, function (user) {
            if (this.props.onUserLogin) {
                this.props.onUserLogin(user);
            }
        }.bind(this));

        embed.addEventListener(window.Twitch.Embed.VIDEO_PLAY, function (data) {
            if (this.props.onVideoPlay) {
                this.props.onVideoPlay(data);
            }
        }.bind(this));

        embed.addEventListener(window.Twitch.Embed.VIDEO_READY, function () {
            var player = embed.getPlayer();

            if (this.props.onPlayerReady) {
                this.props.onPlayerReady(player);
            }
        }.bind(this));
    }


    render() {
        return <div>
            <Button onClick={() => this.close()}>Close</Button>
            <div id="twitch-embed">
                //Twitch screen will go in here.
            </div>
        </div>

    }
}


const mapStateToProps = state => {
    return {}
};

const mapDispatchToProps = dispatch => {
    return {
        removeStream: streamer => dispatch(getRemoveStream(streamer))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleStream);