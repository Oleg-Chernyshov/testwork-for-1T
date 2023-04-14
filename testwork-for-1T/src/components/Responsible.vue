<template>
  <div class="q-pa-md">
    <h5>Ответственные</h5>
    <table class="table">
      <thead>
        <th>Почта</th>
        <th>Имя</th>
        <th>Фамилия</th>
        <th>Действия</th>
      </thead>
      <tbody>
        <tr v-for="res in responsible" :key="res.id">
          <td>{{ res.email.email }}</td>
          <td>{{ res.fullname.first_name }}</td>
          <td>{{ res.fullname.last_name }}</td>
          <button class="btn" @click="deleteSubject(res.id)">Удалить</button>
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

    store.dispatch("GET_RESPONSIBLES");
    const responsible = computed(() => store.getters.RESPONSIBLES);
    
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
      responsible,
      deleteSubject
    };
  },
});
</script>

<style>

</style>
