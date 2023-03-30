<template>
    <q-page class="q-pa-md flex flex-center">
        <div>
            <h5>Регистрация</h5>
            <q-form @submit="RegisterSubmit"
                    @reset="RegisterReset">
                <q-input rounded
                        v-model="name"
                        label="Введите ваше имя"
                        type="text"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Введите что нибудь']">
                </q-input>
                <q-input rounded
                        v-model="surname"
                        label="Введите вашу фамилию"
                        type="text"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Введите что нибудь']">
                </q-input>
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
                <q-input rounded
                        v-model="password_repeat"
                        label="Повторите пароль"
                        type="password"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Введите что нибудь']">
                </q-input>
                <div class="q-mt-md">
                    <q-btn label="Отправить" type="submit" color="primary"/>
                    <q-btn label="Сбросить" type="reset" color="primary" flat class="q-ml-sm" />
                </div>
                <p class="q-pt-md">Уже есть аккаунт? <router-link to="/">Войдите</router-link></p>
            </q-form>
        </div>
    </q-page>
</template>

<script>
import { defineComponent,ref } from 'vue'

export default defineComponent({
    setup() {
        const email = ref("")
        const password  = ref("")
        const password_repeat = ref("")
        const name = ref("")
        const surname = ref("")
        return{
            email,
            password,
            password_repeat,
            name,
            surname,
            RegisterSubmit(){
                console.log("submitted");
            },
            RegisterReset(){
                email.value = ""
                password.value = ""
                password_repeat.value = ""
                name.value = ""
                surname.value = ""
            }
        }
    },
})
</script>
