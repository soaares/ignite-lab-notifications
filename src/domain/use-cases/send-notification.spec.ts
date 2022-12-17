import { SendNotification } from "./send-notification"

describe('SendNotification', () => {
    it('should be able to send notification', async () => {
        const sendNotification = new SendNotification();

        const { notification } = await sendNotification.execute({
            content: 'This is a notification',
            category: 'social',
            recipientId: 'example-recipient-id'
        })

        expect(notification).toBeTruthy();
    })
})