import {createApp} from 'vue/dist/vue.esm-bundler';

import components from './_components.js';

//style
import '@style/services/visa.scss';

const app = createApp();

components.forEach(component => {
    app.component(component.name, component);
});

app.mount('#visa');