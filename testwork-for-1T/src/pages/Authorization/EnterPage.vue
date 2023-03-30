<template>
    <q-page class="q-pa-md">
        <h5 class="row">Добро пожаловать! Войдите чтобы продолжить</h5>
        <div class="flex flex-center">
            <q-form @submit="EnterSubmit"
                    @reset="EnterReset">
                <q-input rounded
                        v-model="email"
                        label="Введите вашу почту"
                        type="email">
                </q-input>
                <q-input rounded
                        v-model="password"
                        label="Введите ваш пароль"
                        type="password">
                </q-input>
                <div class="q-mt-md">
                    <q-btn label="Отправить" type="submit" color="primary"/>
                    <q-btn label="Сбросить" type="reset" color="primary" flat class="q-ml-sm" />
                </div>
                <p class="q-pt-md">Еще нет аккаунта? <router-link to="/register">зарегистрируйте его сейчас</router-link></p>
                <p><router-link to="/reset">Восстановить пароль</router-link></p>
            </q-form>
        </div>
    </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
    setup() {
        const email = ref("")
        const password = ref("")
        return{
            EnterSubmit(){
                console.log("submitted");
            },
            EnterReset(){
                console.log("reseted");
            },
            email,
            password
        }
    },
})
</script>
