<template>
  <div>Ответственные</div>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { useMutation } from "@vue/apollo-composable";

export default {
  setup(props, { emit }) {
    //  const { onResult } = useQuery(
    //    gql`
    //      query {
    //        get_group(id: "6271877799003044991") {
    //          id
    //          type_id
    //          level
    //          author_id
    //          name
    //          subject {
    //            id
    //            type_id
    //            fullname {
    //              first_name
    //              last_name
    //            }
    //          }
    //        }
    //      }
    //    `
    //  );
    //  onResult((queryResult) => {});

    return {};
  },
};
</script>

<style></style>
