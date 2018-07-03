const itemRouter = require('express').Router();
const bodyParser = require('body-parser');

const ItemService = require('./item.service');

itemRouter.use(bodyParser.json());

itemRouter.post('/', async (req, res) => {
    console.log(`Item to post:`);
    console.log(req.body);
    try {
        var result = await ItemService.postItem(req.body);
        res.status(200).send(`Item with id: ${req.body.itemId} and description: ${req.body.itemDescription} successfully added`)
    } catch (error) {
        console.error(error);
        res.status(400).send(error)
        return;
    }
});

itemRouter.get('/:itemId', async (req, res) => {
    try {
        res.status(200).send(await ItemService.getItem(req.params.itemId));
    } catch (error) {
        res.status(404).send(error);
        return;
    }
});

module.exports = itemRouter;