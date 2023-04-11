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
    const refetchModules = store.getters.REFETCH_MODULES;

    watch(model, () => {
      indexResponsible.value = options.value.indexOf(model.value);
    });

    const UpdateModule = function (e, num) {
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
      response("Модуль обновлены", "Ошибка", mutate, refetchModules.value, $q);
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
