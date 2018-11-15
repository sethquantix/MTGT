import React, { Component } from 'react';

class Timer extends Component {

    state = {hours: 0, minutes: 0, seconds: 0, done: false};

    componentDidMount() {
        this.interval = setInterval(this.updateTime, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    updateTime = () => {
        if (this.state.done)
            return ;
        const time = new Date();
        let diff = new Date(this.props.to) - time;
        if (diff < 0)
        {
            this.setState({done: true});
            return ;
        }
        const hours = parseInt(diff / (3600000));
        const minutes = parseInt((diff - hours * 3600000) / 60000);
        const seconds = parseInt((diff - hours * 3600000 - minutes * 60000) / 1000);
        this.setState({
            seconds: seconds < 10 ? '0' + seconds : seconds,
            minutes: minutes < 10 ? '0' + minutes : minutes,
            hours: hours < 10 ? '0' + hours : hours,
        });
    };

    render() {
        return <div className={this.props.className}>{this.state.done ? "Now" : this.state.hours + ":" + this.state.minutes + ":" + this.state.seconds}</div>;
    }

}

export default Timer;
