import { userState } from "../atoms/user"; 
import { selector } from "recoil";

export const userEmailstate = selector({
    key:"userEmailstate",
    get:({get})=> {
        const state = get(userState)
        return state.userEmail
    },
})