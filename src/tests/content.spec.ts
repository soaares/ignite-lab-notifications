import { Content } from "../domain/entities/content";

describe('Notification content', () => {
    it('should be able to create a notification content', () => {
        const content = new Content('Você tem uma solicitação de amizade.')

        expect(content).toBeTruthy();
    })

    it('shouldnt be able to create a notification contento with less than 5 characters', () => {
        expect(() => new Content('aa')).toThrow();
    })

    it('shouldnt be able to create a notification contento with more than 240 characters', () => {
        expect(() => new Content('a'.repeat(241))).toThrow();
    })

})
