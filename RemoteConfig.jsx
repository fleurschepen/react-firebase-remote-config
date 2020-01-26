import React, { useState, useEffect, createContext } from 'react';
import { firebase } from './config';

const remoteConfig = firebase.remoteConfig();
const RemoteConfigContext = createContext({});

function setUpRemoteConfig(settings = {}, defaultConfig = {}) {
  remoteConfig.settings = settings;
  remoteConfig.defaultConfig = defaultConfig;

  return remoteConfig
    .activate()
    .then(() => {
      return Object.keys(defaultConfig).reduce((parameters, currentParameter) => {
        return {
          ...parameters,
          [currentParameter]: remoteConfig.getValue(currentParameter).asString(),
        };
      }, {});
    })
    .catch(err => {
      console.error(err);
    });
}

remoteConfig.fetch().catch(err => {
  console.error(err);
});

export function RemoteConfigProvider({ settings, defaultConfig, children }) {
  const [remoteConfigParameters, setRemoteConfigParameters] = useState(undefined);

  useEffect(() => {
    Promise.resolve(setUpRemoteConfig(settings, defaultConfig))
      .then(parameters => {
        setRemoteConfigParameters(parameters);
      })
      .catch(err => {
        console.log(err);
      });
  }, [settings, defaultConfig]);

  return (
    <RemoteConfigContext.Provider
      value={{
        remoteConfigParameters: remoteConfigParameters,
      }}
    >
      {remoteConfigParameters !== undefined && children}
    </RemoteConfigContext.Provider>
  );
}

export function withRemoteConfig(Component) {
  return function WrapperComponent(props) {
    return (
      <RemoteConfigContext.Consumer>
        {({ remoteConfigParameters }) => <Component {...props} {...remoteConfigParameters} />}
      </RemoteConfigContext.Consumer>
    );
  };
}