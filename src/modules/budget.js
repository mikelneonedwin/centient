import { createStore, keys, set, get, del as _del, getMany } from "idb-keyval";

// Firestore utility functions
import * as db from './firebase/budget';
import check from "./check";

export const store = createStore('app', 'budget-store');

/**
 * Add a new budget
 * @param {App.Budget & Omit<App.Budget, "id">} data 
 * @param {boolean=} sync Manually control adding budget to database
 * @returns {Promise<App.Budget>}
 */
export async function create (data, sync = true) {
    data.id = Date.now();
    await set(data.id, data, store);
    if (sync) db.create(data);
    return data;
}

/**
 * Retrive a budget from database
 * @param {number} id 
 * @returns {Promise<App.Budget | undefined>}
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
 * Update an already existing budget
 * @param {number} id 
 * @param {Partial<App.Budget>} data 
 * @return {Promise<App.Budget | undefined>}
 */
export async function update(id, data) {
    // check if budget exists
    const budget = await read(id);
    if(budget) {
        Object.assign(budget, data);
        await set(id, budget, store);
        db.update(id, data);
        return budget;
    }
    else console.warn(`Budget with id "${id}" does not exist`);
}

/**
 * Delete an existing budget
 * @param {number} id 
 */
export async function del(id) {
    await _del(id, store);
    db.del(id);
}

export async function data() {
    const ids = await keys(store);
    const _1 = await getMany(ids, store);
    
    if(check(_1)) return _1;

    const _2 = await db.data();

    if (_2 && check(_2)) {
        _2.forEach((budget) => 
            create(budget, false)
        )
        return _2;
    }

    return [];
}