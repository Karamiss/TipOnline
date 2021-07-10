<template>
  <div v-if="worker">
    <h1>Ваш сотрудник: </h1>
    <b-input v-model="worker.name" class="m-2" />
    <b-input v-model="worker.phone" class="m-2" />
    <b-input v-model="worker.email" class="m-2" />

    <div class="mt-3">
      <b-button-group>
        <b-button @click="prevPage" variant="secondary">К сотрудникам</b-button>
        <b-button @click="editWorker" variant="info">Изменить профиль</b-button>
      </b-button-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      worker: null
    }
  },
  methods: {
    async updateData() {
      const phone = this.$route.params.phone

      this.worker = await this.$http.get(`${this.$usersApi}/orgs/get/worker/${phone}`)
      .then(res => res.data)
    },
    async editWorker() {
      const phone = this.$route.params.phone
      const data = {
        newData: this.worker
      }
      this.worker = await this.$http.post(`${this.$usersApi}/orgs/update/worker/${phone}`, data)
      .then(res => res.data)
      this.$route.params.phone = this.worker.phone
    },
    prevPage() {
      this.$router.push('/panel-org')
    }
  },
  async created () {
    const user = await this.$store.state.user
    if (!user) {
      this.$router.push('/')
    } else if (user.role == 'organization') {
      this.updateData()
    } else {
      this.$router.push('/')
    }
  },
}
</script>

<style>

</style>