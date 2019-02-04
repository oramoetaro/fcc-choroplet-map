(function () {
  const educUrl = "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json";
  const countiesJsonUrl = "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json";

  let [min, max] = "";
  const [width, height] = [950, 600];

  function getEduJson(callback) {
    d3.json(educUrl, function (eduJson) {
      callback(eduJson)
    });
  };

  getEduJson(function (eduJson) {
    d3.json(countiesJsonUrl, function (counties) {
      min = d3.min(eduJson, (d) => d.bachelorsOrHigher);
      max = d3.max(eduJson, (d) => d.bachelorsOrHigher);

      const color = d3.scaleQuantize()
        .domain([min, max])
        .range(d3.schemeBlues[9]);

      const svg = d3.select("#map")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

      const geojson = topojson.feature(
        counties,
        counties.objects.counties
        );

      svg.selectAll("path")
        .data(geojson.features)
        .enter().append("path")
        .attr("d", d3.geoPath())
        .attr("class", "county")
        .attr("stroke", "white")
        .attr("stroke-width", 0.5)
        .attr("onmouseover", "tooltip(this)")
        .attr("onmouseout", "$('#tooltip').hide()")
        .attr("fill", (d) => color(
          eduJson.find(
            (e) => e.fips == d.id)
          .bachelorsOrHigher
        ));

      //$("#map").text(JSON.stringify(geojson.features));
      //$("#map").text(JSON.stringify(eduJson));

    });
  });

  function tooltip () {
    
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