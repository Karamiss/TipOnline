<template>
  <div class="mt-4">
    <b-form @submit.stop.prevent="onSubmit">
      <b-form-group id="login-input-group" label="Логин" label-for="login-input">
        <b-form-input
          id="login-input"
          name="login-input"
          v-model="$v.form.login.$model"
          :state="validateState('login')"
          aria-describedby="login-input-live-feedback"
        ></b-form-input>

        <b-form-invalid-feedback
          id="login-input-live-feedback"
        >Поле логина не может быть пустым и должно быть длиннее 3 символов.</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="password-input-group" label="Пароль" label-for="password-input">
        <b-form-input
          id="password-input"
          type="password"
          name="password-input"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
          aria-describedby="password-input-live-feedback"
        ></b-form-input>

        <b-form-invalid-feedback
          id="password-input-live-feedback"
        >Поле пароля не может быть пустым и должно быть длиннее 4 символов. </b-form-invalid-feedback>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button class="ml-2" @click="resetForm()">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  data() {
    return {
      form: {
        login: null,
        password: null
      }
    };
  },
  validations: {
    form: {
      password: {
        required,
        minLength: minLength(4)
      },
      login: {
        required,
        minLength: minLength(3)
      }
    }
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    resetForm() {
      this.form = {
        login: null,
        password: null
      };

      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    async onSubmit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      
      let user = await this.$http.post(`${this.$usersApi}/auth/login`, this.form)
      .then(function(res) {
        if (localStorage.getItem('tipon-token')) {
          localStorage.removeItem('tipon-token')
        }
        localStorage.setItem('tipon-token', res.data.token)
        return res.data.user
      })
      .catch(function(err) {
        console.log(err);
      })
      
      if (user) {
        localStorage.setItem('login', user.login)
        this.$store.state.user = user.data
        this.$router.go()
      }
    }
  },
  beforeCreate () {
    if (localStorage.getItem('tipon-token')) {
      this.$router.push('/')
    }
  },
};
</script>

<style scoped>

</style>