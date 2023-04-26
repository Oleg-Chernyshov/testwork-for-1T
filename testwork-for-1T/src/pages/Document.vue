<template>
  <div class="q-pa-md">{{ DOCUMENTS[id]?.property10 }}</div>
</template>

<script>
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";

export default {
  components: {},

  setup() {
    const route = useRoute();
    const id = ref(route.params.id);
    const store = useStore();

    const updateId = () => {
      id.value = route.params.id;
      // ...
    };

    onBeforeRouteUpdate((to, from, next) => {
      updateId();
      next();
    });

    const DOCUMENTS = computed(() => store.getters.DOCUMENTS);

    return {
      id,
      DOCUMENTS,
    };
  },
};
</script>

<style lang="scss"></style>
