import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import {
  Paper,
  ProjectButton,
  ProjectHeader,
  ProjectTextInput,
  Underline,
} from "../../components";
import {
  ProfileProvider,
  useProfileContext,
} from "../../actions/Profile/ProfileContext";
import styles from "../../styles";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const Profile = (props) => {
  return (
    <ProfileProvider>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Overview" component={ProfileOverview} />
        <Tab.Screen name="Edit Account" component={EditProfile} />
      </Tab.Navigator>
    </ProfileProvider>
  );
};

const EditProfile = ({ navigation }) => {
  useEffect(() => {}, []);

  const {
    LoadingEdit,
    enterEditFirstname,
    enterEditLastname,
    enterEditPhonenumber,
    enterEditAddress,
    saveAccount,
    Firstname,
    Lastname,
    Address,
    Phonenumber,
    EditFirstname,
    EditLastname,
    EditAddress,
    EditPhonenumber,
  } = useProfileContext();

  enterEditFirstname;

  return (
    <>
      <ProjectHeader navigation={navigation} />
      <View style={[styles.margin_large]}>
        <Paper>
          <View style={[styles.padding_medium]}>
            {LoadingEdit && <ActivityIndicator size="large" />}
            {!LoadingEdit && (
              <>
                <ProjectTextInput
                  label="First Name:"
                  onChangeText={(text) => {
                    enterEditFirstname(text);
                  }}
                  value={EditFirstname}
                />
                <ProjectTextInput
                  label="Last Name:"
                  onChangeText={(text) => {
                    enterEditLastname(text);
                  }}
                  value={EditLastname}
                />
                <ProjectTextInput
                  label="Address:"
                  onChangeText={(text) => {
                    enterEditAddress(text);
                  }}
                  value={EditAddress}
                />
                <ProjectTextInput
                  label="Phone Number:"
                  onChangeText={(text) => {
                    enterEditPhonenumber(text);
                  }}
                  value={EditPhonenumber}
                />

                <ProjectButton
                  title="Save Account"
                  onPress={async () => {
                    await saveAccount();
                  }}
                />
              </>
            )}
          </View>
        </Paper>
      </View>
    </>
  );
};

const ProfileOverview = ({ navigation }) => {
  const { Loading, Firstname, Lastname, Address, Phonenumber } =
    useProfileContext();

  return (
    <>
      <ProjectHeader navigation={navigation} />
      <View style={[styles.margin_large]}>
        <Paper header={2} title={`${Firstname} ${Lastname}`}>
          <View style={[styles.padding_medium]}>
            {Loading && <ActivityIndicator size="large" />}
            {!Loading && (
              <>
                <View style={[styles.row]}>
                  <Text style={[styles.muted_text_2_colour]}>Address</Text>
                  <Text style={[styles.muted_text_1_colour]}>{Address}</Text>
                </View>
                <Underline />

                <View style={[styles.row]}>
                  <Text style={[styles.muted_text_2_colour]}>Phone</Text>
                  <Text style={[styles.muted_text_1_colour]}>
                    {Phonenumber}
                  </Text>
                </View>
                <Underline />
              </>
            )}
          </View>
        </Paper>
      </View>
    </>
  );
};

export default Profile;
