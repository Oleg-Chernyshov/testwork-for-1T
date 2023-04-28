<template>
  <div class="q-pa-md q-gutter-sm">
    <q-editor v-model="editor" ref="edit" square flat :toolbar="toolbar">
      <template v-slot:token>
        <q-btn-dropdown
          dense
          no-caps
          ref="token"
          no-wrap
          unelevated
          label="Цвет текста"
          size="sm"
        >
          <q-list dense>
            <q-item
              tag="label"
              clickable
              @click="color('backColor', highlight)"
            >
              <q-item-section side>
                <q-icon name="highlight" />
              </q-item-section>

              <q-item-section>
                <q-color
                  v-model="highlight"
                  default-view="palette"
                  no-header
                  no-footer
                  :palette="lightPalette"
                  class="my-picker"
                />
              </q-item-section>
            </q-item>
            <q-item
              tag="label"
              clickable
              @click="color('foreColor', foreColor)"
            >
              <q-item-section side>
                <q-icon name="format_paint" />
              </q-item-section>

              <q-item-section>
                <q-color
                  v-model="foreColor"
                  no-header
                  no-header-tabs
                  no-footer
                  default-view="palette"
                  :palette="textPalette"
                  class="my-picker"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </template>
    </q-editor>
    <div style="cursor: pointer" @click="saveHtmlFile($event)">Сохранить</div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted, computed, watch, onBeforeUnmount } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import { filesUpload } from "../api/main/mutations";
import { useMutation } from "@vue/apollo-composable";
import filesApi from "../sdk/file";

const route = useRoute();
const id = ref(route.params.id);
const store = useStore();
const edit = ref(null);
const editor = ref("");
const token = ref(null);
const foreColor = ref("#000000");
const highlight = ref("#ffff00aa");
const color = (cmd, name) => {
  token._value.hide();
  edit._value.caret.restore();
  edit._value.runCmd(cmd, name);
  edit._value.focus();
};
const FILES = computed(() => store.getters.FILES);

watch(route, () => {
  updateId();

  fetch(
    `https://cdn.stud.druid.1t.ru/${FILES.value[id.value].path}/${
      FILES.value[id.value].id
    }.html?n=${FILES.value[id.value].name}`
  )
    .then((response) => {
      response.text().then((html) => {
        editor.value = html;
        console.log(html);
      });
    })

    .catch((err) => console.log("Ошибка", err));

  console.log(FILES.value[id.value]);
  console.log(id.value);
});

const updateId = () => {
  id.value = route.params.id;
};

const $q = useQuasar();

const lightPalette = [
  "#ffccccaa",
  "#ffe6ccaa",
  "#ffffccaa",
  "#ccffccaa",
  "#ccffe6aa",
  "#ccffffaa",
  "#cce6ffaa",
  "#ccccffaa",
  "#e6ccffaa",
  "#ffccffaa",
  "#ffffffaa",
  "#00ff00aa",
  "#ff0000aa",
  "#ff8000aa",
  "#00ff80aa",
  "#00ffffaa",
  "#0080ffaa",
  "#0000ffaa",
  "#8000ffaa",
  "#ff00ffaa",
];

const textPalette = [
  "#ff0000",
  "#ff8000",
  "#ffff00",
  "#000000",
  "#00ff80",
  "#00ffff",
  "#0080ff",
  "#0000ff",
  "#8000ff",
  "#ff00ff",
];

const toolbar = [
  ["undo", "redo"],
  [
    {
      label: $q.lang.editor.fontSize,
      fixedIcon: true,
      list: "no-icons",
      options: ["size-6", "size-5", "size-4"],
    },
  ],
  ["token"],
  ["underline", "strike", "bold", "italic"],
  [
    {
      icon: $q.iconSet.editor.align,
      fixedLabel: true,
      list: "only-icons",
      options: ["left", "center", "right", "justify"],
    },
    "outdent",
    "indent",
    "ordered",
    "unordered",
  ],
  ["removeFormat", "link", "hr"],
  ["print"],
];

const upload = async (files, file2) => {
  try {
    await filesApi.uploadFiles(files);
  } catch (error) {
    console.log(error);
  }
};

const saveHtmlFile = async function () {
  const blob = new Blob([editor.value], { type: "text/html" });

  const formData = new FormData();
  formData.append("files", blob, "new.html");
  const file = formData.getAll("files");

  upload(file);
};

setTimeout(() => {
  console.log("Документ обновлен через интервал времени");
}, 5000 * 60);

onBeforeUnmount(() => {
  console.log("Документ обновлен при переходе на другие страницы");
});
</script>

<style lang="scss"></style>
