import { VueWrapper } from '@vue/test-utils';
import { FindComponentSelector } from '@vue/test-utils/dist/types';
import { isMatch } from 'lodash';

type Props = { [key: string]: any };

export function FindByPropsPlugin(wrapper: VueWrapper) {
  function findAllComponentsByProps(selector: FindComponentSelector, props: Props): VueWrapper[] {
    const results = wrapper.findAllComponents(selector);
    return results.filter(component => isMatch(component.props(), props));
  }

  function findComponentByProps(selector: FindComponentSelector, props: Props): VueWrapper {
    const results = wrapper.findAllComponents(selector);
    const result = results.find(component => isMatch(component.props(), props));
    if (!result) {
      throw new Error('There is no component with the props ' + JSON.stringify(props));
    }
    return result;
  }

  return {
    findAllComponentsByProps,
    findComponentByProps,
  };
}
