# React Firebase Remote Config

Firebase Remote Config for React

## Getting Started

To help you set up Firebase Remote Config for React the same way I did, I've written some simple instructions

### Prerequisites

Install the Firebase SDK

```sh
npm install --save firebase
```

---

### Set-up

### Step 1

- Clone this repo

- Copy the `react-firebase-remote-config` folder and paste it in your React project

    > 1. (Optional) Rename the `react-firebase-remote-config` folder, I've named mine firebase
    > 2. (Optional) Delete the `README.md` file

### Step 2

- Set up your Firebase config in the `firebaseConfig` variable in `config.js`

    > To find the config variables for your app:
    > 1. Go to the <a href="https://console.firebase.google.com" target="_blank">`Firebase console`</a> and click on your project
    > 2. Click on the cogwheel icon next to `Project Overview` and click on `Project settings`
    > 3. Scroll down to `Your apps` and select the `Config` radio button
    > 4. Copy the `const firebaseConfig = { ... }` variable and paste it in the empty/shell variable in `config.js`

---

### Use

### Step 1

> When you want to pass your Firebase Remote Config settings and the default parameters to use/fetch

- Wrap your app the the RemoteConfigProvider component
- Pass your Remote Config settings in the `settings` prop
- Pass your default config parameters in the `defaultConfig` prop, eg:
    
    ```jsx
    import React from 'react';
    import { RemoteConfigProvider } from './firebase/RemoteConfig';
    
    const remoteConfigSettings = {
        minimumFetchIntervalMillis: 3600000,
    };
    
    const remoteConfigDefaultConfig = {
        parameter: 'value',
    };
    
    export default function App() {
        return (
            <RemoteConfigProvider settings={remoteConfigSettings} defaultConfig={remoteConfigDefaultConfig}>
                <Component />
            </RemoteConfigProvider>
        )
    }
    ```


### Step 2

> When you want to use your Firebase Remote Config parameters

- Use the HOC `withRemoteConfig` and use your parameters from the passed down props, eg:

    ```jsx
    import React from 'react';
    import { withRemoteConfig } from './firebase/RemoteConfig';
    
    export default withRemoteConfig(function Component(props) {
        const { parameter } = props;
  
        return (
            <div>
                { parameter }
            </div>
        )
    })
    ```
