import Head from "next/head";
import Link from "next/link";
const moment = require("moment");

export default function Post({ covid }) {
  let colors = [
    "#ED4245",
    "#F9A72D",
    "#5865F2",
    "#57F287",
    "#5BD7E5",
    "#E367D3",
    "#FEE75C",
    "#B05AE9",
    "#EB459E",
  ];

  var color = colors[Math.floor(Math.random() * colors.length)];
  return (
    <>
      <Head>
        <title>{covid.country} | Covid-Stats</title>
        <meta charset="UTF8" />
        <meta name="theme-color" content={color} />
        <meta name="title" content={`${covid.country} | Covid-Stats`} />
        <meta name="description" content="Site de stats pour la covid19" />
        <meta name="keywords" content="covid, covid19, stats" />
        <meta name="author" content="DoctorPok" />
        <meta name="robots" content="index" />
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
        </div>
      </main>
    </>
  );
}

export async function getStaticProps({ params }) {
  const covid = await fetch(
    `https://disease.sh/v3/covid-19/countries/${params.id}?yesterday=true&twoDaysAgo=true&strict=true&allowNull=true`
  ).then((r) => r.json());
  return {
    props: {
      covid,
    },
  };
}

export async function getStaticPaths() {
  const covids = await fetch(
    `https://disease.sh/v3/covid-19/countries/US%2C%20France%2C%20United%20Kingdom%2C%20China%2C%20India%2C%20Japan%2C%20Canada%2C%20Germany%2C%20Spain%2C%20Russia%2C%20South%20Korea%2C%20Egypt%2C%20Australia%2C%20Italy%2C%20Greece%2C%20Israel%2C%20Palestine%2C%20Liechtenstein?yesterday=true&twoDaysAgo=true&allowNull=true`
  ).then((r) => r.json());
  return {
    paths: covids.map((covid) => ({
      params: { id: covid.country },
    })),
    fallback: false,
  };
}
