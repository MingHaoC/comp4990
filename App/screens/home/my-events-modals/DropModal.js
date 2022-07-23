import { Modal, View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useMyEventContext } from "../../actions/My Events/MyEventsContext";
import { Paper, ProjectButton, Underline } from "../../components";
import styles from "../../styles";

/**
 * Modal for dropping an event from 'MyEvents'
 * @returns JSX Modal
 */
const DropModal = () => {

    /*Get Context Props and Actions */
    const {
        drop_event_modal,
        dropEvent,
        closeDropEventModal
    } = useMyEventContext()

    const {
        event_selected,
        is_open
    } = drop_event_modal

    return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={is_open}
        onRequestClose={() => {
            Alert.alert("Modal has been closed.");
    }}>
        {/*Background Overlay*/}
        <View style={[styles.container, 
            styles.center,
            styles.full_container,
            styles.modal_backdrop_bg
        ]}>
            <ScrollView>
                {/*Modal Container*/}
                <Paper title="Are you sure you want to drop this event?" 
                    header={2}
                    headerTitleStyle={[styles.theme_colour]}
                >

                    {/*Modal Content */}
                    <View style={[styles.padding_medium]}>
                        
                        <ProjectButton title="Cancel" 
                            onPress={() => {closeDropEventModal()}}
                            style={[styles.margin_vertical_medium]}
                        />

                        <EventDetails {...event_selected}/>

                        <Text style={[styles.text_medium, styles.theme_colour, styles.padding_vertical_medium]}>This action cannot be reversed.</Text>

                        <ProjectButton title="Drop Event" 
                            type="attention" 
                            onPress={()=>{dropEvent(event_selected.id)}}
                            style={[
                                styles.margin_vertical_medium
                            ]}
                        />
                        <ProjectButton title="Cancel" 
                            onPress={() => {closeDropEventModal()}}
                        />
                    </View>
                </Paper>
            </ScrollView>
        </View>
    </Modal>
    );
}

export default DropModal

/**
 * Displays the event being dropped
 */
const EventDetails = ({name,description,other_information,category, location, min_age,max_age,days_of_the_week,start_date,end_date,start_time,end_time }) => {

    return(
        <Paper>
            <View style={[styles.padding_medium]}>
                {/*Name */}
                <View>
                    <View  style={[styles.row]}>
                        <Text style={[styles.text_medium, styles.muted_text_2_colour]}>Name:</Text>
                        <Text style={[styles.text_medium, styles.muted_text_1_colour,styles.medium_container,styles.right_text]}>{name}</Text>   
                    </View>
                    <Underline />                             
                </View>

                {/*Location */}
                <View>
                    <View  style={[styles.row]}>
                        <Text style={[styles.text_medium, styles.muted_text_2_colour]}>Age Range:</Text>
                        <Text style={[styles.text_medium, styles.muted_text_1_colour,styles.medium_container,styles.right_text]}>{min_age} - {max_age}</Text>   
                    </View>
                    <Underline />                             
                </View>

                {/*Location */}
                <View>
                    <View  style={[styles.row]}>
                        <Text style={[styles.text_medium, styles.muted_text_2_colour]}>Location:</Text>
                        <Text style={[styles.text_medium, styles.muted_text_1_colour,styles.medium_container,styles.right_text]}>{location}</Text>   
                    </View>
                    <Underline />                             
                </View>

                {/*Days */}
                <View>
                    <View  style={[styles.row]}>
                        <Text style={[styles.text_medium, styles.muted_text_2_colour, styles.small_container]}>Days:</Text>
                        <Text style={[styles.text_medium, styles.muted_text_1_colour,styles.medium_container,styles.right_text]}>{days_of_the_week.join(', ')}</Text>   
                    </View>
                    <Underline />                             
                </View>

                {/*Start Date */}
                <View>
                    <View  style={[styles.row]}>
                        <Text style={[styles.text_medium, styles.muted_text_2_colour]}>Start Date:</Text>
                        <Text style={[styles.text_medium, styles.muted_text_1_colour,styles.medium_container,styles.right_text]}>{start_date}</Text>   
                    </View>
                    <Underline />                             
                </View>

                {/*End Date */}
                <View>
                    <View  style={[styles.row]}>
                        <Text style={[styles.text_medium, styles.muted_text_2_colour]}>End Date:</Text>
                        <Text style={[styles.text_medium, styles.muted_text_1_colour,styles.medium_container,styles.right_text]}>{end_date}</Text>   
                    </View>
                    <Underline />                             
                </View>

                {/*Start Time */}
                <View>
                    <View  style={[styles.row]}>
                        <Text style={[styles.text_medium, styles.muted_text_2_colour]}>Start Time:</Text>
                        <Text style={[styles.text_medium, styles.muted_text_1_colour,styles.medium_container,styles.right_text]}>{start_time.hour}:{start_time.minute} {start_time.ante_meridian}</Text>   
                    </View>
                    <Underline />                             
                </View>

                {/*Start Time */}
                <View>
                    <View  style={[styles.row]}>
                        <Text style={[styles.text_medium, styles.muted_text_2_colour]}>End Time:</Text>
                        <Text style={[styles.text_medium, styles.muted_text_1_colour,styles.medium_container,styles.right_text]}>{end_time.hour}:{end_time.minute} {end_time.ante_meridian}</Text>   
                    </View>
                    <Underline />                             
                </View>

                {/*Category */}
                <View>
                    <View  style={[styles.row]}>
                        <Text style={[styles.text_medium, styles.muted_text_2_colour]}>Category:</Text>
                        <Text style={[styles.text_medium, styles.muted_text_1_colour,styles.medium_container,styles.right_text]}>{category}</Text>   
                    </View>
                    <Underline />                             
                </View>

                {/*Description */}
                <View>
                    <View  style={[styles.row]}>
                        <Text style={[styles.text_medium, styles.muted_text_2_colour]}>Description:</Text>
                        <Text style={[styles.text_medium, styles.muted_text_1_colour,styles.medium_container,styles.right_text]}>{description}</Text>   
                    </View>
                    <Underline />                             
                </View>

                {/*Other Info */}
                <View>
                    <View  style={[styles.row]}>
                        <Text style={[styles.text_medium, styles.muted_text_2_colour]}>Other Information:</Text>
                        <Text style={[styles.text_medium, styles.muted_text_1_colour,styles.medium_container,styles.right_text]}>{other_information}</Text>   
                    </View>
                    <Underline />                             
                </View>
            </View>
        </Paper>
    )
}

EventDetails.defaultProps = {
    name: "undefined",
    description: "",
    other_information: "",
    location: "",
    category: "",
    start_date: "undefined",
    end_date: "undefined",
    start_time: {hour:0,minute:0,ante_meridian:"AM"},
    end_time: {hour:0,minute:0,ante_meridian:"AM"},
    days_of_the_week: [],
    min_age: 0,
    max_age: 100
}
