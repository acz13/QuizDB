import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import {
  toggleErrorModal,
} from '../actions/actions';

import {
  Button,
  Segment,
  Label,
  Icon
} from 'semantic-ui-react';
import ReactTooltip from 'react-tooltip';

import ErrorModal from './ErrorModal';
import Tossup from "./question/Tossup";
import Bonus from "./question/Bonus";

import { handleEmpty } from '../utilities/String';

class QuestionsComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {showInfo: false, reading: true, buzzed: false, paused: true, speed: 200};
    this.renderInfo = this.renderInfo.bind(this);
    this.renderInfoColumn = this.renderInfoColumn.bind(this);
    this.handleBuzz = this.handleBuzz.bind(this);
    this.handlePause = this.handlePause.bind(this);
  }

  componentWillMount() {
    if (this.props.browser.lessThan.medium) {
      this.setState({showInfo: false});
    }
  }

  renderInfo() {
    const p = this.props;
    const q = p.question;

    let infoDivTall;
    let infoDivSkinny;
    if (this.state.showInfo) {
      infoDivTall = <div className="question-info-show">
        {this.renderInfoColumn(q.id, "ID", q.id)}
        {this.renderInfoColumn(q.id, "Tournament", q.tournament.name)}
        {this.renderInfoColumn(q.id, "Round", q.round)}
        {this.renderInfoColumn(q.id, "#", q.number)}
        {this.renderInfoColumn(q.id, "Category", q.category.name)}
        {this.renderInfoColumn(q.id, "Subcategory", q.subcategory.name, "None")}
      </div>;
    } else {
      let infoString = `${handleEmpty(q.tournament.name)} |
                        ${handleEmpty(q.category.name)} |
                        ${handleEmpty(q.subcategory.name)}`;
      infoDivSkinny = (
        <span className="question-info-hide"
          onClick={() => this.setState({showInfo: !this.state.showInfo})}>
          {infoString}
        </span>
      );
    }

    let showInfo = !!this.state.showInfo;
    const isSmall = this.props.browser.lessThan.medium;
    return <Segment className="question-info">
      <div className="question-info-skinny">
        <span>
          {p.index ? <strong>{p.index}.</strong> : null }
          <Icon name={'caret ' + (showInfo ? 'up' : 'down')} size='big'
                className='question-info-toggle'
                onClick={() => this.setState({showInfo: !this.state.showInfo})}
          />
        </span>
        {infoDivSkinny}
        {/* <Button content='Errors in question?'
                className='error-modal-trigger short'
                onClick={() => p.dispatch(toggleErrorModal(q.id))}/> */}
        {p.questionType === "tossup" && (
          <div>
	        <Button icon color='yellow' labelPosition={isSmall ? "" : "left"} onClick={this.handlePause}>
	          <Icon name='pause' />
	          {isSmall ? "" : (this.state.paused ? "Unpause" : "Pause")}
	        </Button>
	        <Button icon color='red' labelPosition={isSmall ? "" : "left"} onClick={this.handleBuzz}>          
	          <Icon name='bell outline' />
	          {isSmall ? "" : "Buzz"}
	        </Button>
     	  </div>
     	)}
      </div>
      {infoDivTall}
    </Segment>;

  }

  renderInfoColumn(questionId, name, value, unknownText="Unknown") {
    const infoText = (value && value.trim !== "" ? value : unknownText);
    return <Segment compact className="question-info-segment">
      <Label attached="top" className="question-info-label">{name}</Label>
      <div className='question-info-text' data-tip data-for={`${questionId}-${name}`}>
        {infoText}
      </div>
      <ReactTooltip effect='solid' type='info' id={`${questionId}-${name}`}>
        {infoText}
      </ReactTooltip>
    </Segment>
  }

  handlePause() {
    this.setState({ paused: !this.state.paused });
  }

  handleBuzz() {
    this.setState({ buzzed: true });
  }

  render() {
    const p = this.props;
    const q = p.question;
    const highlightQuery = p.storage.highlightSearch ? p.search.query : null;
    const questionView = p.questionType === "tossup"
      ? <Tossup question={q} query={highlightQuery} reading={this.state.reading}
                                                  buzzed={this.state.buzzed}
                                                  paused={this.state.paused}
                                                  speed={this.state.speed} />
      : <Bonus question={q} query={highlightQuery} />;
    return (
      <div className='question'>
        <Segment.Group>
          {this.renderInfo()}
          {questionView}
        </Segment.Group>
        <ErrorModal
          errorableType={p.questionType}
          errorableId={q.id}
          open={!!p.errors[q.id] && !!p.errors[q.id].modalOpen}
        />
      </div>
    );
  }
}


QuestionsComponent.propTypes = {
  question: PropTypes.object.isRequired,
  index: PropTypes.number,
  questionType: PropTypes.string.isRequired
}

const mapStateToProps = state => {
  return {
    browser: state.browser,
    errors: state.errors,
    search: state.search,
    questions: state.questions,
    storage: state.storage,
  }
}

QuestionsComponent = connect(
  mapStateToProps
)(QuestionsComponent)

export default QuestionsComponent;
