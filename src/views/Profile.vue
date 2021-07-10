<template>
  <div v-if="user">
    <h1>Ваш профиль: </h1>
    <h3>{{user.name}}</h3>
    <h5>{{user.login}}</h5>

    <p>Роль: {{user.role}}</p>
    <p>Почта: {{user.email}}</p>

    <div class="mt-3">
      <b-button-group>
        <b-button v-if="user.role == 'admin'" variant="success">Панель администратора</b-button>
        <b-button to="/panel-org" v-if="user.role == 'organization'" variant="success">Панель организации</b-button>
        <b-button v-if="user.role == 'user'" variant="success">Список последних оплат</b-button>
        <b-button variant="info">Изменить профиль</b-button>
        <b-button variant="warning">Удалить профиль</b-button>
      </b-button-group>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null
    }
  },
  async mounted () {
    if (!localStorage.getItem('login')) {
      this.$router.push('/')
    } else {
      this.user = await this.$store.state.user 
    }
  },
}
</script>

<style>

</style>