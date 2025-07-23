import JwtUserPayload from '@repo/types/type'

declare global {
    namespace Express {
        interface Request {
            user? : JwtUserPayload
        }
    }
}