import React from 'react';
// Components
import QuestionsContainer from '../components/QuestionsContainer';
import SearchForm from '../components/SearchForm';
import Navbar from '../components/Navbar';
import RootCredits from '../components/RootCredits';

import {
  Container,
  Divider
} from 'semantic-ui-react';

class Root extends React.Component {
  render() {
    return  <div className="quizdb"><Container>
      <Navbar/>
      <SearchForm/>
      <Divider section/>
        <RootCredits/>
      <Divider section/>
      <QuestionsContainer/>
    </Container></div>

  }
}
export default Root;
