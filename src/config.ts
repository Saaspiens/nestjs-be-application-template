import { CoreConfigModel, load as coreLoad } from 'be-core';
import { merge } from 'lodash';
import * as config from '../config/config.json';

export class ConfigModel extends CoreConfigModel {
    // add more config properties here
}

const defaultConfig = () => {
    const defaultConfig = new ConfigModel();
    return defaultConfig;
};

export const load = (): ConfigModel => {
    return merge(coreLoad(), defaultConfig(), config) as ConfigModel;
};

export const get = (key: string) => {
    const config = load();
    return config[key] as Record<string, any>;
};
