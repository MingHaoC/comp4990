import date from 'date-and-time';

 const fromExternalToProjectFormat = (event) => {
    return {
        id: getEventName(event).toLowerCase(),
        name: getEventName(event),
        description: getEventDescription(event),
        availabilities: getAvilabilities(event),
        category: ''
    }
}

/**
 * Gets the description from an external event
 * @param {Object} event external event
 * @returns string, description adapted for internal event
 */
const getEventDescription = (event) => {
    let description = ''

    const externalHasDescription = event.hasOwnProperty('description')
    description += externalHasDescription ? event["description"] : ""

    //checl for email contatct
    const externalHasEmailContatct = event.hasOwnProperty('emailContact')
    if(externalHasEmailContatct){
        description += (event["emailContact"].trim().length > 0) ? '\n\nEmail Contact: '+event["emailContact"] : ""
    }

    //check for phone contact
    const externalHasPhoneContact = event.hasOwnProperty('phoneContact')
    if(externalHasPhoneContact){
        description += (event["phoneContact"].trim().length > 0) ? '\n\nPhone Contact: '+event["phoneContact"] : ""
    }
    return description
}

/**
 * Gets the event name prop from an external event
 * @param {Object} event external event
 */
const getEventName = (event) => {
    let name = ""

    //check for title
    const externalHasTitle = event.hasOwnProperty('title')
    if(externalHasTitle){
        name = event['title']
    }
    return name
}

/**
 * Gets availabilities from an external event
 * @param {Object} event external event
 * @returns array of availabilities
 */
const getAvilabilities = (event) => {
    let availabilities = []
    //check for schedule
    const externalHasSchedule = event.hasOwnProperty('schedule')
    if(externalHasSchedule){
        availabilities = formatAvailabilities(event['location'],event['schedule'])
    }
    return availabilities
}

/**
 * Gets the date associated with the event
 * @param {string} value schedule value
 * @returns the date in schedule string
 */
const formatDate = (value) => {    

    if(!value.includes(":") && !value.includes("pm") & !value.includes("pm")){
        return value
    }
}

/**
 * Parses availabilities into an array
 * @param {string} location location string value from external event
 * @param {string} value schdeule string value from external event
 * @returns availabilities array
 */
const formatAvailabilities = (location,value) => {
    const avilDateTimes = value.split('*')
    let availabilies = []
    let avilability = {
        days_of_the_week: [], 
        location: "", 
        start_time: {},
        end_time: {}, 
        start_date: new Date(1995).toLocaleDateString(), 
        end_date: new Date(1995).toLocaleDateString(),
        barcode: -1
    }
    
    avilDateTimes.forEach(dateTime => {
        avilability.days_of_the_week = formatDaysOfTheWeek(dateTime)
        avilability.start_time = formatTimes(dateTime).start_time
        avilability.end_time = formatTimes(dateTime).end_time
        avilability.start_date = formatDate(value)
        avilability.location = location
        avilability.barcode = date.format(new Date(), 'hhmmssSSS')
        availabilies.push(avilability)
    });
    return availabilies
  
}


/**
 * Parses days of the week from a schedule string and formats them in an array
 * @param {string} value schedule string value
 * @returns an array of strings of short days of the week
 */
const formatDaysOfTheWeek = (value) => {
    let days_of_the_week = []

    if(value.toLowerCase().includes('mon') || value.toLowerCase().includes('monday')){
        days_of_the_week.push("Mon")
    }

    if(value.toLowerCase().includes('tues') || value.toLowerCase().includes('tuesday')){
        days_of_the_week.push("Tues")
    }
    if(value.toLowerCase().includes('wed') || value.toLowerCase().includes('wednesday')){
        days_of_the_week.push("Wed")
    }
    if(value.toLowerCase().includes('thurs') || value.toLowerCase().includes('thursday')){
        days_of_the_week.push("Thurs")
    }
    if(value.toLowerCase().includes('fri') || value.toLowerCase().includes('friday')){
        days_of_the_week.push("Fri")
    }
    if(value.toLowerCase().includes('sat') || value.toLowerCase().includes('saturday')){
        days_of_the_week.push("Sat")
    }
    if(value.toLowerCase().includes('sun') || value.toLowerCase().includes('sunday')){
        days_of_the_week.push("Sun")
    }
    if((/[a-zA-Z]-[a-zA-Z]/.test(value))){
        let dayIndices = getDaysIndicies(days_of_the_week)
        let start = dayIndices[0]
        let end = dayIndices[dayIndices.length - 1]

        for (let index = start+1; index < end; index++) {
            dayIndices.push(index)
        }
        days_of_the_week = getDayStrings(dayIndices)
    }
    return days_of_the_week
}

/**
 * Parse times from schedule string
 * @param {string} value schedule string value from external event
 * @returns start and end time objects
 */
