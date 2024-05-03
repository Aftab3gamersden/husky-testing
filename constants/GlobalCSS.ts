import { StyleSheet } from 'react-native';
import { responsiveFontSize as rf, responsiveHeight as rh, responsiveWidth as rw } from 'react-native-responsive-dimensions';
import Colors from './Colors';

const GlobalCSS = StyleSheet.create({


    // row

    flexCenterRow: {
     flexDirection: 'row',
     justifyContent: "center",
     alignItems: "center"
    },
    flexSpaceBetweenRow: {
     flexDirection: 'row',
     justifyContent: "space-between",
     alignItems: "center"
    },
    flexSpaceEvenlyRow: {
     flexDirection: 'row',
     justifyContent: "space-evenly",
     alignItems: "center"
    },
    flexSpacearoundRow: {
     flexDirection: 'row',
     justifyContent: "space-around",
     alignItems: "center"
    },

    // Colum
    flexCenterCol: {
     flexDirection: 'column',
     justifyContent: "center",
     alignItems: "center"
    },
    flexSpaceBetweenCol: {
     flexDirection: 'column',
     justifyContent: "space-between",
     alignItems: "center"
    },
    flexSpaceEvenlyCol: {
     flexDirection: 'column',
     justifyContent: "space-evenly",
     alignItems: "center"
    },
    flexSpacearoundCol: {
     flexDirection: 'column',
     justifyContent: "space-around",
     alignItems: "center"
    },

    buttoncss:{
        backgroundColor:Colors.Primary,
        borderRadius:6,
        padding:12
    },
    Headercss: {
        justifyContent: "center",
        paddingLeft: rw(5),
        position: "relative",
        alignItems:"center",
        paddingTop:rw(12),
      },
    Textinput:{
        borderWidth:1,
        padding:12,
        borderRadius:7,
    },
    Phoneinput:{
        borderWidth:1,
        padding:2,
        borderRadius:7,
        width:"auto",
    },
    iconSize:{
        fontSize:25
    },
    HeaderfontSize:{
        fontSize:24
    },
    MediumFontsize:{
        fontSize:18
    },
    SmallFontsize:{
        fontSize:14
    },
    ExtraSmallFontsize:{
        fontSize:12
    },
});

export { GlobalCSS }