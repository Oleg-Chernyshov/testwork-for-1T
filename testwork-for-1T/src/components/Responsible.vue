<template>
  <div class="q-pa-md">
    <h5>Ответственные</h5>
    <table class="table">
      <thead>
        <th>Почта</th>
        <th>Имя</th>
        <th>Фамилия</th>
      </thead>
      <tbody>
        <tr v-if="loading">loading</tr>
        <tr v-else v-for="res in responsible.values" :key="res.id">
          <td>{{ res.email.email }}</td>
          <td>{{ res.fullname.first_name }}</td>
          <td>{{ res.fullname.last_name }}</td>
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
    const { onResult, loading } = useQuery(GetGroupById, {"id":"1358489619049103837"});
    onResult((queryResult) => {
      responsible.values = queryResult.data.get_group.subject;
    });

    return {
      responsible,
      loading
    };
  },
});
</script>

<style></style>
