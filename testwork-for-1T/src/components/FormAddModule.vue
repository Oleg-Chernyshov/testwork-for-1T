<template>
  <div class="wrapper">
    <section class="get-in-touch">
      <h3 class="title">Новый модуль</h3>
      <form class="contact-form row" @submit.prevent="createNewModule">
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
            name="startData"
            id="startData"
            class="input-text js-input"
            type="text"
            required
          />
          <label class="label" for="startData">Дата начала</label>
        </div>
        <div class="form-field col-lg-6">
          <input
            name="startTime"
            id="startTime"
            class="input-text js-input"
            type="text"
            required
          />
          <label class="label" for="startTime">Время начала</label>
        </div>
        <div class="form-field col-lg-6">
          <input
            name="endData"
            id="endData"
            class="input-text js-input"
            type="text"
            required
          />
          <label class="label" for="endData">Дата окончания</label>
        </div>
        <div class="form-field col-lg-6">
          <input
            name="endTime"
            id="endTime"
            class="input-text js-input"
            type="text"
            required
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
import { useMutation } from "@vue/apollo-composable";
import {
  defineComponent,
  ref,
  computed,
  watch,
} from "vue";
import { getClientOptions } from "src/apollo/index";
import { provideApolloClient } from "@vue/apollo-composable";
import { ApolloClient } from "@apollo/client/core";
import { useQuasar } from "quasar";
import { addNewModule, createRule } from "src/api/main/mutations";
import { useStore } from "vuex";

export default defineComponent({
  components: {},

  setup() {
    const $q = useQuasar();
    const store = useStore();
    const model = ref(null);
    const indexResponsible = ref(0);

    const RESPONSIBLES = computed(() => store.getters.RESPONSIBLES);
    const options = computed(() => store.getters.OPTIONS_RESPONSIBLES);
    
    watch(model, () => {
      indexResponsible.value = options.value.indexOf(model.value);
    });

    const createNewModule = function (e) {
      const apolloClient = new ApolloClient(getClientOptions());
      provideApolloClient(apolloClient);
      const { mutate } = useMutation(addNewModule, () => ({
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
                RESPONSIBLES.value[indexResponsible.value].id,
            },
          },
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
                  model_id: result.data.create_type1.recordId,
                  owner_type: "subject",
                  owner_id: RESPONSIBLES.value[indexResponsible.value].id,
                  level: 7
                }
              }
            }))
            const response_2 = mutate()
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
      e.target.elements.name.value = "";
      e.target.elements.startData.value = "";
      e.target.elements.startTime.value = "";
      e.target.elements.endData.value = "";
      e.target.elements.endTime.value = "";
    };

    return {
      createNewModule,
      options,
      model
    };
  },
});
</script>

<style>

</style>
