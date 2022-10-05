import { defineComponent } from 'vue';
import { mount } from '@vue/test-utils';
import { FindComponentSelector } from '@vue/test-utils/dist/types';

type Props = { [key: string]: any };

declare module '@vue/test-utils' {
  export class VueWrapper {
    findAllComponentsByProps(selector: FindComponentSelector, props: Props): VueWrapper[];
    findComponentByProps(selector: FindComponentSelector, props: Props): VueWrapper;
  }
}

describe('FindByPropsPlugin', () => {
  const compB = defineComponent({
    name: 'ComponentB',
    template: '<div class="B">C - {{title}}</div>',
    props: ['title']
  });

  const compA = defineComponent({
    name: 'A',
    template: `
      <div class="A">
      <comp-b title="save" />
      <comp-b title="save" />
      <comp-b title="delete" />
      </div>`,
    components: { compB }
  });

  describe('findAllComponentsByProps', () => {

    it('finds all components', () => {
      const wrapper = mount(compA);
      expect(wrapper.findAllComponentsByProps(compB, { title: 'save' })).toHaveLength(2);
      expect(wrapper.findAllComponentsByProps(compB, { title: 'delete' })).toHaveLength(1);
      expect(wrapper.findAllComponentsByProps(compB, { title: 'doesNotExist' })).toHaveLength(0);
    });

  });

  describe('findComponentByProps', () => {

    it('finds component', () => {
      const wrapper = mount(compA);
      const saveComponent = wrapper.findComponentByProps(compB, { title: 'save' });
      expect(saveComponent.html()).toBe('<div class="B">C - save</div>');
    });

    it('throws wrapper error if component does not exist', () => {
      const wrapper = mount(compA);
      expect(() => wrapper.findComponentByProps(compB, { title: 'doesNotExist' }))
        .toThrowError('There is no component with the props {"title":"doesNotExist"}');
    });

  });

});
