import { Content } from "@domain/entities/content"
import { Notification } from '@domain/entities/notification'
import { makeNotification } from "./factories/notification-factory"

describe('Notification', () => {
    it('should be able to create a notification', () => {
        const notification = makeNotification()

        expect(notification).toBeTruthy()
    })
})