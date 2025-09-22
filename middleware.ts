// import { clerkMiddleware } from "@clerk/nextjs/server";

// export default clerkMiddleware();
// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/board(.*)"]);
const isPublicRoot = createRouteMatcher(["/"]);

export default clerkMiddleware((auth, req) => {
  const { userId, redirectToSignIn } = auth();

  if (isPublicRoot(req) && userId) {
    return Response.redirect(new URL("/dashboard", req.url));
  }
  // Protect dashboard and board routes
  if (isProtectedRoute(req)) {
    if (!userId) return redirectToSignIn();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
