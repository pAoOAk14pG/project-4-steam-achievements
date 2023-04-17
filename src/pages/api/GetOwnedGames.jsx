import axios from 'axios'

export default async (req, res) => {
  try {
    const { query: { SteamID } } = req
    const resp = await axios({
      method: 'GET',
      url: `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_KEY}&steamid=${SteamID}&include_played_free_games=true&include_appinfo=true`
    })

    return res.json(resp.data)
  } catch (err) {
    return res.status(404).json(err)
  }
}
