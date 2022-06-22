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

type State = {
    username: string
}

type Action = {
    type: string,
    payload: string
}

export default function UserReducer(state: State, action: Action ){
    switch(action.type){
        case "USER_LOGIN":
            return{
                username: action.payload
            }
        default:
            return state
    }
}