export interface API_Data {

  home_team: string
  away_team: string
  commence_time: Date
  bookmakers: [
    {
      key: string
      markets: [
        {
          key: string
          outcomes: [
            {
              name: string
              price: number
            },
            {
              name: string
              price: number
            }
          ]
        },
        {
          key: string
          outcomes: [
            {
              name: string
              price: number
              point: number
            },
            {
              name: string
              price: number
              point: number
            }
          ]
        }

      ]
    }
  ]

}