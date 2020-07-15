<!-- <template>
  <div>
    <van-nav-bar
      title="内容"
      left-text="返回"
      right-text=""
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-list>
      <div style="border-bottom: 1px solid #e5e5e5;padding: 10px;" @click="tocontent(item)" v-for="(item,index) in contentSchoolList">{{item.name}}</div>
    </van-list>
  </div>
</template>
<script>
import Vue from 'vue'
import  store from '../../stores/store.js'
import { NavBar } from 'vant'
import { API_HOST }  from '../../utils/api.js'
import { doGet }  from '../../utils/index.js'
import { List } from 'vant'
Vue.use(List)
Vue.use(NavBar)
export default {
  name:'SchoolList',
  data() {
    return {
      contentSchoolList:[]
    }
  },
  mounted() {
    doGet(`${API_HOST}/api/club/bankuai/getBankuaiByAreaId`,{areaId:this.$route.query.optionid}).then(res => {
      if (res) {
        console.log(res.data.list)
        this.contentSchoolList = res.data.list
      }
    })
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    tocontent(item){
      store.commit('calcOrderSum', {id: item.id})
      store.commit('blockName', {name: item.name})
      this.$router.push({path: '/communityContent',
        query: {
          id: item.id,
          name:item.name
        }
      })
    }
  }
}
</script> -->
function onLangReady() {	    function onLangReady() {




  layui.use(['form','laydate'], function(){	        layui.use(['form', 'laydate'], function () {
     var form = layui.form;	            var form = layui.form;
     var $ = layui.$;	            var $ = layui.$;
     var laydate = layui.laydate;	            var laydate = layui.laydate;
 if(!checkToken(authToken)){	            if (!checkToken(authToken)) {
     alert(i18next.t("timeout"));	                alert(i18next.t("timeout"));
      window.top.location.href = '../../login.html';	                window.top.location.href = '../../login.html';
 }	            }

          var userId = GetQueryString("id");//userId为空表示新增，否则是修改
         if (userId != null)//编辑
         {
             $.ajax({
                 type: "GET",
                 url: commonIP + 'api/system/user/getSystemUser?authToken=' + authToken + '&page=0&limit=0&id=' + userId,
                 contentType: 'application/json',
                 async: false,
                 success: function (data) {
                     var datas = JSON.parse(data);
                     console.log(datas);
                     if (datas.errcode == 200) {
                         //赋值
                         groupId = datas.dataSource.list[0].groupId;
                         farmId = datas.dataSource.list[0].farmId;
                         userName = datas.dataSource.list[0].name;
                         loginName = datas.dataSource.list[0].loginName;
                     } else {
                         //alert(data.errmsg);
                         if (data.errcode == "10005") {
                             window.top.location.href = '../../login.html';
                         }
                     }
                 }
             });
         }


  var userId = GetQueryString("id");//userId为空表示新增，否则是修改	            form.on('submit(submit)', function (res) {
 $("#password").change(function() {	
          var minLenght = $("#password").val();	                var minLenght = $("#password").val();
         console.log(minLenght)	                console.log(minLenght)
         if(minLenght.length < 6) {	                if (minLenght.length < 6) {
           //alert(1);	                    //alert(1);
           var warnMessage = "密码请设置6到20位之间";	                    var warnMessage = "密码请设置6到20位之间";
           alert(warnMessage);	                    alert(warnMessage);
         } else {	                    return;
           return true	                }

              $.ajax({
         }	                    type: 'POST',
       });	                    url: commonIP + "api/system/user/updateSystemUser?authToken=" + authToken,
   if(userId != null)//编辑	                    contentType: 'application/json',
   {	                    data: JSON.stringify({
     $.ajax({	                        "id": userId,
   type: "GET",	                        "groupId": groupId,
   url: commonIP + 'api/system/user/getSystemUser?authToken='+authToken+'&page=0&limit=0&id='+userId,	                        "farmId": farmId,
   contentType: 'application/json',	                        "name": userName,
   async: false,	                        "loginName": loginName,
   success: function(data) {	                        "password": res.field.password
     var datas = JSON.parse(data);	                    }),
     console.log(datas);	                    async: false,
     if (datas.errcode == 200) {	                    success: function (data) {
       //赋值	                        var dataObj = JSON.parse(data);
       groupId = datas.dataSource.list[0].groupId;	                        if (dataObj) {
       farmId = datas.dataSource.list[0].farmId;	                            if (dataObj.errcode == "200") {
       name = datas.dataSource.list[0].name;	                                alert(i18next.t("updateSucc"));
       loginName = datas.dataSource.list[0].loginName;	
      } else {	                                window.parent.document.getElementById('search').click();
       //alert(data.errmsg);	                                var index = parent.layer.getFrameIndex(window.name); //获取当前窗口的name
       if(data.errcode=="10005"){	                                parent.layer.close(index);
           window.top.location.href = '../../login.html';	                            } else {
       }	                                alert(dataObj.errmsg);
     }	                            }
   }	                        }
   });	                    }
   }	                });
   else	                return false;
   {	            });
     //新增	
   }	
     form.on('submit(cancle)', function(res){	
   var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引	
   parent.layer.close(index);  	
         window.parent.location.reload(); 	
     });	        });

  form.on('submit(submit)', function(res){	

        var minLenght = $("#password").val();	
         console.log(minLenght)	
         if(minLenght.length < 6) {	
           //alert(1);	
           var warnMessage = "密码请设置6到20位之间";	
           alert(warnMessage);	
           return;			
       }	
     //layer.msg(JSON.stringify(res.field));	
    $.ajax({  	
         type: 'POST',	
   url: commonIP + "api/system/user/update?authToken="+authToken,	
   contentType: 'application/json',	
   data: JSON.stringify({	
       "id":userId,	
       "groupId":groupId,	
       "farmId":farmId,	
       "name":name,	
       "loginName":loginName,	
       "password":res.field.password	
     }) ,	
   async: false,	
   success: function(data) {	
     var dataObj = JSON.parse(data);	
//					console.log(dataObj);	
//					console.log(dataObj.errcode);	
     if (dataObj) {	
       if (dataObj.errcode == "200") {	
          alert(i18next.t("updateSucc"));	
                  layer.close(layer.index);  	
                  window.parent.location.reload();  	
       } else {	
        alert(dataObj.errmsg);	
       }	
     }	
   }	
      });	
      return false;	
   });	
 });	
 }	    }
function GetQueryString(name)	
{	    function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");	        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);	        var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;	        if (r != null) return unescape(r[2]);
}	        return null;
function closeForm()	    }
{	

  $t.closeWindow();	
    // layer.close(); 	
}	

</script>	</script>
</body>	</body>
</html>
