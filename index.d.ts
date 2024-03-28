import { Firestore as FirestoreType } from "firebase/firestore";
import { UseStore as UseStoreType } from "idb-keyval";

declare module "*json"

/// <reference path="index.d.ts" />

declare namespace App {
    interface Account {
        name: string,
        id: number,
        initial: number,
        balance: number
    }
    interface Transaction {
        type: 'expense' | 'income' | 'transfer',
        date: [number, number, number],
        amount: number,
        accountId: number,
        budgetId?: number,
        budgetStamp?: number
        id: number
    }
    interface Budget {
        name: string;
        type: 'frequent' | 'goal' | 'liability' | 'pending',
        reminder: number,
        id: number,
        amount: {
            [x: number]: number
        }
    }

    type Ref<T> = React.MutableRefObject<React.DetailedHTMLProps<React.HTMLAttributes<T>, T>>;

    type Firestore = FirestoreType;

    type UseStore = UseStoreType;

    namespace Loader {
        
        interface Dashboard {
            /** Expenses user plans for in the near future */
            goals: (Omit<App.Budget, "type"> & {
                type: "goal"
            })[],
            /** User's transaction history */
            transactions: App.Transaction[],
            /** All expenses incured for the month */
            spending: App.Transaction[],
            /** User's accounts */
            accounts: App.Account[]
        }
    }
}

export = App;
export as namespace App;