const formatTimes = (value) => {
    
    let hasTimes = value.includes(":")
    let start_time = {}
    let end_time = {}
    if(!hasTimes){
        start_time = {hour: 0, minute: 0, ante_meridian: 'AM'}
        end_time = {hour: 0, minute: 0, ante_meridian: 'AM'}
        return {end_time,start_time}
    }

    /*Get all times from the schedule strings */
    let regex = /^[^:]\d{1,2}(am)/
    let regex1 = /^[^:]\d{1,2}(pm)/
    let regex4 = /[-]\d{1,2}(am)/
    let regex5 = /[-]\d{1,2}(pm)/
    let regex2 = /\d{1,2}:\d{1,2}(am)/
    let regex3 = /\d{1,2}:\d{1,2}(pm)/

    let times = []
    let arr = value.match(regex) ? value.match(regex) : []
    let arr1 = value.match(regex1) ? value.match(regex1) : []
    let arr2 = value.match(regex2)? value.match(regex2) : []
    let arr3 = value.match(regex3)? value.match(regex3) : []
    let arr4 = value.match(regex4)? value.match(regex4) : []
    let arr5 = value.match(regex5)? value.match(regex5) : []

    for (let index = 0; index < arr4.length; index++) {
        arr4[index] = arr4[index].slice(1);
        
    }
    for (let index = 0; index < arr5.length; index++) {
        arr5[index] = arr5[index].slice(1);
        
    }
    //concats all the non null values 
    let times2 = times.concat(arr,arr1,arr2,arr3,arr4,arr5)

    //May match any 'am' or 'pm' in the string, so remove those items that are only am/pm and not a time
    times = times2.filter(x => !(x == "am" || x =="pm" || x == "m"))

    //Parse strings
    let time0;
    let time1;

    if(times[0]){
         time0 = dateFromTime(times[0])

        if(times[1]){
            time1 = dateFromTime(times[1])

            if(time0 > time1){
                end_time = {hour: date.format(time0,'h'), minute:date.format(time0,'mm'), ante_meridian: date.format(time0,'A')}
                start_time = {hour: date.format(time1,'h'), minute:date.format(time1,'mm'), ante_meridian: date.format(time1,'A')}
        
            }else{
                start_time = {hour: date.format(time0,'h'), minute:date.format(time0,'mm'), ante_meridian: date.format(time0,'A')}
                end_time = {hour: date.format(time1,'h'), minute:date.format(time1,'mm'), ante_meridian: date.format(time1,'A')}
            }
        }else{
            start_time = {hour: date.format(time0,'h'), minute:date.format(time0,'mm'), ante_meridian: date.format(time0,'A')}
        }
   }

  
    

    return {end_time,start_time}
}

/**
 * Parse a time string and use it to create a date
 * @param {string} timeString in the format HH:MM AA or HHAA 
 * @returns A date with the given time set
 */
const dateFromTime = (timeString) => {

    if(!timeString){return}
    let formattedDate = new Date()

    //Removes blank space and sets ante meridian to upper
    timeString = timeString.toUpperCase().trim()    
    
    if(timeString.includes(":")){
        formattedDate = date.parse(timeString, 'h:mmA')
    }else{
        formattedDate = date.parse(timeString,'hA')
    }
    return formattedDate
}

/**
 * Given an array of indices [0,6], provide an array of corresponding short day of the week string, where the week starts on Sun
 * Sun=0, Mon=1, Tues=2, Wed=3, Thurs=4, Fri=5, Sat=6 
 * @param {Array[Number]} days an array of day indices
 * @returns An array of short day of the week string 
 */
const getDaysIndicies = (days) => {
    const daysIndices = []

    days.forEach(day => {
        daysIndices.push(getDayIndex(day))
    });

    //sort ascending
    daysIndices.sort(function(a, b){return a - b})
    return daysIndices
}

/**
 * Gets an array of day of the week indices from an array of short day of the week strings. Where the week starts on 
 * Sun=0, Mon=1, Tues=2, Wed=3, Thurs=4, Fri=5, Sat=6
 * @param {Array[string]} days Array of short day of the week string ie: ['Mon','Tues']
 * @returns An array of numbers associated with the short day of the week string where the week starts on Sun and Sun = 0 and Sat = 6
 */
const getDayStrings = (days) => {
    const dayStrings = []

    days.forEach(day => {
        dayStrings.push(getDayString(day))
    });

    return dayStrings
}

/**
 * Gets the short day of the week string associated with a given index  
 * @param {Number} day index 0-6
 * @returns The associated short day of the week string(Sun,Mon,Tues,Wed,Thurs,Fri,Sat)
 */
const getDayString = (day) => {
    switch (day) {
        case 0:
            return "Sun"
        case 1:
            return "Mon"
        case 2:
            return "Tues"
        case 3:
            return "Wed"
        case 4:
            return "Thurs"
        case 5:
            return "Fri"
        case 6:
            return "Sat"
        default:
            break;
    }
}

/**
 * Gets the index associated with a day of the week
 * @param {string} day short day (Mon, Tues,Wed,Thurs,Fri,Sat,Sun)
 * @returns the number day index, where the week starts sun = 0 and ends sat = 1
 */
const getDayIndex = (day) => {
    switch (day) {
        case "Sun":
            return 0;
        case "Mon":
            return 1;
        case "Tues":
            return 2;  
        case "Wed":
            return 3;
        case "Thurs":
            return 4;  
        case "Fri":
            return 5;  
        case "Sat":
            return 6;  
        default:
            break;
    }
}

export default fromExternalToProjectFormat