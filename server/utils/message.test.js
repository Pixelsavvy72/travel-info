const expect = require('expect');

let {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate a message object correctly.', () => {        
        let from = "A User";
        let text = "Hey there. Lookin' good!";
        let message = generateMessage(from, text);
    
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({
            from,
            text
        });
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        let from = 'A User';
        let lat = 15;
        let long = 19;
        let url = 'https://www.google.com/maps?q=15,19';
        let message = generateLocationMessage(from, lat, long);

        expect(typeof(message.createdAt)).toBe('number');
        expect(message).toMatchObject({from, url});

    });