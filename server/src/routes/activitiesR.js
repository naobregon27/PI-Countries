const { Router } = require('express');
const {getActivities, postActivity } = require('../controllers/activitiesC')
const router= Router();

router.get("/activity", async (req, res) => {
    const allActivity = await getActivities();
  
    try {
      res.status(200).json(allActivity);
    } catch (error) {
      return res.status(404).send(error.message);
    }
  } )
router.post('/activity', async (req, res) => {
    const { name, difficulty, duration, season } = req.body;
    const countries = req.body.idPais;
    try {
      if (!name || !difficulty || !countries) {
        throw Error("Lo siento pero me falta Infromacion");
      } else {
        const newActivity = await postActivity(
          name,
          difficulty,
          duration,
          season,
          countries
        );
        return res.status(200).json(newActivity);
      }
    } catch (error) {
      return res.status(404).send(error.message);
    }
  });

module.exports = router;