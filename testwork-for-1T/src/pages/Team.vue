<template>
  <div>
    <h5 class="flex flex-center">Добавление в команды</h5>
    <div class="wrapper join">
      <div class="join__block">
        <q-form
          @submit.prevent="getFormExecuterValues"
          class="join__form-executer q-mr-xl"
        >
          <q-input
            name="name"
            type="text"
            placeholder="Имя"
            v-model="input1_1"
          />
          <q-input
            name="surname"
            type="text"
            placeholder="Фамилия"
            v-model="input1_2"
          />
          <q-input
            name="eMail"
            type="text"
            class="q-mb-sm"
            placeholder="Почта"
            v-model="input1_3"
          />
          <q-btn type="submit">Добавить в группу Исполнители</q-btn>
        </q-form>
      </div>

      <div class="join__block">
        <q-form
          @submit.prevent="getFormResponsibleValues"
          class="join__form-executer"
        >
          <q-input
            name="name"
            type="text"
            placeholder="Имя"
            v-model="input2_1"
          />
          <q-input
            name="surname"
            type="text"
            placeholder="Фамилия"
            v-model="input2_2"
          />
          <q-input
            name="eMail"
            type="text"
            class="q-mb-sm"
            placeholder="Почта"
            v-model="input2_3"
          />
          <q-btn type="submit">Добавить в группу Ответственные</q-btn>
        </q-form>
      </div>
    </div>
  </div>
</template>

<script>
import { useMutation } from "@vue/apollo-composable";
import { defineComponent, ref, computed } from "vue";
import { inviteUser } from "src/api/main/mutations";
import { getClientOptions } from "src/apollo/index";
import { provideApolloClient } from "@vue/apollo-composable";
import { ApolloClient } from "@apollo/client/core";
import { useQuasar } from "quasar";
import { useStore } from "vuex";

export default defineComponent({
  components: {},

  setup() {
    const input1_1 = ref("");
    const input1_2 = ref("");
    const input1_3 = ref("");
    const input2_1 = ref("");
    const input2_2 = ref("");
    const input2_3 = ref("");
    const store = useStore();
    store.dispatch("GET_RESPONSIBLES");
    const refetchQueryExecutors = store.getters.REFETCH_EXECUTORS;
    const refetchQueryResponsible = store.getters.REFETCH_RESPONSIBLES;
    const $q = useQuasar();

    const refetchResponsiblesSetTimeout = function () {
      setTimeout(refetchQueryResponsible, 1000);
    };

    const refetchQueryExecutorsSetTimeout = function () {
      setTimeout(refetchQueryExecutors, 1000);
    };

    const getFormExecuterValues = function (e, n) {
      const apolloClient = new ApolloClient(getClientOptions());
      provideApolloClient(apolloClient);
      const { mutate } = useMutation(inviteUser, () => ({
        variables: {
          input: {
            name: e.target.elements.name.value,
            surname: e.target.elements.surname.value,
            email: e.target.elements.eMail.value,
            page_group_id: "8434793229479617275",
          },
        },
      }));
      const response = mutate();
      response
        .then(function (result) {
          $q.notify({
            type: "positive",
            message: "Отправлено",
          });
          refetchResponsiblesSetTimeout();
        })
        .catch((err) => {
          $q.notify({
            type: "negative",
            message: "Ошибка отправки",
          });
        });
      [
        e.target.elements.name.value,
        e.target.elements.surname.value,
        e.target.elements.eMail.value,
      ] = ["", "", ""];
    };

    const getFormResponsibleValues = function (e) {
      const apolloClient = new ApolloClient(getClientOptions());
      provideApolloClient(apolloClient);
      const { mutate } = useMutation(inviteUser, () => ({
        variables: {
          input: {
            name: e.target.elements.name.value,
            surname: e.target.elements.surname.value,
            email: e.target.elements.eMail.value,
            page_group_id: "1305438642755218144",
          },
        },
      }));
      const response = mutate();
      response
        .then(function (result) {
          console.log("getFormExecuterValues", result);
          $q.notify({
            type: "positive",
            message: "Отправлено",
          });
          refetchQueryExecutorsSetTimeout();
        })
        .catch((err) => {
          console.log("Ошибка", err);
          $q.notify({
            type: "negative",
            message: "Ошибка отправки",
          });
        });
      [
        e.target.elements.name.value,
        e.target.elements.surname.value,
        e.target.elements.eMail.value,
      ] = ["", "", ""];
    };

    return {
      input1_1,
      input1_2,
      input1_3,
      input2_1,
      input2_2,
      input2_3,
      getFormExecuterValues,
      getFormResponsibleValues,
    };
  },
});
</script>

<style lang="scss">
.wrapper {
}
.join {
  display: flex;
  padding: 20px;
  &__block {
  }

  &__form-executer {
  }
}
</style>
