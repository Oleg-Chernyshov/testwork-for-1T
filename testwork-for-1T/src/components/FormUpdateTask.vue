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
import { updateUser } from "../api/main/mutations";
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
    console.log(props.task);
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

    const refetchModulesSetTimeout = function () {
      setTimeout(refetchModules, 1000);
    };
    
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
          console.log("updated task", result);
          $q.notify({
            type: "positive",
            message: "Задача добавлен",
          });
          refetchModulesSetTimeout();
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
