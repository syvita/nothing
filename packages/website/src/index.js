import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import App from './components/App';

Sentry.init({
  dsn: "https://19208b8a3b22467e804f525610f6a4c1@logs.syvita.org/4",
  integrations: [new Integrations.BrowserTracing()],
  release: process.env.npm_package_version,
  tracesSampleRate: 1.0,
  sendDefaultPii: false,
});

// this acts as a safeguard to ensure everyone can prove that we are not 
// collecting user IPs. we don't want it or need it. we also have enhanced privacy
// controls to remove personally identifiable information (PII) as well as source 
// code in things like notifications. we prevent IPs being stored client-side,
// and also scrub things like passwords, MAC addresses and other similar PII from
// ever being stored on our Sentry instances.
Sentry.setUser({ ip_address: "0.0.0.0" });

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app')
);
