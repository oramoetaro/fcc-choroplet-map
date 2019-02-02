(function () {
  const educUrl = "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json";
  const countiesJsonUrl = "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json";

  let [min, max] = "";
  const width = $("#map").width();
  const height = 600;

  function getEduJson(callback) {
    d3.json(educUrl, function (json) {
      callback(json)
    });
  };

  getEduJson(function (json) {
    d3.json(countiesJsonUrl, function (json) {
      min = d3.min(json, (d) => d.bachelorsOrHigher);
      max = d3.max(json, (d) => d.bachelorsOrHigher);
    });
  });

  function imprime() {
    console.log(min);
    console.log(max);
  }

  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", countiesJsonUrl, true);
  xhttp.send();
  xhttp.onload = function () {

    const json = JSON.parse(xhttp.responseText);

    const svg = d3.select("#map").append("svg")
      .attr("width", width)
      .attr("height", height);

    const geojson = topojson.feature(json, json.objects.counties);

    svg.selectAll("path")
      .data(geojson.features)
      .enter().append("path")
      .attr("d", d3.geoPath())
      .attr("class", "county");

    //$("#map").text(JSON.stringify(geojson.features));
  }
})();

const educ = {
  "fips": 1001,
  "state": "AL",
  "area_name": "Autauga County",
  "bachelorsOrHigher": 21.9
}

const county = {
  "type": "Polygon",
  "id": 1001,
  "arcs": [
    [-6732, -6727, -4931, 8710, -4933]
  ]
}