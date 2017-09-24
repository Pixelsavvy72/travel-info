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