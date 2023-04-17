<template>
  <div class="wrapper">
    <section class="get-in-touch">
      <h3 class="title">Обновить задачу</h3>
      <form class="contact-form row" @submit.prevent="updateTask($event)">
        <div class="form-field col-lg-6">
          <input
            v-model="form.name"
            name="name"
            id="name"
            class="input-text js-input"
            type="text"
          />
          <label class="label" for="name">Название</label>
        </div>
        <div class="form-field col-lg-6">
          <input
            v-model="form.description"
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
          <input name="" class="submit-btn" type="submit" value="Обновить" />
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
import { useQuery } from "@vue/apollo-composable";
import { updateUser, createRule, permissionRuleDelete } from "../api/main/mutations";
import { permissionTreeSubjects } from "src/api/main/queryes";
import { provideApolloClient } from "@vue/apollo-composable";
import { ApolloClient } from "@apollo/client/core";
import { useQuasar } from "quasar";
import { useStore } from "vuex";

export default defineComponent({
  props: {
    id: String,
    task: Object,
  },
  setup(props) {
    const $q = useQuasar();
    const store = useStore();

    const options = computed(() => store.getters.OPTIONS_EXECUTORS);
    const EXECUTORS = computed(() => store.getters.EXECUTORS);
    const MODULES = computed(() => store.getters.MODULES);
    const optionsModules = computed(() => store.getters.OPTIONS_MODULES);
    const module_index = computed(() => store.getters.MODULE_INDEX);

    const model = ref(null);
    const modelStatus = ref(null);
    const modelModule = ref(null);
    const indexExecutor = ref(0);
    const optionsStatus = ["Назначена", "Выполнена", "Завершена"];
    const statusId = ref("");
    
    const form = ref({
      name: props.task.name,
      description: props.task.property4,
      modelStatus: () => {
        let statusId = props.task.property5;
        if (statusId == "1700970386717883161") {
          modelStatus.value = "Назначена";
        } else if (statusId == "967659251654331262") {
          modelStatus.value = "Выполнена";
        } else {
          modelStatus.value = "Завершена";
        }
      },
    });

    statusId.value = props.task.property5;
    if (props.task.property5 == "1700970386717883161") {
      modelStatus.value = "Назначена";
    } else if (props.task.property5 == "967659251654331262") {
      modelStatus.value = "Выполнена";
    } else {
      modelStatus.value = "Завершена";
    }

    model.value =
      props.task.property6.fullname.first_name +
      " " +
      props.task.property6.fullname.last_name;
    indexExecutor.value = options.value.indexOf(model.value);
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
    const updateTask = function (e) {
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
          const { onResult } = useQuery(permissionTreeSubjects, {
              modelId: props.id,
              groupId: "8434793229479617275"
            })
          onResult((queryResult)=> {
            for(let subject of queryResult.data.permissionTreeSubjects.data){
              if(subject.level == 7){
                const { mutate } = useMutation(permissionRuleDelete, ()=>({
                   variables:{
                    "id": subject.permission_rule_id
                   }
                }))
                const response_3 = mutate()
                response_3
                .then(function(result){
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
                const response_2 = mutate()
                response_2
                .then(function (result){
                  $q.notify({
                    type: "positive",
                    message: "Модули обновлены",
                  });
                })
              })
             }
            } 
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
      updateTask,
      form,
    };
  },
});
</script>

<style></style>
