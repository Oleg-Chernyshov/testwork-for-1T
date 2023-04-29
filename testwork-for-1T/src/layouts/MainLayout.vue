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
            v-if="role === 'Владелец'"
            to="/Team"
            expand-separator
            icon=""
            :label="`${namesOfPages[0]}`"
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
            v-if="role === 'Владелец'"
            to="/Deleted"
            expand-separator
            icon=""
            :label="`${namesOfPages[1]}`"
            caption=""
            default-opened
          >
            <q-tabs align="left">
              <q-route-tab to="/Excluded" :label="`${namesOfPages[1]}`" />
            </q-tabs>
          </q-expansion-item>

          <q-expansion-item
            v-if="role == 'Ответсвенный' || role == 'Владелец'"
            to="/Modules"
            expand-separator
            icon=""
            :label="
              role === 'Владелец' ? `${namesOfPages[3]}` : `${namesOfPages[2]}`
            "
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
            v-if="role == 'Исполнитель' || role == 'Владелец'"
            to="/AllTasks"
            expand-separator
            icon=""
            :label="
              role === 'Владелец' ? `${namesOfPages[2]}` : `${namesOfPages[0]}`
            "
            caption=""
          >
          </q-expansion-item>

          <q-expansion-item
            expand-separator
            icon=""
            label="Лендинг"
            caption=""
            default-opened
          >
            <q-tabs
              indicator-color="transparent"
              v-for="(doc, index) in FILES"
              :key="doc.id"
              align="left"
            >
              <q-route-tab
                :to="{
                  name: 'Document',
                  params: { id: `${index}` },
                }"
              >
                <div class="item_doc">
                  <span>{{ doc.name.slice(0, -5) }}</span>
                  <span clickable @click="menuDoc">⋮</span>
                  <q-menu class="popup" anchor="bottom right" self="top left">
                    <q-item class="popup-component" clickable>
                      <q-item-section>Открыть</q-item-section>
                    </q-item>
                    <q-item class="popup-component" clickable>
                      <q-item-section>Дублировать</q-item-section>
                    </q-item>
                    <q-item class="popup-component" clickable>
                      <q-item-section @click="showDialog = true">Удалить</q-item-section>
                    </q-item>
          
                    <q-dialog v-model="showDialog">
                      <q-card>
                        <q-card-section>
                          <div class="text-h6">Удаление файла</div>
                        </q-card-section>

                        <q-card-section class="q-pt-none">
                          Вы уверены, что хотите удалить этот файл? Отменить это действие будет невозможно
                        </q-card-section>

                        <q-card-actions align="right">
                          <q-btn label="Да" @click="deleteDoc(doc.id), showDialog = false" />
                          <q-btn label="Нет" @click="showDialog = false" />
                        </q-card-actions>
                      </q-card>
                    </q-dialog>

                    <q-item class="popup-component" clickable>
                      <q-item-section>Права доступа</q-item-section>
                    </q-item>
                    <q-item class="popup-component" clickable>
                      <q-item-section>Переименовать</q-item-section>
                      <q-popup-edit
                        v-model="doc.name"
                        :validate="(val) => val.length > 5"
                        v-slot="scope"
                      >
                        <q-input
                          v-model="scope.value"
                          :model-value="scope.value"
                          hint="Set document name"
                          :rules="[
                            (val) =>
                              scope.validate(val) ||
                              'More than 5 chars required',
                          ]"
                        >
                          <template v-slot:after>
                            <q-btn
                              flat
                              dense
                              color="negative"
                              icon="cancel"
                              @click.stop.prevent="scope.cancel"
                            />

                            <q-btn
                              flat
                              dense
                              color="positive"
                              icon="check_circle"
                              @click.stop.prevent="
                                renameDocument(scope.value, doc)
                              "
                              :disable="
                                scope.validate(scope.value) === false ||
                                scope.initialValue === scope.value
                              "
                            />
                          </template>
                        </q-input>
                      </q-popup-edit>
                    </q-item>
                  </q-menu>
                </div>
              </q-route-tab>
            </q-tabs>
          </q-expansion-item>
        </q-list>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition name="bounce">
          <keep-alive exclude="Document">
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
import { deleteDocument, fileUpdate, fileDelete } from "src/api/main/mutations";
import { ApolloClient } from "@apollo/client/core";
import { provideApolloClient } from "@vue/apollo-composable";
import { getClientOptions } from "src/apollo/index";
import { useMutation } from "@vue/apollo-composable";
import { response } from "../functions/functions";
import { useQuasar } from "quasar";

import stompApi from "src/rabbitmq/connect";
import { getCurrentInstance } from "vue";

export default defineComponent({
  name: "MainLayout",
  setup() {
    const leftDrawerOpen = ref(false);
    let showDialog = ref(false);
    const role = computed(() => sessionStorage.getItem("role"));
    const store = useStore();
    const namesOfPages = ref([]);
    const MODULES = computed(() => store.getters.MODULES);
    const DOCUMENTS = computed(() => store.getters.DOCUMENTS);
    const FILES = computed(() => store.getters.FILES);
    const $q = useQuasar();
    const get_module_index = function (index) {
      store.commit("setModuleIndex", index);
    };

    watch(DOCUMENTS, () => {
      console.log("DOCUMENTS", DOCUMENTS.value);
    });

    watch(FILES, () => {
      console.log("FILES", FILES.value);
    });

    onMounted(() => {
      store.dispatch("GET_RESPONSIBLES");
      store.dispatch("GET_EXECUTORS");
      store.dispatch("GET_MODULES");
      store.dispatch("GET_ALL_TASKS");
      store.dispatch("GET_DOCUMENTS");
      store.dispatch("GET_FILES");

      stompApi.queueCreate();
      stompApi.stompConnect(store);
    });

    const renameDocument = (scope, doc) => {
      console.log(scope);
      console.log(doc);
      console.log();
      const { mutate } = useMutation(fileUpdate, () => ({
        variables: {
          input: {
            title: scope,
            path: doc.path,
            size: doc.size,
            name: scope,
            short_link: doc.short_link,
            extension: doc.extension,
            disk: doc.disk,
            hash: doc.hash,
          },
          id: doc.id,
        },
      }));
      mutate();
    };

    const deleteDoc = function (id) {
      const apolloClient = new ApolloClient(getClientOptions());
      provideApolloClient(apolloClient);
      const { mutate } = useMutation(fileDelete, () => ({
        variables: {
          id: id,
        },
      }));

      response("Документ удален", "Ошибка", mutate, $q);
    };

    return {
      renameDocument,
      role,
      leftDrawerOpen,
      tab: "mail",
      namesOfPages,
      get_module_index,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      MODULES,
      DOCUMENTS,
      deleteDoc,
      showDialog,
      FILES,
    };
  },
});
</script>

<style lang="scss">
.q-tab__content {
  width: 100%;
}

.item_doc {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.q-tabs__content {
  width: 100% !important;
  text-align: left !important;
}

.link {
  color: white;
  text-decoration: none;
}

.popup {
  width: 290px;
  height: 291px;
  padding: 8px 0px 20px;
  gap: 16px;
  border: 1px solid #bbbbbb;
  box-shadow: 0px 0px 45px rgba(0, 0, 0, 0.06);
  border-radius: 12px;
}

.popup-component {
  align-items: center;
  padding: 10px 29px 10px 20px;
  gap: 18px;

  height: 40px;
}
</style>
