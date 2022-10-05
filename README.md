# vue-test-utils-plugin-find-by-props

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=vue-test-utils-plugin-find-by-props&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=vue-test-utils-plugin-find-by-props)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=vue-test-utils-plugin-find-by-props&metric=bugs)](https://sonarcloud.io/summary/new_code?id=vue-test-utils-plugin-find-by-props)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=vue-test-utils-plugin-find-by-props&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=vue-test-utils-plugin-find-by-props)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=vue-test-utils-plugin-find-by-props&metric=coverage)](https://sonarcloud.io/summary/new_code?id=vue-test-utils-plugin-find-by-props)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=vue-test-utils-plugin-find-by-props&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=vue-test-utils-plugin-find-by-props)

Plugin for [@vue/test-utils](https://github.com/vuejs/test-utils) to find components by its props.

## Usage Case

This small plugin extends the `Vue Wrapper` with following tho methods:

* `findAllComponentsByProps()`
* `findComponentByProps()`

Therefore, it's possible to find components with specific props.

## Installation

1. Install this plugin via e.g. `npm install vue-test-utils-plugin-find-by-props --save-dev`
2. Add the following file to your test setup file - e.g.: `jest.setup.ts`
    ```typescript
    import { config } from '@vue/test-utils';
    import { FindByPropsPlugin } from 'vue-test-utils-plugin-find-by-props';

    config.plugins.VueWrapper.install(FindByPropsPlugin);
    ```
3. (Only required for TypeScript)<br>Create a `vue-test-utils.d.ts` file with the following content:
    ```typescript
    import { FindComponentSelector } from '@vue/test-utils/dist/types';

    type Props = { [key: string]: any };

    declare module '@vue/test-utils' {
      export class VueWrapper {
        findAllComponentsByProps(selector: FindComponentSelector, props: Props): VueWrapper[];
        findComponentByProps(selector: FindComponentSelector, props: Props): VueWrapper;
      }
    }
    ```

## Usage

Now you're able to use these methods in tests. Fore Example if you have a custom component `MyButton` and using a Modal
with a `Save` and `Cancle` button like this:

```vue

<div class="modal">
  Do you want to Save?
  <MyButton title="Save" />
  <MyButton title="Cancel" />
</div>

```

You are now able to easily access the correct button:

```ts
const cancelButton = wrapper.findComponentByProps(MyButton, {title: 'Cancel'})
```

There is no need for an extra class or attributes like `data-testid` to access the component.
