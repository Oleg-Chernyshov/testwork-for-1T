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
        <tr v-for="res in responsible" :key="res.id">
          <td>{{ res.email.email }}</td>
          <td>{{ res.fullname.first_name }}</td>
          <td>{{ res.fullname.last_name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { defineComponent, computed, watch } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();

    store.dispatch("GET_RESPONSIBLES");
    const responsible = computed(() => store.getters.RESPONSIBLES);

  console.log(responsible);

    return {
      responsible,
    };
  },
});
</script>

<style></style>
