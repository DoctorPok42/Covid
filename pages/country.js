import Head from "next/head";
import Link from "next/link";
import world from "../lib/world";

export default function Home({ covids }) {
  const scaleShade = [
    "#e76161",
    "#F99B7D",
    "#FFEEBB",
    "#609966",
    "#C0DEFF",
    "#8D9EFF",
    "#4942E4",
    "#FFB2F5",
    "#D4ADFC",
    "#9384D1",
    "#ffffff"
  ];

  return (
    <>
      <Head>
        <title>Country | Stats-Covid19</title>
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
      </Head>
      <main class="container">
        <div class="top">
          <h1>Stats-Covid19</h1>
          <div class="link">
            <Link href={`./`}>
              <a>all</a>
            </Link>

            <Link href={``}>
              <a id="here">select country</a>
            </Link>

            <Link href={`https://discord.gg/5jPMAvfquT`}>
              <a target="_blank">support</a>
            </Link>
          </div>
        </div>

        <div class="content2">
          <div className="echelle">
            <h2>Scale of cases :</h2>
            <span>1 000 000</span>
            <span>0</span>
            {
              scaleShade.map((color) => (
                <div class="color2" style={{ backgroundColor: color }}></div>
              ))
            }
          </div>
          {
            <div class="map">
              <svg className="testSvg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 1008 651">
                <g>
                  {world.map((country) => (
                    covids.map((covid) => (
                      covid.countryInfo.iso2 == country.id ? (
                        <Link href={`./country/${country.id}`}>
                          <a>
                            <path
                              id={covid.country}
                              title={country.name}
                              d={country.d}
                              fill={covid.cases > 1000000 ? scaleShade[0] : covid.cases > 500000 ? scaleShade[1] : covid.cases > 100000 ? scaleShade[2] : covid.cases > 50000 ? scaleShade[3] : covid.cases > 10000 ? scaleShade[4] : covid.cases > 5000 ? scaleShade[5] : covid.cases > 1000 ? scaleShade[6] : covid.cases > 500 ? scaleShade[7] : covid.cases > 100 ? scaleShade[8] : covid.cases > 50 ? scaleShade[9] : covid.cases > 10 ? scaleShade[10] : covid.cases > 0 ? scaleShade[11] : "#ffffff"}
                              strokeMiterlimit="10"
                            />
                          </a>
                        </Link>
                      ) : null
                    ))
                  ))}
                </g>
              </svg>
            </div>
          }
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

export async function getStaticProps() {
  const allCovidsCountryToday = await fetch(
    "https://disease.sh/v3/covid-19/countries?yesterday=false&twoDaysAgo=false&sort=cases"
  ).then((res) => res.json());

  return {
    props: {
      covids: allCovidsCountryToday,
    },
  };
}
