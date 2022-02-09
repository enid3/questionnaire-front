import * as yup from "yup";

export default {
  state: () => {
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    return {
      rulesPreset: {
        email: (y) => y.string().required().email(),
        password: (y) => y.string().required().min(6).max(60),
        confirmPassword:(y) =>  y.string().oneOf([yup.ref('password'), null], "Passwords does not math").required().min(6).max(60),
        firstName: (y) => y.string().min(2).max(30),
        lastName: (y) => y.string().min(2).max(30),
        phoneNumber: (y) => y.string().nullable().matches(phoneRegExp, "Phone number is not valid")
      }
    }

  },

  getters: {
    getRulesPreset: (state) => (name) => {
      return state.rulesPreset[name]
    },
    getSchema: (state, getters) => (fields) => {
      let temp = {}
      /*
      for (let key in fields) {
        temp[key] = getters.getRulesPreset(fields[key])(yup)
      }
      */
      for (let field of fields) {
        temp[field] = getters.getRulesPreset(field)(yup)
      }
      return yup.object(temp)
    },
  },
}

