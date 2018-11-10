import React from 'react';
import PropTypes from 'prop-types';

// I'll clean this up to be more react-y... sometime, but it works for now

class ReadingText extends React.Component {
  constructor(props) {
    super(props);

    this.textList = this.props.text.split(" ");
    this.state = {
      visible: "",
      status: this.props.status,
      _origText: this.props.text
    }
  }

  componentDidMount() {
    this.nextWord();
  }

  componentWillUnmount() {
    this.setState({ paused: true });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const next = nextProps.status;
    const prev = prevState.status;
    if (next !== prev) {
      switch (next) {
        case "revealed": return null;
        case "buzzed": if (prev === "revealed") return null;
        case "paused": if (prev !== "reading") return null;
        case "reading": if (prev !== "paused") return null;
      }
      return {status: next};
    }
    else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state._origText !== prevState._origText) {
      this.textList = this.props.text.split(" ");
      this.nextWord();
    } else if (this.state.paused !== prevState.paused && !this.state.paused) {
      this.nextWord(true)
    } else if (this.state.buzzed) {
      // After a buzz set everything to visible
      this.setState({
        visible: this.state.visible + " <i aria-hidden='true' class='circular small red inverted bell outline icon'></i>" + this.textList.join(" ")
      });
    }
  }

  nextWord(continued) {
    if (!this.state.status === "reading") {
      this.setState({
        visible: this.state.visible + " " + this.textList.shift()
      });
      if (continued) console.log("Unpaused") // debug
      if (this.textList.length) {
        setTimeout(() => {
          this.nextWord();
        }, this.props.speed);
      }
    }
  }

  render() {
    return <span dangerouslySetInnerHTML={{ __html: this.state.visible }}></span>;
  }
}

export default ReadingText;
  