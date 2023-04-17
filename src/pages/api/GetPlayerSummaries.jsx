import axios from 'axios'

export default async (req, res) => {
  try {
    const { query: { SteamID } } = req
    const resp = await axios({
      method: 'GET',
      url: `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_KEY}&steamids=${SteamID}`
    })

    return res.json(resp.data)
  } catch (err) {
    return res.status(404).json(err)
  }
}
