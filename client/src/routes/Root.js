import React from 'react';

import { connect } from 'react-redux';
import {
  toggleSidebar,
} from '../actions/actions';

// Routes

import {
  Route,
  Switch,
  Link
} from 'react-router-dom';
import PageSearch from './PageSearch';
import PageAbout from './PageAbout';
import Page404 from './Page404';

// Components
import Notifications from 'react-notification-system-redux';
import Navbar from '../components/Navbar';

import {
  Container,
  Sidebar,
  Icon,
  Menu
} from 'semantic-ui-react';

class Root extends React.Component {

  constructor(props) {
    super(props);
    this.handleOutOfSidebarClick = this.handleOutOfSidebarClick.bind(this);
    this.handleInputKeyPress = this.handleInputKeyPress.bind(this);
  }

  componentDidMount() {
    window.addEventListener('click', this.handleOutOfSidebarClick);
    window.addEventListener('keydown', this.handleInputKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleOutOfSidebarClick);
    window.removeEventListener('keydown', this.handleInputKeyPress);
  }

  handleInputKeyPress(e) {
    if (e.key === "Escape") {
      if (this.props.appearance.showSidebar) {
        this.props.dispatch(toggleSidebar());
      }
    }
  }

  handleOutOfSidebarClick(e) {
    const sidebar = document.querySelector('.quizdb-sidebar');
    if (!sidebar.contains(e.target) &&
        !e.target.classList.contains('navbar-burger') &&
        this.props.appearance.showSidebar) {
      this.props.dispatch(toggleSidebar());
    }
  }

  render() {
    const dispatch = this.props.dispatch;
    const sidebarWidth = this.props.browser.lessThan.medium ? 'thin' : 'wide';
    return <div className="quizdb">
      <Notifications
        notifications={this.props.notifications}
      />
      <Sidebar as={Menu} animation='overlay' width={sidebarWidth} direction='right'
                         className='quizdb-sidebar'
                         visible={this.props.appearance.showSidebar}
                         icon='labeled' vertical inverted
      >
        <Menu.Item name='remove' position='right'>
          <Icon name='remove' className='quizdb-sidebar-close'
                onClick={() => this.props.dispatch(toggleSidebar())}/>
        </Menu.Item>
        <Menu.Item name='home'>
          <Link to='/' onClick={() => dispatch(toggleSidebar())}>
            <Icon name='home' />
            Home
          </Link>
        </Menu.Item>
        <Menu.Item name='about'>
          <Link to='/about' onClick={() => dispatch(toggleSidebar())}>
            <Icon name='info circle' />
            About
          </Link>
        </Menu.Item>
        <Menu.Item name='help'>
          <Link to='/about' onClick={() => dispatch(toggleSidebar())}>
            <Icon name='question circle' />
            Help
          </Link>
        </Menu.Item>
        <Menu.Item name='resources'>
          <Link to='/about' onClick={() => dispatch(toggleSidebar())}>
            <Icon name='bookmark' />
            Resources
          </Link>
        </Menu.Item>

      </Sidebar>
      <Navbar/>
      <Sidebar.Pusher>
        <Container>
          <main className='quizdb-page' id='quizdb-page'>
            <Switch>
              <Route exact path="/" component={PageSearch}/>
              <Route exact path="/about" component={PageAbout}/>
              <Route component={Page404}/>
            </Switch>
          </main>
        </Container>
      </Sidebar.Pusher>
    </div>
  }
}

const mapStateToProps = state => {
  return {
    notifications: state.notifications,
    browser: state.browser,
    appearance: state.appearance
  }
}

Root = connect(
  mapStateToProps
)(Root)


export default Root;
