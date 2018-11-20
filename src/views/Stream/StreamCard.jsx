import {Component} from 'react'
import {Button} from "@material-ui/core";
import connect from "react-redux/es/connect/connect";
import {getAddStream} from "../../reducers/Streams";

class StreamCard extends Component {

    shouldComponentUpdate() {
        return false
    }

    loadTab(streamer){
        this.props.addStream(streamer)
    }

    getFrames() {
        let frames = [];
        console.log(this.props.event);
        this.props.event.streamers.map(streamer => {
            frames.push(<div>
                    <iframe src={"https://player.twitch.tv/?channel=" + streamer["display_name"] + "&autoplay=false"}
                            height="300"
                            width="400"
                    >

                    </iframe>
                    <br/>
                    <Button className="streamButton" onClick={() => this.loadTab(streamer)}>Open in a new tab</Button>
                </div>
            )
        });
        return frames;
    }

    render() {
        return <div>
            <hr/>
            <h2>{this.props.event.name} Stream's</h2>
            <hr/>
            <div>
                {
                    this.getFrames()
                }
            </div>
        </div>

    }


}

const mapStateToProps = state => {
    return {}
};

const mapDispatchToProps = dispatch => {
    return {
        addStream: streamer => dispatch(getAddStream(streamer))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(StreamCard);
