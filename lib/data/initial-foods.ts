
export type FoodType = 'cru' | 'cuit';

export interface StaticFood {
    id: number;
    name: string;
    kcal: number;
    protein: number;
    carb: number;
    fat: number;
    type: FoodType;
}

export const INITIAL_FOODS: StaticFood[] = [
    { id: 101, name: 'Riz Basmati', kcal: 360, protein: 8, carb: 78, fat: 1, type: 'cru' },
    { id: 102, name: 'Riz Basmati', kcal: 120, protein: 2.5, carb: 25, fat: 0.3, type: 'cuit' },
    { id: 103, name: 'Pâtes (Blé)', kcal: 350, protein: 12, carb: 70, fat: 1.5, type: 'cru' },
    { id: 104, name: 'Pâtes (Blé)', kcal: 130, protein: 4.5, carb: 25, fat: 0.5, type: 'cuit' },
    { id: 105, name: 'Pomme de terre', kcal: 80, protein: 2, carb: 17, fat: 0.1, type: 'cru' },
    { id: 106, name: 'Pomme de terre (Vapeur)', kcal: 85, protein: 2, carb: 19, fat: 0.1, type: 'cuit' },
    { id: 107, name: 'Pain Complet', kcal: 250, protein: 9, carb: 45, fat: 3, type: 'cru' },
    { id: 108, name: 'Pain Blanc (Baguette)', kcal: 280, protein: 8, carb: 55, fat: 1, type: 'cru' },
    { id: 109, name: 'Quinoa', kcal: 370, protein: 14, carb: 64, fat: 6, type: 'cru' },
    { id: 110, name: 'Quinoa', kcal: 120, protein: 4.4, carb: 21, fat: 1.9, type: 'cuit' },
    { id: 111, name: 'Lentilles', kcal: 310, protein: 25, carb: 45, fat: 1, type: 'cru' },
    { id: 112, name: 'Lentilles', kcal: 115, protein: 9, carb: 20, fat: 0.4, type: 'cuit' },
    { id: 113, name: 'Flocons d\'Avoine', kcal: 370, protein: 13, carb: 59, fat: 7, type: 'cru' },
    { id: 114, name: 'Semoule (Couscous)', kcal: 360, protein: 12, carb: 72, fat: 1, type: 'cru' },
    { id: 115, name: 'Semoule (Couscous)', kcal: 110, protein: 3.5, carb: 22, fat: 0.5, type: 'cuit' },
    { id: 201, name: 'Blanc de Poulet', kcal: 105, protein: 23, carb: 0, fat: 1.2, type: 'cru' },
    { id: 202, name: 'Blanc de Poulet', kcal: 165, protein: 31, carb: 0, fat: 3.6, type: 'cuit' },
    { id: 203, name: 'Steak Haché 5%', kcal: 130, protein: 20, carb: 0, fat: 5, type: 'cru' },
    { id: 204, name: 'Steak Haché 5%', kcal: 170, protein: 26, carb: 0, fat: 6.5, type: 'cuit' },
    { id: 250, name: 'Saumon', kcal: 208, protein: 20, carb: 0, fat: 13, type: 'cru' },
    { id: 251, name: 'Saumon', kcal: 230, protein: 25, carb: 0, fat: 14, type: 'cuit' },
    { id: 280, name: 'Oeuf', kcal: 140, protein: 12, carb: 0.7, fat: 9.5, type: 'cru' },
    { id: 281, name: 'Oeuf (Dur/Plat)', kcal: 155, protein: 13, carb: 1.1, fat: 11, type: 'cuit' },
    { id: 301, name: 'Carotte', kcal: 41, protein: 0.9, carb: 9.6, fat: 0.2, type: 'cru' },
    { id: 302, name: 'Carotte', kcal: 35, protein: 0.8, carb: 8, fat: 0.2, type: 'cuit' },
    { id: 303, name: 'Courgette', kcal: 17, protein: 1.2, carb: 3, fat: 0.1, type: 'cru' },
    { id: 304, name: 'Courgette', kcal: 20, protein: 1.5, carb: 3.5, fat: 0.2, type: 'cuit' },
    { id: 309, name: 'Tomate', kcal: 18, protein: 0.9, carb: 3.9, fat: 0.2, type: 'cru' },
    { id: 312, name: 'Avocat', kcal: 160, protein: 2, carb: 9, fat: 15, type: 'cru' },
    { id: 401, name: 'Pomme', kcal: 52, protein: 0.3, carb: 14, fat: 0.2, type: 'cru' },
    { id: 402, name: 'Banane', kcal: 89, protein: 1.1, carb: 23, fat: 0.3, type: 'cru' },
    { id: 501, name: 'Fromage Blanc 0%', kcal: 48, protein: 8, carb: 4, fat: 0.1, type: 'cru' },
    { id: 601, name: 'Beurre', kcal: 717, protein: 0.8, carb: 0.1, fat: 81, type: 'cru' },
    { id: 602, name: 'Huile d\'Olive', kcal: 884, protein: 0, carb: 0, fat: 100, type: 'cru' },
];
