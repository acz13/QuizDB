import React from 'react';
import PropTypes from 'prop-types';

import {
  Segment,
  Grid,
} from 'semantic-ui-react';
import ThirdPartyIcons from "./ThirdPartyIcons";

import {
  formatQuestionString,
  formatQuestionElement,
} from '../../utilities/Question';

import ReadingText from './ReadingText';

const Tossup = ({ question, query, reading, buzzed, paused, speed }) => {
  const formattedText =  reading
                           ? <ReadingText
                                text={formatQuestionString(question.formatted_text, query)}
                                buzzed={buzzed}
                                paused={paused}
                                speed={speed}
                              />
                           : formatQuestionElement(question.formatted_text, query);
  
  const formattedAnswer = buzzed || !reading
                            ? formatQuestionElement(question.formatted_answer, query)
                            : "Press Buzz to reveal answer";

  return (
    <div className="question-content">
      <Segment className="question-tossup-text">
        <strong>Question: </strong>{formattedText}
      </Segment>
      <Segment className="question-tossup-answer">
        <Grid columns='16'>
          <Grid.Column largeScreen='13' computer='14' tablet='16' mobile='16'>
            <strong>ANSWER: </strong>{formattedAnswer}
            <input id={'question-hidden-answer-'+question.id}
                   className='question-hidden-answer'
                   value={question.answer} readOnly/>
          </Grid.Column>
          {(buzzed || !reading) && <ThirdPartyIcons question={question} />}
        </Grid>
      </Segment>
    </div>
  )
}

Tossup.propTypes = {
  question: PropTypes.object.isRequired,
  query: PropTypes.string,
};

export default Tossup;
