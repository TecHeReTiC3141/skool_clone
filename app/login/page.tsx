import CredentialsForm from "@/app/ui/components/auth/CredentialsForm";
import {GithubSignInButton, GoogleSignInButton} from "@/app/ui/components/auth/authButtons";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="flex justify-center items-center">
            <div className="rounded-lg shadow-lg flex flex-col items-center bg-neutral px-4 py-3 my-4">
                <h3 className="text-2xl font-bold">Log in</h3>
                <CredentialsForm />

                <p className="divider divider-info text-lg font-bold">Or</p>
                <GithubSignInButton />
                <GoogleSignInButton />
                <Link href="/sign-up" className="text-info font-bold my-2 hover:underline">Do not have a account? Create one</Link>
            </div>
        </div>
    )
}