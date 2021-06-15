import React, { useRef, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
const api = require("novelcovid");
const moment = require("moment");

export default function Post({ covids, lineData }) {
  function form(nb) {
    return new Intl.NumberFormat("de-DE").format(nb);
  }

  let chartRef1 = useRef();
  let chartRef2 = useRef();
  let chartRef3 = useRef();

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
  }, []);
  return (
    <>
      <Head>
        <title>Covid-Stats</title>
        <meta charset="UTF8" />
        <meta name="theme-color" content="#6495ed" />
        <meta name="title" content="Covid-Stats" />
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
      <main class="container">
        <div class="top">
          <h1>Covid-Stats</h1>

          <div class="link">
            <Link href={``}>
              <a id="here">all</a>
            </Link>

            <Link href={`./country`}>
              <a>select country</a>
            </Link>
          </div>
        </div>

        <div class="he">
          <h1>Today</h1>
        </div>
        <div class="content">
          <h2>
            Cases : <span>{form(covids.todayCases)}</span>
          </h2>
          <h2>
            Deaths : <span>{form(covids.todayDeaths)}</span>
          </h2>
          <h2>
            Recovered : <span>{form(covids.todayRecovered)}</span>
          </h2>
          <h3>Updated {moment(covids.updated).fromNow()}</h3>
        </div>

        <div class="he">
          <h1>Total</h1>
        </div>
        <div class="content">
          <h2>
            Cases : <span>{form(covids.cases)}</span>
          </h2>
          <h2>
            Deaths : <span>{form(covids.deaths)}</span>
          </h2>
          <h2>
            Recovered : <span>{form(covids.recovered)}</span>
          </h2>
          <h3>Updated {moment(covids.updated).fromNow()}</h3>
        </div>
        <div class="graph">
          <div id="titlegra">
            <h2>
              Graph for cases, deaths and recovered for the last 31 days in the
              word
            </h2>
          </div>
          <div class="gra">
            <div class="graline">
              <canvas id="myChart" ref={chartRef1} />
            </div>
          </div>
          <div class="gra">
            <div class="graline">
              <canvas id="myChart" ref={chartRef2} />
            </div>
          </div>
          <div class="gra">
            <div class="graline">
              <canvas id="myChart" ref={chartRef3} />
            </div>
          </div>
        </div>
        <div class="footer">
          <h2>
            Made by{" "}
            <a href="https://github.com/DoctorPok42" target="_blank">
              DoctorPok
            </a>
          </h2>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const lineData = ["global", "all"]
    ? { timeline: await api.historical.all({ days: 31 }) }
    : await api.historical.countries({ days: 31 });

  const covids = await fetch(
    `https://disease.sh/v3/covid-19/all?yesterday=true&twoDaysAgo=true&allowNull=true`
  ).then((r) => r.json());
  return {
    props: {
      covids,
      lineData,
    },
  };
}
