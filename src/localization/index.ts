import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import ru from './locale/ru';
import en from './locale/en';

export const getLocale = () => {
	const navigatorObject = window.navigator;
	let language = navigatorObject ? navigatorObject.language : "ru";
	return language.substr(0, 2).toLowerCase();
};


export const initLocale = (lang = getLocale()) => {
	i18next
		.use(initReactI18next)
		.init({
			resources: {
				ru,
				en,
			},
			// lng: lang,
			// fallbackLng: lang,
			lng: "ru",
			fallbackLng: "ru",
			// debug: (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test'),
			debug: false,
			ns: ['translations'],
			defaultNS: 'translations',
			keySeparator: '.',
			interpolation: {
				escapeValue: false,
				formatSeparator: ',',
			},
			react: {
				wait: true,
			},
		});

	return i18next;
}