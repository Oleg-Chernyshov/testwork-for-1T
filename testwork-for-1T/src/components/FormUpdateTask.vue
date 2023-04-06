<template>
    <div class="wrapper">
        <section class="get-in-touch">
          <h3 class="title">Обновить задачу</h3>
          <form class="contact-form row" @submit.prevent="UpdateModule">
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
                name="description"
                id="description"
                class="input-text js-input"
                type="text"
                required
              />
              <label class="label" for="description">Описание</label>
            </div>
            <div class="form-field col-lg-6">
              <input
                name="executor"
                id="executor"
                class="input-text js-input"
                type="text"
                required
              />
              <label class="label" for="executor">Ответственный</label>
            </div>
            <div class="form-field col-lg-6">
              <input
                name="status"
                id="status"
                class="input-text js-input"
                type="text"
                required
              />
              <label class="label" for="status">Статус</label>
            </div>
            <div class="form-field col-lg-12 justify-between flex">
              <input name="" class="submit-btn" type="submit" value="Создать" />
              <q-btn color="primary" label="Отменить" v-close-popup />
            </div>
            
          </form>
        </section>
      </div>
    </template>
    
    <script>
    import { defineComponent } from 'vue'
    
    export default defineComponent({
        props: {
            id: Number
        },
        setup(props) {
            console.log(props.id);
        },
    })
    </script>
    
    <style>
    .get-in-touch {
      max-width: 800px;
      position: relative;
    }
    .get-in-touch .title {
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 3px;
      font-size: 2em;
      line-height: 48px;
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
    .wrapper{
      background-color: white;
      padding: 10px
    }
    </style>
    