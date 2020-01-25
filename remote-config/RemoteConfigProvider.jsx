import React, { useState, useEffect, createContext } from 'react';
import setUpRemoteConfig from './set-up';

export const RemoteConfigContext = createContext({});

export default function RemoteConfigProvider({ settings, defaultConfig, children }) {
  const [remoteConfigParameters, setRemoteConfigParameters] = useState(undefined);

  useEffect(() => {
    Promise.resolve(setUpRemoteConfig(settings, defaultConfig))
      .then(res => {
        setRemoteConfigParameters(res);
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
