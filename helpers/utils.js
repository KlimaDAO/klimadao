const { executeGraphQLQuery } = require("../apollo-client");
const { GET_COUNTRIES } = require("../queries/countries");
const { GET_CATEGORIES, GET_POOLED_PROJECT_CAT, GET_POOLED_PROJECT_COUNTRY, GET_POOLED_PROJECT_VINTAGE } = require('../queries/categories');
const { GET_VINTAGES } = require('../queries/vintage.js');

async function getAllVintages() {
    const data = await executeGraphQLQuery(process.env.GRAPH_API_URL, GET_VINTAGES);

    const uniqueValues = new Set();

    data.data.projects.forEach(item => uniqueValues.add(item.vintage));

    const pooldata = await executeGraphQLQuery(process.env.CARBON_OFFSETS_GRAPH_API_URL, GET_POOLED_PROJECT_VINTAGE);

    pooldata.data.carbonOffsets.forEach(item => uniqueValues.add(item.vintageYear));

    const result = Array.from(uniqueValues);

    return result;
}


async function getAllCategories() {
    const data = await executeGraphQLQuery(process.env.GRAPH_API_URL, GET_CATEGORIES);

    const uniqueValues = new Set();

    data.data.categories.forEach(item => uniqueValues.add(...item.id.split(",")));

    const pooldata = await executeGraphQLQuery(process.env.CARBON_OFFSETS_GRAPH_API_URL, GET_POOLED_PROJECT_CAT);

    pooldata.data.carbonOffsets.forEach(item => uniqueValues.add(...item.methodologyCategory.split(",")));

    const result = Array.from(uniqueValues);

    return result;
}

async function getAllCountries() {
    const data = await executeGraphQLQuery(process.env.GRAPH_API_URL, GET_COUNTRIES);

    const uniqueValues = new Set();

    data.data.countries.forEach(item => uniqueValues.add(item.id));

    const pooldata = await executeGraphQLQuery(process.env.CARBON_OFFSETS_GRAPH_API_URL, GET_POOLED_PROJECT_COUNTRY);

    pooldata.data.carbonOffsets.forEach(item => uniqueValues.add(item.country));

    const result = Array.from(uniqueValues);

    return result;
}
function convertArrayToObjects(arr) {
    return arr.map(function(item) {
      return { id: item };
    });
  }


module.exports = {
    convertArrayToObjects,
    getAllVintages,
    getAllCategories,
    getAllCountries
};
