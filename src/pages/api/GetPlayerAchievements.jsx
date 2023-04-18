import axios from 'axios'

export default async (req, res) => {
  try {
    const { query: { AppID, SteamID } } = req
    const resp = await axios({
      method: 'GET',
      url: `http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${AppID}&key=${process.env.STEAM_KEY}&l=en&steamid=${SteamID}`
      // ONLY WORKS IF USER'S "Game details" SETTINGS IS SET TO "Public"!
      // l is the language query and is hypothetically supposed to return achievement details in other languages
      // However in practice it doesn't work lmao
      // The only reason it's there is that for some reason including the language query
      // returns the actual name and description of the achievements
    })

    return res.json(resp.data)
  } catch (err) {
    return res.status(404).json(err)
  }
}
