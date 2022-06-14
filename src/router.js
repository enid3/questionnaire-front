import {createRouter, createWebHashHistory} from "vue-router";
import ManageFieldsView from "@/components/view/ManageFieldsView";
import ProvideResponseForm from "@/pages/response/ProvideResponseForm";
import FeaturedQuestionnairesView from "@/pages/response/FeaturedQuestionnairesView";
import ManageResponsesView from "@/components/view/ManageResponsesView";
import LoginPage from "@/pages/LoginPage";
import RegistrationPage from "@/pages/RegistrationPage";
import ChangePasswordPage from "@/pages/ChangePasswordPage";
import EditProfilePage from "@/pages/EditProfilePage";
import QuestionnairePickerTest from "@/pages/tests/QuestionnairePickerTest";
import ManageQuestionnaireFormTest from "@/pages/tests/ManageQuestionnaireFormTest";
import ManageQuestionnairePage from "@/pages/ManageQuestionnairePage";
import CardQuestionnairePickerTest from "@/pages/tests/CardQuestionnairePickerTest";
import CardQuestionnairePickerPage from "@/components/view/CardQuestionnairePickerPage";
import Logotype from "@/components/Logotype";
import ChooseQuestionnaireForResponsePage from "@/pages/ChooseQuestionnaireForResponsePage";
import ResponsePage from "@/pages/ResponsePage";
import ProvideResponseView from "@/components/view/ProvideResponseView";


const routes = [
{
  path: '/response',
  name: 'response',
  meta: {title: 'Response page'},
  component: ResponsePage,
  children: [{
    path: '',
    name: 'chooseQuestionnaireForResponse',
    meta: {title: 'Questionnaires'},
    component: ChooseQuestionnaireForResponsePage,
  },{
    path: '',
    name: 'featuredQuestionnairesView',
    meta: { title: 'Response success'},
    component: FeaturedQuestionnairesView
  }, {
    path: ':id',
    name: 'provideResponseView',
    meta: {title: 'Response'},
    component: ProvideResponseView,
    children: [ {
      path: '',
      name: 'provideResponseForm',
      meta: {title: 'Response to ...'},
      component: ProvideResponseForm,
    }, ]
  },
  ]
},
{
  path: '/questionnaire',
  name: 'questionnaire',
  alias: '/',
  meta: {title: 'Choose questionnaire'},
  component: CardQuestionnairePickerPage,
},
{
  path: '/questionnaire/:id',
  name: 'ManageQuestionnaire',
  component: ManageQuestionnairePage,
  meta: {title: 'Manage Questionnaire'},
  children: [ {
    path: '',
    name: 'manageFieldsView',
    meta: {title: 'Manage Fields'},
    component: ManageFieldsView,
  }, {
    path: 'responses',
    name: 'manageResponsesView',
    meta: {title: 'Manage Responses'},
    component: ManageResponsesView,
  }]
},
{
  path: '/changePassword',
  name: 'changePassword',
  component: ChangePasswordPage,
  meta: {title: 'Change password'},
},
{
  path: '/editProfile',
  name: 'editProfile',
  component: EditProfilePage,
  meta: {title: 'Edit Profile'},
},
{
  path: '/login',
  name: 'login',
  component: LoginPage,
  meta: {title: 'Login'},
},
{
  path: '/register',
  name: 'register',
  component: RegistrationPage,
  meta: {title: 'Register'},
},
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkExactActiveClass: 'active',
})


export default router