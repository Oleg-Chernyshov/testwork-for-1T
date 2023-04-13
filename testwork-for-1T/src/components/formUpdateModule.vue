<template>
  <div class="wrapper">
    
    <section class="get-in-touch">
      <h3 class="title">Редактирование модуля</h3>
      <form
        class="contact-form row"
        insertCurrentData
        @submit.prevent="UpdateModule($event)"
      >
        <div class="form-field col-lg-6">
          <input
            name="name"
            id="name"
            class="input-text js-input"
            type="text"
            v-model="form.name"
          />
          <label class="label" for="name">Название</label>
        </div>
        <div class="form-field col-lg-6">
          <input
            name="startData"
            id="startData"
            class="input-text js-input"
            type="text"
            v-model="form.startData"
          />
          <label class="label" for="startData">Дата начала</label>
        </div>
        <div class="form-field col-lg-6">
          <input
            name="startTime"
            id="startTime"
            class="input-text js-input"
            type="text"
            v-model="form.startTime"
          />
          <label class="label" for="startTime">Время начала</label>
        </div>
        <div class="form-field col-lg-6">
          <input
            name="endData"
            id="endData"
            class="input-text js-input"
            type="text"
            v-model="form.endData"
          />
          <label class="label" for="endData">Дата окончания</label>
        </div>
        <div class="form-field col-lg-6">
          <input
            name="endTime"
            id="endTime"
            class="input-text js-input"
            type="text"
            v-model="form.endTime"
          />
          <label class="label" for="endTime">Время окончания</label>
        </div>
        <div class="form-field col-lg-6">
          <q-select v-model="model" :options="options" label="Ответсвенный" />
        </div>
        <div class="form-field col-lg-12 justify-between flex">
          <input name="" class="submit-btn" type="submit" value="Создать" />
          <q-btn color="primary" label="Отменить" v-close-popup />
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import { useMutation, useQuery } from "@vue/apollo-composable";
import { defineComponent, ref, computed, watch } from "vue";
import { getClientOptions } from "src/apollo/index";
import { provideApolloClient } from "@vue/apollo-composable";
import { ApolloClient } from "@apollo/client/core";
import { useQuasar } from "quasar";
import { updateModule, createRule, permissionRuleDelete } from "../api/main/mutations";
import { permissionTreeSubjects } from "src/api/main/queryes";
import { useStore } from "vuex";

export default defineComponent({
  props: {
    idUpdateModule: String,
    mod: Object,
  },
  setup(props) {
    const $q = useQuasar();
    const store = useStore();
    const model = ref(null);
    const indexResponsible = ref(0);
    const form = ref({
      name: props.mod.name,
      startData: props.mod.property2?.date,
      startTime: props.mod.property2?.time,
      endData: props.mod.property3?.date,
      endTime: props.mod.property3?.time,
    });
    store.dispatch("GET_RESPONSIBLES");
    const options = computed(() => store.getters.OPTIONS_RESPONSIBLES);

    watch(options, () => {
      console.log(options.value);
    });

    const responsible = computed(() => store.getters.RESPONSIBLES);
    const refetchModules = computed(() => store.getters.REFETCH_MODULES);

    watch(model, () => {
      indexResponsible.value = options.value.indexOf(model.value);
    });
    
    const UpdateModule = function (e, num) {
      if (num) {
        funSubmit = false;
        e.target.elements.name.value = props.mod.name;
        e.target.elements.startData.value = props.mod.property2?.date;
        e.target.elements.startTime.value = props.mod.property2?.time;
        e.target.elements.endData.value = props.mod.property3?.date;
        e.target.elements.endTime.value = props.mod.property3?.time;
        return funSubmit;
      }

      const apolloClient = new ApolloClient(getClientOptions());
      provideApolloClient(apolloClient);
      const { mutate } = useMutation(updateModule, () => ({
        variables: {
          input: {
            name: e.target.elements.name.value,
            property2: {
              date: e.target.elements.startData.value,
              time: e.target.elements.startTime.value,
            },
            property3: {
              date: e.target.elements.endData.value,
              time: e.target.elements.endTime.value,
            },
            property7: {
              "2598174384277431501":
                responsible.value[indexResponsible.value].id,
            },
          },
          id: props.idUpdateModule,
        },
      }));
      const response = mutate();
      response
        .then(function (result) {
          console.log(result);
          const { onResult } = useQuery(permissionTreeSubjects, {
              modelId: props.idUpdateModule,
              groupId: "1305438642755218144"
            })
          onResult((queryResult)=> {
            for(let subject of queryResult.data.permissionTreeSubjects.data){
              if(subject.level == 7){
                console.log(subject);
                const { mutate } = useMutation(permissionRuleDelete, ()=>({
                   variables:{
                    "id": subject.permission_rule_id
                   }
                }))
                const response_3 = mutate()
                response_3
                  .then(function(result){
                    console.log(result);
                  })
              }
            }
            const { mutate } = useMutation(createRule, ()=>({
            variables:{
              input: {
                model_type: "object",
                model_id: props.idUpdateModule,
                owner_type: "subject",
                owner_id: responsible.value[indexResponsible.value].id,
                level: 7
              }
            }
            }))
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
      UpdateModule,
      options,
      model,
      refetchModules,
      form,
    };
  },
});
</script>

<style></style>
