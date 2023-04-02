<template>
  <div>
    <h5>Modules</h5>
    <div v-for="module in MODULES.values" :key="module.id">
      {{ module.name }}
    </div>
  </div>
</template>

<script>
import { useMutation } from "@vue/apollo-composable";
import { defineComponent, ref, computed, reactive } from "vue";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { getClientOptions } from "src/apollo/index";
import { provideApolloClient } from "@vue/apollo-composable";
import { ApolloClient } from "@apollo/client/core";
import { useQuasar } from "quasar";

export default {
  components: {},

  setup() {
    const MODULES = reactive([]);

    //Получение всех модулей
    {
      const { onResult } = useQuery(
        gql`
          {
            paginate_type1(page: 1, perPage: 100) {
              data {
                id
                type_id
                author_id
                level
                position
                created_at
                updated_at
                name
              }
              paginatorInfo {
                perPage
                currentPage
                lastPage
                total
                count
                from
                to
                hasMorePages
              }
            }
          }
        `
      );
      onResult((queryResult) => {
        MODULES.values = queryResult.data["paginate_type1"].data;
        console.log("MODULES", MODULES.values);
      });
    }
    return {
      MODULES,
    };
  },
};
</script>

<style lang="scss"></style>
