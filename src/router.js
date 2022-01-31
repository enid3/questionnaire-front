import {createRouter, createWebHashHistory} from "vue-router";
import FieldsPage from "@/pages/FieldsPage";
import QuestionnairePage from "@/pages/QuestionnairePage";
import SuccessfullSubmitPage from "@/pages/SuccessSubmitPage";
import HelloWorld from "@/components/HelloWorld";
import ResponsesPage from "@/pages/ResponsesPage";
import LoginPage from "@/pages/LoginPage";
import RegistrationPage from "@/pages/RegistrationPage";
import ChangePasswordPage from "@/pages/ChangePasswordPage";
import EditProfilePage from "@/pages/EditProfilePage";
import store from "@/store";


const routes = [
  {
    path: '/',
    component: FieldsPage,
    children: [

    ]
  },
  {
    path: '/fields',
    name: 'Fields',
    component: FieldsPage
  },
  {
    path: '/questionnaire/:id',
    name: 'Questionnaire',
    component: QuestionnairePage
  },
  {
    path: '/responses',
    name: 'Responses',
    component: ResponsesPage
  },
  {
    path: '/success',
    name: 'Success',
    component: SuccessfullSubmitPage
  },
  {
    path: '/changePassword',
    name: 'ChangePassword',
    component: ChangePasswordPage
  },
  {
    path: '/editProfile',
    name: 'EditProfile',
    component: EditProfilePage
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'Register',
    component: RegistrationPage
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})






export default router