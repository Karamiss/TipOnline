<template>
  <div>
    <b-form @submit.stop.prevent="onSubmit" block class="mt-2">
      <b-form-group id="name-input-group" label="Инициалы" label-for="name-input">
        <b-form-input
          id="name-input"
          name="name-input"
          v-model="$v.form.name.$model"
          :state="validateState('name')"
          aria-describedby="name-input-live-feedback"
        ></b-form-input>

        <b-form-invalid-feedback
          id="name-input-live-feedback"
        >Поле инициалов не может быть пустым</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="phone-input-group" label="Моибльный телефон" label-for="phone-input">
        <b-form-input
          id="phone-input"
          name="phone-input"
          v-model="$v.form.phone.$model"
          type="tel"
          :state="validateState('phone')"
          aria-describedby="phone-input-live-feedback"
        ></b-form-input>

        <b-form-invalid-feedback
          id="phone-input-live-feedback"
        >Поле телефона не может быть пустым</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="email-input-group" label="Почта" label-for="email-input">
        <b-form-input
          id="email-input"
          name="email-input"
          v-model="$v.form.email.$model"
          :state="validateState('email')"
          type="email"
          aria-describedby="email-input-live-feedback"
        ></b-form-input>

        <b-form-invalid-feedback
          id="email-input-live-feedback"
        >Поле почты не должно быть пустым</b-form-invalid-feedback>
      </b-form-group>

      <b-button type="submit" variant="primary">Добавить</b-button>
      <b-button class="ml-2" @click="resetForm()">Очистить</b-button>
    </b-form>
    <hr class="mr-4">
  </div>
</template>



<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  data() {
    return {
      form: {
        name: null,
        phone: null,
        email: null,
      }
    };
  },
  validations: {
    form: {
      name: {
        required,
      },
      phone: {
        required,
      },
      email: {
        required,
      }
    }
  },
  props: {
    updateData: {
      type: Function,
      default() {
          return function () {};
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
        name: null,
        food: null
      };

      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    onSubmit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      
      this.$http.post(
        `${this.$usersApi}/orgs/set/worker`,
        this.form
      ).then(res => {
        this.updateData()
        alert(res.data.message)
      }).catch(() => {
        alert(res.data.message)
      })
    }
  }
};
</script>

<style scoped>

</style>