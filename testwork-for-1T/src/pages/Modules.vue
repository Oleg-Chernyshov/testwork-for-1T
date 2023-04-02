<template>
  <div class="modules">
    <h5>Modules</h5>
    <div class="modules__table">
      <table class="table">
        <thead>
          <tr>
            <th>Модуль</th>
            <th>Ответственный</th>
            <th>Дата начала</th>
            <th>Дата окончания</th>
            <th>Назначенные задачи</th>
            <th>Выполненыне задачи</th>
            <th>Завершеныне задачи</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="module in MODULES" :key="module.id">
            <td>{{ module.name }}</td>
            <td>
              {{
                module.property7.fullname.first_name +
                " " +
                module.property7.fullname.last_name
              }}
            </td>
            <td>{{ module.property2.date + " " + module.property2.time }}</td>
            <td>{{ module.property3.date + " " + module.property3.time }}</td>
            <td>
              {{
                module.property8.reduce(function (a, b) {
                  if (b.property5 == "3173475364523847130") {
                    return ++a;
                  } else return 0;
                }, 0)
              }}
            </td>
            <td>
              {{
                module.property8.reduce(function (a, b) {
                  if (b.property5 == "9117798227215343609") {
                    return a++;
                  } else return 0;
                }, 0)
              }}
            </td>
            <td>
              {{
                module.property8.reduce(function (a, b) {
                  if (b.property5 == "4106452242288243072") {
                    return (a = a + 1);
                  } else return 0;
                }, 0)
              }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { useMutation } from "@vue/apollo-composable";
import { ref, computed, reactive } from "vue";
import { useStore } from "vuex";

export default {
  components: {},

  setup() {
    const store = useStore();
    store.dispatch("GET_MODULES");
    const MODULES = computed(() => store.getters.MODULES);

    return {
      MODULES,
    };
  },
};
</script>

<style lang="scss">
.table {
  width: 100%;
  margin-bottom: 20px;
  border: 1px solid #dddddd;
  border-collapse: collapse;
}
.table th {
  font-weight: bold;
  padding: 5px;
  background: #efefef;
  border: 1px solid #dddddd;
}
.table td {
  border: 1px solid #dddddd;
  padding: 5px;
}
</style>
