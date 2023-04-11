<template>
  <div class="wrapper">
    <section class="get-in-touch">
      <h3 class="title">Обновить задачу</h3>
      <form
        class="contact-form row"
        @submit.prevent="updateTask($event, funSubmit)"
      >
        <div class="form-field col-lg-6">
          <input
            name="name"
            id="name"
            class="input-text js-input"
            type="text"
          />
          <label class="label" for="name">Название</label>
        </div>
        <div class="form-field col-lg-6">
          <input
            name="description"
            id="description"
            class="input-text js-input"
            type="text"
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
        <div class="form-field col-lg-6">
          <q-select v-model="model" :options="options" label="Исполнитель" />
        </div>
        <div class="form-field col-lg-12 justify-between flex">
          <input
            name=""
            @click="funSubmit = false"
            class="submit-btn"
            type="submit"
            value="Создать"
          />
          <q-btn
            type="submit"
            @click="funSubmit = true"
            color="primary"
            label="Текущие данные"
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
import { updateUser, createRule } from "../api/main/mutations";
import { provideApolloClient } from "@vue/apollo-composable";
import { ApolloClient } from "@apollo/client/core";
import { useQuasar } from "quasar";
import { useStore } from "vuex";
import { response } from "../functions/functions";

export default defineComponent({
  props: {
    id: String,
    task: Object,
  },
  setup(props) {
    const $q = useQuasar();
    const store = useStore();
    store.dispatch("GET_EXECUTORS");
    const options = computed(() => store.getters.OPTIONS_EXECUTORS);
    const model = ref(null);
    const modelStatus = ref(null);
    const modelModule = ref(null);
    const indexExecutor = ref(0);
    const optionsStatus = ["Назначена", "Выполнена", "Завершена"];
    const EXECUTORS = computed(() => store.getters.EXECUTORS);
    const refetchModules = store.getters.REFETCH_MODULES;
    store.dispatch("GET_MODULES");
    const MODULES = computed(() => store.getters.MODULES);
    const statusId = ref("");
    const optionsModules = computed(() => store.getters.OPTIONS_MODULES);
    const module_index = computed(() => store.getters.MODULE_INDEX);
    let funSubmit = false;

    watch(model, () => {
      indexExecutor.value = options.value.indexOf(model.value);
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

    const updateTask = function (e, num) {
      if (num) {
        funSubmit = false;
        e.target.elements.name.value = props.task.name;
        e.target.elements.description.value = props.task.property4;
        let statusId = props.task.property5;
        if (statusId == "1700970386717883161") {
          modelStatus.value = "Назначена";
        } else if (statusId == "967659251654331262") {
          modelStatus.value = "Выполнена";
        } else {
          modelStatus.value = "Завершена";
        }
        model.value =
          props.task.property6.fullname.first_name +
          " " +
          props.task.property6.fullname.last_name;
        return funSubmit;
      }
      const apolloClient = new ApolloClient(getClientOptions());
      provideApolloClient(apolloClient);
      const { mutate } = useMutation(updateUser, () => ({
        variables: {
          input: {
            name: e.target.elements.name.value,
            property4: e.target.elements.description.value,
            property5: statusId.value,
            property6: {
              "2598174384277431501": EXECUTORS.value[indexExecutor.value].id,
            },
            property8: {
              "2673961667589284866": MODULES.value[module_index.value].id,
            },
          },
          id: props.id,
        },
      }));
      const response = mutate();
      response
        .then(function (result) {
          console.log(result);
          const { mutate } = useMutation(createRule, ()=>({
            variables:{
                input: {
                  model_type: "object",
                  model_id: props.id,
                  owner_type: "subject",
                  owner_id: EXECUTORS.value[indexExecutor.value].id,
                  level: 7
                }
              }
          }))
          console.log(1);
          const response_2 = mutate()
          response_2
          .then(function (result){
            console.log(result);

            $q.notify({
              type: "positive",
              message: "Модули обновлены",
            });
          })
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
      modelModule,
      optionsModules,
      optionsStatus,
      funSubmit,
      updateTask,
    };
  },
});
</script>

<style></style>
