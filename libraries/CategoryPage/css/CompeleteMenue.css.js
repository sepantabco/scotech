import { StyleSheet } from "react-native";
const Styles = StyleSheet.create({
    mainContainer: {
         flex: 1,
         flexDirection: 'row-reverse'
    },
    categoryFlex: {
        flex: 3.2,
        backgroundColor: '#eeeeee' 

    },
    itemFlex:{
        flex: 6.8,
        padding: '4%' 
    },
    itemGradient:{
        borderRadius: 10,
        justifyContent: "flex-end",
        paddingVertical: '4%', alignItems: "center",
        height: 120, width: '42%', marginHorizontal: '4%',
        marginVertical: '4%'
    },
   
    thumbnailImage: {
        zIndex: -1,
        position: 'absolute'

    },
    itemTitleView:{
        height: 60,
        justifyContent: 'center',
        alignItems: 'center' 
    },
    titleText:{
        fontSize: 12,
        fontFamily: 'IRANSansMobile',
        color: 'white'
    },
    titleNumberText:{
        fontSize: 12,
        fontFamily: 'IRANSans(FaNum)',
        color: 'white'
    }


})
export default Styles