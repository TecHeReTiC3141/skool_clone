"use client"

import {useRouter} from "next/navigation";
import {signIn, SignInResponse} from "next-auth/react";
import {FormEvent, useState} from "react";

interface SignUpFormProps {
    signUpUser: (formData: FormData) => Promise<SignInResponse | undefined>
}

export default function SignUpForm({signUpUser}: SignUpFormProps) {

    const [error, setError] = useState("");
    const router = useRouter();

    async function handleSubmit(ev: FormEvent<HTMLFormElement>) {
        ev.preventDefault();
        setError("");
        const formData = new FormData(ev.currentTarget);
        let signInResponse;
        try {
            signInResponse = await signUpUser(formData);
        } catch (err: any) {
            setError(err.message);
            return;
        }

        if (signInResponse && !signInResponse.error) {
            router.push("/");
        } else {
            setError("Check your email and password, maybe they are wrong");
        }
    }

    return (
        <form
            className="w-full mt-8 text-xl font-semibold flex flex-col"
            onSubmit={ev => handleSubmit(ev)}
        >
            {error && (
                <span className="p-4 mb-2 text-lg font-semibold text-white bg-red-500 rounded-md">
          {error}
        </span>
            )}

            <input
                type="text"
                name="name"
                placeholder="Username"
                required
                className="w-full px-4 py-4 mb-4 input input-bordered  rounded-md"
            />

            <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="w-full px-4 py-4 mb-4 input input-bordered  rounded-md"
            />

            <input
                type="password"
                name="password"
                placeholder="Password"
                required
                className="w-full px-4 py-4 mb-4 input input-bordered  rounded-md"
            />

            <button
                type="submit"
                className="w-full h-12 px-6 mt-4 text-lg btn btn-primary"
            >
                Sign up
            </button>
        </form>
    )

}