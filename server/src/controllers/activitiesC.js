const { Activity, Country } = require('../db.js');

// ME TRAE TODAS LAS ACTIVIDADES
const getActivities = async () => await Activity.findAll();


const postActivity = async (name, difficulty, duration, season, countries) => {
    const newActivity = await Activity.findOrCreate({where: {name, difficulty, duration, season} } );
  
    //relacion de activity con country
    if (countries && countries.length > 0) {
    const countryForActivity = await Country.findAll({where: {id: countries } });
    await newActivity[0].setCountries(countryForActivity);
    }
    return newActivity[0];
  };

module.exports = {getActivities, postActivity};