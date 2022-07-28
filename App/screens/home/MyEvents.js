import { View, Text, Pressable, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Accordian,
  InlineSelect,
  Paper,
  ProjectButton,
  ProjectHeader,
  ProjectTextInput,
  Underline,
} from "../../components";
import { ScrollView } from "react-native-gesture-handler";
import styles from "../../styles";
import Icon from "react-native-vector-icons/FontAwesome";
import IconF from "react-native-vector-icons//Feather";
import {
  MyEventProvider,
  useMyEventContext,
} from "../../actions/My Events/MyEventsContext";
import DropModal from "./my-events-modals/DropModal";
import EventFilter from "./my-events-modals/EventFilter";
import * as Directions from "expo-location";

const MyEvents = (props) => {
  return (
    <MyEventProvider>
      <StatusBar />
      <MyEventsContents {...props} />

      {/*Modals */}
      <DropModal />
      <EventFilter />
    </MyEventProvider>
  );
};

/**
 * This component is used just to be nested in the MyEventProvider
 * @param {Object} props passed from MyEvents
 * @returns JSX Object
 */
const MyEventsContents = ({ navigation }) => {
  /*Get props and actions from context */
  const { events, openEventFilter } = useMyEventContext();

  const openEventFilterModal = () => {
    openEventFilter();
  };
  return (
    <>
      {/*Nav + Searchbar */}
      <ProjectHeader navigation={navigation}>
        {/* Search for Event By Name*/}
        <ProjectTextInput
          placeholder="Find Events..."
          form_input_error_text={[styles.disappeared]}
          form_input={[styles.margin_bottom_small]}
          form_input_label={[styles.disappeared]}
          onChangeText={(value) => {
            selectEventName(value);
          }}
        />
      </ProjectHeader>

      {/*Background */}
      <View style={[styles.padding_large]}>
        {/*Container for Toggle Filter Button*/}
        <Paper style={[styles.margin_vertical_medium]}>
          {/*Toggle Filter Button*/}
          <Pressable
            onPress={() => {
              openEventFilterModal();
            }}
          >
            <Text
              style={[
                styles.text_medium,
                styles.center,
                styles.margin_vertical_medium,
              ]}
            >
              <Icon name="filter" style={[styles.text_medium]} />
              <Text style={styles.theme_tinted_colour}> Filter Events</Text>
            </Text>
          </Pressable>
        </Paper>

        {/*Events */}
        <Paper>
          <ScrollView>
            <Events events={events} navigation={navigation} />
          </ScrollView>
        </Paper>
      </View>
    </>
  );
};

/**
 * Renders an array of events
 * @param {Object} events Array[event]
 * @returns JSX Object
 */
const Events = ({ events, navigation }) => {
  return (
    <View
      style={[styles.padding_horizontal_medium, styles.margin_bottom_xlarge]}
    >
      {/*Display Number of Results */}
      <View style={[styles.row, styles.padding_horizontal_medium]}>
        {/*Label */}
        <Text
          style={[styles.text_medium, styles.theme_tinted_colour, styles.bold]}
        >
          Event Results
        </Text>

        {/*Value */}
        <Text
          style={[styles.text_medium, styles.theme_tinted_colour, styles.bold]}
        >
          {events.length} Results
        </Text>
      </View>

      <Underline />

      {/*Event List*/}
      <ScrollView style={[styles.margin_bottom_xlarge]}>
        {events.map((event) => {
          return <Event {...event} key={event.id} navigation={navigation} />;
        })}
        <Text style={[styles.margin_bottom_xlarge]}></Text>
        <Text style={[styles.margin_bottom_xlarge]}></Text>
        <Text style={[styles.margin_bottom_xlarge]}></Text>
        <Text style={[styles.margin_bottom_xlarge]}></Text>
      </ScrollView>
    </View>
  );
};

/**
 * Renders a single event
 * @param {Object} event props
 * @returns JSX Object for Event
 */
