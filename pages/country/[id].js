import React, { useRef, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
const api = require("novelcovid");
const moment = require("moment");

export default function Post({ covid, lineData }) {
  console.log(lineData.timeline);
  let chartRef = useRef();

  useEffect(() => {
    let chart = new Chart(chartRef.current, {
      type: "line",
      data: {
        labels: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "27",
          "28",
          "29",
          "30",
        ],
        datasets: [
          {
            label: "Cases",
            fill: false,
            responsive: true,
            lineTension: 0.1,
            backgroundColor: "#75C0E0",
            borderColor: "#75C0E0",
            pointBorderColor: "#75C0E0",
            pointHoverBackgroundColor: "#75C0E0",
            pointHoverBorderColor: "#b9b9b9",
            pointHoverBorderWidth: 2,
            pointRadius: 2,
            pointHitRadius: 10,
            pointBackgroundColor: "#fff",
            data: Object.values(lineData.timeline.cases),
          },
          {
            label: "Deaths",
            fill: false,
            responsive: true,
            lineTension: 0.1,
            backgroundColor: "#DF1C44",
            borderColor: "#DF1C44",
            pointBorderColor: "#DF1C44",
            pointHoverBackgroundColor: "#DF1C44",
            pointHoverBorderColor: "#b9b9b9",
            pointHoverBorderWidth: 2,
            pointRadius: 2,
            pointHitRadius: 10,
            pointBackgroundColor: "#fff",
            data: Object.values(lineData.timeline.deaths),
          },
          {
            label: "Recovered",
            fill: false,
            responsive: true,
            lineTension: 0.1,
            backgroundColor: "#39A275",
            borderColor: "#39A275",
            pointBorderColor: "#39A275",
            pointHoverBackgroundColor: "#39A275",
            pointHoverBorderColor: "#b9b9b9",
            pointHoverBorderWidth: 2,
            pointRadius: 2,
            pointHitRadius: 10,
            pointBackgroundColor: "#fff",
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
            text: `${covid.country} graph`,
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
        <title>{covid.country} | Covid-Stats</title>
        <meta charset="UTF8" />
        <meta name="theme-color" content="#6495ed" />
        <meta name="title" content={`${covid.country} | Covid-Stats`} />
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
          <h1>Covid-Info</h1>

          <div class="link">
            <Link href={`../`}>
              <a>all</a>
            </Link>

            <Link href={`../country`}>
              <a>select country</a>
            </Link>

            <Link href={``}>
              <a id="here">selected country</a>
            </Link>
          </div>
        </div>

        <div class="content3">
          <div class="card">
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
          <div class="box">
            <div class="txt">
              <div class="gen1">
                <h2>
                  Cases : <span>{covid.cases}</span>
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
                  Deaths : <span>{covid.deaths}</span>
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
                  Recovered : <span>{covid.recovered}</span>
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
              <div class="gen2">
                <h2>
                  Active : <span>{covid.active}</span>
                </h2>
                <h2>
                  Critique : <span>{covid.critical}</span>
                </h2>
                <h2>
                  Tests : <span>{covid.tests}</span>
                </h2>
                <h2>
                  Population : <span>{covid.population}</span>
                </h2>
              </div>
              <div class="gen3">
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
          <div class="gra">
            <div class="graline">
              <canvas id="myChart" ref={chartRef} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const lineData = ["global", "all"].includes(params.id.toLowerCase())
    ? { timeline: await api.historical.all({ days: 30 }) }
    : await api.historical.countries({ country: params.id, days: 30 });

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
