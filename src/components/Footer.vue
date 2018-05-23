<template>
  <div class="footer">
    <div class="container line">
        <div class="footer-navigation">
            <dl>
                <dt>关于</dt>
                <dd><a href="https://www.bokeka.com">联系我们</a></dd>
            </dl>
            <dl>
                <dt>帮助</dt>
                <dd><a href="http://wpa.qq.com/msgrd?v=3&uin=478724&site=qq&menu=yes" target="_blank">提交bug</a></dd>
            </dl>
            <dl>
                <dt>合作</dt>
                <dd><a href="http://wpa.qq.com/msgrd?v=3&uin=478724&site=qq&menu=yes" target="_blank">商务合作</a></dd>
                <dd><a href="http://wpa.qq.com/msgrd?v=3&uin=478724&site=qq&menu=yes" target="_blank">友链互换</a></dd>
            </dl>
            <dl class="width-fix">
                <dt>友链</dt>
                <dd><a href="https://bokeka.com" target="_blank" rel="nofollow">找呀找朋友</a></dd>
            </dl>
            <dl class="no-dt">
                <dd><a href="/" target="_blank">虚席以待</a></dd>
			      </dl>
            <dl class="no-dt">
                <dd><a href="/" target="_blank" rel="nofollow">资源大爆炸</a></dd>
                <dd><a href="/" target="_blank" rel="nofollow">在线工具</a></dd>
            </dl>
        </div>
    </div>
    <div class="container">
        <a class="copyright">Copyright &copy; 2017-2018 bokeka.com. All rights reserved.</a>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss">

a {
    font-size: 14px;
    text-decoration: none;
    color: #ffffff;
}

.footer {
    padding: 40px 0;
    background: #2651F6;
    margin-top: 20px;
}

.line {
    padding-bottom: 30px;
    border-bottom: 1px solid #2b3136;
}

.container, .tool-container {
    width: 1180px;
    overflow: hidden;
    margin: 0 auto;
}

.footer-navigation {
    float: left;
}

.footer-tip {
    float: right;
    width: 270px;
}

.footer-navigation dl {
    float: left;
    margin: 0;
    width: 130px;
}

dl {
    display: block;
    -webkit-margin-before: 1em;
    -webkit-margin-after: 1em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
}

.footer-navigation dl.width-fix {
    margin-right: 20px;
    width: 145px;
}

.footer-navigation dl {
    float: left;
    margin: 0;
    width: 130px;
    color: #fff;
}

.footer-navigation dt, .footer-tip dt {
    line-height: 24px;
    font-size: 16px;
}

.footer-navigation dd {
    margin: 12px 0 0;
}

.footer-navigation dd a .footer-tip dd {
    color: #ffffff;
}



.footer-navigation dl.no-dt {
    margin: 24px 0 0 40px;
}

.footer-tip {
    float: right;
    width: 270px;
}

.footer-tip dl {
    margin: 0;
}

.qq dd {
    margin-top: 8px;
}

.footer-tip dd {
    margin: 0;
    font-size: 14px;
}

.copyright {
    display: block;
    margin: 30px 0 0;
    font-family: 'Helvetica Neue', 'Microsoft Yahei';
    color: #fff;
}

</style>
