const timeout = 2000;
export default {
  state: () => {
    return {
      idGenerator: 0,
      shiftTimer: 0,
      notifications: []
    }
  },
  mutations: {
    addNotification(state, notification) {
      notification.id = ++state.idGenerator;
      state.notifications.push(notification);
    },
    shiftNotifications(state) {
      state.notifications.shift();
      state.shiftTimer = 0;
    },
    resetTimer(state) {
      state.shiftTimer = 0;
    },
    deleteNotification(state, id) {
      const index = state.notifications.findIndex(n => n.id === id);
      if (index > -1) {
        state.notifications.splice(index, 1);
      }
    },
  },
  getters: {
    notifications(state) {
      return state.notifications;
    },
  },
  actions: {
    createNotification({commit, state, dispatch, getters}, notification) {
      commit('addNotification', notification)
      dispatch('scheduleShiftingNotifications');
    },
    scheduleShiftingNotifications({dispatch, state, commit}) {
      if(state.notifications.length && !state.shiftTimer) {
        state.shiftTimer = setTimeout(dispatch, timeout, 'shiftNotifications');
      }
    },
    resetScheduleShiftingNotifications({dispatch, state, commit}) {
      clearTimeout(state.shiftTimer);
      commit('resetTimer');
      dispatch('scheduleShiftingNotifications');
    },
    shiftNotifications({commit, state, dispatch}) {
      commit('shiftNotifications');
      dispatch('scheduleShiftingNotifications');
    },
    deleteNotification({commit, state, dispatch}, id) {
      commit('deleteNotification', id);
      dispatch('resetScheduleShiftingNotifications');
    },
  },
}
