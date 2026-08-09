
// /api/weather.js — runs on Vercel's server, never sent to the browser
export default async function handler(req, res) {
    const { city } = req.query;
    const apiKey = process.env.WEATHER_API_KEY;
    // pulled from Vercel's environment variables, not your code
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    res.status(200).json(data);
}