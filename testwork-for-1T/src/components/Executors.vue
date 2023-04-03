<template>
  <div>
    <h5>Исполнители</h5>
    <div v-for="executor in executors.values" :key="executor.id">
      {{ executor }}
    </div>
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

<style></style>
