from fastapi import Request, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware
from app.utils.jwt_handler import verify_token

class AuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        """
        Middleware to verify JWT token for every request except public routes.
        Looks for the token in cookies (preferred) or Authorization header.
        """

        # ✅ Add commas between items
        public_paths = [
            "/",                      # Home
            "/favicon.ico",            # Browser icon
            "/req/users/auth-users",   # Login endpoint
            "/req/users/login",       # Login endpoint
            "/req/users/signup",       # Login endpoint
            "/req/users/exist",       # Login endpoint
            "/req/resetpass/create",       # Login endpoint
            "/req/mail/send-mail",       # Login endpoint
            "/req/otp/verify",       # Login endpoint
        ]

        # Skip verification for OPTIONS, root, favicon, or any public route
        if (
            request.method == "OPTIONS"
            or request.url.path in public_paths  # ✅ exact match check
        ):
            return await call_next(request)

        # ✅ Optionally allow prefix-based public routes
        public_prefixes = [
            "/docs", "/openapi.json", "/static", "/public"
        ]
        if any(request.url.path.startswith(prefix) for prefix in public_prefixes):
            return await call_next(request)

        # Get token from cookies
        token = request.cookies.get("token")

        # Optional: support Bearer tokens (for Postman, etc.)
        if not token:
            auth_header = request.headers.get("Authorization")
            if auth_header and auth_header.startswith("Bearer "):
                token = auth_header.split(" ")[1]

        # If no token found, reject the request
        if not token:
            raise HTTPException(status_code=401, detail="Missing access token")

        # Verify token validity
        payload = verify_token(token)
        if not payload:
            raise HTTPException(status_code=403, detail="Invalid or expired token")

        # Store decoded token payload for later use
        request.state.user = payload

        # Continue request chain
        response = await call_next(request)
        return response
