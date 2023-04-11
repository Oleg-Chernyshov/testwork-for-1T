<template>
  <div class="q-pa-md">
    <h5>Исполнители</h5>
    <table class="table">
      <thead>
        <th>Почта</th>
        <th>Имя</th>
        <th>Фамилия</th>
      </thead>
      <tbody>
        <tr v-for="executor in executors" :key="executor.id">
          <td>{{ executor.email.email }}</td>
          <td>{{ executor.fullname.first_name }}</td>
          <td>{{ executor.fullname.last_name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();

    store.dispatch("GET_RESPONSIBLES");
    const executors = computed(() => store.getters.EXECUTORS);

    return {
      executors,
    };
  },
});
</script>

<style>

</style>