const Event = ({
  id,
  name,
  description,
  days_of_the_week,
  start_time,
  end_time,
  start_date,
  end_date,
  location,
  other_information,
  navigation,
}) => {
  /*Get Props and actions from context */
  const { openDropEventModal } = useMyEventContext();

  return (
    <View style={styles.margin_vertical_medium}>
      {/*Event Container */}
      <Paper
        title={name}
        header={2}
        underlineStyle={[styles.disappeared]}
        headerTitleStyle={[styles.h1, styles.theme_tinted_colour]}
      >
        <MeetingTimes
          days={days_of_the_week}
          start_time={start_time}
          end_time={end_time}
        />
        <Address location={location} id={id} navigation={navigation} />
        <Duration start_date={start_date} end_date={end_date} id={id} />
        {description && (
          <Description
            description={description}
            other_information={other_information}
          />
        )}

        <ProjectButton
          type="attention"
          title="Drop Event"
          style={[styles.margin_medium]}
          onPress={() => {
            openDropEventModal(id);
          }}
        />
      </Paper>
    </View>
  );
};
Event.defaultProps = {
  start_time: { hour: 0, minute: 0, ante_meridian: "AM" },
  end_time: { hour: 0, minute: 0, ante_meridian: "AM" },
  days_of_the_week: [],
  start_date: "undefined",
  end_date: "undefined",
  location: "undefined",
  description: "",
  other_information: "",
};

/**
 * Displays an event's description
 * @param {Object} description - (string) An events description
 *                  other_information - (string) additional information associated with the event
 * @returns JSX Accordian Object
 */
const Description = ({ description, other_information }) => {
  return (
    <Accordian
      title="Description"
      titleStyle={[styles.bold]}
      content={
        <View>
          {/*Description */}
          <Text style={[styles.text_small, styles.padding_medium]}>
            {description}
          </Text>

          {/*Other Info*/}
          {other_information.trim().length > 0 && (
            <>
              <Text
                style={[styles.text_small, styles.padding_medium, styles.bold]}
              >
                Additional Information
              </Text>
              <Underline style={[styles.margin_horizontal_medium]} />
              <Text style={[styles.text_small, styles.padding_medium]}>
                {other_information}
              </Text>
            </>
          )}
        </View>
      }
    />
  );
};

Description.defaultProps = {
  other_information: "",
  description: "",
};

/**
 * Displays the session start and end dates
 * @param {Object} {start_date,end_date}
 * @returns JSX object displaying session and and start dates
 */
const Duration = ({ start_date, end_date }) => {
  return (
    <Accordian
      title="Session Dates"
      titleStyle={[styles.bold]}
      content={
        <View style={[styles.row, styles.padding_horizontal_medium]}>
          {/*Start Date Column*/}
          <View>
            <Text
              style={[
                styles.text_medium,
                styles.bold,
                styles.muted_text_2_colour,
              ]}
            >
              Session Start:
            </Text>
            <Text style={[styles.text_medium, styles.muted_text_2_colour]}>
              {start_date}
            </Text>
          </View>

          {/*End Date Column*/}
          <View>
            <Text
              style={[
                styles.text_medium,
                styles.bold,
                styles.muted_text_2_colour,
              ]}
            >
              Session End:
            </Text>
            <Text style={[styles.text_medium, styles.muted_text_2_colour]}>
              {end_date}
            </Text>
          </View>
        </View>
      }
    />
  );
};
/**
 * Displays the meeting times of an event
 * @param {Object}  id - id of the event
 *                  start_time - ({hour,minute,ante_meridian}) Represents the start of event meeting time
 *                  end_time - ({hour,minute,ante_meridian}) Represents the end of event meeting time
 * @returns JSX Object displaying an event's meeting times
 */
