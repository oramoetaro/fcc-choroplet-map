(function () {
  const educUrl = "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json";
  const countiesJsonUrl = "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json";

  const width = $("#map").width();
  const height = 600;
  const path = d3.geoPath();

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
      .attr("d", path);

    //$("#map").text(JSON.stringify(json));
  }
})();

const educ = {
  "fips": 1001,
  "state": "AL",
  "area_name": "Autauga County",
  "bachelorsOrHigher": 21.9
}