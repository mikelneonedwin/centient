/* Always check auth.currentUser before performing any firestore action */

import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

/**
 * Get reference to this user's budgets
 * @returns {[ App.Firestore, string, string ]}
 */
const ref = () => {
    return [
        // @ts-expect-error
        db, 'budgets', auth.currentUser.uid
    ]
}

/**
 * Create a new budget on firestore
 * @param {App.Budget} data 
 */
export async function create(data) {
    if (auth.currentUser)
        setDoc(doc(...ref(), String(data.id)), data);
}

/**
 * Retrieve a budget from firestore
 * @param {number} id
 * @returns {Promise<App.Budget | undefined>} 
 */
export async function read(id) {
    if (auth.currentUser) {
        const snapshot = await getDoc(doc(...ref(), String(id)))
        if (snapshot.exists())
            // @ts-ignore
            return snapshot.data();
    }
}

/**
 * Update existing data on a budget
 * @param {number} id 
 * @param {Partial<App.Account>} data 
 */
export async function update(id, data) {
    if (auth.currentUser)
        updateDoc(doc(...ref(), String(id)), data)
}

/**
 * Delete a budget from firestore
 * @param {number} id 
 */
export async function del(id) {
    if (auth.currentUser) 
        deleteDoc(doc(...ref(), String(id)));
}

/**
 * Get info for all the stores simultaneously from firestore
 * @returns {Promise<App.Budget[] | undefined>}
 */
export async function data() {
    if (auth.currentUser) {
        const snapshot = await getDocs(collection(...ref()));
        // @ts-ignore
        return snapshot.docs;
    }
}