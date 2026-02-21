<script setup lang="ts">
const { badgeNames, loadBadgeNamesFromCsv } = useBadgeNames();

const csvPath = ref<string | undefined>(undefined);
const saveDir = ref<string | undefined>(undefined);
const participantEmails = ref<string[]>([]);
const question = ref('');
const isCreatingBadge = ref(false);

onMounted(async () => {
  try {
    saveDir.value = await window.mainAPI.getDownloadPath();
  } catch (error) {
    console.error("Failed to load default download path:", error);
  }
});

watch(csvPath, async (newPath) => {
  if (newPath) {
    await loadBadgeNamesFromCsv(newPath);
  }
}, { immediate: true });

const selectCsvFile = async () => {
  const filePath = await window.mainAPI.selectCsvFile();
  if (filePath) {
    csvPath.value = filePath;
  }
}

const createBadge = async () => {
  isCreatingBadge.value = true;
  try {
    const filePath = await window.mainAPI.createBadge(
      question.value,
      csvPath.value,
      saveDir.value,
      [...participantEmails.value]
    );
    await window.mainAPI.showFolder(filePath);
  } catch (error) {
    console.error("Error at badge creation:", error);
  } finally {
    isCreatingBadge.value = false;
  }
}
</script>

<template>
  <div class="main-container">
    <div class="header">
      <h1>Hylable Badge Maker</h1>
    </div>
    <div class="btn-container">
      <h2>Step1.</h2>
      <p>参加者名簿を CSV でアップロードしてください。</p>
      <v-btn
        color="primary"
        rounded="xl"
        prepend-icon="mdi-file-upload"
        @click="selectCsvFile()"
      >CSV ファイルを選択</v-btn>
      <v-sheet
        class="bg-grey-lighten-3 border rounded-lg pa-4 ma-4"
      >
        <p class="mb-4 d-inline-flex align-center">
          <v-icon icon="mdi-information" color="grey" class="mr-2"></v-icon>
          CSV には以下の列名が必要です。
        </p>
        <ul class="ps-4">
          <li><strong>email</strong>: メールアドレス（重複禁止）</li>
          <li><strong>on_badge</strong>: 名札に載せる名前</li>
          <li><strong>on_plate</strong>: お皿に載せる名前</li>
        </ul>
      </v-sheet>
    </div>
    <div>
      <h2>Step2.</h2>
      <p>参加者を選択してください。</p>
      <v-table v-if="badgeNames.length > 0" class="ma-4">
        <thead>
          <tr>
            <th>参加</th>
            <th>名札に載せる名前</th>
            <th>お皿に載せる名前</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="badgeName in badgeNames" :key="badgeName.email">
            <td>
              <v-checkbox-btn
                v-model="participantEmails"
                :value="badgeName.email"
              ></v-checkbox-btn>
            </td>
            <td>{{ badgeName.onBadge }}</td>
            <td>{{ badgeName.onPlate }}</td>
          </tr>
        </tbody>
      </v-table>
      <p v-else class="text-error text-center ma-4">CSV が正しくアップロードされていません。</p>
    </div>
    <div>
      <h2>Step3.</h2>
      <p>ひとことクエスチョンを入力してください。</p>
      <p class="text-caption">「？」を含めて 13 文字まで 現在: {{ question.length }}/13 文字</p>
      <v-text-field
        v-model="question"
        placeholder="最近ハマっていることは？"
        variant="underlined"
        class="px-4"
      ></v-text-field>
    </div>
    <div class="btn-container">
      <h2>Step4.</h2>
      <p>下記のボタンを押して名札を作成してください（約 20 秒かかります）。<br>作成後、ダウンロードフォルダに保存されます。</p>
      <v-btn
        color="success"
        rounded="xl"
        prepend-icon="mdi-download"
        :disabled="participantEmails.length === 0"
        :loading="isCreatingBadge"
        @click="createBadge()"
      >名札を作成</v-btn>
    </div>
    <p class="mb-8">お疲れ様でした。これで名札が作成されました。</p>
  </div>
</template>

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
</style>
