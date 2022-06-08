import { useReducer } from "react";

interface Props{
    state: {
        username: string
    }
    action: {
        type : string
        payload: string
    }
}

export default function UserReducer({state, action} : Props ){
    switch(action.type){
        case "USER_LOGIN":
            return{
                ...state,
                currentUser: action.payload
            }
        default:
            return state
    }
}