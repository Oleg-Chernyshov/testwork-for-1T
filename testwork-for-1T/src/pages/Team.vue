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
import { defineComponent, ref } from "vue";
import { inviteUser } from "src/api/main/mutations";
import { getClientOptions } from "src/apollo/index";
import { provideApolloClient } from "@vue/apollo-composable";
import { ApolloClient } from "@apollo/client/core";
import { useQuasar } from "quasar";
import { response } from "../functions/functions";

export default defineComponent({
  components: {},

  setup() {
    const input1_1 = ref("");
    const input1_2 = ref("");
    const input1_3 = ref("");
    const input2_1 = ref("");
    const input2_2 = ref("");
    const input2_3 = ref("");
    const $q = useQuasar();

    const getFormExecuterValues = function (e) {
      const apolloClient = new ApolloClient(getClientOptions());
      provideApolloClient(apolloClient);
      const { mutate } = useMutation(inviteUser, () => ({
        variables: {
          input: {
            name: e.target.elements.name.value,
            surname: e.target.elements.surname.value,
            email: e.target.elements.eMail.value,
            page_group_id: process.env.PAGE_GROUP_ID_EXECUTOR,
          },
        },
      }));
      response("Исполнитель добавлен!", "Ошибка!", mutate, $q);
      input1_1.value = "";
      input1_2.value = "";
      input1_3.value = "";
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
            page_group_id: process.env.PAGE_GROUP_ID_RESPONSIBLES,
          },
        },
      }));

      response("Ответственный добавлен", "Ошибка", mutate, $q);
      input2_1.value = "";
      input2_2.value = "";
      input2_3.value = "";
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
