export enum Bet_Type  {
    h2h = "Money Line",
    spread = "Spread"

}

export interface Chosen_Bet{
    home_team: string
    away_team: string
    chosen_team: string
    against_team: string
    odds: number | undefined
    point_home?: number | undefined
    point_spread?: number | undefined

    type: string
}