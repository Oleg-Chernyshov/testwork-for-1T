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
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { useMutation } from "@vue/apollo-composable";

export default {
  setup(props, { emit }) {
    const responsible = reactive([]);

    const { onResult } = useQuery(
      gql`
        query {
          get_group(id: "1358489619049103837") {
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
      responsible.values = queryResult.data.get_group.subject;
    });

    return {
      responsible,
    };
  },
};
</script>

<style></style>
