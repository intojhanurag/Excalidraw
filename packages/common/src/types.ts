import {z} from "zod"

export const CreateUserSchema=z.object({
    username:z.string().min(3).max(20),
    password:z.string(),
    name:z.string(),
    email:z.string(),
    photo:z.string().optional()

})
export const SigninSchema=z.object({
    email: z.string().min(1),
    password: z.string().min(1)
})
export const CreateRoomSchema=z.object({
   
    name:z.string().min(3).max(20)

})