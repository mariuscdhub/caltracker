import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <SignIn appearance={{ elements: { formButtonPrimary: "bg-primary text-primary-foreground hover:bg-primary/90" } }} />
        </div>
    );
}
