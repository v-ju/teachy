import { z } from "zod/v4"

export const signupSchema = z.object({
    name: z.string()
        .min(2,{error: (issue) => {
                if (issue.code === "too_small") {
                return `Value must be >${issue.minimum}`
            }}
        })
        .max(15, {error: (issue) => {
            if (issue.code === 'too_big') {
                return `Value must be <${issue.maximum}`
            }}
        }),

    email: z.email(),

    password: z.string()
        .min(8,{error: (issue) => {
                if (issue.code === "too_small") {
                return `Value must be >${issue.minimum}`
            }}
        })
        .max(15, {error: (issue) => {
            if (issue.code === 'too_big') {
                return `Value must be <${issue.maximum}`
            }}
        })
        .regex(/[A-Z]/,"Password must include atleast one uppercase letter.")
        .regex(/[a-z]/,"Password must include atleast one lowercase letter.")
        .regex(/\d/,"Password must include atleast one digit.")
        .regex(/[!@#$%&*?]/,"Password must include atleast one special character.")
        
})

export const signinSchema = z.object({

    email: z.email(),

    password: z.string()
        .min(8,{error: (issue) => {
                if (issue.code === "too_small") {
                return `Value must be >${issue.minimum}`
            }}
        })
        .max(15, {error: (issue) => {
            if (issue.code === 'too_big') {
                return `Value must be <${issue.maximum}`
            }}
        })
        .regex(/[A-Z]/,"Password must include atleast one uppercase letter.")
        .regex(/[a-z]/,"Password must include atleast one lowercase letter.")
        .regex(/\d/,"Password must include atleast one digit.")
        .regex(/[!@#$%&*?]/,"Password must include atleast one special character.")
})

export const googleSignInSchema = z.object({
    name: z.string()
        .min(2,{error: (issue) => {
                if (issue.code === "too_small") {
                return `Value must be >${issue.minimum}`
            }}
        })
        .max(15, {error: (issue) => {
            if (issue.code === 'too_big') {
                return `Value must be <${issue.maximum}`
            }}
    }),

    email: z.email(),

    googleId: z.string(),

    image: z.string()
})

export const createRoomSchema = z.object({
    name: z.string()
})

