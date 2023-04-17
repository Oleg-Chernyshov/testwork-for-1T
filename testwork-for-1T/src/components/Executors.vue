<template>
  
    <h5>Исполнители</h5>
    <q-table 
      :rows="executors"
      :columns="columns"
      :pagination="pagination"
      :pagination-labels="{rowsPerPage: 'Строк на странице', rowsPerPageAll: 'Все'}"
      :rows-per-page-options="[5, 10, 20]"
    >
      
    <template v-slot:body="props">
        <q-tr :props="props">
        
          <q-td>{{ props.row.email.email }}</q-td>
          <q-td>{{ props.row.fullname.first_name }}</q-td>
          <q-td>{{ props.row.fullname.last_name }}</q-td>
          <button class="btn" @click="deleteSubject(props.row.id)">Удалить</button>

        </q-tr>
    </template>
      
    </q-table>
  
</template>

<script>
import { defineComponent, computed, reactive } from "vue";
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

    const pagination = reactive({
      rowsPerPage: 10,
      page: 1,
      sortBy: 'name',
    })


  const columns = [
  { name: 'Почта', align: 'left', label: 'Почта', field: 'Почта'},
  { name: 'Имя', align: 'left', label: 'Имя', field: 'Имя'},
  { name: 'Фамилия', align: 'left', label: 'Фамилия', field: 'Фамилия' },
  { name: 'Действия', align: 'left', label: 'Действия', field: 'Действия' },
]

    const pagination = reactive({
      rowsPerPage: 10,
      page: 1,
      sortBy: 'name',
    })


  const columns = [
  { name: 'Почта', align: 'left', label: 'Почта', field: 'Почта'},
  { name: 'Имя', align: 'left', label: 'Имя', field: 'Имя'},
  { name: 'Фамилия', align: 'left', label: 'Фамилия', field: 'Фамилия' },
  { name: 'Действия', align: 'left', label: 'Действия', field: 'Действия' },
]

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
      deleteSubject,
      columns,
      pagination,
    };
  },
});
</script>

<style>



</style>
