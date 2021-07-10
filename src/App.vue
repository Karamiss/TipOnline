<template>
  <div id="app">
    <Header ref="headerComponent" />
    <main class="container main">
      <transition name="table-slide" mode="out-in">
        <router-view />
      </transition>
    </main>
  </div>
</template>

<script>
  import Header from "@/components/Header.vue";
  export default {
    components: {
      Header,
    },
    methods: {
      async resetData() {
        
        let data = {
          login: localStorage.getItem('login')
        }
        
        let response = await this.$http.post(`${this.$usersApi}/auth/login`, data)
        .then(function(res) {
          return res.data
        }).catch(err => console.log(err))
        if (response.user) {
          this.$store.state.user = response.user
        } else if(response.message == "Перезагрузка") {
          console.log(response.message);
          this.$refs.headerComponent.logout();
        }
      }
    },
    mounted () {
      this.resetData()
    },
  }
</script>

<style>
.page-slide-enter-active, .page-slide-leave-active {
  transition: opacity .5s;
}
.page-slide-enter, .page-slide-leave-to {
  opacity: 0;
}
</style>
