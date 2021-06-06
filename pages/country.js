import Head from "next/head";
import Link from "next/link";

export default function Home({ covids }) {
  return (
    <>
      <Head>
        <title>Country | Covid-Stats</title>
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
      </Head>
      <main class="container">
        <div class="top">
          <h1>Covid-Info</h1>

          <div class="link">
            <Link href={`./`}>
              <a>all</a>
            </Link>

            <Link href={``}>
              <a id="here">select country</a>
            </Link>
          </div>
        </div>

        <div class="content2">
          {covids.map((covid) => (
            <Link href={`./country/${covid.country}`}>
              <a>
                <div class="box">
                  <h2>{covid.country}</h2>
                  <img src={covid.countryInfo.flag} />
                </div>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const covids = await fetch(
    `https://disease.sh/v3/covid-19/countries/France%2CUS%2CUnited%20Kingdom%2CChina%2CIndia%2CJapan%2CCanada%2CGermany%2CSpain%2CRussia%2CSouth%20Korea%2CEgypt%2CAustralia%2CItaly%2CGreece%2CIsrael%2CPalestine%2CLiechtenstein%2CCameroon%2CSouth%20Africa%2CBrazil%2CIreland%2CNew%20Zealand%2CFrench%20Polynesia%2CMexico%2CSeychelles%2CAlgeria%2CTunisia%2CPortugal%2CDenmark%2CAfghanistan%2CIran%2CIceland?yesterday=true&twoDaysAgo=true&allowNull=true`
  ).then((r) => r.json());

  return {
    props: {
      covids,
    },
  };
}
