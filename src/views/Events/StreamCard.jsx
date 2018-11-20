import {Component} from 'react'


class StreamCard extends Component {

    shouldComponentUpdate() {
        return false
    }

    getFrames() {
        let frames = [];
        console.log(this.props.event);
        this.props.event.streamers.map(streamer => {
            frames.push(<iframe src={"https://player.twitch.tv/?channel=" + streamer["display_name"] + "&autoplay=false"}
                                height="300"
                                width="400"
        >

            </iframe>


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

export default StreamCard
