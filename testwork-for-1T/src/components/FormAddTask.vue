<template>
  <div class="wrapper">
    <section class="get-in-touch">
      <h3 class="title">Новая задача</h3>
      <form class="contact-form row" @submit.prevent="createNewTask">
        <div class="form-field col-lg-6">
          <input
            name="name"
            id="name"
            class="input-text js-input"
            type="text"
            required
          />
          <label class="label" for="name">Название</label>
        </div>
        <div class="form-field col-lg-6">
          <input
            name="description"
            id="description"
            class="input-text js-input"
            type="text"
            required
          />
          <label class="label" for="description">Описание</label>
        </div>
        <div class="form-field col-lg-6">
          <q-select
            v-model="modelStatus"
            :options="optionsStatus"
            label="Статус"
          />
        </div>
        <!-- <div class="form-field col-lg-6">
          <q-select
            v-model="modelModule"
            :options="optionsModules"
            label="Модуль"
          />
        </div> -->
        <div class="form-field col-lg-6">
          <q-select v-model="model" :options="options" label="Исполнитель" />
        </div>
        <div class="form-field col-lg-12 justify-between flex">
          <input
            name=""
            @click="refetchModulesSetTimeout"
            class="submit-btn"
            type="submit"
            value="Создать"
          />

          <q-btn color="primary" label="Отменить" v-close-popup />
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import { useMutation } from "@vue/apollo-composable";
import { defineComponent, ref, computed, watch } from "vue";
import { getClientOptions } from "src/apollo/index";
import { provideApolloClient } from "@vue/apollo-composable";
import { ApolloClient } from "@apollo/client/core";
import { useQuasar } from "quasar";
import { addNewTask } from "src/api/main/mutations";
import { useStore } from "vuex";

export default defineComponent({
  props: {
    idModule: Number,
  },

  setup(props) {
    const $q = useQuasar();
    const store = useStore();
    const model = ref(null);
    const modelStatus = ref(null);
    const modelModule = ref(null);
    const indexExecutor = ref(0);
    const indexModule = ref(0);
    const optionsStatus = ["Назначена", "Выполнена", "Завершена"];
    store.dispatch("GET_EXECUTORS");
    const executors = computed(() => store.getters.EXECUTORS);
    const MODULES = computed(() => store.getters.MODULES);
    const options = computed(() => store.getters.OPTIONS_EXECUTORS);
    const statusId = ref("");
    const refetchModules = store.getters.REFETCH_MODULES;
    console.log("ref1", refetchModules);

    const refetchModulesSetTimeout = function () {
      setTimeout(refetchModules, 1000);
    };

    watch(model, () => {
      indexExecutor.value = options.value.indexOf(model.value);
    });
    watch(modelModule, () => {
      indexModule.value = optionsModules.value.indexOf(modelModule.value);
    });
    watch(modelStatus, () => {
      if (modelStatus.value == "Назначена") {
        statusId.value = "1700970386717883161";
      } else if (modelStatus.value == "Выполнена") {
        statusId.value = "967659251654331262";
      } else {
        statusId.value = "1383309069201480491";
      }
    });

    const createNewTask = function (e) {
      console.log(MODULES.value[indexModule.value].id);
      const apolloClient = new ApolloClient(getClientOptions());
      provideApolloClient(apolloClient);
      const { mutate } = useMutation(addNewTask, () => ({
        variables: {
          input: {
            name: e.target.elements.name.value,
            property4: e.target.elements.description.value,
            property5: statusId.value,
            property6: {
              "2598174384277431501": executors.value[indexExecutor.value].id,
            },
            property8: {
              "2673961667589284866": MODULES.value[props.idModule].id,
            },
          },
        },
      }));
      const response = mutate();
      response
        .then(function (result) {
          console.log("createNewTask", result);
          $q.notify({
            type: "positive",
            message: "Задача добавлен",
          });
        })
        .catch((err) => {
          console.log("Ошибка", err);
          $q.notify({
            type: "negative",
            message: "Ошибка",
          });
        });
    };
    return {
      options,
      modelStatus,
      model,
      createNewTask,
      modelModule,
      optionsStatus,
      refetchModulesSetTimeout,
    };
  },
});
</script>

<style>

</style>
