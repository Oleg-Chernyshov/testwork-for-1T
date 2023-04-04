<template>
    <div class="row flex-center flex">
        <h5>Данные пользователя</h5>
    </div>
    <div class="row q-pa-md">
        <div class="col-6 flex-center">
            <div v-if="loading">
                loading...
            </div>
            <div v-else>
                <div>
                    <h6 class="data">Имя: {{ result.user.name }} {{ result.user.surname  }}</h6>
                    <h6 class="data"> Почта: {{ result.user.email }}</h6>
                    <q-btn color="primary" class="q-my-md q-mr-md">Редактировать</q-btn>
                    <q-btn color="red" class="q-my-md">Выйти </q-btn>
                </div>
            </div>
        </div>
        <div class="col-6 flex-center flex">
           <q-btn @click="go">
                Перейти в пространство
            </q-btn> 
        </div>
    </div>
    
    
</template>
<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router';
import { UserQuery } from 'src/api/authorization/queryes';
import { useQuery } from '@vue/apollo-composable';

export default defineComponent({
    setup(){
        const router = useRouter()
        const id = sessionStorage.getItem("user_id");
        let token = sessionStorage.getItem("token");
        const {result, loading, error} = useQuery(UserQuery,{"id":id})
        return{
            result,
            loading,
            error,
            go(){
                const space_id = result._rawValue.user.current_space_id
                token = token.split('&')[0]
                sessionStorage.setItem(
                    "token",
                    token + "&space=" + 752
                )
                router.push("/app")
            }
        }
    },
})
</script>
<style scoped>
.data{
    padding: 0;
    margin: 0;
}
</style>