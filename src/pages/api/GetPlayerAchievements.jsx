import axios from 'axios'

export default async (req, res) => {
  try {
    const { query: { AppID, SteamID } } = req
    const resp = await axios({
      method: 'GET',
      url: `http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${AppID}&key=${process.env.STEAM_KEY}&steamid=${SteamID}&l=en`
      // ONLY WORKS IF USER'S "Game details" SETTINGS IS SET TO "Public"!
    })

    return res.json(resp.data)
  } catch (err) {
    return res.status(404).json(err)
  }
}
