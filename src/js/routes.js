import FirstStep from '../pages/step1.vue';
import SecondStep from '../pages/step2.vue';

var routes = [
  {
    path: '/',
    component: FirstStep,
  },
  {
    path: '/step-1',
    component: FirstStep,
  },
  {
    path: '/step-2',
    component: SecondStep,
  },
];

export default routes;
