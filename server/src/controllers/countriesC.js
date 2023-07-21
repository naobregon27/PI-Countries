const { Country, Activity } = require('../db');
const {Op} = require ("sequelize")




const getCountries = async () => await Country.findAll({
    include: {
        model: Activity,
        as: "Activities",
        attributes: ["id", "name", "difficulty", "duration", "season"],
        through: { attributes: [] },
    }
},);



// ME TRAE INFO BY ID
const getCountryById = async (id) => {
    const countryFilterId = await Country.findOne({
        where: { id },
        include: {
            model: Activity,
            as: "Activities",
            attributes: ["id", "name", "difficulty", "duration", "season"],
            through: { attributes: [] },
        },
    });

    if (countryFilterId) return countryFilterId;
    return { error: `No hay paises con el ID: ${id}` };
};

const getCountryByName = async (name) => {
    const countryFilterName = await Country.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}%`
            }
        }
    })

    if (countryFilterName.length >= 0) return countryFilterName;
    return {
        message: 'no se encontro ningun país'
    }
};



// async function getCountriesByID(req, res) {
//     const { id } = req.params;
//       try {
//         if (id) {
//             const countryFilterId = await Country.findOne({
//                 where: { id },
//                 include: {
//                     model: Activity,
//                     as: "Activities",
//                     attributes: ["id", "name", "difficulty", "duration", "season"],
//                     through: { attributes: [] },
//                 },
//             });
//             if (countryFilterId) return countryFilterId;
//             return { error: `No hay paises con el ID: ${id}`};
//           }
//         res.status(200).json(countries)
//     } catch (error) {
//         res.status(401).send(error)
//     }
// }

//INF POR CONTINENTE




module.exports = {
    getCountries,
    getCountryById,
    getCountryByName
}