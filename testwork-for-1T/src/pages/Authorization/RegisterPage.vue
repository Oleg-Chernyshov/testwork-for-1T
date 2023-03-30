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
                <q-dialog v-model="prompt" persistent>
                    <q-card>
                        <q-card-section>
                            <div class="text-h6">Код отправлен вам на почту</div>
                        </q-card-section>
                        <q-card-section>
                            <q-input rounded
                                    v-model="code"
                                    label="Введите ваш код"
                                    type="password"
                                    lazy-rules
                                    :rules="[ val => val && val.length > 0 || 'Введите что нибудь']">
                            </q-input>
                        </q-card-section>
                        <q-card-section>
                            <q-input rounded
                                    v-model="password"
                                    label="Введите ваш пароль"
                                    type="password"
                                    lazy-rules
                                    :rules="[ val => val && val.length > 0 || 'Введите что нибудь']">
                            </q-input>
                        </q-card-section>
                        <q-card-section>
                            <q-input rounded
                                    v-model="password_repeat"
                                    label="Повторите пароль"
                                    type="password"
                                    lazy-rules
                                    :rules="[ val => val && val.length > 0 || 'Введите что нибудь']">
                            </q-input>
                        </q-card-section>
                        <q-card-actions align="right" class="text-primary">
                            <q-btn flat label="Отменить" v-close-popup />
                            <q-btn flat label="Отправить" v-close-popup />
                        </q-card-actions>
                    </q-card>
                </q-dialog>
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
import { UserSignUp, UserSignUpSetPassword } from 'src/api/authorization/mutations'
import { useQuery, useMutation } from '@vue/apollo-composable'
import { errorMonitor } from 'events'

export default defineComponent({
    setup() {
        const { mutate: UserSignUpMutation } = useMutation(UserSignUp)
        const prompt = ref(false)
        const email = ref("")
        const password  = ref("")
        const password_repeat = ref("")
        const code = ref("")
        const name = ref("")
        const surname = ref("")
        return{
            email,
            prompt,
            code,
            password,
            password_repeat,
            name,
            surname,
            RegisterSubmit(){
                UserSignUpMutation({"input":{"name":name.value,"surname":surname.value,"email":email.value}})
                    .then(mutationResult => {
                    console.log(mutationResult.data);
                })
                prompt.value = true

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
