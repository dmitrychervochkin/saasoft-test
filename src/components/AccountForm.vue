<template>
    <div class="form-container">
        <div class="header-block">
            <h1>Учетные записи</h1>
            <div class="add-btn" @click="addAccount">+</div>
        </div>

        <div class="hint">
            <div class="question">?</div>
            <div>Для указания нескольких меток используйте ;</div>
        </div>

        <div class="table-header">
            <span class="header-cell">Метки</span>
            <span class="header-cell">Тип записи</span>
            <span class="header-cell">Логин</span>
            <span class="header-cell">Пароль</span>
            <span class="header-cell">Действия</span>
        </div>

        <AccountItem v-for="acc in accounts" :key="acc.id" :account="acc" />
    </div>
</template>

<script lang="ts" setup>
import { useAccountsStore } from "../stores/accounts";
import AccountItem from "./AccountItem.vue";

const store = useAccountsStore();
const accounts = store.accounts;
const addAccount = () => store.addAccount();
</script>

<style scoped>
.form-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.header-block {
    display: flex;
    align-items: center;
    gap: 20px;
}
.header-block h1 {
    font-size: 16px;
    margin: 0;
    font-family: sans-serif;
}
.hint {
    font-size: 12px;
    background: #e3e9f1;
    border-radius: 5px;
    padding: 5px 10px;
    display: flex;
    gap: 10px;
    align-items: center;
    color: #757575;
}
.question {
    border-radius: 50%;
    border: 1px solid #757575;
    padding: 2px 5px;
}
.add-btn {
    width: 32px;
    height: 32px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #cecece;
    color: #a2a2a2;
    cursor: pointer;
    font-size: 20px;
}
.add-btn:hover {
    background-color: #ecececff;
}
.table-header {
    display: grid;
    grid-template-columns: 2fr 1fr 2fr 2fr 1fr;
    gap: 8px;
    margin-bottom: 8px;
    color: #a2a2a2;
    font-size: 12px;
    font-family: sans-serif;
    font-weight: bold;
}
.header-cell {
    text-align: left;
    align-self: start;
    padding-left: 4px;
}
</style>
