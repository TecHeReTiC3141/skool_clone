import {DefaultSession, DefaultUser} from "next-auth";

declare module "next-auth" {

    interface Session {
        user: {
            id: string,
            slug: string,
        } & DefaultSession["user"];
        accessToken: string;
    }

    interface User extends DefaultUser{
        id: string;
        slug: string;
        access_token?: string;
    };

}