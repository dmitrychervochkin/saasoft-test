<template>
  <div id="app">
    <div class="container">
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAccountsStore } from './stores/accounts';

const store = useAccountsStore();
const saved = localStorage.getItem('accounts');
if (saved) store.$patch({ accounts: JSON.parse(saved) });

store.$subscribe(() => {
  localStorage.setItem('accounts', JSON.stringify(store.accounts));
});
</script>

<style scoped>
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.container {
  width: 80%;
  max-width: 600px;
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}
</style>