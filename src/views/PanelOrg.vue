<template>
  <div class="mt-4">
    <transition name="component-form">
      <FormAddWorker v-if="formShow" :updateData="updateData" />
    </transition>
    <b-button-group class="m-2">
      <b-button @click="formShow = !formShow" variant="primary">Форма добавления</b-button>
      <b-button @click="updateData" variant="info">Обновить работников</b-button>
    </b-button-group>
    <b-card v-for="worker in workers" :key="worker.phone" no-body class="m-1">
    <b-row no-gutters>
      <b-col md="6">
        <b-button :to="`/worker/${worker.phone}`" class="rounded-0" block>Перейти к работнику</b-button>
        <b-card-img src="https://sun9-42.userapi.com/impg/j8ROhHU9tCaJYufgtrj03kNiFhwlSLcN-BPpgw/DEjIJc1_--0.jpg?size=1002x1080&quality=95&sign=5a3347b254111db97afe8fde9cbdca04&type=album" alt="Image" class="rounded-0"></b-card-img>
      </b-col>
      <b-col md="6">
        <b-card-body :title="worker.name">
          <b-card-text>
            {{worker.phone}}
          </b-card-text>
          <b-card-footer>
            <b-button-group>
              <b-button @click="deleteWorker(worker.phone)" variant="danger">Удалить</b-button>
            </b-button-group>
          </b-card-footer>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
  </div>
</template>

<script>
import FormAddWorker from "@/components/FormAddWorker";
export default {
  data() {
    return {
      workers: [],
      formShow: false
    }
  },
  methods: {
    async updateData() {
      let workers = await this.$http.get(`${this.$usersApi}/orgs/all`)
      .then(function(res) {
        return res.data
      })
      
      this.workers = workers
    },
    async deleteWorker(phoneWorker) {
      let response = await this.$http.get(`${this.$usersApi}/orgs/delete/worker/${phoneWorker}`).then(res => {return res.data}).catch(err => alert(err))
      if (response.success) {
        this.updateData()
      }
    } 
  },
  components: {
    FormAddWorker,
  },
  async mounted () {
    if (localStorage.getItem('login')) {
      let user = await this.$store.state.user
      if (!user) {
        this.$router.push('/profile')
      } else if (user.role != 'organization') {
        console.log('user.role');
        this.$router.push('/profile')
      } else {
        this.updateData()
      }
    }
  },
}
</script>

<style>
.component-form-fade-enter-active, .component-form-fade-leave-active {
  transition: opacity .3s ease-in;
}
.component-form-fade-enter, .component-form-fade-leave-to {
  opacity: 0;
}
</style>