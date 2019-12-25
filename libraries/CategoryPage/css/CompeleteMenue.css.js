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
    itemFlex: {
        flex: 6.8,
        padding: '4%'
    },
    itemGradient: {
        justifyContent: "flex-end",
        alignItems: "center",
        height: 120, width: '42%', marginHorizontal: '4%',
        marginVertical: '4%'
    },

    thumbnailImage: {
        zIndex: -1,
        position: 'absolute',
        height: '100%',
        width: '100%',
        borderRadius: 5

    },
    itemTitleView: {
        position:'absolute',
        bottom:5,
        height: 50,
        alignSelf:'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 9,
        fontFamily: 'IRANSansMobile',
        color: 'white',
        textAlign:'center'
    },
    titleNumberText: {
        fontSize: 8,
        fontFamily: 'IRANSans(FaNum)',
        color: 'white'
    }


})
export default Styles