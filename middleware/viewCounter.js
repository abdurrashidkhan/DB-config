let viewers = 0;
const viewCounter = (req,res,next) => {
   viewers ++
   console.log(viewers);
   next();
}
module.exports = viewCounter;