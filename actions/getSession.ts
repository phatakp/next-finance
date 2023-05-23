import { Session } from "next-auth";

export default async function getSession(cookie: string): Promise<Session> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_AUTH_URL}/api/auth/session`,
        {
            headers: {
                cookie,
            },
        }
    );

    const session = await response.json();

    return Object.keys(session).length > 0 ? session : null;
}
