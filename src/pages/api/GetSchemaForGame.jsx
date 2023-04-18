import axios from 'axios'

export default async (req, res) => {
  try {
    const { query: { AppID } } = req
    const resp = await axios({
      method: 'GET',
      url: `http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v0002?appid=${AppID}&key=${process.env.STEAM_KEY}`
    })

    return res.json(resp.data)
  } catch (err) {
    return res.status(404).json(err)
  }
}
