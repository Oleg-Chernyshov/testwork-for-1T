<template>
  <div class="wrapper">
    <section class="get-in-touch">
      <h3 class="title">Новый модуль</h3>
      <form class="contact-form row" @submit.prevent="createNewModule">
        <q-input
          outlined
          v-model="name"
          label="Название"
          class="col-lg-6"
          required
        />
        <q-input
          outlined
          v-model="startData"
          label="Дата начала"
          class="col-lg-6"
          required
        />
        <q-input
          outlined
          v-model="startTime"
          label="Время начала"
          class="col-lg-6"
          required
        />
        <q-input
          outlined
          v-model="endData"
          label="Дата окончания"
          class="col-lg-6"
          required
        />
        <q-input
          outlined
          v-model="endTime"
          label="Время окончания"
          class="col-lg-6"
          required
        />
        <q-select
          outlined
          v-model="model"
          :options="options"
          label="Ответсвенный"
          class="col-lg-6"
        />
        <div class="form-field col-lg-12 justify-between flex">
          <q-btn color="primary" label="Создать" type="submit" class="submit-btn" />
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
import { addNewModule, createRule } from "src/api/main/mutations";
import { useStore } from "vuex";

export default defineComponent({
  components: {},
  setup() {
    const $q = useQuasar();
    const store = useStore();
    const model = ref(null);
    const indexResponsible = ref(0);

    // Определение реактивных свойств для полей формы
    const name = ref("");
    const startData = ref("");
    const startTime = ref("");
    const endData = ref("");
    const endTime = ref("");

    store.dispatch("GET_RESPONSIBLES");
    const RESPONSIBLES = computed(() => store.getters.RESPONSIBLES);

    const options = computed(() => store.getters.OPTIONS_RESPONSIBLES);

    watch(model, () => {
      indexResponsible.value = options.value.indexOf(model.value);
    });

    const createNewModule = function () {
      const apolloClient = new ApolloClient(getClientOptions());
      provideApolloClient(apolloClient);
      const { mutate } = useMutation(addNewModule, () => ({
        variables: {
          input: {
            name: name.value,
            property2: {
              date: startData.value,
              time: startTime.value,
            },
            property3: {
              date: endData.value,
              time: endTime.value,
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
          const { mutate } = useMutation(createRule, () => ({
            variables: {
              input: {
                model_type: "object",
                model_id: result.data.create_type1.recordId,
                owner_type: "subject",
                owner_id: RESPONSIBLES.value[indexResponsible.value].id,
                level: 7,
              },
            },
          }));
          const response_2 = mutate();
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
      name.value = "";
      startData.value = "";
      startTime.value = "";
      endData.value = "";
      endTime.value = "";
    };

    return {
      createNewModule,
      options,
      model,
      name,
      startData,
      startTime,
      endData,
      endTime,
    };
  },
});
</script>

<style>

</style>
