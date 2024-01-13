import {GithubSignInButton, GoogleSignInButton} from "@/app/ui/components/auth/authButtons";
import Link from "next/link";
import SignUpForm from "@/app/ui/components/auth/SignUpForm";
import {signUpUser} from "@/app/sign-up/actions";

export default function SignUpPage() {
    return (
        <div className="flex justify-center items-center">
            <div className="rounded-lg shadow-lg flex flex-col items-center bg-neutral px-4 py-3 my-4 max-w-xl">
                <h3 className="text-2xl font-bold">Sign up</h3>
                <SignUpForm signUpUser={signUpUser}/>

                <p className="divider divider-info text-lg font-bold">Or</p>
                <GithubSignInButton />
                <GoogleSignInButton />
                <Link href="/login" className="text-info font-bold my-2 hover:underline">Already have a account? Log in</Link>
            </div>
        </div>
    )
}