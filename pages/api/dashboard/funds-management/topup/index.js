const User = require('models/User');
const Admin = require('models/Admin');
const jwt = require('jsonwebtoken');
const handler = async(req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ error: true, data: [], message: 'Please Login' });
  }
  if (!req.body) {
    res.status(400).send({
      error: true,
      data: [],
      message: 'No body defined'
    });
  }

    if (req.method === 'POST') {
      const {
        topUp,id
      }=req.body
    
    let admin= await Admin.findOne({
      where:{
        id:id
      }
    })
    const totalAmount = admin.totalAmount; 
    
    await Admin.update({
      totalAmount:Number(totalAmount)+Number(topUp)
    },
    {
      where:{
        id:id
      }
    }
    )
    res.status(201).send({
      error:false,
      message:'Top up updated succes',
      totalTipsAmount:Number(totalAmount)+Number(topUp)
    })

  }
};
export default handler;
