
import { DailyProgress } from "@/components/dashboard/daily-progress";
import { AddFoodForm } from "@/components/dashboard/add-food-form";
import { LogList } from "@/components/dashboard/log-list";

export default function JournalPage() {
    return (
        <div className="space-y-6 max-w-2xl mx-auto pb-24">
            <DailyProgress />

            <AddFoodForm />

            <LogList />
        </div>
    );
}
