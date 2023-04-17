import axios from 'axios'

export default async (req, res) => {
  try {
    const { query: { AppID } } = req
    const resp = await axios({
      method: 'GET',
      url: `https://store.steampowered.com/api/appdetails?appids=${AppID}&cc=us`
      // Apparently this API endpoint just exists and nobody told me lmao
      // cc stands for country code, doing this returns the currency in US dolans
    })

    return res.json(resp.data)
  } catch (err) {
    return res.status(404).json(err)
  }
}
