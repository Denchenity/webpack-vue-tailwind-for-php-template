import { createApp } from "vue/dist/vue.esm-bundler.js";

import test from './test.vue';

const App = createApp(test);

App.mount('#test');