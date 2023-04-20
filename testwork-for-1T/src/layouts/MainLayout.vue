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
      <div class="q-pa-md q-gutter-sm">
        <q-tree :nodes="customize" node-key="label" default-expand-all>
          <template v-slot:default-header="prop">
            <div class="row items-center">
              <q-icon
                :name="prop.node.icon || 'share'"
                color="orange"
                size="28px"
                class="q-mr-sm"
              />
              <div
                @click="clickOnTreeElem(prop.node)"
                class="text-weight-bold text-primary cursor-pointer"
              >
                {{ prop.node.label }}
              </div>
            </div>
          </template>
        </q-tree>
      </div>
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
import { defineComponent, ref, computed, onMounted, watch } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { GetAllPages } from "src/api/main/queryes";
import { useStore } from "vuex";
import { GetGroupById, rootPages } from "src/api/main/queryes";
import { getClientOptions } from "src/apollo/index";
import { provideApolloClient } from "@vue/apollo-composable";
import { ApolloClient } from "@apollo/client/core";
import { useRouter, useRoute } from "vue-router";

import stompApi from "src/rabbitmq/connect";
export default defineComponent({
  name: "MainLayout",
  setup() {
    const leftDrawerOpen = ref(false);
    const role = ref("");
    const store = useStore();
    const namesOfPages = ref([]);
    const namesOfPages2 = ref({});
    const set_module_index = function (index) {
      store.commit("setModuleIndex", index);
    };
    const MODULES = computed(() => store.getters.MODULES);
    console.log(MODULES.value);
    const router = useRouter();

    const clickOnTreeElem = (el) => {
      console.log(el);
      let rout = "";

      el.label == "Команда"
        ? (rout = "/Team")
        : el.label == "Модули"
        ? (rout = "/Modules")
        : el.label == "Мои задачи"
        ? (rout = "/AllTasks")
        : el.label == "Исполнители"
        ? (rout = "/Executors")
        : el.label == "Ответственные"
        ? (rout = "/Responsible")
        : el.label == "Исключенные"
        ? (rout = "/Excluded")
        : "";
      if (el.parent == "Модуль") {
        store.commit("setModuleIndex", el.index);
        rout = "/ModulesTasks";
      }
      console.log(rout);
      router.push(rout);
    };

    onMounted(() => {
      store.dispatch("GET_RESPONSIBLES");
      store.dispatch("GET_EXECUTORS");
      store.dispatch("GET_MODULES");
      store.dispatch("GET_ALL_TASKS");
      stompApi.queueCreate().then((result) => {});
      stompApi.stompConnect(store);
    });
    {
      const { onResult } = useQuery(GetAllPages);
      onResult((result) => {
        result.data.pages.data.forEach((item) => {
          namesOfPages.value.push(item.title);
          namesOfPages2.value[item.title] = item.title;
        });
      });
    }

    {
      let email = sessionStorage.getItem("email");
      const { onResult } = useQuery(GetGroupById, {
        id: "3662509860808044515",
      });
      onResult((queryResult) => {
        let flag = 1;
        for (let subject of queryResult.data.get_group.subject) {
          if (subject.email.email == email) {
            sessionStorage.setItem("role", "Ответсвенный");
            role.value = "Ответсвенный";
            flag = 0;
            console.log(1);
            break;
          }
        }
        if (flag) {
          const apolloClient = new ApolloClient(getClientOptions());
          provideApolloClient(apolloClient);

          const { onResult } = useQuery(GetGroupById, {
            id: "4428325871296613250",
          });

          onResult((queryResult) => {
            for (let subject of queryResult.data.get_group.subject) {
              if (subject.email.email == email) {
                sessionStorage.setItem("role", "Исполнитель");
                role.value = "Исполнитель";
                flag = 0;
                break;
              }
            }
            if (flag) {
              console.log(1);
              sessionStorage.setItem("role", "Владелец");
              role.value = "Владелец";
            }
          });
        }
      });
    }

    {
    }
    const customize = ref([]);

    {
      const { onResult } = useQuery(rootPages);
      onResult((result) => {
        result.data.rootPages.data.forEach((page) => {
          let children = [];
          let childrenPage = page.children.data;

          childrenPage.forEach((child) => {
            children.push({
              label: child.title,
              header: "root",
            });
          });

          if (page.title == "Модули") {
            children = [];
            console.log("MODULES.value", MODULES.value);
            MODULES.value.forEach((mod) => {
              console.log(mod);
              children.push({
                label: mod.name,
                header: "generic",
              });
            });
          }

          customize.value.push({
            label: page.title,
            header: "generic",
            children: children,
            child: page.children.data,
          });
        });
        console.log("result.data.pages.data", result.data.rootPages.data);
        console.log(customize.value);
      });
    }

    watch(MODULES, () => {
      console.log("customize", customize.value);
      let children = [];
      let order = 0;
      MODULES.value.forEach((mod) => {
        children.push({
          label: mod.name,
          header: "generic",
          parent: "Модуль",
          index: order,
        });
        order++;
      });
      customize.value.forEach((page, index) => {
        page.label == "Модули"
          ? (customize.value[index].children = children)
          : "";
      });
      // if (customize.value[1]) {
      //   customize.value[1].children = children;
      // }
    });

    return {
      role,
      leftDrawerOpen,
      namesOfPages2,
      tab: "mail",
      namesOfPages,
      set_module_index,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      MODULES,
      customize,
      clickOnTreeElem,
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
