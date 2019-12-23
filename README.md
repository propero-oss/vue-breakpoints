# @propero/vue-breakpoints
Provide breakpoints for responsive webdesign
```SH
npm install @propero/vue-breakpoints
```

## Usage

#### Consuming the Plugin
```typescript
import Vue from "vue";
import {VueBreakpoints} from "@propero/vue-breakpoints";

Vue.use(VueBreakpoints, {
  // If you want 'breakpoint--SIZE', e.g. 'breakpoint--s' or 'breakpoint--above-m'
  // classes to be automatically added to the body tag
  // optional, default false
  addCssClasses: true,
  // What breakpoints you want and at what thresholds they should start
  // optional, default 'xs480 s736 m980 l1280 xl1690'
  breakpoints: "s480 m760 l1280"
});
// Or just
Vue.use(VueBreakpoints);
```

#### Using the Plugin
The plugin defines a `Breakpoints` object at the `$break` property of all vue components.
You can use them, e.g. in templates using v-if.
```vue
<template>
  <desktop-header v-if="$break.above('m')" />
  <mobile-header v-else />
</template>
```
If you enable css classes, you can use them in your stylesheets also.
```css
.burger-menu {
  display: none
}
.breakpoint--below-m .burger-menu {
  display: block;
}
.breakpoint--s .brand-icon {
  height: 48px
}
```
The defined classes are names `breakpoint--below-SIZE`, `breakpoint--above-SIZE`
and `breakpoint--SIZE` where `SIZE` is a placeholder for the name of the breakpoint given.


The Plugin exports several utility functions and properties:

| Member Name             | Description                                                                                                                       | Example Use                        |
|-------------------------|-----------------------------------------------------------------------------------------------------------------------------------|------------------------------------|
| `current`               | A key-value pair with the current breakpoint name and it's corresponding width                                                    | ```$break.current[0] === "s" ```   |
| `currentPoint`          | The current breakpoint name                                                                                                       | ```$break.currentPoint === "s" ``` |
| `currentSize`           | The current breakpoint's width                                                                                                    | ```$break.currentSize > 640 ```    |
| `above(size)`           | Returns true if the current screen size is above the threshold for the breakpoint given                                           | ```$break.above('m') ```           |
| `below(size)`           | Returns true if the current screen size is below the threshold for the breakpoint given                                           | ```$break.below('m') ```           |
| `aboveOr(size)`         | Returns true if the current screen size is above or at the threshold for the breakpoint given                                     | ```$break.aboveOr('m') ```         |
| `belowOr(size)`         | Returns true if the current screen size is below or at the threshold for the breakpoint given                                     | ```$break.belowOr('m') ```         |
| `between(lower, upper)` | Returns true if the current screen size is at or over the lower threshold and below the upper threshold for the breakpoints given | ```$break.between('m', 'l') ```    |
| `outside(lower, upper)` | Returns true if the current screen size is below the lower threshold and above the upper threshold for the breakpoints given      | ```$break.outside('m', 'l') ```    |