const MeetingTimes = ({ id, days, start_time, end_time }) => {
  /*Get Props and actions from context */
  const {
    event_filter,
    // openEventInSchedule
  } = useMyEventContext();

  const daysData = event_filter.days.data;

  //We will use a disabled inline select to display the meeting days
  //days will be passed as a string array to this component
  //The Inline select takes an array of ids,
  //so we must build an int array with the day ids and pass it to InlineSelect.selectedIndicies
  //This varible will be used to hold the day ids
  const [selected, setSelected] = useState([]);

  /**
   * Takes a short day string and returns its corresponding id
   * @param {string} value A day of the week (shortend)
   * @returns The corresponding id for that say
   */
  const getDayID = (value) => {
    switch (value) {
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
  };

  /**
   * Gets each day in the days string array and gets it id then creates an array of corresponding day ids
   * selected is then set to days ids array
   * (sun=0, mon=1, tues=2, wed=3, thurs=4, fri=5, sat=6)
   */
  const addAllSelected = () => {
    const selectedTemp = [];
    days.forEach((day) => {
      let val = getDayID(day);
      selectedTemp.push(val);
    });
    setSelected(selectedTemp);
  };

  useEffect(() => {
    addAllSelected();
  }, []);

  return (
    <Accordian
      title="Meeting Times"
      titleStyle={[styles.bold]}
      collapsed={false}
      content={
        <View style={[styles.padding_horizontal_medium]}>
          {/*Meeting Days */}
          <InlineSelect
            disabled={true}
            multiselect={true}
            data={daysData}
            selectedIndicies={selected}
          />

          <View style={[styles.row]}>
            {/*Meeting Times */}
            <Text style={[styles.text_medium]}>
              {start_time.hour}:{start_time.minute} {start_time.ante_meridian} -{" "}
              {end_time.hour}:{end_time.minute} {end_time.ante_meridian}
            </Text>

            {/*Button Opens Event in Schedule */}
            <ProjectButton
              title={
                <Text>
                  <Icon
                    name="calendar"
                    style={[styles.text_medium, styles.padding_right_medium]}
                  />{" "}
                  Schedule
                </Text>
              }
              type="info"
              onPress={() => {}}
            />
          </View>
        </View>
      }
    />
  );
};

const getDirections = (destination, navigation) => {
  (async function () {
    let { status } = await Directions.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      //need something to let user know we cant give directions without their permission
      return;
    }

    let currentLocationDetails;
    try {
      currentLocationDetails = await Directions.getCurrentPositionAsync({ accuracy: Directions.Accuracy.Balanced });
      let currentLocation = {
        latitude: currentLocationDetails.coords.latitude,
        longitude: currentLocationDetails.coords.longitude,
      };
  
      let currentDestinationDetails = await getDestinationDetails(destination);
  
      let currentDestination = {
        latitude: currentDestinationDetails.lat,
        longitude: currentDestinationDetails.lng,
      };
  
      //TODO
      //need to send the user to the map screen with the two variables, currentDestination and currentLocation as props.
      //userLocation={currentLocation} eventDestination={currentDestination}
      /* am i doing this right??? */
      navigation.navigate("MapDirections", {
        userLocation: currentLocation,
        eventDestination: currentDestination,
      });
    } catch( error ) {
      console.log(error);
    }
  })();
};

const getDestinationDetails = async (eventDestination) => {
  // if statement to ensure the location is windsor ontario
  if (
    !eventDestination.includes("Windsor") ||
    !eventDestination.includes("Ontario") ||
    !eventDestination.includes("ON")
  ) {
    eventDestination += "Ontario";
  }
  var axios = require("axios");

  //set currentdestinatio
  let currentDestination = {
    latitude: 0,
    longitude: 0,
  };

  var config = {
    method: "get",
    url:
      "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?" +
      "input= " +
      eventDestination +
      "&inputtype=textquery" +
      "&fields=geometry" +
      "&key=AIzaSyDJSMw5bJWGcs17vqjnB4kZSkusq0FGWEU",
    headers: {},
  };

  await axios(config)
    .then(function (response) {
      if (response.data.status === "OK") {
        currentDestination = response.data.candidates[0].geometry.location;
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  return currentDestination;
};

/**
 * Displays location info & nav button
 * @param {Object} {id,location} location is a string
 * @returns JSX Object displaying location
 */
const Address = ({ id, location, navigation }) => {
  const { navigateToEvent } = useMyEventContext();

  return (
    <View style={[styles.padding_horizontal_medium]}>
      {/*Section Title */}
      <Text
        style={[
          styles.text_medium,
          styles.muted_text_2_colour,
          styles.padding_top_small,
          styles.bold,
        ]}
      >
        Location:
      </Text>

      {/*Section Info */}
      <View style={[styles.row]}>
        {/*Location */}
        <Text
          style={[
            styles.text_medium,
            styles.muted_text_2_colour,
            styles.padding_top_small,
          ]}
        >
          {location}
        </Text>

        {/*Nav Button */}
        <ProjectButton
          type="info"
          title={
            <Text>
              <IconF name="navigation" style={[styles.text_medium]} /> Navigate
            </Text>
          }
          onPress={() => {
            getDirections(location, navigation);
          }}
        />
      </View>
    </View>
  );
};

export default MyEvents;