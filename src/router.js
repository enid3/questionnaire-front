import {createRouter, createWebHashHistory} from "vue-router";
import FieldsPage from "@/pages/FieldsPage";
import QuestionnairePage from "@/pages/QuestionnairePage";
import SuccessfullSubmitPage from "@/pages/SuccessSubmitPage";
import ResponsesPage from "@/pages/ResponsesPage";
import LoginPage from "@/pages/LoginPage";
import RegistrationPage from "@/pages/RegistrationPage";
import ChangePasswordPage from "@/pages/ChangePasswordPage";
import EditProfilePage from "@/pages/EditProfilePage";
import TestPage from "@/pages/TestPage";


const routes = [
  {
    path: '/',
    component: FieldsPage,
    children: [

    ],
    meta: {title: 'Fields'},
  },
  {
    path: '/fields',
    name: 'Fields',
    component: FieldsPage,
    meta: {title: 'Fields'},
  },
  {
    path: '/questionnaire/:id',
    name: 'Questionnaire',
    component: QuestionnairePage,
    meta: {title: 'Questionnaire'},
  },
  {
    path: '/responses',
    name: 'Responses',
    component: ResponsesPage,
    meta: {title: 'Responses'},
  },
  {
    path: '/success',
    name: 'Success',
    component: SuccessfullSubmitPage,
    meta: {title: 'Success'},
  },
  {
    path: '/changePassword',
    name: 'ChangePassword',
    component: ChangePasswordPage,
    meta: {title: 'Change password'},
  },
  {
    path: '/editProfile',
    name: 'EditProfile',
    component: EditProfilePage,
    meta: {title: 'Edit Profile'},
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: {title: 'Login'},
  },
  {
    path: '/register',
    name: 'Register',
    component: RegistrationPage,
    meta: {title: 'Register'},
  },
  {
    path: '/test',
    name: 'Test',
    component: TestPage,
    meta: {title: 'Test'},
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})


export default router