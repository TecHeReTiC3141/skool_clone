import {NextAuthOptions} from "next-auth";
import {PrismaAdapter} from "@auth/prisma-adapter";
import prisma from "@/app/lib/db/prisma";
import {Adapter} from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@mail.com",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },
            async authorize(credentials) {
                if (!credentials || !credentials.email || !credentials.password) {
                    return null;
                }

                const user = await prisma.user.findFirst({
                    where: {email: credentials.email},
                });

                console.log("found user", user, await bcrypt.compare( credentials.password, user?.password || "",));
                if (user && await bcrypt.compare( credentials.password, user.password || "")) {
                    const {id,  password, ...userFields} = user;
                    console.log("logged", user);
                    return user;
                }
                return null;
            }
        })
    ],
    pages: {
        signIn: "/login",
        error: "/login",
    }

}