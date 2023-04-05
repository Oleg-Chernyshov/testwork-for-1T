<template>
  <form @submit.prevent class="v-form__block">
    <input
      @input="changeValid"
      v-model="price"
      class="v-form__input"
      type="text"
      placeholder="price"
    />
    <input
      @input="changeValid"
      v-model="category"
      class="v-form__input"
      type="text"
      placeholder="category"
    />
    <input
      @input="changeValid"
      v-model="about"
      class="v-form__input"
      type="text"
      placeholder="about"
    />
    <input
      v-model="name"
      @input="changeValid"
      class="v-form__input"
      type="text"
      placeholder="name"
    />
    <!-- <button
        :disabled="isValid"
        class="v-form__btn-is-valid"
        @click="addToCatalog"
      >
        Добавить
      </button> -->
    <button
      :class="isValid ? 'v-form__btn-is-valid' : 'v-form__btn-not-is-valid'"
      class="v-form__btn-is-valid"
      @click="addToCatalog"
    >
      Добавить
    </button>
  </form>
</template>

<script>
import { useMutation } from "@vue/apollo-composable";
import { defineComponent, reactive, ref, computed, watch } from "vue";
import gql from "graphql-tag";
import { getClientOptions } from "src/apollo/index";
import { provideApolloClient } from "@vue/apollo-composable";
import { ApolloClient } from "@apollo/client/core";
import { useQuasar } from "quasar";
import { useQuery } from "@vue/apollo-composable";
import { addNewModule } from "src/api/main/mutations";
import { useStore } from "vuex";

export default defineComponent({
  components: {},

  setup() {
    return {};
  },
});
</script>

<style></style>
