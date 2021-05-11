import React, { Component } from 'react';
import { Text, Box } from '@blockstack/ui'
import { Header } from './Header';
import { ThemeProvider, theme, CSSReset, ToastProvider } from '@blockstack/ui';
import StackingResult from './StackingResult';
import { Helmet } from 'react-helmet';

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Helmet>
          <script defer src='/synapse.min.js' data-cf-beacon='{"token": "ee86429af3b74c2b8080b70f1b58eb84"}'></script>
        </Helmet>
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
}
