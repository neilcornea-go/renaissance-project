import FirstStep from '../pages/step1.vue';
import SecondStep from '../pages/step2.vue';
import ThirdStep from '../pages/step3.vue';
import FourthStep from '../pages/step4.vue';

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
  {
    path: '/step-3',
    component: ThirdStep,
  },
  {
    path: '/step-4',
    component: FourthStep,
  },
];

export default routes;
