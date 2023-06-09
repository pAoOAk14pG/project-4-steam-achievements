import axios from 'axios'

export default async (req, res) => {
  try {
    const { query: { SteamID } } = req
    const resp = await axios({
      method: 'GET',
      url: `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?include_appinfo=true&include_played_free_games=true&key=${process.env.STEAM_KEY}&steamid=${SteamID}`
    })

    return res.json(resp.data)
  } catch (err) {
    return res.status(404).json(err)
  }
}
