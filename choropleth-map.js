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
      const format = d3.format("");

      const color = d3.scaleQuantize()
        .domain([min, max])
        .range(d3.schemeBlues[9]);

      console.log(color.range());
      console.log(color.range().map(d => color.invertExtent(d)));

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
        .attrs({
          "d": d3.geoPath(),
          "class": "county",
          "stroke": "white",
          "stroke-width": 0.5,
          "data-toggle": "tooltip",
          "data-placement": "right",
          "onmouseover": "$(this).tooltip('show')"
        })

      // attrs calculated with jus one function call for each path
      svg.selectAll("path").each(function (d) {
        const a = eduJson.find(e => e.fips == d.id);
        d3.select(this).attrs({
          "data-fips": a.fips,
          "data-education": a.bachelorsOrHigher,
          "fill": color(a.bachelorsOrHigher),
          "title": d => a.area_name.replace(/ County/g, " ") +
            a.state + ": " + a.bachelorsOrHigher + " %"
        });
      });

      // The legend

      const [lWidth, lHeight] = [500, 15];

      const lScale = d3.scaleLinear()
        .domain([min, max])
        .range([0, lWidth]);

      const legend = d3.select("#legend")
      .append("svg").attr("height", lHeight + 10);

      legend.selectAll("rect")
        .data(color.range().map(d => color.invertExtent(d)))
        .enter().append("rect")
        .attr("height", lHeight)
        .attr("width", d => lScale(d[1] - d[0]))
        .attr("x", (d, i) => lScale(d[1] - d[0]) * i)
        .attr("fill", d => color(d[0]));

      // const legend = g => {

      //   const lScale = d3.scaleLinear()
      //     .domain([min, max])
      //     .range([0, 260]);

      //   g.selectAll("rect")
      //     .data(color.range().map(d => color.invertExtent(d)))
      //     .enter().append("rect")
      //     .attr("height", 10)
      //     .attr("x", (d, i) => lScale(d[1] - d[0]) * i)
      //     .attr("fill", d => color(d[0]))

      // g.selectAll("rect")
      //   .data(color.range().map(d => color.invertExtent(d)))
      //   .enter().append("rect")
      //   .attr("height", 8)
      //   .attr("x", d => lScale(d[1]) - lScale(d[0]))
      //   .attr("fill", d => color(d[0]));

      // g.append("text")
      //   .attr("class", "caption")
      //   .attr("x", x.range()[0])
      //   .attr("y", -6)
      //   .attr("fill", "#000")
      //   .attr("text-anchor", "start")
      //   .attr("font-weight", "bold")
      //   .text("leyenda");

      // g.call(d3.axisBottom(x)
      //     .tickSize(13)
      //     .tickFormat(format)
      //     .tickValues(color.range().slice(1).map(d => color.invertExtent(d)[0])))
      //   .select(".domain")
      //   .remove();

      // }

      // d3.select("#legend")
      //   .append("g")
      //   .call(legend);

    });
  });
})();

(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

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