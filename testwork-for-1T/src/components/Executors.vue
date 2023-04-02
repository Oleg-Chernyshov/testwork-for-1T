<template>
  <div>
    <h5>Исполнители</h5>
    <div v-for="executor in executors.values" :key="executor.id">
      {{ executor }}
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, reactive } from "vue";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { useMutation } from "@vue/apollo-composable";

export default defineComponent({
  setup(props, { emit }) {
    const executors = reactive([]);
    const { onResult } = useQuery(
      gql`
        query {
          get_group(id: "6271877799003044991") {
            name
            subject {
              id
              type_id
              email {
                email
              }
              fullname {
                first_name
                last_name
              }
            }
          }
        }
      `
    );
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
