<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Quasar App </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer class="q-pt-xl" v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-list bordered class="rounded-borders">
          <q-expansion-item
            to="/Team"
            expand-separator
            icon=""
            label="КОМАНДА"
            caption=""
            default-opened
          >
            <q-tabs align="left">
              <q-route-tab to="/Executors" label="Исполнители" />
            </q-tabs>

            <q-tabs align="left">
              <q-route-tab to="/Responsible" label="Ответственные" />
            </q-tabs>
          </q-expansion-item>

          <q-expansion-item
            to="/Modules"
            expand-separator
            icon=""
            label="МОДУЛИ"
            caption=""
            default-opened
            @click="get_module_index(-1)"
          >
            <q-tabs
              v-for="(module, index) in MODULES"
              :key="module.id"
              align="left"
              @click="get_module_index(index)"
            >
              <q-route-tab>{{ module.name }}</q-route-tab>
            </q-tabs>
          </q-expansion-item>
        </q-list>
      </q-list>
    </q-drawer>

    <q-page-container>
      <div v-if="isAdmin">It's admin!</div>
      <div v-else>It's user!</div>
      <router-view v-slot="{ Component }">
        <transition name="bounce">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, computed, reactive, watch } from "vue";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { useMutation } from "@vue/apollo-composable";
import { useStore } from "vuex";

export default defineComponent({
  name: "MainLayout",
  setup() {
    const leftDrawerOpen = ref(false);
    const authorId = ref("");
    const UserSignInId = ref("");
    const space = ref("");
    const store = useStore();
    const get_module_index = function (index) {
      store.commit("setModuleIndex", index);
    };

    store.dispatch("GET_MODULES");
    const MODULES = computed(() => store.getters.MODULES);

    const isAdmin = computed(() => {
      return authorId.value === UserSignInId.value;
    });

    //Получение всех страниц
    const { onResult } = useQuery(
      gql`
        query {
          pages(perPage: 10, page: 1) {
            data {
              id
              parent_id
              page_type
              title
              content
              icon
              level
              is_public
              is_block
              position
              config
              created_at
              updated_at
              object {
                id
                type_id
              }
            }
            paginatorInfo {
              perPage
              count
              total
              currentPage
              from
              to
              lastPage
              hasMorePages
            }
          }
        }
      `
    );
    onResult((queryResult) => {
      console.log(queryResult.data.pages.data);
    });

    //Получение всех типов
    {
      const { onResult } = useQuery(
        gql`
          {
            types(perPage: 10, page: 1) {
              data {
                id
                name
                label
                description
                system
                searchable
                id_ai
                author_id
                meta {
                  headline
                  icon
                }
                created_at
                updated_at
                properties {
                  id
                  name
                  data_type
                  label
                }
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
        console.log(queryResult.data);
      });
    }

    // {
    //   const { onResult } = useQuery(
    //     gql`
    //       query {
    //         space(id: "727") {
    //           id
    //           author_id
    //           name
    //           description
    //           config
    //           created_at
    //           updated_at
    //         }
    //       }
    //     `
    //   );
    //   onResult((queryResult) => {
    //     space.value = "&space=" + queryResult.data.space.id;
    //     authorId.value = queryResult.data.space.author_id;
    //     console.log("space: ", space.value);
    //     console.log("authorId: ", authorId.value);
    //   });
    // }

    // {
    //   const { mutate } = useMutation(
    //     gql`
    //       mutation UserSignIn($input: UserSignInInput!) {
    //         userSignIn(input: $input) {
    //           recordId
    //           record {
    //             token_type
    //             expires_in
    //             access_token
    //             refresh_token
    //           }
    //           status
    //         }
    //       }
    //     `,
    //     () => ({
    //       variables: {
    //         input: {
    //           // login: "korolevidmitriy@mail.ru",
    //           // password: "qwerty1234",
    //           // login: "dkorolyov631@mail.ru",
    //           // password: "fdcsasalgqe",
    //           login: "dmitrij.korolyov.0303@mail.ru",
    //           password: "qwerty123",
    //         },
    //       },
    //     })
    //   );
    //   const response = mutate();
    //   response.then(function (result) {
    //     sessionStorage.setItem(
    //       "token",
    //       result.data.userSignIn.record.access_token + space.value
    //     );
    //     UserSignInId.value = result.data.userSignIn.recordId;
    //     console.log(
    //       "token: ",
    //       result.data.userSignIn.record.access_token + space.value
    //     );
    //     console.log("UserSignInId: ", UserSignInId.value);
    //   });
    // }

    return {
      isAdmin,
      leftDrawerOpen,
      get_module_index,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      MODULES,
    };
  },
});
</script>

<style lang="scss">
.q-tabs__content {
  width: 100% !important;
  text-align: left !important;
}
</style>
