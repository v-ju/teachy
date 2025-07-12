import 'dotenv/config'

export const JWT_SECRET = process.env.JWT_SECRET || "secretkey"
export const ACCESS_TOKEN_SECRET= process.env.NEXTAUTH_KEY || "access_secret"
export const REFRESH_TOKEN_SECRET= process.env.REFRESH_TOKEN_SECRET || "refresh_secret"