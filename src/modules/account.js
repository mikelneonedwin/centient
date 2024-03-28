import { get, keys, set, del as _del, getMany } from "idb-keyval";
import { createStore } from "idb-keyval";

// Firestore utility functions
import * as db from "./firebase/account";
import check from "./check";

export const store = createStore("app", "account-store");

/**
 * Get data for all the stores simultaneously
 * @returns {Promise<App.Account[]>}
 */
export async function data() {
    const ids = await keys(store);
    const _1 = await getMany(ids, store);

    if (check(_1)) return _1;

    const _2 = await db.data();

    if (_2 && check(_2)) {

        _2.forEach((acct) => create(acct, false));

        return _2;
    }

    return []
}

/**
 * Create an account
 * @param {App.Account & Omit<App.Account, "id">} data 
 * @param {boolean=} sync Manually control adding transaction to database
 */
export async function create(data, sync = true) {
    data.id = Date.now();
    await set(data.id, data, store);
    if (sync) db.create(data);
    return data;
}

/**
 * Update an already existing account
 * @param {number} id 
 * @param {Partial<App.Account>} data
 * @return {Promise<App.Account | undefined>} 
 */
export async function update(id, data) {
    // check if account exists
    const account = await read(id);
    if (account) {
        Object.assign(account, data);
        await set(id, account, store);
        db.update(id, data);
        return account;
    }
    else console.warn(`Account with id "${id}" does not exist`);
}

/**
 * Delete an existing account
 * @param {number} id
 */
export async function del(id) {
    await _del(id, store);
    db.del(id);
}

/**
 * Retrieve an account from the database
 * @param {number} id 
 * @returns {Promise<App.Account | undefined>}
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