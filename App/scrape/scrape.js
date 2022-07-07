const cheerio = require("cheerio");
const axios = require("axios");

const baseURL = "https://www.eriestclairhealthline.ca/";
const baseURLMain = baseURL + "listServices.aspx?id=10566&region=WindsorEssex";

async function getEventsList() {
  try {
    const response = await axios.get(baseURLMain);
    const $ = cheerio.load(response.data);
    const event_data = [];

    const eventsURL = $(".serviceListing");

    eventsURL.each(async function () {
      var anchor = $(this).find("a");
      if (anchor.attr("id").includes("RegionalServices")) {
        var url = anchor.attr("href");
        eventInfoURL = baseURL + url;

        let event = await getEventInformation(eventInfoURL);
        console.log(event);
        //console.logging the above line works as intended, the issue arises when trying to push the event to the array, and then printing out the array afterwards
        //the array prints out empty.
        //maybe an issue with async await?

        event_data.push(event);
      }
    });
    console.log(event_data);
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

getEventsList();
//getEvents();
