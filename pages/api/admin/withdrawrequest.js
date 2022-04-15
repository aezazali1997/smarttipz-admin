
const WithdrawRequest = require('models/WithDrawRequest');
const BankDetail = require('models/BankDetail');
const User = require ('models/User');
import  {isEmpty} from 'lodash'
const handler = async (req,res) => {
try {
  

  if(!req.headers.authorization){
    res.status(201).json({
      error:true,
      message:'Please Login!',
      data:[]
    })
  }
  if(req.method==='GET'){
    const allRequest = await WithdrawRequest.findAll({
      include: [
        {
          model: BankDetail,
          attributes: ["iban", "accountTitle"],
        },
        {
          model: User,
          attributes: ["email", "totalTipsAmount"],
        },
      ],
      group: ["WithDrawRequest.id", "User.id", "BankDetail.id"],
      order: [["createdAt", "DESC"]],
    });
    
    if (!isEmpty(allRequest)){
      res.status(200).json({
      error:false,
      message:'data fetched',
      data:allRequest
    })
    }else{
      res.status(204).json({
      error:false,
      message:'No data found',
      data:[]
    })
    }

  }
} catch (error) {
  console.log('error',error.message)
  res.status(500).send('API failed',error.message)  
}

}
module.exports=handler