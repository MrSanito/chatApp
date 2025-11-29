export const loginUser = async (req, res) => {
  console.log("login route");
  const { email, password } = await req.body.data;
  console.log(email, password);

  // find User

  // check Password is correct or not 



  // assign jwt

  res.status(200).json({
    msg: "success bro",
  });
};
