import { remote } from 'electron';
import { v4 as uuidv4 } from 'uuid';
import { CACHE_KEY_NAME } from './consts';
import { Item } from './types';

const Store = require('electron-store');

export const getAppName = (): string => remote.app.getName();

export const getAppVersion = (): string => remote.app.getVersion();

export const getClientId = (): string => {
  const store = new Store();
  if (store.has('uuid')) {
    return store.get('uuid');
  } else {
    const uuid = uuidv4();
    store.set('uuid', uuid);
    return uuid;
  }
};

export const getLanguage = (): string => window.navigator.language;

export const getUserAgent = (): string => window.navigator.userAgent;

export const getViewport = (): string => `${window.innerWidth}x${window.innerHeight}`;

export const getScreenResolution = (): string => {
  const screen = remote.screen.getPrimaryDisplay();
  return `${screen.size.width}x${screen.size.height}`;
};

export const getNow = (): number => Date.now();

export const getCache = (): Item[] => {
  const cache = window.localStorage.getItem(CACHE_KEY_NAME);
  return cache ? JSON.parse(cache) : [];
};

export const setCache = (cache: object[]): void => {
  window.localStorage.setItem(CACHE_KEY_NAME, JSON.stringify(cache));
};

export const retry = (cb: Function, schedule: number) => setInterval(cb, schedule);

export const fetch = (url, options) => window.fetch(url, options);
