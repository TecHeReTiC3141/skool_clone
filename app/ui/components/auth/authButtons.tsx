"use client"

import { FaGoogle, FaGithub } from "react-icons/fa";
import {signIn} from "next-auth/react";


export function GoogleSignInButton() {
    const handleClick = async () => {
        await signIn("google", {
            callbackUrl: "/",
        });
    };

    return (
        <button
            onClick={handleClick}
            className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl
             transition-colors duration-300 bg-base-100 border-2 border-black rounded-lg focus:shadow-outline hover:bg-base-200"
        >
            <FaGoogle />
            <span className="ml-4">Continue with Google</span>
        </button>
    );
}

export function GithubSignInButton() {
    const handleClick = async () => {
        await signIn("github", {
            callbackUrl: "/",
        });
    };


    return (
        <button
            onClick={handleClick}
            className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-2 text-xl
            transition-colors duration-300 bg-base-100 border-2 border-black rounded-lg focus:shadow-outline hover:bg-base-200"
        >
            <FaGithub />
            <span className="ml-4">Continue with Github</span>
        </button>
    );
}