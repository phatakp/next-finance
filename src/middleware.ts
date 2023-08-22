import { withAuth } from "next-auth/middleware";
export default withAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: function ({ token }) {
      return !!token;
    },
  },
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/accounts/:path*",
    "/activity/:path*",
    "/groups/:path*",
  ],
};
