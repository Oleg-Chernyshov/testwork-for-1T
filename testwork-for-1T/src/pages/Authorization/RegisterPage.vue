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
                <q-dialog v-model="prompt" persistent @submit="SetPassword">
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
                            <q-btn flat label="Отправить" v-close-popup @click="SetPassword"/>
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
import { defineComponent, ref} from 'vue'
import { UserSignUp, UserSignUpSetPassword } from 'src/api/authorization/mutations'
import { useMutation } from '@vue/apollo-composable'

export default defineComponent({
    setup() {
        const { mutate: UserSignUpMutation } = useMutation(UserSignUp)
        const { mutate: UserSignUpSetPasswordMutation, error } = useMutation(UserSignUpSetPassword)
        const prompt = ref(false)
        const id = ref(0)
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
            async RegisterSubmit(){
                await UserSignUpMutation({"input":{"name":name.value,"surname":surname.value,"email":email.value}})
                    .then(mutationResult => {
                    id.value = mutationResult.data.userSignUp.recordId;
                })
                if(id.value!==0){
                    prompt.value = true
                }
                else{
                    alert("Почта уже занята")
                }
            },
            async SetPassword(){
                await UserSignUpSetPasswordMutation({"input":{"user_id":id.value,"code":code.value,"password":password.value}})
                    .then(mutationResult => {
                        console.log(mutationResult.data);
                        if(mutationResult.data.userSignUpSetPassword.status == 200){
                            $router.push({path: '/app'})
                        }
                        else{
                            alert("Неверный код")
                        }
                    })
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
