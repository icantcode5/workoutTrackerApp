

module.exports={
  getHome : async(request, response) => {
    try{
      response.json("This API endpoint is working!!!")
    }
    catch(err){
      console.log(err)
    }
  }
}