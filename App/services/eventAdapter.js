 const fromExternalToProjectFormat = (event) => {
    let description = ''
    let name = ""
    let availabilities = []
    let avilability = {days_of_the_week: [], location: ""}
    //Check for description
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

    //check for title
    const externalHasTitle = event.hasOwnProperty('title')
    if(externalHasTitle){
        name = event['title']
    }

    //check for schedule
    const externalHasSchedule = event.hasOwnProperty('schedule')
    if(externalHasSchedule){
        avilability.days_of_the_week = formatAvailabilities(event['schedule'])
    }

    //check for schedule
    const externalHasLocation = event.hasOwnProperty('location')
    if(externalHasLocation){
        avilability.location = event['location']
    }
    availabilities.push(avilability)
    return {
        id: name.toLowerCase(),
        name: name,
        description: description,
        availabilities: availabilities,
    }
}

const formatAvailabilities = (value) => {
    let days_of_the_week = []
    const avilDateTimes = value.split('*')

    if(avilDateTimes[0].includes('Mon')){
        days_of_the_week.push("Mon")
    }

    if(avilDateTimes[0].includes('Tues')){
        days_of_the_week.push("Tues")
    }
    if(avilDateTimes[0].includes('Wed')){
        days_of_the_week.push("Wed")
    }
    if(avilDateTimes[0].includes('Thurs')){
        days_of_the_week.push("Thurs")
    }
    if(avilDateTimes[0].includes('Fri')){
        days_of_the_week.push("Fri")
    }
    if(avilDateTimes[0].includes('Sat')){
        days_of_the_week.push("Sat")
    }
    if(avilDateTimes[0].includes('Sun')){
        days_of_the_week.push("Sun")
    }
    if((/[a-zA-Z]-[a-zA-Z]/.test(avilDateTimes[0]))){
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

const getDaysIndicies = (days) => {
    const daysIndices = []

    days.forEach(day => {
        daysIndices.push(getDayIndex(day))
    });

    return daysIndices
}

const getDayStrings = (days) => {
    const dayStrings = []

    days.forEach(day => {
        dayStrings.push(getDayString(day))
    });

    return dayStrings
}

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