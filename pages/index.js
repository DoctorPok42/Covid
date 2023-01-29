import React, { useState } from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import Head from "next/head";
import Link from "next/link";
const api = require("novelcovid");
const moment = require("moment");

export default function Post({ covids, lineData }) {
  function form(nb) {
    return new Intl.NumberFormat("de-DE").format(nb);
  }

  const [dataSample1, setDataSample1] = useState({
    options: {
      chart: {
        id: "chart1",
        group: "social",
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
    },
    yaxis: {
      max: 100,
      align: "right",
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
        group: "social",
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
        group: "social",
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
        name: "Deaths",
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

  return (
    <>
      <Head>
        <title>Stats-Covid19</title>
        <meta charset="UTF8" />
        <meta name="theme-color" content="#6495ed" />
        <meta name="title" content="Stats-Covid19" />
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
          <div class="link">
            <Link href={``}>
              <a id="here">all</a>
            </Link>

            <Link href={`./country`}>
              <a>select country</a>
            </Link>

            <Link href={`https://discord.gg/5jPMAvfquT`}>
              <a target="_blank">support</a>
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
          <div
            id="titlegra"
            style={{
              marginLeft: "300px",
              width: "60%",
            }}
          >
            <h2>
              Graph for <span id="cases">cases</span>,{" "}
              <span id="deaths">deaths</span>, and{" "}
              <span id="active">active</span> for the last 31 days in the word
              {/* <span id="recovered">recovered</span> */}
            </h2>
          </div>
        </div>
        <div className="charts">
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

        <div class="footer">
          <h2>
            Made with <span>❤</span> by DoctorPok
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
