<template>
  <div class="mt-2 mb-2">
    <h2>Оплата чаевых онлайн</h2>
    <h4>Проект создан с идеей автоматизации оплаты чаевых для сотрудников обслуживающих организаций.</h4>
    <h5>Идея реализована в рамках курсового проекта университета Московский Политех</h5>
    <ul class="ul-label" aria-label="Участники проекта:"> 
      <li v-for="member in members" :key="member.Инициалы">
        {{ member.Инициалы }}
      </li>
    </ul>
    <div class="slide-table">
      <b-button variant="dark" block @click="tableShow = !tableShow">
        Таблица с полной информацией
      </b-button>
      <transition name="table-slide">
        <b-table v-if="tableShow" striped hover :items="members" :fields="fields"></b-table>
      </transition>
    </div>
    <hr class="mr-4">
    <ul class="ul-label" aria-label="Наши микросервисы">
      <li v-for="micromq in micromqs" :key="micromq.id">
        {{micromq.name}}: <a v-if="micromq.toLink" :href="micromq.url.toString()">Ссылка</a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableShow: false,
        micromqs: [
          {
            name: 'Микросервис пользователей',
            url: 'localhost',
            toLink: true
          },
          {
            name: 'Микросервис кэшироваия данных пользователя',
            toLink: false
          },
          {
            name: 'Микросервис страницы оплаты',
            url: 'localhost',
            toLink: true
          },
          {
            name: 'Микросервис основного сайта',
            url: 'localhost',
            toLink: true
          },
        ],
        fields: ['Группа', 'Инициалы', 'Роль'],
        members: [
          { Группа: '181-362', Инициалы: 'Шукуров Фотэх ', Роль: 'Backend' },
          { Группа: '181-362', Инициалы: 'Звягин Максим', Роль: 'Frontend' },
          { Группа: '181-362', Инициалы: 'Аскерзаде Айхан', Роль: 'Frontend' },
          { Группа: '181-361', Инициалы: 'Расулов Гасанбег', Роль: 'Fullstack' }
        ]
      }
    },
  }
</script>

<style scoped>
.ul-label:before{
    content:attr(aria-label);
    font-size: 120%;
    font-weight: bold;
}
.table-slide-enter-active, .table-slide-leave-active {
  transition: opacity .5s;
}
.table-slide-enter, .table-slide-leave-to {
  opacity: 0;
}
</style>
