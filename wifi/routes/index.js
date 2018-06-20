var express = require('express');
var router = express.Router();
const exec = require('child_process').exec;
let wifilist = 'netsh wlan show networks mode=bssid';//查询wifi列表
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
//router.get('/wifilist',function(req,res,next){
//  res.render('index')
//})

//获取wifi列表
router.post('/wifi',async (req,res,next)=>{
  let SSID = [];
  exec(wifilist,async (err,stdout,stderr)=>{
  let data = stdout.split('\n');
  for(let i =0;i<data.length;i++){
    if(data[i][0]=='S'&&data[i][1]=='S'){
      console.log(data[i].indexOf(':'))
      SSID.push(data[i].substr(data[i].indexOf(':')+2,data[i].length))
    }
  }
  res.send(SSID);
})  
})

router.get('/connect',async (req,res,next)=>{
  let name = "mango-dev";
  let password = "oiirszcu";
  let wifiConnect = `netsh wlan set profileparameter name=${name} SSIDname=${name} keyMaterial=${password}`
  exec(wifiConnect,async (err,stdout,stderr)=>{
    if(err){
      console.log('错误：'+err)
    }else{
      console.log('stdout:'+stdout)

      console.log('stderr'+stderr);
    }
  });
})
module.exports = router;
