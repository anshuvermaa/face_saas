import { auth,authMiddleware,currentUser, redirectToSignIn,clerkClient} from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";


export default  authMiddleware({
  publicRoutes: ["/", "/contact","/api/clerk","/api/routes","/api/users","/api/webhook"],
  async afterAuth(auth, req, evt) {
    // console.log("fucking usr profile is ",auth.)
    if(!auth.userId && !auth.isPublicRoute){
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    try {
      const session =await auth.sessionClaims
      console.dir(session,{depth:null})
      if(!session){
        throw new Error("session not found")
      }
      if (req.nextUrl.pathname.startsWith("/admin")) {
        if (session.metadata.role === "admin") {
          return NextResponse.next(); // Allow access to admin routes for admins
        } else {
          // Handle non-admin users trying to access admin routes
          return NextResponse.redirect(new URL("/", req.url)); // Redirect to homepage or a permission-denied page
        }
      }
      if (!auth.userId && !auth.isPublicRoute) {
        return redirectToSignIn({ returnBackUrl: req.url });
      }
      // Redirect logged in users to organization selection page if they are not active in an organization
     
      // If the user is logged in and trying to access a protected route, allow them to access route
      if (auth.userId && !auth.isPublicRoute) {
        return NextResponse.next();
      }
      
    } catch (error) {
      console.log("errror is",error)
      
    }
   
    // Allow users visiting public routes to access them
    return NextResponse.next();
   
 
  },
});

// export default authMiddleware({
  
// });
 



export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)","/hello"],
};
