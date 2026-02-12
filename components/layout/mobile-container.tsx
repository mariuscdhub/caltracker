import { cn } from "@/lib/utils";

export function MobileContainer({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={cn("container mx-auto max-w-md px-4 pb-24 pt-6 h-full", className)}>
            {children}
        </div>
    );
}
