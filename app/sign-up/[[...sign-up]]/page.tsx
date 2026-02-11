import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <SignUp appearance={{ elements: { formButtonPrimary: "bg-primary text-primary-foreground hover:bg-primary/90" } }} />
        </div>
    );
}
