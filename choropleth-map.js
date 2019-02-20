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

      // Inserting the legend

      const [lWidth, lHeight] = [500, 15];
      const legend = d3.select("#legend")
        .append("svg").attr("height", lHeight + 25);
      const lScale = d3.scaleLinear()
        .domain([min, max])
        .range([0, lWidth]);

      legend.selectAll("rect")
        .data(color.range().map(d => color.invertExtent(d)))
        .enter().append("rect")
        .attr("height", lHeight)
        .attr("width", d => lScale(d[1] - d[0]))
        .attr("x", (d, i) => lScale(d[1] - d[0]) * i)
        .attr("fill", d => color(d[0]));

      console.log(min + " " + max);
      console.log(color.range());
      console.log(color.range().map(d => color.invertExtent(d)));
      console.log(color.range().map(d => color.invertExtent(d)[0]));

      const xAxis = d3.axisBottom(lScale)
        .tickValues(color.range().map(d => color.invertExtent(d)[0]))
        .tickFormat(d3.format(",.1f"))

      legend.append("g")
        .attr("transform", "translate(0," + lHeight + ")")
        .call(xAxis);

    });
  });
})();

//--------------------------------
// Initializing Bootstrap Tooltips
//--------------------------------

(function () {
  $('[data-toggle="tooltip"]').tooltip();
});