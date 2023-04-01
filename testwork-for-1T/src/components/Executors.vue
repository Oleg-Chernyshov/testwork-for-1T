<template>
  <div>Исполнители</div>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { useMutation } from "@vue/apollo-composable";

export default defineComponent({
  setup(props, { emit }) {
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
      console.log("execute", queryResult);
    });

    return {};
  },
});
</script>

<style></style>
