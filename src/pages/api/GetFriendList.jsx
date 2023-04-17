import axios from 'axios'

export default async (req, res) => {
  try {
    const { query: { SteamID } } = req
    const resp = await axios({
      method: 'GET',
      url: `http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=${process.env.STEAM_KEY}&steamid=${SteamID}`
      // Only returns SteamID and friended time in Unix time
      // Will need to do a lookup with GetPlayerSummaries to get more information on the friends
    })

    return res.json(resp.data)
  } catch (err) {
    return res.status(404).json(err)
  }
}
