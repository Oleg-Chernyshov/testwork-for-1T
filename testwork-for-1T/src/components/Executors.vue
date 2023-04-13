<template>
  <div class="q-pa-md">
    <h5>Исполнители</h5>
    <table class="table">
      <thead>
        <th>Почта</th>
        <th>Имя</th>
        <th>Фамилия</th>
        <th>Действия</th>
      </thead>
      <tbody>
        <tr v-for="executor in executors" :key="executor.id">
          <td>{{ executor.email.email }}</td>
          <td>{{ executor.fullname.first_name }}</td>
          <td>{{ executor.fullname.last_name }}</td>
          <button class="btn" @click="deleteSubject(executor.id)">Удалить</button>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { DeleteSubject } from "src/api/main/mutations.js";
import { ApolloClient } from "@apollo/client/core";
import { provideApolloClient } from "@vue/apollo-composable";
import { getClientOptions } from "src/apollo/index";
import { useMutation } from "@vue/apollo-composable";
import { response } from "../functions/functions";
import { useQuasar } from "quasar";

export default defineComponent({
  setup() {
    const store = useStore();
    const $q = useQuasar();
    store.dispatch("GET_EXECUTORS");
    const executors = computed(() => store.getters.EXECUTORS);

    const deleteSubject = function (id) {
      const apolloClient = new ApolloClient(getClientOptions());
      provideApolloClient(apolloClient);
      const { mutate } = useMutation(DeleteSubject, () => ({
        variables: {
          id: id,
        },
      }));
      response("Пользователь удален", "Ошибка", mutate, $q);
    };

    return {
      executors,
      deleteSubject
    };
  },
});
</script>

<style>


</style>
