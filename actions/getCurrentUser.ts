import getSession from "@/actions/getSession";
import prisma from "@/libs/prismadb";
import { isAxiosError } from "axios";

const getCurrentUser = async () => {
    try {
        const session = await getSession();

        if (!session?.user?.email) return null;

        const currentUser = await prisma.user.findUnique({
            where: { email: session.user.email as string },
        });

        if (!currentUser) return null;

        return currentUser;
    } catch (error) {
        if (isAxiosError(error))
            console.log("Error from getCurrentUser", error.response?.data);
        else console.log("Error from getCurrentUser", error);

        return null;
    }
};

export default getCurrentUser;
