const { gql } = require('@apollo/client');


  const GET_PROJECTS = gql`
    query projects($country: [String], $category: [String], $search: String, $vintage: [String]) {
    projects
    (where: {
        category_: { id_in: $category },
        country_: { id_in: $country },
        name_contains_nocase: $search,
        vintage_in: $vintage
    })
    {
        id
        key
        projectID
        name
        vintage
        projectAddress
        registry
        listings {
          singleUnitPrice
          leftToSell
          active
          deleted
        }
        country {
          id
        }
        updatedAt
      }
    }
  `;

module.exports = {
    GET_PROJECTS,
};
