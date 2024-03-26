// Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
type SendPushNotificationParams = {
    to?: string;
    body: string;
    title: string;
};

export async function sendPushNotification({
    to,
    body,
    title,
}: SendPushNotificationParams) {
    const message = {
        to,
        body,
        title,
        sound: 'default',
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
