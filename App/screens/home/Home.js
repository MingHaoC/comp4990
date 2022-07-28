import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { ProjectHeader, Paper, ProjectButton } from '../../components'
import { useAppContext } from '../../context'
import styles from '../../styles'
   


const Home = ({navigation}) => { 
    const {
        user
    } = useAppContext()

    useEffect(() => {
        setFirstname(user.name)
    },[])

    const [firstname, setFirstname] = useState("")

    return(
        <>
        <ProjectHeader navigation={navigation} />
        <View style={styles.container}>
            <Paper title={`Welcome ${firstname}!`} header={2} headerTitleStyle={styles.h1}>
                <View styles={[
                    styles.column,
                    styles.padding_horizontal_xlarge
                ]}>
                    <ProjectButton  title='My Profile' 
                                    type='info' 
                                    style={[
                                            styles.margin_horizontal_xlarge, 
                                            styles.margin_vertical_medium
                                            ]} 
                                    onPress={()=>{navigation.navigate('Profile')}}/>

                    <ProjectButton  title='My Events' 
                                    type='info' 
                                    style={[styles.margin_horizontal_xlarge, styles.margin_vertical_medium]} 
                                    onPress={()=>{navigation.navigate('MyEvents')}}/>

                    <ProjectButton  title='Find Events' 
                                    type='info' 
                                    style={[styles.margin_horizontal_xlarge, styles.margin_vertical_medium]} 
                                    onPress={()=>{navigation.navigate('FindEvents')}}/>
                </View>
            </Paper>

        </View>
    </>
);
}

export default Home