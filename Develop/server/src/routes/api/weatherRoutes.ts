import { Router } from 'express';
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';
const router = Router();

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  try {
  const cityWeather = await WeatherService.getWeatherForCity(req.body.cityName);
  await HistoryService.addCity(req.body.cityName);
  res.status(201).json(cityWeather);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
  // TODO: GET weather data from city name
  // TODO: save city to search history
  //do I need to make a seperate function for this or can I put it in the same try block?
});
// TODO: GET search history
router.get('/history', async (_req, res) => {
  try {
    const savedCities = await HistoryService.getCities();
    res.json(savedCities);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  try {
    await HistoryService.removeCity(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
export default router;