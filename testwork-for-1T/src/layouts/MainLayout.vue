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
          <q-expansion-item v-if="role === 'Владелец' "
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
          <q-expansion-item v-if="role === 'Владелец'"
            to="/Deleted"
            expand-separator
            icon=""
            label="ИСКЛЮЧЕННЫЕ"
            caption=""
            default-opened
          >
            <q-tabs align="left">
              <q-route-tab to="/Deleted" label="Исключенные" />
            </q-tabs>
          </q-expansion-item>
          <q-expansion-item v-if="role == 'Ответсвенный' || role == 'Владелец'"
            to="/Modules"
            expand-separator
            icon=""
            label="МОДУЛИ"
            caption=""
            default-opened
            @click="get_module_index(-1)"
          >
            <q-tabs
              v-for="(mod, index) in MODULES"
              :key="mod.id"
              align="left"
              @click="get_module_index(index)"
            >
              <q-route-tab>{{ mod.name }}</q-route-tab>
            </q-tabs>
          </q-expansion-item>

          <q-expansion-item v-if="role == 'Исполнитель' || role == 'Владелец'"
            to="/AllTasks"
            expand-separator
            icon=""
            label="ЗАДАЧИ"
            caption=""
          >
          </q-expansion-item>
        </q-list>
      </q-list>
    </q-drawer>

    <q-page-container>
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
import { defineComponent, ref, computed } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { GetAllPages, GetAllTypes } from "src/api/main/queryes";
import { useStore } from "vuex";
import { GetGroupById } from "src/api/main/queryes";


import { getClientOptions } from "src/apollo/index";
import { provideApolloClient } from "@vue/apollo-composable";
import { ApolloClient } from "@apollo/client/core";
export default defineComponent({
  name: "MainLayout",
  setup() {
    const leftDrawerOpen = ref(false);
    const role = ref("")
    const store = useStore();
    const get_module_index = function (index) {
      store.commit("setModuleIndex", index);
    };

    store.dispatch("GET_MODULES");
    const MODULES = computed(() => store.getters.MODULES);


    //Получение всех страниц
    const { onResult } = useQuery(GetAllPages);
    onResult((queryResult) => {
      console.log("Pages", queryResult.data.pages.data);
    });

    //Получение всех типов
    {
      const { onResult } = useQuery(GetAllTypes);
      onResult((queryResult) => {
        console.log(queryResult.data);
      });
    }

    {
      let email = sessionStorage.getItem('email')
      const { onResult, refetch } = useQuery(GetGroupById, {
        id: "3662509860808044515",
      });
      onResult((queryResult) => {
        let responsibles = []
        let flag = 1
        responsibles = queryResult.data.get_group.subject
        for (let subject of responsibles) {
          if (subject.email.email == email){
              sessionStorage.setItem(
                "role",
                "Ответсвенный"
              )
              role.value = "Ответсвенный"
              flag = 0
              break
            }
          }
          if(flag){
            const apolloClient = new ApolloClient(getClientOptions());
            provideApolloClient(apolloClient);

            const { onResult, refetch } = useQuery(GetGroupById, {
              id: "4428325871296613250",
            });

            onResult((queryResult) => {
            responsibles = []
            responsibles = queryResult.data.get_group.subject
            for (let subject of responsibles) {
              if (subject.email.email == email){
                sessionStorage.setItem(
                  "role",
                  "Исполнитель"
                 )
                 role.value = "Исполнитель"
                }
              }
              if(flag){
                sessionStorage.setItem(
                  "role",
                  "Владелец"
                 )
                 role.value = "Владелец"
              }
            });
          }
      });
    }

    {
    
    }
      

    return {
      role,
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
.link {
  color: white;
  text-decoration: none;
}
</style>
