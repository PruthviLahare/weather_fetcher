const getRequestedCity = (req) => {
  return req._url.searchParams.get("city");
};

const serveWeather = async (req) => {
  const city = getRequestedCity(req);

  const a = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=390aed5c564f24b021c467b582873407`
  );

  const data = await a.json();
  console.log(data);

  const temperature = data.main.temp;
  const weatherCondition = data.weather[0].description;

  return new Response(
    `The weather in ${city} is ${temperature} with ${weatherCondition}.`,
    {
      headers: {
        "content-type": "text/html",
      },
      status: 200,
    }
  );
};

const handler = (req) => {
  req._url = new URL(req.url);
  return serveWeather(req);
};

const main = (port) => {
  Deno.serve({ port, handler });
};

main(8000);
