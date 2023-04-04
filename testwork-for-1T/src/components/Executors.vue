<template>
  <div>
    <h5>Исполнители</h5>
    <table class="table">
      <thead>
        <th>Почта</th>
        <th>Имя</th>
        <th>Фамилия</th>
        <th>Действия</th>
      </thead>
      <tbody>
        <tr v-for="executor in executors.values" :key="executor.id">
          <td>{{ executor.email.email }}</td>
          <td>{{ executor.fullname.first_name }}</td>
          <td>{{ executor.fullname.last_name }}</td>
          <td> <q-btn color="red">Удалить</q-btn> </td>
        </tr>
      </tbody>
    </table>
    
  </div>
</template>

<script>
import { defineComponent, reactive } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { GetGroupById } from "src/api/main/queryes";

export default defineComponent({
  setup(props, { emit }) {
    const executors = reactive([]);
    const { onResult } = useQuery(GetGroupById, {"id":"6271877799003044991"});
    onResult((queryResult) => {
      executors.values = queryResult.data.get_group.subject;
      console.log("execute", executors.values);
    });

    return {
      executors,
    };
  },
});
</script>

<style>
.table {
  width: 100%;
  border: none;
  margin-bottom: 20px;
}
.table thead th {
  font-weight: bold;
  text-align: left;
  border: none;
  padding: 10px 15px;
  background: #d8d8d8;
  font-size: 14px;
}
.table thead tr th:first-child {
  border-radius: 8px 0 0 8px;
}
.table thead tr th:last-child {
  border-radius: 0 8px 8px 0;
}
.table tbody td {
  text-align: left;
  border: none;
  padding: 10px 15px;
  font-size: 14px;
  vertical-align: top;
}
.table tbody tr:nth-child(even) {
  background: #f3f3f3;
}
.table tbody tr td:first-child {
  border-radius: 8px 0 0 8px;
}
.table tbody tr td:last-child {
  border-radius: 0 8px 8px 0;
}</style>