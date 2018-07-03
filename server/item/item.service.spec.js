const service = require('./item.service');

describe('Item Service Tests:', () => {
    it('Should initialize items object with the default response', function() {
        var expected = {
            itemNotFound : 'No item found'
        };
        expect(service.items).toEqual(expected)
    })
    describe('Get Item:', () => {
        it('Should throw an error with the default response if the item is not in items', async function(done) {
            try {
                await service.getItem('fake');
            } catch (error) {
                expect(error.message).toBe('404 : No item found')
            }
            done();
        });
        it('Should return the item description if the item is present', async function(done) {
            const testItem = {
                itemId: 'test',
                itemDescription: 'this is a test'
            }
            try {
                await service.postItem(testItem);
                await service.getItem('test');
            } catch (error) {
            }
            done();
        })
    });
    describe('Verify Post Item:', () =>{
        it('Should return true if both newItem.itemId and newItem.itemDescription are defined', () => {
            const testItem = {
                itemId: 'test',
                itemDescription: 'this is a test'
            }
            expect(service.verifyPostItemInput(testItem)).toBe(true);
        })
        it('Should return false if either newItem.itemId and newItem.itemDescription are undefined', () => {
            let testItem = {
                itemDescription: 'this is a test'
            }
            expect(service.verifyPostItemInput(testItem)).toBe(false);

            testItem = {
                itemId: 'test',
            }
            expect(service.verifyPostItemInput(testItem)).toBe(false);

             testItem = {
            }
            expect(service.verifyPostItemInput(testItem)).toBe(false);
        })
    })
    describe('Post Item:', () => {
        it('Should add newItem to items if verifyPostItemInput is true', async (done) => {
            const testItem = {
                itemId: 'test',
                itemDescription: 'this is a test'
            }
            await service.postItem(testItem);
        
            expect(service.items[testItem.itemId]).toBeDefined();
            expect(service.items[testItem.itemId]).toEqual(testItem.itemDescription);
            done();
        })
        it('Should throw an error if verifyPostItemInput is false', async (done) => {
            const testItem = {
                itemId: 'test',
            }
            try {
                await service.postItem(testItem);
            } catch(error) {
                expect(error.message).toBe('400 : The post object must have properties itemId and itemDescription')
            }
        
            expect(service.items).not.toContain(testItem);
            done();
        })
    })

})