<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand to="/">Tip Online</b-navbar-brand>

    <b-navbar-toggle target="navbar-toggle-collapse">
      <template #default="{ expanded }">
        <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
        <b-icon v-else icon="chevron-bar-down"></b-icon>
      </template>
    </b-navbar-toggle>

    <b-collapse id="navbar-toggle-collapse" is-nav>
      <b-navbar-nav class="mr-auto">
        <b-nav-item v-if="!user" to="/login">Войти</b-nav-item>
        <b-nav-item v-if="!user" to="/register">Регистрация</b-nav-item>
        <b-nav-item-dropdown v-else text="Пользователь">
          <b-dropdown-item to="/profile">Профиль</b-dropdown-item>
          <b-dropdown-item @click="logout">Выйти</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/">Главная</b-nav-item>
        <b-nav-item href="http://localhost:5500/">Сервис оплаты</b-nav-item>
        <b-nav-item to="/about">О нас</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
  export default {
    computed: {
      user() {
        return localStorage.getItem('tipon-token')
      }
    },
    methods: {
      logout() {
        this.$router.push('/')
        localStorage.removeItem('login')
        localStorage.removeItem('tipon-token')
        this.$store.state.user = null
        this.$router.go()
      }
    }
  }
</script>

<style  scoped>

</style>