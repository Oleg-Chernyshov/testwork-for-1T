<template>
  <div>
    <h5>Ответственные</h5>
    <div v-for="res in responsible.values" :key="res.id">
      {{ res }}
    </div>
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
