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
        <div class="form-field col-lg-6">
          <q-select
            v-model="modelModule"
            :options="optionsModules"
            label="Модуль"
          />
        </div>
        <div class="form-field col-lg-6">
          <q-select v-model="model" :options="options" label="Исполнитель" />
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
  watch
} from "vue";
import { getClientOptions } from "src/apollo/index";
import { provideApolloClient } from "@vue/apollo-composable";
import { ApolloClient } from "@apollo/client/core";
import { useQuasar } from "quasar";
import { addNewTask } from "src/api/main/mutations";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const $q = useQuasar();
    const store = useStore();
    store.dispatch("GET_EXECUTORS");
    const options = computed(() => store.getters.OPTIONS_EXECUTORS);
    const model = ref(null);
    const modelStatus = ref(null);
    const modelModule = ref(null);
    const indexExecutor = ref(0);
    const indexModule = ref(0);
    const MODULES = computed(() => store.getters.MODULES);
    const optionsStatus = ["Назначена", "Выполнена", "Завершена"];
    const SUBJECTS = computed(() => store.getters.EXECUTORS);
    const statusId = ref("");
    const optionsModules = computed(() => store.getters.OPTIONS_MODULES);

    watch(model, () => {
      indexExecutor.value = options.value.indexOf(model.value);
    });
    watch(modelModule, () => {
      indexModule.value = optionsModules.value.indexOf(modelModule.value);
    });
    watch(modelStatus, () => {
      if (modelStatus.value == "Назначена") {
        statusId.value = "3173475364523847130";
      } else if (modelStatus.value == "Выполнена") {
        statusId.value = "9117798227215343609";
      } else {
        statusId.value = "4106452242288243072";
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
              "6714467324498160547": SUBJECTS.value[indexExecutor.value].id,
            },
            property8: {
              "2293521969897910704": MODULES.value[indexModule.value].id,
            },

            //             name: e.target.elements.name.value,
            // property4: e.target.elements.description.value,
            // property5: e.target.elements.status.value,
            // property6: {
            //   "6714467324498160547": e.target.elements.module.value,
            // },
            // property8: {
            //   "2293521969897910704": SUBJECTS.value[indexExecutor.value].id,
            // },
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
      optionsModules,
      optionsStatus,
    };
  },
});
</script>

<style>
.get-in-touch {
  max-width: 800px;
  position: relative;
}
.get-in-touch .title {
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-size: 2em;
  line-height: 48px;
  color: #5543ca;
  background: #5543ca;
  background: -moz-linear-gradient(left, #f4524d 0%, #5543ca 100%) !important;
  background: -webkit-linear-gradient(
    left,
    #f4524d 0%,
    #5543ca 100%
  ) !important;
  background: linear-gradient(to right, #f4524d 0%, #5543ca 100%) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
}

.contact-form .form-field {
  position: relative;
  width: 100%;
  margin: 32px 0;
}
.contact-form .input-text {
  display: block;
  width: 100%;
  height: 36px;
  border-width: 0 0 2px 0;
  border-color: #5543ca;
  font-size: 18px;
  line-height: 26px;
  font-weight: 400;
}
.contact-form .input-text:focus {
  outline: none;
}
.contact-form .input-text:focus + .label,
.contact-form .input-text.not-empty + .label {
  -webkit-transform: translateY(-24px);
  transform: translateY(-24px);
}
.contact-form .label {
  position: absolute;
  left: 20px;
  bottom: 30px;
  font-size: 18px;
  line-height: 26px;
  font-weight: 400;
  color: #5543ca;
  cursor: text;
  transition: -webkit-transform 0.2s ease-in-out;
  transition: transform 0.2s ease-in-out;
  transition: transform 0.2s ease-in-out, -webkit-transform 0.2s ease-in-out;
}
.contact-form .submit-btn {
  display: inline-block;
  background-color: #000;
  background-image: linear-gradient(125deg, #a72879, #064497);
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 16px;
  padding: 8px 16px;
  border: none;
  width: 200px;
  cursor: pointer;
}
.wrapper {
  background-color: white;
  padding: 10px;
}
</style>
