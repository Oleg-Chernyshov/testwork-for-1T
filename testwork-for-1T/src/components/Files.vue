<template>
  <div class="wrapper">
    <input
      @change="changeHandler($event)"
      multiple
      type="file"
      id="file"
      ref="submitBtn"
      accept=".png,.jpg,.jpeg,.gif"
    />

    <q-btn class="btn" @click="triggerInput">Открыть</q-btn>
    <q-btn
      :class="{ hidden_btn: toggleloadBtn }"
      class="btn primary"
      @click="uploadHandler"
      >Загрузить</q-btn
    >

    <div class="preview">
      <div
        @click="removeHandler($event)"
        class="preview-image"
        v-for="(file, index) in files"
        :key="file.name"
      >
        <div class="preview-remove" :data-name="`${file.name}`">&times;</div>
        <img :src="`${sourcesImg[index]}`" :alt="`${file.name}`" />
        <div class="preview-info">
          <span>{{ file.name }}</span>
          {{ bytesToSize(file.size) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useMutation } from "@vue/apollo-composable";
import { defineComponent, ref} from "vue";
import { UPLOAD_FILES } from "../api/main/mutations";

export default defineComponent({
  components: {},

  setup() {
    const submitBtn = ref(null);
    let toggleloadBtn = ref(true);
    const sourcesImg = ref([]);
    const files = ref();
    const upload = async function (uploadedFiles) {
      console.log(uploadedFiles[0]);
      const { mutate } = useMutation(UPLOAD_FILES, () => ({
        variables: {
          input: {
            files: uploadedFiles[0],
          },
        },
      }));
      const { data } = await mutate();
      console.log("data", data);

      //   const mutation = _.cloneDeep(UPLOAD_FILES);
      //   mutation.variables.files = Array.isArray(uploadedFiles)
      //     ? uploadedFiles.map(({ file }) => file)
      //     : uploadedFiles.file;
      //   const { data } = await this.$apollo.mutate(mutation);
      //   return data.filesUpload.ids;
    };

    const uploadHandler = () => {
      upload(files.value);
    };
    const triggerInput = () => {
      submitBtn.value.click();
    };

    const removeHandler = function (event) {
      if (!event.target.dataset.name) {
        return;
      }

      const { name } = event.target.dataset;
      files.value = files.value.filter((file) => file.name !== name);
      console.log(name);

      if (!files.value.length) {
        toggleloadBtn.value = true;
      }

      // const block = preview
      //   .querySelector(`[data-name="${name}"]`)
      //   .closest('.preview-image')

      // block.classList.add('removing')
      // setTimeout(() => block.remove(), 300)
    };

    const bytesToSize = function (bytes) {
      const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
      if (!bytes) {
        return "0 Byte";
      }
      const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
      return Math.round(bytes / Math.pow(1024, i)) + " " + sizes[i];
    };

    const changeHandler = (event) => {
      if (!event.target.files.length) {
        return;
      }
      toggleloadBtn.value = false;
      sourcesImg.value = [];
      files.value = [];

      files.value = Array.from(event.target.files);
      // preview.innerHTML = "";
      // upload.style.display = "inline";

      files.value.forEach((file) => {
        if (!file.type.match("image")) {
          return;
        }

        const reader = new FileReader();

        reader.onload = (ev) => {
          const src = ev.target.result;
          sourcesImg.value.push(src);
          //   preview.insertAdjacentHTML(
          //     "afterbegin",
          //     `
          //   <div class="preview-image">
          //     <div class="preview-remove" data-name="${file.name}">&times;</div>
          //     <img src="${src}" alt="${file.name}" />
          //     <div class="preview-info">
          //       <span>${file.name}</span>
          //       ${bytesToSize(file.size)}
          //     </div>
          //   </div>
          // `
          //   );
        };

        reader.readAsDataURL(file);
      });
    };

    return {
      triggerInput,
      changeHandler,
      submitBtn,
      uploadHandler,
      removeHandler,
      toggleloadBtn,
      files,
      sourcesImg,
      bytesToSize,
    };
  },
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

.hidden_btn {
  display: none;
}

body {
  background: #666;
  font-family: "Roboto", sans-serif;
}

.container {
  padding-top: 5rem;
  width: 800px;
  margin: 0 auto;
}

.card {
  border-radius: 6px;
  background: #fff;
  padding: 1rem;
  box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.2);
}

.btn {
  color: #3272bb;
  position: relative;
  border-radius: 99px;
  border: 1px solid #1900ff;
  text-decoration: none;
  text-transform: uppercase;
  padding: 0.5rem 1.5rem;
  font-weight: 700;
  outline: none;
  background: #fff;
  transition: all 0.22s;
  cursor: pointer;
  margin-right: 1rem;
}

.btn.primary {
  background: #3150ff;
  color: #fff;
}

.btn:active {
  box-shadow: inset 1px 1px 1px rgba(0, 0, 0, 0.3);
}

.btn:hover {
  cursor: pointer;
  opacity: 0.8;
  background: #0508e2;
  color: white;
}

input[type="file"] {
  display: none;
}

.preview {
  display: flex;
  flex-wrap: wrap;
  padding: 0.5rem;
}

.preview-image {
  position: relative;
  margin-bottom: 0.5rem;
  margin-right: 0.5rem;
  overflow: hidden;
}

.preview-image.removing {
  transform: scale(0);
  transition: transform 0.3s;
}

.preview-image img {
  width: 165px;
  height: auto;
}

.preview-image:hover .preview-remove {
  opacity: 1;
}

.preview-image:hover .preview-info {
  bottom: 4px;
}

.preview-remove {
  opacity: 0;
  width: 20px;
  height: 20px;
  position: absolute;
  right: 0;
  top: 0;
  font-weight: bold;
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: opacity 0.22s;
}

.preview-info {
  position: absolute;
  right: 0;
  bottom: -50px;
  left: 0;
  height: 24px;
  font-size: 0.8rem;
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px;
  transition: bottom 0.22s;
}

.preview-info-progress {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background: #214aff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: width 0.22s;
}
</style>
