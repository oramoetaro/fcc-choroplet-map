(function () {
  const educUrl = "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json";
  const counUrl = "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json";

  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", counUrl, true);
  xhttp.send();
  xhttp.onload = function () {
    const json = JSON.parse(xhttp.responseText);

    $("#map").text(JSON.stringify(json));
  }
})();

const educ = {
  "fips": 1001,
  "state": "AL",
  "area_name": "Autauga County",
  "bachelorsOrHigher": 21.9
}