<template>
  <div class="wrapper">
    <section class="get-in-touch">
      <h3 class="title">Редактирование модуля</h3>
      <q-form @submit.prevent="UpdateModule($event)">
        <div class="q-gutter-md">
          <q-input outlined v-model="form.name" label="Название" />
          <q-input outlined v-model="form.startData" label="Дата начала" />
          <q-input outlined v-model="form.startTime" label="Время начала" />
          <q-input outlined v-model="form.endData" label="Дата окончания" />
          <q-input outlined v-model="form.endTime" label="Время окончания" />
          <q-select outlined v-model="model" :options="options" label="Ответсвенный" />
          <div class="row justify-between">
            <q-btn type="submit" color="primary" label="Обновить" />
            <q-btn color="primary" label="Отменить" v-close-popup />
          </div>
        </div>
      </q-form>
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
    
    model.value =
      props.mod.property7.fullname.first_name +
      " " +
      props.mod.property7.fullname.last_name;
    
    const options = computed(() => store.getters.OPTIONS_RESPONSIBLES);
    const flag = options.value.indexOf(model.value);

    indexResponsible.value = options.value.indexOf(model.value);
    const responsible = computed(() => store.getters.RESPONSIBLES);

    watch(model, () => {
      indexResponsible.value = options.value.indexOf(model.value);
    });

    const UpdateModule = function (e) {
      console.log(e.target[0].value);
      const apolloClient = new ApolloClient(getClientOptions());
      provideApolloClient(apolloClient);
      const { mutate } = useMutation(updateModule, () => ({
        variables: {
          input: {
            name: e.target[0].value,
            property2: {
              date: e.target[1].value,
              time: e.target[2].value,
            },
            property3: {
              date: e.target[3].value,
              time: e.target[4].value,
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
      console.log(indexResponsible.value);
      console.log(flag);
      if(flag !== indexResponsible.value){
      response
        .then(function (result) {
          
          const { onResult } = useQuery(permissionTreeSubjects, {
              modelId: props.idUpdateModule,
              groupId: "1305438642755218144"
            })
          onResult((queryResult)=> {
            for(let subject of queryResult.data.permissionTreeSubjects.data){
              if(subject.level == 7){
                const { mutate } = useMutation(permissionRuleDelete, ()=>({
                   variables:{
                    "id": subject.permission_rule_id
                   }
                }))
                mutate()
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
                  const response_3 = mutate()
                  response_3
                  .then(function (result){
                    console.log(indexResponsible.value);
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
      }
    };
    return {
      UpdateModule,
      options,
      model,
      form,
      
    };
  },
});
</script>

<style></style>
