<template>
  <div class="wrapper">
    <section class="get-in-touch">
      <h3 class="title">Новая задача</h3>
      <q-form class="contact-form row flex-center" @submit.prevent="createNewTask">
        
          <q-input
            outlined
            v-model="nameValue"
            name="name"
            label="Имя"
            id="name"
            type="text"
            class="col-11 q-mb-sm"
            required
          />
          
          <q-input
            outlined
            v-model="descriptionValue"
            name="description"
            id="description"
            type="text"
            label="Описание"
            class="col-11 q-mb-sm"
            required
          />
            
          <q-select
            outlined
            v-model="modelStatus"
            :options="optionsStatus"
            label="Статус"
            class="col-11 q-mb-sm"
          />
        
          <q-select outlined v-model="model" :options="options" label="Исполнитель" class="col-11 q-mb-sm" />
       
        <div class="form-field col-lg-12 justify-between flex">
          <q-btn color="green" type="submit" label="Создать" />
          <q-btn color="primary" label="Отменить" v-close-popup />
        </div>

      </q-form>
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
import { addNewTask, createRule } from "src/api/main/mutations";
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
    const statusId = ref("");

    const descriptionValue = ref("");
    const nameValue = ref("");
    
    const executors = computed(() => store.getters.EXECUTORS);
    const MODULES = computed(() => store.getters.MODULES);
    const options = computed(() => store.getters.OPTIONS_EXECUTORS);

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
      const apolloClient = new ApolloClient(getClientOptions());
      provideApolloClient(apolloClient);
      console.log(executors.value[indexExecutor.value].id);
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
      response.then(function (result) {
        const { mutate } = useMutation(createRule, () => ({
        variables: {
          input: {
            model_type: "object",
            model_id: result.data.create_type2.recordId,
            owner_type: "subject",
            owner_id: executors.value[indexExecutor.value].id,
            level: 7,
          },
        },
      }));
      const response_2 = mutate();
      response_2
      .then(function (result) {
        $q.notify({
          type: "positive",
          message: "Модуль добавлен",
        });
      })
      .catch((err) => {
        console.log("Ошибка", err);
          $q.notify({
              type: "negative",
              message: "Ошибка",
            });
          });
        });
        e.target.elements.name.value = "";
        e.target.elements.description.value = "";
      };
      return {
        descriptionValue,
        nameValue,
        options,
        modelStatus,
        model,
        createNewTask,
        modelModule,
        optionsStatus,
      };
    },
  });
</script>