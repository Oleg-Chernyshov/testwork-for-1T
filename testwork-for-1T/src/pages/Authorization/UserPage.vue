<template>
    <div v-if="loading">
        loading...
    </div>
    <div v-else>
        {{ result }}
    </div>
    <q-btn @click="go">
        Перейти в пространство
    </q-btn>
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
