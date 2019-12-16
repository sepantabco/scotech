// import { StyleSheet } from 'react-native'
export default Styles = {
    titles: {
        View: { flexDirection: 'row-reverse', marginTop: 10, marginHorizontal: '1.5%', justifyContent: 'space-between' },
        Right: {
            View: { flexDirection: 'row-reverse', alignItems: 'center' },
            Icon: { fontSize: 20, marginRight: 5, transform: [{ scaleX: -1 }] },
        },
        Left: {
            View: { flexDirection: 'row-reverse', alignItems: 'center' },
            Icon: { fontSize: 20, marginRight: 5 },
        },
        Txt: { fontFamily: 'IRANSans(FaNum)', fontSize: 12 },

    },
    customClub: {
        Main: {
            height: 190, width: 150, marginTop: 10, marginHorizontal: 5, borderRadius: 6, elevation: 2,marginBottom:10
        },
        Label: {
            View: { position: 'absolute', zIndex: 1, width: 35, height: 20, backgroundColor: '#573C65', opacity: .7, borderTopLeftRadius: 6, borderBottomRightRadius: 6, justifyContent: 'center', alignItems: 'center' },
            Txt: { fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: 'white' }
        },
        Header: {
            View: { flex: 4, borderTopRightRadius: 6, borderTopLeftRadius: 6, overflow: 'hidden' },
            Image: { height: '100%', width: '100%', borderTopRightRadius: 6, borderTopLeftRadius: 6 },
        },
        Body: {
            View: { flex: 2, padding: 5, borderBottomWidth: .5, borderStyle: 'dotted', borderColor: 'gray' },
            topTxt: { fontFamily: 'IRANSans(FaNum)', fontSize: 11 },
            middleTxt: { fontFamily: 'IRANSans(FaNum)', fontSize: 10 },
            bottomTxt: { fontFamily: 'IRANSans(FaNum)', fontSize: 8 },

        },
        Footer: {
            View: { flex: 1, flexDirection: 'row-reverse', justifyContent: 'space-between', paddingHorizontal: 5, alignItems: 'center' },
            Txt: { fontFamily: 'IRANSans(FaNum)', fontSize: 9 },
        }
    },
    Banner1: { maxHeight: 120, width: '97%', alignSelf: 'center', marginVertical: 15, elevation: 5 },
    offerCustom: {
        View: { height: 180, width: 290, marginTop: 10, marginBottom: 5, marginHorizontal: 5, elevation: 2, borderRadius: 10 },
        Top: {
            View: { flex: 2, flexDirection: 'row-reverse' },
            Right: {
                View: { flex: 1.2, justifyContent: 'center', alignItems: 'center' },
            }
        }
    }
}
