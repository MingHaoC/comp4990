import { textColours, fontFamily, colours, rgba } from "./globals";

const paperStyles = {
    paperContainer: {
        backgroundColor: textColours.background.toString(),
        border: `1px solid 
        ${new rgba( textColours.primary.r(),  textColours.primary.g(),  textColours.primary.b(), 0.07).toString()}`, 
        width: '100%',   
    },
    paperHeader1:{
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 72,
    },
    paperHeader1Image: {
        width: 110, 
        height: 70,
        alignSelf: 'center',
        resizeMode: 'center'
    },
    paperHeader:{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 5,
        paddingLeft: 5 
    },
    paperHeaderImage: {
        width: 50, 
        height: 50,
    },
    paperHeaderTitle: {
        paddingLeft: 5
    }, 
    paperHeaderText: {
        margin: 10,
        marginBottom: 5,
        marginTop: 5
    }
}


export default paperStyles