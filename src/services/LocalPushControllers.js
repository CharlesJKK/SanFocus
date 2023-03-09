import PushNotification from "react-native-push-notification";

PushNotification.configure({
    onNotification: function (notification) {
      console.log("Local Notification:", token);
    },
    popInitialNotification: true,
    requestPermissions: true,
})

PushNotification.createChannel(
    {
        channelId: "channel-id",
        channelName: "my channel",
        channelDescription: "A channel for notification",
        playSound: true,
        soundName: 'default',
        vibrate: true,
        vibration: 1000,
    },
    (created) => console.log(`channel created ${created}`),
)

export const LocalNotification = (item) => {
    PushNotification.localNotification({
        channelId: "channel-id",
        channelName: "my channel",
        autoCancel: true,
        bigText: `Usando pomodoro, minutos escolhidos: ${item}`,
        subText: 'Pomodoro Timer',
        title: 'Pomodoro Timer em uso',
        message: 'Usando pomodoro',
        channelDescription: "A channel for notification",
        playSound: true,
        soundName: 'default',
        importance: 10,
        vibrate: true,
        vibration: 1000,
    })
}