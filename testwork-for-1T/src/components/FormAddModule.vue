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
          <input
            @click="refetchModulesSetTimeout"
            name=""
            class="submit-btn"
            type="submit"
            value="Создать"
          />
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
  reactive,
  ref,
  computed,
  watch,
  onMounted,
} from "vue";
import { getClientOptions } from "src/apollo/index";
import { provideApolloClient } from "@vue/apollo-composable";
import { ApolloClient } from "@apollo/client/core";
import { useQuasar } from "quasar";
import { addNewModule } from "src/api/main/mutations";
import { useStore } from "vuex";

export default defineComponent({
  components: {},

  setup() {
    const $q = useQuasar();
    // const options = ref([]);
    console.log(1);
    const store = useStore();
    store.dispatch("GET_SUBJECTS");
    const model = ref(null);
    const indexResponsible = ref(0);
    store.dispatch("GET_RESPONSIBLES");
    const options = computed(() => store.getters.OPTIONS_RESPONSIBLES);
    console.log(SUBJECTS.value);
    // watch(options, () => {
    //   console.log("opt", options.value);
    // });

    const refetchModules = store.getters.REFETCH_MODULES;

    const refetchModulesSetTimeout = function () {
      setTimeout(refetchModules, 1000);
    };

    watch(model, () => {
      indexResponsible.value = options.value.indexOf(model.value);
      console.log(4);
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
              "6714467324498160547": SUBJECTS.value[indexResponsible.value].id,
            },
          },
        },
      }));
      const response = mutate();
      response
        .then(function (result) {
          console.log("createNewModule", result);
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
    };

    return {
      createNewModule,
      options,
      model,
      refetchModulesSetTimeout,
      refetchModules,
    };
  },
});
</script>

<style>
.get-in-touch {
  max-width: 800px;
  margin: 50px auto;
  position: relative;
}
.get-in-touch .title {
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-size: 2em;
  line-height: 48px;
  padding-bottom: 48px;
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
