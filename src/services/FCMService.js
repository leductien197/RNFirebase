import messaging from "@react-native-firebase/messaging"
import {Platform} from "react-native";

const register = (onRegister, onNotification, onOpenNotification) => {
    console.log("1")
    checkPermission(onRegister)
    createNotificationListeners(onRegister, onNotification, onOpenNotification)
}

const registerAppWithFCM = async () => {
    console.log("2")
    if (Platform.OS === "ios") {
        await messaging().registerDeviceForRemoteMessages()
        await messaging().setAutoInitEnabled(true)
    }
}

const checkPermission = (onRegister) => {
    console.log("3")
    messaging().hasPermission()
            .then(enabled =>{
                if(enabled){
                    getToken(onRegister)
                }else {
                    requestPermission(onRegister)
                }
            }).catch(error => {
                console.log("[FCMService] Permission rejected",error)
            })
}

const getToken = (onRegister) => {
    console.log("4")
    messaging().getToken()
            .then(fcmToken => {
                if(fcmToken){
                    onRegister(fcmToken)
                }else {
                    console.log("[FCMService] User dose not have a device token ")
                }
            }).catch(error => {
                console.log("[FCMService] getToken reject", error)
            })
}

const requestPermission = (onRegister) => {
    console.log("5")
    massaging().requestPermission()
            .then(() => {
                getToken(onRegister)
            }).catch(error => {
                console.log("[FCMService] Request Permission reject", error)
            })
}

const deteleToken = () => {
    console.log("[FCMservice] deleteToken")
    messaging().deleteToken()
            .catch(error => {
                console.log("[FCMService] Delete token error",error)
            })
}

const createNotificationListeners = (onRegister, onNotification, onOpenNotification) => {
    console.log("6")
    // When the application is running, but in the background
    messaging()
            .onNotificationOpenedApp(remoteMessage => {
                console.log("[FCMService] onNotificationOpenedApp Notification caused app to open from background state:", remoteMessage)
                if (remoteMessage) {
                    const notification = remoteMessage.notification
                    onOpenNotification(notification)
                    // removeDeliveredNotification(notification.notificationId)
                }
            })

    // When the application is opened from a quit state
    messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                console.log("[FCMService] getInitialNotification Notification caused app to open from quit state:", remoteMessage)
                if (remoteMessage){
                    const notification = remoteMessage.notification
                    onOpenNotification(notification)
                    // removeDeliveredNotification(notification.notificationId)
                }
            })
    
    // Foreground state messages
    messageListener = messaging().onMessage(async remoteMessage => {
        console.log("[FCMService] A new FCM message arrived", remoteMessage)
        if(remoteMessage){
            let notification = null
            if (Platform.OS === "ios") {
                notification = remoteMessage.data.notification
            }else {
                notification = remoteMessage.notification
            }
            onNotification(notification)
        }
    })

    //Triggered when have new token
    messaging().onTokenRefresh(fcmToken => {
        console.log("[FCMService] New token refresh:", fcmToken)
        onRegister(fcmToken)
    })
}
 
const unRegister = () => {
    console.log("7")
    messageListener()
}

export default {
    register,
    registerAppWithFCM,
    checkPermission,
    getToken,
    requestPermission,
    deteleToken,
    createNotificationListeners,
    unRegister
}

