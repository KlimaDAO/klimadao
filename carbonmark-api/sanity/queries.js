const groq = require("groq");

const fetchProjects = groq`*[_type == 'project' && registry == $registry && registryProjectId == $registryProjectId][0] {
    country,
    description,
    "geolocation": {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [geolocation.lng, geolocation.lat]
      }
    },
    methodologies[]->{ "id": id.current, category, name },
    name,
    region,
    registry,
    url,
    registryProjectId
  }`;

const fetchAllProjects = groq`
  *[_type == 'project'] {
    "id": id.current,
    description,
    registry,
    registryProjectId,
    methodologies[]->{  "id": id.current, category, name },
    name,
  }`;

module.exports = {
  fetchProjects,
  fetchAllProjects,
};
