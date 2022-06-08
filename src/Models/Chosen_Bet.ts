type Bet_Type = {

    h2h : "Money Line",

}

export interface Chosen_Bet{
    
    home_team: string
    away_team: string
    chosen_team: string
    against_team: string
    odds: number | undefined
}