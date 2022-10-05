import { FindComponentSelector } from '@vue/test-utils/dist/types';

type Props = { [key: string]: any };

declare module '@vue/test-utils' {
  export class VueWrapper {
    findAllComponentsByProps(selector: FindComponentSelector, props: Props): VueWrapper[];
    findComponentByProps(selector: FindComponentSelector, props: Props): VueWrapper;
  }
}
