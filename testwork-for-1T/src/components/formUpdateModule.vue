<template>
  <div class="wrapper">
    <section class="get-in-touch">
      <h3 class="title">Редактирование модуля</h3>
      <form
        class="contact-form row"
        insertCurrentData
        @submit.prevent="UpdateModule($event, funSubmit)"
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
            name="startData"
            id="startData"
            class="input-text js-input"
            type="text"
          />
          <label class="label" for="startData">Дата начала</label>
        </div>
        <div class="form-field col-lg-6">
          <input
            name="startTime"
            id="startTime"
            class="input-text js-input"
            type="text"
          />
          <label class="label" for="startTime">Время начала</label>
        </div>
        <div class="form-field col-lg-6">
          <input
            name="endData"
            id="endData"
            class="input-text js-input"
            type="text"
          />
          <label class="label" for="endData">Дата окончания</label>
        </div>
        <div class="form-field col-lg-6">
          <input
            name="endTime"
            id="endTime"
            class="input-text js-input"
            type="text"
          />
          <label class="label" for="endTime">Время окончания</label>
        </div>
        <div class="form-field col-lg-6">
          <q-select v-model="model" :options="options" label="Ответсвенный" />
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
import { provideApolloClient } from "@vue/apollo-composable";
import { ApolloClient } from "@apollo/client/core";
import { useQuasar } from "quasar";
import { updateModule } from "../api/main/mutations";
import { useStore } from "vuex";

export default defineComponent({
  props: {
    idUpdateModule: String,
    mod: Object,
  },
  setup(props) {
    console.log("props.idUpdateModule", props.idUpdateModule);
    const $q = useQuasar();
    // const options = ref();
    const store = useStore();
    const model = ref(null);
    const indexResponsible = ref(0);
    let funSubmit = false;
    store.dispatch("GET_RESPONSIBLES");
    const options = computed(() => store.getters.OPTIONS_RESPONSIBLES);
    const responsible = computed(() => store.getters.RESPONSIBLES);
    const refetchModules = store.getters.REFETCH_MODULES;
    const refetchModulesSetTimeout = function () {
      setTimeout(refetchModules, 1000);
    };

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
        // Пока не работает, т.к. есть среди субъектов те, которых нет в группе ответственые
        // model.value = props.mod.property7.fullname.first_name + " " + props.mod.property7.fullname.last_name;
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
          console.log("createNewModule", result);
          refetchModulesSetTimeout();
          $q.notify({
            type: "positive",
            message: "Модуль обновлены",
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
      UpdateModule,
      funSubmit,
      options,
      model,
      refetchModules,
    };
  },
});
</script>

<style>

</style>
