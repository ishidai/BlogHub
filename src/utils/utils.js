/**
 * Created by Polo on 2018/1/8.
 */
export default{
getUrlKey:function(name) {
  return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;}
}
