import { defineStore } from "pinia";
import { ref } from "vue";

export interface Account {
    id: string;
    labels: { text: string }[];
    type: "LDAP" | "Локальная";
    login: string;
    password: string | null;
}

export const useAccountsStore = defineStore("accounts", () => {
    const accounts = ref<Account[]>([]);

    const addAccount = () => {
        accounts.value.push({
            id: crypto.randomUUID(),
            labels: [],
            type: "LDAP",
            login: "",
            password: null,
        });
    };

    const removeAccount = (id: string) => {
        const index = accounts.value.findIndex((acc) => acc.id === id);
        if (index !== -1) accounts.value.splice(index, 1);
    };

    const updateAccount = (updated: Account) => {
        const index = accounts.value.findIndex((acc) => acc.id === updated.id);
        if (index !== -1) accounts.value.splice(index, 1, { ...updated });
    };

    return { accounts, addAccount, removeAccount, updateAccount };
});
