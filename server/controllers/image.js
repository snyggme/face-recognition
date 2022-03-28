const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set("authorization", "Key 17e2b9c5389341e596032d35f9a3944c");

const handleApiCall = (req, res) => {
    const { url } = req.body;

    stub.PostModelOutputs(
        {
            // This is the model ID of a publicly available General model. You may use any other public or custom model ID.
            model_id: "a403429f2ddf4b49b307e318f00e528b",
            inputs: [{data: {image: { url }}}]
        },
        metadata,
        (err, modelResponse) => {
            if (err) {
                console.log("Error: " + err);
                return  res.status(400).json('Unable to work with API');
            }
    
            if (modelResponse.status.code !== 10000) {
                console.log("Received failed status: " + modelResponse.status.description + "\n" + modelResponse.status.details);
                return;
            }

            res.json(modelResponse.outputs[0].data);
        }
    );
}

const handleImage = (db) => (req, res) => {
    const { id } = req.body;

    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('Unable to get entries'));
}

module.exports = {
    handleImage,
    handleApiCall
}