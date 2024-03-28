// goals, most recent transactions, spending limits

import { getMany, keys } from "idb-keyval";
import { Account, Budget, Transaction } from "../modules";

/**
 * Retrive all data stored in a particular store
 * @param {App.UseStore} store 
 */
const getData = async (store) => await getMany(await keys(store), store);

/**
 * Load the data necessary to render data in the dashboard
 * @returns {Promise<App.Loader.Dashboard>}
 */
export default async function dashboard () {
    /**
     * @type {App.Budget[]}
     */
    const budgetData = await getData(Budget.store);

    /**
     * @type {App.Transaction[]}
     */
    const transactionData = await getData(Transaction.store);

    /**
     * @type {App.Account[]}
     */
    const accountData = await getData(Account.store);

    const today = new Date();
    const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const thirtyDays = 2592000000;

    return {
        // @ts-expect-error
        goals: budgetData.filter((budget) => budget.type === 'goal'),
        transactions: transactionData,
        spending: transactionData.filter((value) => {
            return value.id - thisMonth.getTime() <= thirtyDays;
        }),
        accounts: accountData
    }
}