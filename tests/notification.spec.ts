import { Content } from "@domain/entities/content"
import { Notification } from '@domain/entities/notification'

describe('Notification', () => {
    it('should be able to create a notification', () => {
        const notification = new Notification({
            content: new Content('Nova solicitação de amizde'),
            category: 'social',
            recipientId: 'example-recipient-id'
        })

        expect(notification).toBeTruthy()
    })
})