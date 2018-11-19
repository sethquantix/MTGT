import {Component} from 'react'


class StreamCard extends Component {

    shouldComponentUpdate() {
        return false
    }

    render() {
        return <iframe
            src={"https://player.twitch.tv/?channel=" + this.props.channel["display_name"] + "&autoplay=false"}
            height="300"
            width="400"
            allowFullScreen={true}
            scrolling="no"
        >
        </iframe>
    }
}

export default StreamCard
