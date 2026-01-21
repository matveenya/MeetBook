import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { auth } from './auth';

const app = createApp(App);
app.use(auth);
app.mount('#app');
