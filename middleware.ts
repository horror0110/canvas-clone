import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/api/uploadthing" , "/api/order" , "/api/courses/:id" , "/api/courses" , "/api/mycourse/:id" , "/api/mycourse"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
