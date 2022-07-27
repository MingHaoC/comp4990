import { Text, View } from "react-native";
import styles from "../../styles";
import {
  Link,
  Paper,
  ProjectTextInput,
  ProjectButton,
  Ul,
  Underline,
} from "../../components";
import RegisterModal from "./auth-modals/RegisterModal";
import { ScrollView } from "react-native-gesture-handler";
import {
  RegisterProvider,
  useRegisterContext,
} from "../../actions/Auth/Register/RegisterContext";

export default function Register(props) {
  return (
    <RegisterProvider>
      <RegisterContent {...props} />
    </RegisterProvider>
  );
}
const RegisterContent = ({ navigation }) => {
  const {
    state,
    registerUser,
    enterFirstname,
    enterLastname,
    enterEmail,
    enterAddress,
    enterPassword,
    enterPasswordVerification,
    showModal,
    closeModal,
    Firstname,
    FirstnameError,
    Lastname,
    LastnameError,
    Address,
    AddressError,
    Email,
    EmailError,
    Password,
    PasswordError,
    Verification,
    VerificationError,
    Response,
    registerPreconditionsMet,
  } = useRegisterContext();
  // #region methods

  /**
   * onBlur of Password Input
   * Checks if the password provided by the user meets the requirements. If password requirements are not met an error is displayed
   * @param {string} password Value of Password Input
   */
  // const _createPassword = (password) => {
  //   createPassword(password)

  // }

  /**
   * Tracks and updates the values of inputs
   * @param {string} label Name of the input
   * @param {string} value Value of the input
   */
  // const enterInput = (label, value) => {
  //   dispatch({type: "ENTER_INPUT", payload: {label, value} })
  // }

  /**
   * OnChange VerificationInput, onChange Password Input, onPress Registration Button
   * Ensures that password verification value provided by the user matches the password value provided. If the values do not match an error is displayed
   * @param {string} verifiyPassword Value of Verification Input
   */
  // const enterVerifiyPassword = (verifiyPassword) => {
  //   dispatch({type: "VERIFIY_PASSWORD_MATCHES", payload: verifiyPassword})
  // }

  /**
   * OnPress Login Button
   * Sends POST Request to Register URL if conditions are met and displays request results.
   */
  const register = async () => {
    registerUser();
  };

  /**
   * OnPress Dismiss Button in Modal
   * Closes the Register Modal
   */

  // #endregion

  return (
    <ScrollView>
      <View style={styles.container}>
        {/*Main Page*/}
        <>
          <Link
            text="Login"
            target="Login"
            disabled={false}
            isExternal={false}
            style={{ alignSelf: "flex-end" }}
            navigation={navigation}
          />

          <Paper
            title="Create a Profile"
            header="1"
            headerTitleStyle={[styles.h2, styles.margin_vertical_large]}
            image={require("../../assets/register-icon-transparent.png")}
          >
            <View style={[styles.column, styles.padding_horizontal_xlarge]}>
              <ProjectTextInput
                placeholder="Enter first name..."
                label="First Name"
                onChangeText={(text) => {
                  enterFirstname(text);
                }}
                error={FirstnameError.error}
                errorText={FirstnameError.errorText}
              />

              <ProjectTextInput
                placeholder="Enter last name..."
                label="Last Name"
                onChangeText={(text) => {
                  enterLastname(text);
                }}
                error={LastnameError.error}
                errorText={LastnameError.errorText}
              />

              <ProjectTextInput
                placeholder="Enter address..."
                label="Address"
                onChangeText={(text) => {
                  enterAddress(text);
                }}
                error={AddressError.error}
                errorText={AddressError.errorText}
              />

              <ProjectTextInput
                placeholder="Email"
                label="Email"
                onChangeText={(text) => {
                  enterEmail(text);
                }}
                error={EmailError.error}
                errorText={EmailError.errorText}
              />

              <Text style={[styles.h3]}>Create your Password</Text>
              <Underline />
              <Text style={[styles.mutedText, { marginTop: 5 }]}>
                Your password must have at least:
              </Text>
              <Ul style={styles.mutedText}>8 characters</Ul>
              <Ul style={styles.mutedText}>1 letter</Ul>
              <Ul style={[styles.mutedText, { marginBottom: 18 }]}>1 number</Ul>

              <ProjectTextInput
                placeholder="Enter password..."
                label="Password"
                onChange={(e) => {
                  enterPassword("Password", e.target.value);
                  if (VerificationError.error) {
                    enterPasswordVerification(Verification);
                  }
                }}
                onBlur={(e) => {}}
                type="password"
                error={PasswordError.error}
                errorText={PasswordError.errorText}
                style={{ paddingBottom: 30 }}
              />

              <ProjectTextInput
                placeholder="Verifiy password..."
                label="Password Verification"
                onChangeText={(text) => {
                  enterPasswordVerification(text);
                }}
                type="password"
                error={VerificationError.error}
                errorText={VerificationError.errorText}
                style={{ paddingBottom: 30 }}
              />

              <ProjectButton
                title="Register"
                type="default"
                onPress={() => {
                  register();
                }}
              />
            </View>
          </Paper>
        </>

        <RegisterModal {...state} closeModal={closeModal} />
      </View>
    </ScrollView>
  );
};
