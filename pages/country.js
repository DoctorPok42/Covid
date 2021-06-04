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
    `https://disease.sh/v3/covid-19/countries/France%2C%20US%2C%20United%20Kingdom%2C%20China%2C%20India%2C%20Japan%2C%20Canada%2C%20Germany%2C%20Spain%2C%20Russia%2C%20South%20Korea%2C%20Egypt%2C%20Australia%2C%20Italy%2C%20Greece%2C%20Israel%2C%20Palestine%2C%20Liechtenstein?yesterday=true&twoDaysAgo=true&allowNull=true`
  ).then((r) => r.json());

  return {
    props: {
      covids,
    },
  };
}
