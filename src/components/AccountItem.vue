<template>
    <div
        class="account-item"
        :class="{ 'ldap-no-password': account.type === 'LDAP' }"
    >
        <input
            v-model="localLabels"
            @blur="onLabelsBlur"
            placeholder="Метки через ;"
        />

        <select v-model="account.type" @change="onTypeChange">
            <option value="LDAP">LDAP</option>
            <option value="Локальная">Локальная</option>
        </select>
     
        <input
            v-model="account.login"
            @blur="validateField('login')"
            :class="{ error: errors.login }"
            placeholder="Логин"
            maxlength="100"
        />

        <input
            v-if="account.type === 'Локальная'"
            type="password"
            v-model="account.password"
            @blur="validateField('password')"
            :class="{ error: errors.password }"
            placeholder="Пароль"
            maxlength="100"
        />

        <button @click="remove">Удалить</button>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { Account } from "../stores/accounts";
import { useAccountsStore } from "../stores/accounts";

interface Props {
    account: Account;
}
const props = defineProps<Props>();
const store = useAccountsStore();

const errors = reactive({ login: false, password: false });
const localLabels = ref(props.account.labels.map((l) => l.text).join(";"));

const validateField = (field: "login" | "password") => {
    if (field === "login") {
        errors.login =
            !props.account.login.trim() || props.account.login.length > 100;
    }
    if (field === "password" && props.account.type === "Локальная") {
        errors.password =
            !props.account.password?.trim() ||
            props.account.password.length > 100;
    }

    if (!errors.login && !errors.password) {
        store.updateAccount(props.account);
    }
};

const onTypeChange = () => {
    if (props.account.type === "LDAP") props.account.password = null;
    validateField("login"); 
};

const onLabelsBlur = () => {
    props.account.labels = localLabels.value
        .split(";")
        .filter(Boolean)
        .map((text) => ({ text }));

    validateField("login"); 
};

const remove = () => store.removeAccount(props.account.id);
</script>

<style scoped>
.account-item {
    display: grid;
    grid-template-columns: 2fr 1fr 2fr 2fr 1fr;
    gap: 8px;
    margin-bottom: 8px;
    align-items: center;
}
.account-item.ldap-no-password {
    grid-template-columns: 2fr 1fr 4fr 1fr;
}
.account-item input,
.account-item select,
.account-item button {
    width: 100%;
    padding: 4px 6px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}
.account-item button {
    width: auto;
    background-color: #e74c3c;
    color: white;
    border: none;
    cursor: pointer;
}
.account-item button:hover {
    background-color: #c0392b;
}
.error {
    border: 1px solid red;
}
</style>
