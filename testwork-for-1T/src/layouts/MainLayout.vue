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
              indicator-color="transparent"
              v-for="(mod, index) in MODULES"
              :key="mod.id"
              align="left"
              @click="get_module_index(index)"
            >
              <q-route-tab to="/Modules">
                <div>{{ mod.name }}</div>
              </q-route-tab>
            </q-tabs>
          </q-expansion-item>

          <q-expansion-item
            to="/AllTasks"
            expand-separator
            icon=""
            label="ЗАДАЧИ"
            caption=""
            default-opened
          >
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
import { GetAllPages, GetAllTypes } from "src/api/main/queryes";
import { useStore } from "vuex";

export default defineComponent({
  name: "MainLayout",
  setup() {
    const leftDrawerOpen = ref(false);
    const authorId = ref("");
    const UserSignInId = ref("");
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

    return {
      isAdmin,
      leftDrawerOpen,
      tab: "mail",
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
