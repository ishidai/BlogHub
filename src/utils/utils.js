/**
 * Created by Polo on 2018/1/8.
 */
import axios from '../api.js';
import consts from '../constant/consts'
import vm from '../main.js'

export default {
getUrlKey:function(name) {
  return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;},

  async getUserInfo() {
    var user;
    return new Promise(function(resolve) {
      setTimeout(function() {
        const token = window.localStorage.getItem("token");
        axios.get(consts.user, {
          timeout: 6000,
          auth: {
            username: token
          }
        }).then(res => {
          user = res.data.result;
          vm.$store.dispatch("saveUserInfo", res.data.result);
          resolve(user);
        }).catch((err) => {
          console.log(err)
          window.localStorage.clear();
        })
      }, 10);
    })
  }
        
}
