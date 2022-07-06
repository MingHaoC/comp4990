const cheerio = require("cheerio");
const axios = require("axios");

const url = "https://windsorite.ca/events/categories/community/";
// const baseUrl =
//   "https://books.toscrape.com/catalogue/category/books/mystery_3/";
const event_data = [];

// async function getGenre() {
//   try {
//     const response = await axios.get(url);
//     const $ = cheerio.load(response.data);
//     const genre = $("h1").text();

//     console.log(genre);
//   } catch (error) {
//     console.error(error);
//   }
// }

async function getEvents() {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const events = $(".right.rightener");
    //console.log("Test " + $(":focus"));
    events.each(function () {
      var title = $(this).find("h2 a").text();
      var date = $(this).find("div:first-of-type").text();
      var location = $(this).find(".hidemobile").text();

      event_data.push({ title, date, location });
    });

    // if ($(".next a").length > 0) {
    //   next_page = baseUrl + $(".next a").attr("href");
    //   getBooks(next_page);
    // }

    console.log(event_data);
  } catch (error) {
    console.error(error);
  }
}

getEvents();
