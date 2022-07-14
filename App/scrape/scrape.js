const cheerio = require("cheerio");
const axios = require("axios");

const baseURL = "https://www.eriestclairhealthline.ca/";
const baseURLMain = baseURL + "listServices.aspx?id=10566&region=WindsorEssex";

const secondaryURL = "https://windsorite.ca/events/categories/community/";

const event_data = [];

//gets main list of events with times (government services for necomers to the area)
async function getEventsList() {
  try {
    const response = await axios.get(baseURLMain);
    const $ = cheerio.load(response.data);

    const eventsURL = $(".serviceListing");
    const array = eventsURL.toArray();

    for (const item of array) {
      var anchor = $(item).find("a");
      if (anchor.attr("id").includes("RegionalServices")) {
        var url = anchor.attr("href");
        eventInfoURL = baseURL + url;

        event_data.push(await getEventInformation(eventInfoURL));
      }
    }
  } catch (error) {
    console.error(error);
  }
}

//daily community events from windsorite.ca (not related to newcomers)
async function getExtraEvents() {
  try {
    const response = await axios.get(secondaryURL);
    const $ = cheerio.load(response.data);

    const events = $(".right.rightener");
    events.each(function () {
      var title = $(this).find("h2 a").text();
      var schedule = $(this).find("div:first-of-type").text();
      var location = $(this).find(".hidemobile").text();
      var phoneContact = "";
      var emailContact = "";
      var description = "";

      event_data.push({
        title,
        description,
        phoneContact,
        emailContact,
        location,
        schedule,
      });
    });
  } catch (error) {
    console.error(error);
  }
}

async function getEventInformation(eventInfoURL) {
  try {
    const response2 = await axios.get(eventInfoURL);
    const $ = cheerio.load(response2.data);

    var title = $("#ctl00_ContentPlaceHolder1_lblProgram").text();
    var phoneContact = $("#ctl00_ContentPlaceHolder1_lblOfficePhone").text();
    var emailContact = $("#ctl00_ContentPlaceHolder1_lnkEmail").text();
    var location = $("#ctl00_ContentPlaceHolder1_lblAddress").text();
    var description = $("#ctl00_ContentPlaceHolder1_lblDescription").text();
    var schedule = "";

    //code to get the schedule of the events
    var scheduleRows = $("#expandedhours > tbody > tr:nth-child(n+2)");

    scheduleRows.each(function () {
      schedule += $(this).find(".hours-label").text() + "@";
      schedule += $(this).find("td:nth-child(2)").text() + " ";
    });

    if (!scheduleRows.length > 0) {
      var schedule = $("#ctl00_ContentPlaceHolder1_lblHours").text();
    }

    return {
      title,
      description,
      phoneContact,
      emailContact,
      location,
      schedule,
    };
  } catch (error) {
    console.error(error);
  }
}

//gets main list as well as extra events
async function fetchEventList() {
  await getExtraEvents(); //daily community events from windsorite.ca
  await getEventsList(); //gets main list of events with times (basically government services for necomers to the area)
  //console.log(event_data);
  return event_data;
}

//only gets main list
async function fetchMainEventList() {
  await getEventsList(); //gets main list of events with times (basically government services for necomers to the area)
  //console.log(event_data);
  return event_data;
}
