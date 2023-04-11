<template>
  <div class="modules q-pa-md">
    
    <modulesModules v-if="showTableModules()" />
   
    <modulesTasks v-else />

  </div>
</template>

<script>
import { computed, reactive, watch, ref } from "vue";
import { useStore } from "vuex";
import { GetPropertyStatus } from "src/api/main/queryes";
import { useQuery } from "@vue/apollo-composable";
import modulesTasks from "../pages/composables/modulesTasks.vue"
import modulesModules from "../pages/composables/modulesModules.vue"

export default {
  components: {
    modulesTasks,
    modulesModules
  },

  setup() {
    const id = ref(0);
    const idUpdateModule = ref(0);
    const idModule = ref(0);
    const store = useStore();
    const currentModuleClickUp = ref();
    store.dispatch("GET_MODULES");
    const MODULES = computed(() => store.getters.MODULES);
    const module_index = computed(() => store.getters.MODULE_INDEX);
    const current_module = reactive({});
    const propertyStatus = reactive({});

    const showTableModules = () => {
      return module_index.value <= -1;
    };
    const get_module = function (module_index) {
      current_module.values = MODULES.value[module_index.value];
    };


    //Получение свойства Status для определения статуса задачи по id
    const { onResult } = useQuery(GetPropertyStatus);
    onResult((queryResult) => {
      propertyStatus.values = queryResult.data.property.meta.options;
    });

    watch(
      () => store.getters.MODULE_INDEX,
      () => get_module(module_index)
    );
    return {
      current_module,
      showTableModules,
      propertyStatus,
      currentModuleClickUp,
      id,
      idModule,
      idUpdateModule,
    };
  },
};
</script>

<style lang="scss">
button.btn {
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.08);
  -moz-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.08);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.08);
  color: #fff;
  display: inline-block;
  width: 130px;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  padding: 8px 16px;
  margin: 0 20px 0 0;
  text-decoration: none;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.075);
  -webkit-transition: background-color 0.1s linear;
  -moz-transition: background-color 0.1s linear;
  -o-transition: background-color 0.1s linear;
  transition: background-color 0.1s linear;
}
button.btn {
  background-color: rgb(62, 123, 255);
  border: 1px solid rgb(0, 0, 0);
}

button.btn:hover {
  background-color: rgb(26, 80, 161);
}

.assigned {
  background-color: rgb(199, 21, 160);
}
.accomplished {
  background-color: rgb(235, 220, 20);
}
.completed {
  background-color: rgb(100, 207, 67);
}


</style>
