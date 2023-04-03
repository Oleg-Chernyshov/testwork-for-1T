<template>
    <q-page class="q-pa-md flex flex-center">
        <div>
            <h5>Вход</h5>
            <q-form @submit="EnterSubmit"
                    @reset="EnterReset">
                <q-input rounded
                        v-model="email"
                        label="Введите вашу почту"
                        type="email"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Введите что нибудь']">
                </q-input>
                <q-input rounded
                        v-model="password"
                        label="Введите ваш пароль"
                        type="password"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Введите что нибудь']">
                </q-input>
                <p class="error" v-if="error">{{ error }}</p>
                <div class="q-mt-md">
                    <q-btn label="Отправить" type="submit" color="primary"/>
                    <q-btn label="Сбросить" type="reset" color="primary" flat class="q-ml-sm" />
                </div>
                <p class="q-pt-md">Еще нет аккаунта? <router-link to="/register">Зарегистрируйте его сейчас</router-link></p>
                <p><router-link to="/reset">Восстановить пароль</router-link></p>
            </q-form>
        </div>
    </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMutation } from '@vue/apollo-composable'
import { UserSignIn } from 'src/api/authorization/mutations'

export default defineComponent({
    setup() {
        const router = useRouter()
        const email = ref("")
        const password = ref("")
        const error = ref("")
        const {mutate:UserSignInMutation} = useMutation(UserSignIn)
        return{
            async EnterSubmit(){
                await UserSignInMutation({"input":{login:email.value, password: password.value}})
                .then(MutationResult => {
                    sessionStorage.setItem(
                        "token",
                        MutationResult.data.userSignIn.record.access_token
                    );
                    sessionStorage.setItem(
                        "user_id",
                        MutationResult.data.userSignIn.recordId
                    );
                    router.push("/user")
                })
                .catch(e => {
                    error.value = "Неверный логин или пароль"
                })    
            },
            EnterReset(){
                email.value = ""
                password.value = ""
            },
            email,
            password,
            error
        }
    },
})
</script>
