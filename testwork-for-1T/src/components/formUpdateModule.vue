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
