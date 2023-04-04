<template>
  <div>
    <h5>Ответственные</h5>
    <table class="table">
      <thead>
        <th>Почта</th>
        <th>Имя</th>
        <th>Фамилия</th>
        <th>Действия</th>
      </thead>
      <tbody>
        <tr v-for="res in responsible.values" :key="res.id">
          <td>{{ res.email.email }}</td>
          <td>{{ res.fullname.first_name }}</td>
          <td>{{ res.fullname.last_name }}</td>
          <td> <q-btn color="red">Удалить</q-btn> </td>
        </tr>
      </tbody>
    </table>
    
  </div>
</template>

<script>
import { defineComponent, ref, computed, reactive } from "vue";
import { GetGroupById } from "src/api/main/queryes";
import { useQuery } from "@vue/apollo-composable";

export default defineComponent({
  setup(props, { emit }) {
    const responsible = reactive([]);
    const { onResult } = useQuery(GetGroupById, {"id":"1358489619049103837"});
    onResult((queryResult) => {
      responsible.values = queryResult.data.get_group.subject;
    });

    return {
      responsible,
    };
  },
});
</script>

<style></style>
