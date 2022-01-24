import {createRouter, createWebHashHistory} from "vue-router";
import Fields from "@/pages/fields";
import Questionnaire from "@/pages/questionnaire";
import SuccessSubmit from "@/pages/successSubmit";


const routes = [
  {
    path: '/',
    component: Fields
  },
  {
    path: '/fields',
    component: Fields
  },
  {
    path: '/questionnaire',
    component: Questionnaire
  },
  {
    path: '/succ1essSubmit',
    component: SuccessSubmit
  }
  ]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router