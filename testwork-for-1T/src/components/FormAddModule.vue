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
          <input
            name="responsible"
            id="responsible"
            class="input-text js-input"
            type="text"
            required
          />
          <label class="label" for="responsible">Ответственный</label>
        </div>
        <!-- <div class="form-field col-lg-12">
          <input
            name="tasks"
            id="tasks"
            class="input-text js-input"
            type="text"
            required
          />
          <label class="label" for="tasks">Задачи(пока не имеет смысла)</label>
        </div> -->
        <div class="form-field col-lg-12">
          <input name="" class="submit-btn" type="submit" value="Создать" />
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import { useMutation } from "@vue/apollo-composable";
import { defineComponent, ref, computed, reactive } from "vue";
import gql from "graphql-tag";
import { getClientOptions } from "src/apollo/index";
import { provideApolloClient } from "@vue/apollo-composable";
import { ApolloClient } from "@apollo/client/core";
import { useQuasar } from "quasar";
import { useQuery } from "@vue/apollo-composable";

export default defineComponent({
  setup() {
    const $q = useQuasar();
    const createNewModule = function (e) {
      const apolloClient = new ApolloClient(getClientOptions());
      provideApolloClient(apolloClient);
      const { mutate } = useMutation(
        gql`
          mutation ($input: create_type1_input!) {
            create_type1(input: $input) {
              recordId
              record {
                property2 {
                  date
                }
                property3 {
                  date
                }
                property7 {
                  fullname {
                    first_name
                    last_name
                  }
                }
                property8 {
                  name
                }
                id
                author_id
                type_id
                created_at
                updated_at
              }
              status
            }
          }
        `,
        () => ({
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
                "6714467324498160547": e.target.elements.responsible.value,
              },
            },
          },
        })
      );
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

    const subjects = reactive({});

    const { onResult } = useQuery(gql`
      query ($id: String!) {
        paginate_subject(page: 1, perPage: 100) {
          data {
            id
            type_id
            author_id
            fullname {
              first_name
              last_name
            }
          }
        }
      }
    `);
    onResult((queryResult) => {
      subjects.values = queryResult.data;
      console.log("Users", queryResult.data);
    });

    return {
      createNewModule,
      subjects,
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
</style>
