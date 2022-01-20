import React, { useRef, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { Chart } from "react-chartjs-2";
const api = require("novelcovid");
const moment = require("moment");

export default function Post({ covid, lineData }) {
  function form(nb) {
    return new Intl.NumberFormat("de-DE").format(nb);
  }

  function test() {
    Array.forEach(element => {
      let upper = element.toUpperCase();
      document.getElementById("change").addEventListener("click", () => {
        if (document.getElementById("change").value === "Double click to change the display to : Graph") {
          document.getElementById("change").value = "Double click to change the display to : Table";
          document.getElementById("titlegra").style.display = "flex";
          document.getElementById("gra"+upper).style.display = "flex";
          document.getElementById("stats").style.display = "none";
        } else {
          document.getElementById("change").value = "Double click to change the display to : Graph";
          document.getElementById("titlegra").style.display = "none";
          document.getElementById("gra"+upper).style.display = "none";
          document.getElementById("stats").style.display = "flex";
        }
      });
  });
  }

  let chartRef1 = useRef();
  let chartRef2 = useRef();
  let chartRef3 = useRef();
  let chartRef4 = useRef();

  useEffect(() => {
    let chart1 = new Chart(chartRef1.current, {
      type: "line",
      data: {
        labels: Object.keys(lineData.timeline.cases).map((dateString) => {
          const [month, day, year] = dateString.split("/");
          return [day, month, year].join("/");
        }),
        datasets: [
          {
            label: "Cases",
            backgroundColor: "#75C0E0",
            borderColor: "#75C0E0",
            pointBorderColor: "#75C0E0",
            pointRadius: 2.5,
            borderWidth: 2.5,
            data: Object.values(lineData.timeline.cases),
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
          title: {
            display: true,
            text: `Cases`,
            color: "#b9b9b9",
            font: { family: "Nunito", size: 40 },
          },
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
    let chart2 = new Chart(chartRef2.current, {
      type: "line",
      data: {
        labels: Object.keys(lineData.timeline.deaths).map((dateString) => {
          const [month, day, year] = dateString.split("/");
          return [day, month, year].join("/");
        }),
        datasets: [
          {
            label: "Deaths",
            backgroundColor: "#DF1C44",
            borderColor: "#DF1C44",
            pointBorderColor: "#DF1C44",
            pointRadius: 2.5,
            borderWidth: 2.5,
            data: Object.values(lineData.timeline.deaths),
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
          title: {
            display: true,
            text: `Deaths`,
            color: "#b9b9b9",
            font: { family: "Nunito", size: 40 },
          },
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
    let chart3 = new Chart(chartRef3.current, {
      type: "line",
      data: {
        labels: Object.keys(lineData.timeline.recovered).map((dateString) => {
          const [month, day, year] = dateString.split("/");
          return [day, month, year].join("/");
        }),
        datasets: [
          {
            label: "Recovered",
            backgroundColor: "#39A275",
            borderColor: "#39A275",
            pointBorderColor: "#39A275",
            pointRadius: 2.5,
            borderWidth: 2.5,
            data: Object.values(lineData.timeline.recovered),
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
          title: {
            display: true,
            text: `Recovered`,
            color: "#b9b9b9",
            font: { family: "Nunito", size: 40 },
          },
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
    let chart4 = new Chart(chartRef4.current, {
      type: "line",
      data: {
        labels: Object.keys(lineData.timeline.cases).map((dateString) => {
          const [month, day, year] = dateString.split("/");
          return [day, month, year].join("/");
        }),
        datasets: [
          {
            label: "Active",
            backgroundColor: "#FAE29F",
            borderColor: "#FAE29F",
            pointBorderColor: "#FAE29F",
            pointRadius: 2.5,
            borderWidth: 2.5,
            data: Object.keys(lineData.timeline.cases).map(
              (key) =>
                lineData.timeline.cases[key] -
                lineData.timeline.recovered[key] -
                lineData.timeline.deaths[key]
            ),
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
          title: {
            display: true,
            text: `Active`,
            color: "#b9b9b9",
            font: { family: "Nunito", size: 40 },
          },
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }, []);
  return (
    <>
      <Head>
        <title>{covid.country} | Stats-Covid19</title>
        <meta charset="UTF8" />
        <meta name="theme-color" content="#6495ed" />
        <meta name="title" content={`${covid.country} | Stats-Covid19`} />
        <meta name="description" content="Site de stats pour la covid19" />
        <meta name="keywords" content="covid, covid19, stats" />
        <meta name="author" content="DoctorPok" />
        <meta name="robots" content="index" />
        <meta
          property="og:image"
          content="https://zupimages.net/up/21/22/3e08.png"
        ></meta>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      </Head>
      <main className="container">
        <div className="top">
          <h1>Stats-Covid19</h1>

          <div className="link">
            <Link href={`/`}>
              <a>all</a>
            </Link>

            <Link href={`../../country`}>
              <a>select country</a>
            </Link>

            <Link href={``}>
              <a id="here">country : {covid.country}</a>
            </Link>

            <Link href={`https://discord.gg/5jPMAvfquT`}>
              <a target="_blank">support</a>
            </Link>
          </div>
        </div>

        <div className="content3">
          <div className="card">
            <img src={covid.countryInfo.flag} />
            <h1>
              Name : <span>{covid.country}</span>
            </h1>
            <h3>
              Lat : <span>{covid.countryInfo.lat}</span>
            </h3>
            <h3>
              Long : <span>{covid.countryInfo.long}</span>
            </h3>
            <h3>
              ID : <span>{covid.countryInfo._id}</span>
            </h3>
          </div>
          <div className="box">
            <div className="txt">
              <div className="gen1">
                <h2>
                  Cases : <span>{form(covid.cases)}</span>
                  <p>
                    {"( " +
                      (covid.todayCases >= 0 ? "+ " : "- ") +
                      String(Math.abs(covid.todayCases)).replace(
                        /(.)(?=(\d{3})+$)/g,
                        "$1."
                      ) +
                      " )"}
                  </p>
                </h2>
                <h2>
                  Deaths : <span>{form(covid.deaths)}</span>
                  <p>
                    {"( " +
                      (covid.todayDeaths >= 0 ? "+ " : "- ") +
                      String(Math.abs(covid.todayDeaths)).replace(
                        /(.)(?=(\d{3})+$)/g,
                        "$1."
                      ) +
                      " )"}
                  </p>
                </h2>
                <h2>
                  Recovered : <span>{form(covid.recovered)}</span>
                  <p>
                    {"( " +
                      (covid.todayRecovered >= 0 ? "+ " : "- ") +
                      String(Math.abs(covid.todayRecovered)).replace(
                        /(.)(?=(\d{3})+$)/g,
                        "$1."
                      ) +
                      " )"}
                  </p>
                </h2>
              </div>
              <div className="gen2">
                <h2>
                  Active : <span>{form(covid.active)}</span>
                </h2>
                <h2>
                  Critique : <span>{form(covid.critical)}</span>
                </h2>
                <h2>
                  Tests : <span>{form(covid.tests)}</span>
                </h2>
                <h2>
                  Population : <span>{form(covid.population)}</span>
                </h2>
              </div>
              <div className="gen3">
                <h2>
                  Infection rate :
                  <span>
                    {(covid.casesPerOneMillion / 10000).toFixed(3) + " %"}
                  </span>
                </h2>
                <h2>
                  Mortality rate :
                  <span>
                    {((covid.deaths / covid.cases) * 100).toFixed(3) + " %"}
                  </span>
                </h2>
                <h2>
                  Critical rate :
                  <span>
                    {((covid.critical / covid.active) * 100).toFixed(3) + " %"}
                  </span>
                </h2>
                <h2>
                  Recovery rate :
                  <span>
                    {((covid.recovered / covid.cases) * 100).toFixed(3) + " %"}
                  </span>
                </h2>
                <h2>
                  Test rate :
                  <span>
                    {(covid.testsPerOneMillion / 10000).toFixed(3) + " %"}
                  </span>
                </h2>
              </div>
              <h3>Updated {moment(covid.updated).fromNow()}</h3>
            </div>
          </div>
          <div className="btns">
            <input type="button" id="change" value="Double click to change the display to : Table" onClick={test()} />
          </div>
          <div id="titlegra">
            <h2>
              Graph for <span id="cases">cases</span>,{" "}
              <span id="deaths">deaths</span>,{" "}
              <span id="recovered">recovered</span> and{" "}
              <span id="active">active</span> for the last 31 days in{" "}
              <span>{covid.country}</span>
            </h2>
          </div>
           <div className="gra" id="gra1">
            <div className="graline">
              <canvas id="myChart" ref={chartRef1} />
            </div>
          </div>
          <div className="gra" id="gra2">
            <div className="graline">
              <canvas id="myChart" ref={chartRef2} />
            </div>
          </div>
          <div className="gra" id="gra3">
            <div className="graline">
              <canvas id="myChart" ref={chartRef3} />
            </div>
          </div>
          <div className="gra" id="gra4">
            <div className="graline">
              <canvas id="myChart" ref={chartRef4} />
            </div>
          </div>

          <div className="stats" id="stats" style={{display: 'none'}}>
            <div className="container">
                {Object.keys(lineData.timeline.cases).map((dateString) => {
                  const [month, day, year] = dateString.split("/");
                  const nomaldate =  [day, month, year].join(" / ");
                  return <div className="content">
                  <div className="dates">{nomaldate}</div>
                    <div className="numbers">
                      <p>Cases : {lineData.timeline.cases[dateString]} |</p>
                      <p>Deaths : {lineData.timeline.deaths[dateString]} |</p>
                      <p>Recovered : {lineData.timeline.recovered[dateString]} |</p>
                      <p>Active : {(lineData.timeline.cases[dateString] - lineData.timeline.deaths[dateString] - lineData.timeline.recovered[dateString])}</p>
                    </div>
                  </div>
                })}
            </div>
          </div>
        </div>
        <div className="footer">
          <h2>
            {" "}
            &copy;{" "}
            <a
              href="https://github.com/DoctorPok42/stats-covid19"
              target="_blank"
            >
              Stats-Covid19
            </a>{" "}
            - 2021 | Made by{" "}
            <a href="https://github.com/DoctorPok42" target="_blank">
              DoctorPok
            </a>
          </h2>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const lineData = ["global", "all"].includes(params.id.toLowerCase())
    ? { timeline: await api.historical.all({ days: 31 }) }
    : await api.historical.countries({ country: params.id, days: 31 });

  const covid = await fetch(
    `https://disease.sh/v3/covid-19/countries/${params.id}?yesterday=true&twoDaysAgo=true&strict=true&allowNull=true`
  ).then((r) => r.json());
  return {
    props: {
      covid,
      lineData,
    },
  };
}
