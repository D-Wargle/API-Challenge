import { Router, type Request, type Response } from 'express';
const router = Router();
import dotenv from 'dotenv';
dotenv.config();
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  // TODO: GET weather data from city name
  const city = req.body.city;
  try {
    const weatherData = await WeatherService.getWeatherForCity(city);
    res.json(weatherData);
    // const geoCodingData = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.API_KEY}`);
    // const geoData = await geoCodingData.json();
    // const weatherData = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${geoData[0].lat}&lon=${geoData[0].lon}&exclude=minutely,hourly&appid=${process.env.API_KEY}`);
    // const weatherCall = await weatherData.json();
    // res.json(weatherCall);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
  // TODO: save city to search history
  try {
    await HistoryService.addCity(city);
  } catch (err) {
    console.error(err);
    console.log('Failed to save city to search history');
  }
});

// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    const cities = await HistoryService.getCities();
    res.json(cities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  } 
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (_req: Request, res: Response) => {
  try {
    if (!_req.params.id) {
      res.status(400).json({ message: 'City ID is required' });
    }
    await HistoryService.removeCity(_req.params.id);
    res.json({ message: 'City removed from search history' });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});
export default router;
