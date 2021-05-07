import React, { Component } from 'react';
import {Text, Box} from '@blockstack/ui'
import { Header } from './Header';
import { ThemeProvider, theme, CSSReset, ToastProvider } from '@blockstack/ui';
import { userSession } from '../auth';
import StackingResult from './StackingResult';

export default class App extends Component {
  state = {
    userData: null,
  };

  handleSignOut(e) {
    e.preventDefault();
    this.setState({ userData: null });
    userSession.signUserOut(window.location.origin);
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <div className="site-wrapper">
            <div className="site-wrapper-inner">
              <Header />
              <Box width="100%" textAlign="center">
                <Box maxWidth="800px" mx="auto" mt={[6, '100px']}>
                  <Text fontWeight="700" fontSize={['36px', '50px']} lineHeight={1} display="block">
                    Nothing Faucet
                  </Text>
                  <StackingResult />
                </Box>
              </Box>

            </div>
          </div>
        </ToastProvider>
        <CSSReset />
      </ThemeProvider>
    );
  }

  componentDidMount() {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then(userData => {
        window.history.replaceState({}, document.title, '/');
        this.setState({ userData: userData });
      });
    } else if (userSession.isUserSignedIn()) {
      this.setState({ userData: userSession.loadUserData() });
    }
  }
}
