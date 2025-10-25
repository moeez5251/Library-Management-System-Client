from fastapi import Request, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware
from app.utils.jwt_handler import verify_token

class AuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        """
        Middleware to verify JWT token for every request except public routes.
        Looks for the token in cookies (preferred) or Authorization header.
        """
        # Public routes that don’t need authentication
        public_paths = [
            "/"
            "/req/users/auth-users",          # Login
        ]

        # Skip verification for OPTIONS (CORS preflight), root, or public routes
        if (
            request.method == "OPTIONS"
            or request.url.path == "/"  # Exact match for root only
            or any(request.url.path.startswith(path) for path in public_paths)
        ):
            return await call_next(request)

        # Get token from cookies
        token = request.cookies.get("token")
        
        # Optional: support Bearer tokens (e.g., for testing via Postman)
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