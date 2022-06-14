<template>
  <nav class="navbar navbar-expand-lg navbar-light ms-5 me-5">
    <div class="container-fluid">
      <div class="navbar-brand">
        <Logotype></Logotype>
      </div>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div
          id="navbarSupportedContent"
          class="collapse navbar-collapse"
      >
        <ul class="nav nav-pills ms-auto">
          <template v-if="isAuth">
            <li class="nav-item">
              <router-link
                  class="nav-link"
                  :to="{name: 'chooseQuestionnaireForResponse'}"
              >
                Browse All
              </router-link>
            </li>
            <li class="nav-item dropdown">
              <a
                  class="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
              >
                My Questionnaires
              </a>
              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <router-link
                      class="dropdown-item"
                      :to="{name: 'manageResponsesView', params: {id: currentQuestionnaireId}}"
                  >
                    Responses
                  </router-link>
                </li>
                <li>
                  <router-link
                      class="dropdown-item"
                      :to="{name: 'manageFieldsView', params: {id: currentQuestionnaireId}}"
                  >
                    Fields
                  </router-link>
                </li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {{ user && (user.firstName || user.lastName) ? ((user.firstName || '???') + ' ' + (user.lastName || '???')) : 'Profile' }}
              </a>
              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <router-link
                    class="dropdown-item"
                    :to="{name: 'editProfile'}"
                  >
                    Edit Profile
                  </router-link>
                </li>
                <li>
                  <router-link
                    class="dropdown-item"
                    :to="{name: 'changePassword'}"
                  >
                    Change Password
                  </router-link>
                </li>
                <li>
                  <button
                    class="dropdown-item"
                    type="submit"
                    @click="logout"
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <router-link
                  class="nav-link"
                  :to="{name: 'login'}"
              >
                Log in
              </router-link>
            </li>
          </template>
      </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import Logotype from "@/components/Logotype";
import {mapActions, mapGetters} from "vuex";
export default {
  name: 'NavigationHeader',
  computed: {
    ...mapGetters(['isAuth', 'user', 'currentQuestionnaireId']),

  },
  components: { Logotype},
  methods: {
    ...mapActions(['logout']),
    onLogout(){
      this.logout()
    }
  },
}
</script>
<style>
.nav-link {
  font-size: 1.25rem;
}
</style>