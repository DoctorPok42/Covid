import React, { useState } from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import Head from "next/head";
import Link from "next/link";
const api = require("novelcovid");
const moment = require("moment");

export default function Post({ covid, lineData }) {
  function form(nb) {
    return new Intl.NumberFormat("de-DE").format(nb);
  }

  const [dataSample1, setDataSample1] = useState({
    options: {
      chart: {
        id: "chart1",
        group: "graph",
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#17ead9"],
    },
    series: [
      {
        name: "Cases",
        data: Object.values(lineData.timeline.cases),
      },
    ],
    grid: {
      row: {
        colors: ["#1b213b", "transparent"],
        opacity: 0,
      },
    },
    xaxis: {
      type: "numeric",
      categories: Object.keys(lineData.timeline.cases),
      labels: Object.keys(lineData.timeline.cases).map((dateString) => {
        const [month, day, year] = dateString.split("/");
        return [day, month, year].join("/");
      }),
    },
    yaxis: {
      align: "right",
      style: {
        color: "#fff",
      },
    },
    title: {
      text: "Cases",
      align: "left",
      style: {
        fontSize: "20px",
        color: "#fff",
      },
    },
    labels: ["Cases"],
    legend: {
      show: true,
      floating: true,
      horizontalAlign: "left",
      onItemClick: {
        toggleDataSeries: true,
      },
      position: "top",
      offsetY: 0,
      offsetX: 60,
    },
  });

  const [dataSample2, setDataSample2] = useState({
    options: {
      chart: {
        id: "chart2",
        group: "graph",
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#f02fc2"],
    },
    series: [
      {
        name: "Deaths",
        data: Object.values(lineData.timeline.deaths),
      },
    ],
    grid: {
      row: {
        colors: ["#1b213b", "transparent"],
        opacity: 0,
      },
    },
    xaxis: {
      type: "numeric",
    },
    yaxis: {
      max: 100,
      align: "right",
    },
    title: {
      text: "Deaths",
      align: "left",
      style: {
        fontSize: "20px",
        color: "#fff",
      },
    },
    labels: ["Deaths"],
    legend: {
      show: true,
      floating: true,
      horizontalAlign: "left",
      onItemClick: {
        toggleDataSeries: true,
      },
      position: "top",
      offsetY: 0,
      offsetX: 60,
    },
  });

  const [dataSample3, setDataSample3] = useState({
    options: {
      chart: {
        id: "chart3",
        group: "graph",
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#fccf31"],
    },
    series: [
      {
        name: "Active",
        data: Object.keys(lineData.timeline.cases).map(
          (key) =>
            lineData.timeline.cases[key] -
            lineData.timeline.recovered[key] -
            lineData.timeline.deaths[key]
        ),
      },
    ],
    grid: {
      row: {
        colors: ["#1b213b", "transparent"],
        opacity: 0,
      },
    },
    xaxis: {
      type: "numeric",
    },
    yaxis: {
      max: 100,
      align: "right",
    },
    title: {
      text: "Active",
      align: "left",
      style: {
        fontSize: "20px",
        color: "#fff",
      },
    },
    labels: ["Active"],
    legend: {
      show: true,
      floating: true,
      horizontalAlign: "left",
      onItemClick: {
        toggleDataSeries: true,
      },
      position: "top",
      offsetY: 0,
      offsetX: 60,
    },
  });

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
      <main class="container">
        <div class="top">
          <h1>Stats-Covid19</h1>
          <div class="link">
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

        <div class="content3">
          {/* <div class="card">
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
          </div> */}
          <div class="box">
            <img src={covid.countryInfo.flag} />
            <div class="txt">
              <div class="gen1">
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
              <div class="gen2">
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
          {/*<div className="btns">
             <input
              type="button"
              id="change"
              value="Double click to change the display to : Table"
              onClick={() => {
                document
                  .getElementById("change")
                  .addEventListener("click", () => {
                    if (
                      document.getElementById("change").value ===
                      "Double click to change the display to : Graph"
                    ) {
                      document.getElementById("change").value =
                        "Double click to change the display to : Table";
                      document.getElementById("titlegra").style.display =
                        "flex";
                      document.getElementById("gra1").style.display = "flex";
                      document.getElementById("gra2").style.display = "flex";
                      // document.getElementById("gra3").style.display = "flex";
                      document.getElementById("gra4").style.display = "flex";
                      document.getElementById("stats").style.display = "none";
                    } else {
                      document.getElementById("change").value =
                        "Double click to change the display to : Graph";
                      document.getElementById("titlegra").style.display =
                        "none";
                      document.getElementById("gra1").style.display = "none";
                      document.getElementById("gra2").style.display = "none";
                      // document.getElementById("gra3").style.display = "none";
                      document.getElementById("gra4").style.display = "none";
                      document.getElementById("stats").style.display = "flex";
                    }
                  });
              }}
            />
          </div>*/}
          <div className="graph">
            <div id="titlegra">
              <h2>
                Graph for <span id="cases">cases</span>,{" "}
                <span id="deaths">deaths</span>, <span id="active">active</span>{" "}
                for the last 31 days in <span>{covid.country}</span>
              </h2>
              {/* <span id="recovered">recovered</span> and{" "} */}
            </div>
          </div>
          <div className="charts2">
            <Chart
              options={dataSample1.options}
              series={dataSample1.series}
              type="area"
              width="220%"
              height={250}
            />
            <Chart
              options={dataSample2.options}
              series={dataSample2.series}
              type="area"
              width="220%"
              height={250}
            />
            <Chart
              options={dataSample3.options}
              series={dataSample3.series}
              type="area"
              width="220%"
              height={250}
            />
          </div>
          {/*
          <div className="stats" id="stats" style={{ display: "none" }}>
            <div className="container">
              {Object.keys(lineData.timeline.cases).map((dateString) => {
                const [month, day, year] = dateString.split("/");
                const nomaldate = [day, month, year].join(" / ");
                return (
                  <div className="content">
                    <div className="dates">{nomaldate}</div>
                    <div className="numbers">
                      <p>Cases : {lineData.timeline.cases[dateString]} | </p>
                      <p>Deaths : {lineData.timeline.deaths[dateString]} | </p>
                      {/* <p>
                        Recovered : {lineData.timeline.recovered[dateString]} |{" "}
                      </p> */}
          {/*<p>
                        Active :{" "}
                        {lineData.timeline.cases[dateString] -
                          lineData.timeline.deaths[dateString] -
                          lineData.timeline.recovered[dateString]}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div> */}
        </div>
        <div class="footer">
          <h2>
            Made with <span>❤</span> by DoctorPok
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
