<template>
  <div class="main-container">
    <div class="header">
      <h1>Hylable Badge Maker</h1>
    </div>
    <div>
      <p>Step1 と Step2 を行い「名札を保存」ボタンを押してください。</p>
    </div>
    <div class="btn-container">
      <h2>Step1.</h2>
      <p>参加者名簿をアップロード</p>
      <v-btn
        color="secondary"
        rounded="xl"
        prepend-icon="mdi-file"
        @click="selectCsvFile()"
      >csv ファイルを選択</v-btn>
    </div>
    <div>
      <h2>Step1.</h2>
      <v-text-field
        v-model="question"
        label="ひとことクエスチョンを入力（例: 最近ハマっていることは？）"
        variant="underlined"
      ></v-text-field>
    </div>
    <div>
      <h2>Step2.</h2>
      <p>参加者を選択してください。</p>
      <v-table
        class="ma-4"
      >
        <thead>
          <tr>
            <th>参加</th>
            <th>名札に載せる名前</th>
            <th>お皿に載せる名前</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="badgeName in badgeNames">
            <td>
              <v-checkbox-btn></v-checkbox-btn>
            </td>
            <td>おおわだ</td>
            <td>大和田</td>
          </tr>
        </tbody>
      </v-table>
    </div>
    <div>
      <h2>Step3.</h2>
      <p>保存先のフォルダを選択してください。</p>
      <div class="path-display-container">
        <v-btn
          color="secondary"
          rounded="xl"
          prepend-icon="mdi-folder"
          @click="selectSaveDirectory()"
        >フォルダを選択</v-btn>
        <span>保存先: {{ saveDirectory || '未選択' }}</span>
      </div>
    </div>
    <div class="btn-container">
      <h2>Step4.</h2>
      <p>下記のボタンを押して名札を作成してください。作成後、選択したフォルダに保存されます。</p>
      <v-btn
        color="primary"
        rounded="xl"
        append-icon="mdi-download"
        @click="createBadge()"
      >名札を作成</v-btn>
    </div>
    <p>お疲れ様でした。これで名札が作成されました。</p>
  </div>
</template>

<script setup>
const question = ref('')
const csvPath = ref(undefined)
const saveDirectory = ref(undefined)

const selectCsvFile = async () => {
  const filePath = await window.mainAPI.selectCsvFile()
  if (filePath) {
    csvPath.value = filePath
  }
}

const selectSaveDirectory = async () => {
  const directory = await window.mainAPI.openFolderDialog()
  if (directory) {
    saveDirectory.value = directory
  }
}

const createBadge = async () => {
  const filePath = await window.mainAPI.createBadge(
    question.value, csvPath.value, saveDirectory.value
  )
  console.log(filePath)
  window.mainAPI.showFolder(filePath)
}
</script>

<style lang="css" scoped>
.main-container {
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.header {
  display: flex;
  justify-content: center;
}
.btn-container {
  display: flex;
  flex-direction: column;
}
.btn-container > .v-btn {
  width: 50%;
  margin: 1.5rem;
  align-self: center;
}
.path-display-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
  padding: 1em 0;
  color: gray;
  border-radius: 8px;
}
</style>
