const { Router } = require('express');
const { getCountries, getCountryById, getCountryByName } = require('../controllers/countriesC')

const router = Router();

router.get('/countries', async (req, res) => {
    const AllCountries = await getCountries();

    try {
        res.status(200).json(AllCountries);
    } catch (error) {
        return res.status(404).send(error.message)

    }
});

router.get("/countries/:id", async (req, res) => {
    const { id } = req.params;

    try {
        if (id) {
            const countryById = await getCountryById(id);

            if (countryById.error) return res.status(404).json(countryById);
            return res.status(200).json(countryById);
        } else {
            const AllCountries = await getAllCountries();
            return res.status(200).json(AllCountries);
        }
    } catch (error) {
        return res.status(404).send(error.message);
    }
});

router.get("/name", async (req, res) => {
    const { name } = req.query;
    try {
        if (name) {
            const countriesByName = await getCountryByName(name);

            if (countriesByName.error) return res.status(404).json(countriesByName);
            return res.status(200).json(countriesByName);
        } else {
            const AllCountries = await getAllCountries();
            return res.status(200).json(AllCountries);
        }
    } catch (error) {
        return res.status(404).send(error.message);
    }
})


//router.get("/C", getAllContinents)

module.exports = router;