import axios from 'axios'

export default async (req, res) => {
  try {
    const { query: { AppID } } = req
    const resp = await axios({
      method: 'GET',
      url: `http://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=${AppID}`
      // Only returns internal achievement names and global achievement percentages
      // Use GetSchemaForGame to get more info on achievements
    })

    return res.json(resp.data)
  } catch (err) {
    return res.status(404).json(err)
  }
}
