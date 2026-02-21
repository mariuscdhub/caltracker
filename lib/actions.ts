
import { db, auth } from "@/lib/firebase";
import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    getDocs,
    query,
    where,
    orderBy,
    Timestamp,
    updateDoc,
    serverTimestamp,
    setDoc,
    limit
} from "firebase/firestore";

// --- HELPERS ---

const getUserId = () => {
    const user = auth.currentUser;
    if (!user) throw new Error("Unauthorized");
    return user.uid;
};

// --- FOOD ACTIONS ---

export interface CustomFood {
    id: string;
    name: string;
    calories: number;
    protein: number;
    type: 'cru' | 'cuit';
    userId: string;
}

export async function getFoods(searchQuery: string = ""): Promise<CustomFood[]> {
    const userId = getUserId();
    const foodsRef = collection(db, "foods");

    // Simple client-side filtering for now as Firestore queries are strict
    const q = query(foodsRef, where("userId", "==", userId));
    const snapshot = await getDocs(q);

    let foods = snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() } as CustomFood));

    if (searchQuery) {
        foods = foods.filter((food) =>
            food.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    return foods;
}

export async function addCustomFood(data: { name: string, calories: number, protein: number, type: 'cru' | 'cuit' }) {
    const userId = getUserId();
    await addDoc(collection(db, "foods"), {
        userId,
        ...data,
        createdAt: serverTimestamp()
    });
}

export async function deleteFood(foodId: string) {
    await deleteDoc(doc(db, "foods", foodId));
}

// --- LOG ACTIONS ---

export async function getDailyLogs(dateStr: string) {
    const userId = getUserId();
    const logsRef = collection(db, "logs");

    const q = query(
        logsRef,
        where("userId", "==", userId),
        where("date", "==", dateStr),
        orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
}

export async function addLog(data: { name: string, weight: number, calories: number, protein: number, type: 'cru' | 'cuit', date: string, foodId: string }) {
    const userId = getUserId();
    await addDoc(collection(db, "logs"), {
        userId,
        ...data,
        createdAt: serverTimestamp()
    });
}

export async function deleteLog(logId: string) {
    await deleteDoc(doc(db, "logs", logId));
}

// --- SETTINGS ACTIONS ---

export async function getDailyGoal() {
    const userId = getUserId();
    const docRef = doc(db, "user_settings", userId);
    const snapshot = await getDocs(query(collection(db, "user_settings"), where("userId", "==", userId), limit(1)));

    if (snapshot.empty) return 2500;
    return snapshot.docs[0].data().dailyGoal;
}

export async function updateDailyGoal(newGoal: number) {
    const userId = getUserId();
    const userSettingsRef = collection(db, "user_settings");
    const q = query(userSettingsRef, where("userId", "==", userId));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
        await addDoc(userSettingsRef, { userId, dailyGoal: newGoal });
    } else {
        await updateDoc(doc(db, "user_settings", snapshot.docs[0].id), { dailyGoal: newGoal });
    }
}

// --- RECIPE ACTIONS ---

export async function getRecipes() {
    const userId = getUserId();
    const q = query(collection(db, "recipes"), where("userId", "==", userId), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
}

export async function createRecipe(data: { name: string, totalCalories: number, ingredients: any[], notes?: string }) {
    const userId = getUserId();
    await addDoc(collection(db, "recipes"), {
        userId,
        ...data,
        createdAt: serverTimestamp()
    });
}

export async function deleteRecipe(recipeId: string) {
    await deleteDoc(doc(db, "recipes", recipeId));
}
