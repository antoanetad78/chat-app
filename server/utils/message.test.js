const expect = require('expect');

const {generateMessage} = require('./message')

describe('generateMessage', ()=> {
    it('should generate the correct message object', () => {

        let from = 'Antoaneta'
        let text = 'Test message from Antoaneta'
        let message = generateMessage(from, text)

        expect((res) => {
            expect(res).toBe('Object')
            expect(res.text).toBe('Test message from Antoaneta')
            expect(res.from).toBe('Antoaneta')
            expect(res.createdAt).toBeDefined()
        })

        //expect(message).toBe('Object')
        // expect(message.createdAt).toBeDefined()
        // expect(message.from).toBe('Antoaneta')
        // expect(message.text).toBe('Test message from Antoaneta')
    })
})