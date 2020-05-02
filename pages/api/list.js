import conectDb from '../../utils/connectDb';
import List from '../../models/List';

conectDb();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res)
      break;
    case "DELETE":
      await handleDeleteRequest(req, res)
      break;
    case "POST":
      await handlePostRequest(req, res)
      break;
    case "PUT":
      await handlePutRequest(req, res)
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
      break;
  }
}

const handleGetRequest = async (req, res) => {
  try {
    const list = await List.find();

    return res.status(200).json({
      success: true,
      data: list
    });
  } catch (error) {
    res.send(500).json({
      success: false,
      error: 'Server error'
    })
  }
}

const handlePostRequest = async (req, res) => {
  try {
    const list = await List.create(req.body);
    return res.status(201).json({
      success: true,
      data: list
    });
  } catch (error) {
    res.send(500).json({
      success: false,
      error: 'Server error'
    })
  }
}

const handlePutRequest = async (req, res) => {
  try {
    const { _id } = req.body;
    const newList = await List.findOneAndUpdate(
      { _id },
      req.body,
      { new: true }, // Return updated one
    );
    return res.status(200).json(newList);
  } catch (error) {
    res.send(500).json({
      success: false,
      error: 'Server error'
    })
  }
}

const handleDeleteRequest = async (req, res) => {
  try {
    console.log(req.body);

    const list = await List.findById(req.body.id);
    if (!list) {
      res.status(404).json({
        success: false,
        error: 'Not Found'
      });
    }

    await list.remove();
    return res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.send(500).json({
      success: false,
      error: 'Server error'
    })
  }
}
