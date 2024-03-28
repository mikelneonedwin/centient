import { createStore, keys, set, get, del as _del, getMany } from "idb-keyval";

// Firestore utility functions
import * as db from './firebase/transaction';
import check from "./check";

// Communicate with other stores
import { Account, Budget } from ".";

export const store = createStore('app', 'trans-store');

/**
 * Perform a new transaction
 * @param {App.Transaction & Omit<App.Transaction, "id">} data 
 * @param {boolean=} sync Manually control adding transaction to database
 * @returns {Promise<App.Transaction>}
 */
export async function create(data, sync = true) {
    data.id = Date.now();
    await set(data.id, data, store);
    if (sync) db.create(data);
    return data;
}

/**
 * Retrive a transaction from database
 * @param {number} id 
 * @returns {Promise<App.Transaction | undefined>}
 */
export async function read(id) {
    const _1 = await get(id, store);

    if (_1) return _1;

    const _2 = await db.read(id);

    if (_2) {
        create(_2, false);
        return _2;
    }
}

/**
 * Update an already existing transaction
 * @param {number} id 
 * @param {Partial<App.Transaction>} data 
 * @return {Promise<App.Transaction | undefined>}
 */
export async function update(id, data) {
    // check if transaction exists
    const transaction = await read(id);
    if (transaction) {
        Object.assign(transaction, data);
        await set(id, transaction, store);
        db.update(id, data);
        return transaction;
    }
    else console.warn(`Transaction with id "${id}" does not exist`);
}

/**
 * Delete an existing transaction
 * @param {number} id 
 */
export async function del(id) {
    const data = await read(id);
    if (data) {
        _del(id, store);
        db.del(id);

        if (data.type === "expense" || data.type === "transfer") {
            const account = await Account.read(data.accountId);
            if (account) {
                const balance = account.balance + data.amount
                Account.update(data.accountId, { balance });
            }
        }
        if (data.type === "income") {
            const account = await Account.read(data.accountId);
            if (account) {
                const balance = account.balance - data.amount;
                Account.update(data.accountId, { balance });
            }
        }
        if (data.type === "transfer" && data.budgetId && data.budgetStamp) {
            const budget = await Budget.read(data.budgetId);
            if (budget) {
                const balance = budget.amount[data.budgetStamp] - data.amount;
                Budget.update(data.budgetId, { 
                    amount: {
                        [data.budgetStamp]: balance
                    }
                })
            }
        }
    }
}

export async function data() {
    const ids = await keys(store);
    const _1 = await getMany(ids, store);

    if (check(_1)) return _1;

    const _2 = await db.data();

    if (_2 && check(_2)) {
        _2.forEach((transaction) =>
            create(transaction, false)
        )
        return _2;
    }

    return [];
}