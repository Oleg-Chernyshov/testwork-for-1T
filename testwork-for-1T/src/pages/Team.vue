<template>
  <div>
    Team
    <div class="wrapper join">
      <div class="join__block">
        <form
          @submit.prevent="getFormExecuterValues"
          class="join__form-executer"
        >
          <input name="name" type="text" placeholder="Имя" />
          <input name="surname" type="text" placeholder="Фамилия" />
          <input name="eMail" type="text" placeholder="Почта" />
          <button>Добавить в группу Исполнители</button>
        </form>
      </div>

      <div class="join__block">
        <form
          @submit.prevent="getFormResponsibleValues"
          class="join__form-executer"
        >
          <input name="name" type="text" placeholder="Имя" />
          <input name="surname" type="text" placeholder="Фамилия" />
          <input name="eMail" type="text" placeholder="Почта" />
          <button>Добавить в группу Ответственные</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useMutation } from "@vue/apollo-composable";
import { defineComponent, ref, computed } from "vue";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { getClientOptions } from "src/apollo/index";
import { provideApolloClient } from "@vue/apollo-composable";
import { ApolloClient } from "@apollo/client/core";
import { useQuasar } from "quasar";

export default {
  components: {},

  setup() {
    const $q = useQuasar();
    const getFormExecuterValues = function (e, n) {
      const apolloClient = new ApolloClient(getClientOptions());
      provideApolloClient(apolloClient);
      const { mutate } = useMutation(
        gql`
          mutation userGroupInviteUser($input: UserGroupInviteUserInput!) {
            userGroupInviteUser(input: $input) {
              status
            }
          } 
        `,
        () => ({
          variables: {
            input: {
              name: e.target.elements.name.value,
              surname: e.target.elements.surname.value,
              email: e.target.elements.eMail.value,
              page_group_id: "2289312306467874395",
            },
          },
        })
      );
      const response = mutate();
      response
        .then(function (result) {
          console.log("getFormExecuterValues", result);
          $q.notify({
            type: "positive",
            message: "Отправлено",
          });
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
      console.log(n);
    };

    const getFormResponsibleValues = function (e) {
      const apolloClient = new ApolloClient(getClientOptions());
      provideApolloClient(apolloClient);
      const { mutate } = useMutation(
        gql`
          mutation userGroupInviteUser($input: UserGroupInviteUserInput!) {
            userGroupInviteUser(input: $input) {
              status
            }
          }
        `,
        () => ({
          variables: {
            input: {
              name: e.target.elements.name.value,
              surname: e.target.elements.surname.value,
              email: e.target.elements.eMail.value,
              page_group_id: "3532947332290869241",
            },
          },
        })
      );
      const response = mutate();
      response
        .then(function (result) {
          console.log("getFormExecuterValues", result);
          $q.notify({
            type: "positive",
            message: "Отправлено",
          });
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
      getFormExecuterValues,
      getFormResponsibleValues,
    };
  },
};
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
