import { config } from '@vue/test-utils';
import { FindByPropsPlugin } from './src';

config.plugins.VueWrapper.install(FindByPropsPlugin);
