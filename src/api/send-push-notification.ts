// Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
type SendPushNotificationParams = {
    to?: string;
    body: string;
};

export async function sendPushNotification({
    to,
    body,
}: SendPushNotificationParams) {
    const message = {
        to,
        body,
        sound: 'default',
        title: 'Забронировано',
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });
}
