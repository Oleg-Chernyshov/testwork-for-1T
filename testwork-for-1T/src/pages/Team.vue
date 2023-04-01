<template>
  <div>
    Team
    <div class="wrapper join">
      <div class="join__block">
        <form class="join__form-executer" action="">
          <input type="text" placeholder="Имя" />
          <input type="text" placeholder="Фамилия" />
          <input type="text" placeholder="Почта" />
          <button>Добавить в группу Исполнители</button>
        </form>
      </div>

      <div class="join__block">
        <form class="join__form-executer" action="">
          <input type="text" placeholder="Имя" />
          <input type="text" placeholder="Фамилия" />
          <input type="text" placeholder="Почта" />
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
export default {
  components: {},

  setup() {
    {
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
              name: "Денис",
              surname: "Королев",
              email: "dkorolyov631@mail.ru",
              page_group_id: "2289312306467874395",
            },
          },
        })
      );
      const response = mutate();
      response.then(function (result) {});
    }

    return {};
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
