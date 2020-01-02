// import { StyleSheet } from 'react-native'
export default Styles = {
    titles: {
        View: { flexDirection: 'row-reverse', marginTop: 10, marginHorizontal: '1.5%', justifyContent: 'space-between' },
        Right: {
            View: { flexDirection: 'row-reverse', alignItems: 'center' },
            Icon: { fontSize: 20, marginRight: 5, transform: [{ scaleX: -1 }] ,color:'#a5a5a5'},
        },
        Left: {
            View: { flexDirection: 'row-reverse', alignItems: 'center' },
            Icon: { fontSize: 20, marginRight: 5 },
        },
        Txt: { fontFamily: 'IRANSans(FaNum)', fontSize: 12 },

    },
    customClub: {
        Main: {
            height: 190, width: 150, marginTop: 10, marginHorizontal: 5, borderRadius: 6, elevation: 5, marginBottom: 10,backgroundColor:'white'
        },
        Label: {
            View: { position: 'absolute', zIndex: 1, width: 35, height: 20, backgroundColor: '#573C65',  borderTopLeftRadius: 6, borderBottomRightRadius: 6, justifyContent: 'center', alignItems: 'center' },
            Txt: { fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: 'white' }
        },
        Header: {
            View: { flex: 4, borderTopRightRadius: 6, borderTopLeftRadius: 6, overflow: 'hidden' },
            Image: { height: '100%', width: '100%', borderTopRightRadius: 6, borderTopLeftRadius: 6 },
        },
        Body: {
            View: { flex: 2, padding: 5, borderBottomWidth: .5, borderStyle: 'dotted', borderColor: 'gray' },
            topTxt: { fontFamily: 'IRANSans(FaNum)', fontSize: 11,  },
            middleTxt: { fontFamily: 'IRANSans(FaNum)', fontSize: 10, color: '#8f8f8f' },
            bottomTxt: { fontFamily: 'IRANSans(FaNum)', fontSize: 8 ,color: '#8f8f8f'},

        },
        Footer: {
            View: { flex: 1, flexDirection: 'row-reverse', justifyContent: 'space-between', paddingHorizontal: 5, alignItems: 'center' },
            TxtRight: { fontFamily: 'IRANSans(FaNum)', fontSize: 9,},
            Txt: { fontFamily: 'IRANSans(FaNum)', fontSize: 9,color:'#573c65' },
        }
    },
    Banner1: { maxHeight: 120, width: '97%', alignSelf: 'center', marginVertical: 15, elevation: 5 },
    offerCustom: {
        View: { height: 180, width: 290, marginTop: 10, marginBottom: 5, marginHorizontal: 5, elevation: 5, borderRadius: 10 ,backgroundColor:'white'},
        Top: {
            View: { flex: 2, flexDirection: 'row-reverse' },
            Right: {
                View: { flex: 1.2, justifyContent: 'center', alignItems: 'center' },
            }
        }
    }
}
