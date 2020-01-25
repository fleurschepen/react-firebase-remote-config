import React from 'react';
import { RemoteConfigContext } from './RemoteConfigProvider';

export function withRemoteConfig(Component) {
  return function WrapperComponent(props) {
    return (
      <RemoteConfigContext.Consumer>
        {({ remoteConfigParameters }) => <Component {...props} {...remoteConfigParameters} />}
      </RemoteConfigContext.Consumer>
    );
  };
}
