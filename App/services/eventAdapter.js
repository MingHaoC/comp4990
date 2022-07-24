 const fromExternalToProjectFormat = (event) => {
    let description = ''
    let name = ""

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

    return {
        id: name.toLowerCase(),
        name: name,
        description: description,
        availabilities: []

    }
}
export default fromExternalToProjectFormat