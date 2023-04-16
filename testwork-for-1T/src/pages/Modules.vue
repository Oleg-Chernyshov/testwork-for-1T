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
    const current_module = reactive({});
    const propertyStatus = reactive({});

    const MODULES = computed(() => store.getters.MODULES);
    const module_index = computed(() => store.getters.MODULE_INDEX);
    

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
      () => {
        get_module(module_index);
      }
    );
    return {
      current_module,
      showTableModules,
      propertyStatus,
      currentModuleClickUp,
      id,
      idModule,
      idUpdateModule,
      MODULES
    };
  },
};
</script>

<style lang="scss">


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
