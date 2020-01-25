import { firebase } from './firebase';

const remoteConfig = firebase.remoteConfig();

export default function activateRemoteConfig(settings, defaultConfig) {
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
