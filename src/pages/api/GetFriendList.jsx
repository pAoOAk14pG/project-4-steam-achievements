import axios from 'axios'

export default async (req, res) => {
  try {
    const { query: { SteamID } } = req
    const resp = await axios({
      method: 'GET',
      url: `http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=${process.env.STEAM_KEY}&steamid=${SteamID}`
      // Only returns the SteamID of friends
      // Will require another lookup with GetPlayerSummaries to get info on said friends
    })

    return res.json(resp.data)
  } catch (err) {
    return res.status(404).json(err)
  }
}
