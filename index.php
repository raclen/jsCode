
<?php

$postStr = $GLOBALS["HTTP_RAW_POST_DATA"];
if (!empty($postStr)) { 
    $postObj = simplexml_load_string($postStr, 'SimpleXMLElement', LIBXML_NOCDATA);
    $fromUsername = $postObj->FromUserName;
    $toUsername = $postObj->ToUserName;
    $keyword = trim($postObj->Content);
    $time = time();
    $textTpl = " <xml>
 <ToUserName><![CDATA[%s]]></ToUserName>
 <FromUserName><![CDATA[%s]]></FromUserName>
 $type=$postObj->MsgType;
 $customevent=$postObj->Event;
 <CreateTime>%s</CreateTime>
 <MsgType><![CDATA[%s]]></MsgType>
 <ArticleCount>1</ArticleCount>
 <Articles>
 <item>
 <Title><![CDATA[%s]]></Title> 
 <Description><![CDATA[%s]]></Description>
 <PicUrl><![CDATA[%s]]></PicUrl>
 <Url><![CDATA[%s]]></Url>
 </item>
 </Articles>
 <FuncFlag>0</FuncFlag>
 </xml> 
    ";

    if($type=="event" and $customevent=="subscribe"){
        $msgType = "text";
        $contentStr = "你好！欢迎关注小情歌微信公众帐号！
回复相应数字获取信息：
[XX天气] 查询当地天气预报（如上海天气）
[XX笑话] 给你讲一则笑话（如发送笑话）
更多功能陆续开发中
祝您生活幸福每一天！";
        $resultStr = sprintf($textTpl, $fromUsername, $toUsername, $time, $msgType, $contentStr);
        echo $resultStr;
        }

    if ($keyword == '11') {
        $msgType = "news";
        $picurl = 'http://ralcenxx1.sinaapp.com/hello/img/big.jpg';
        $url = 'http://user.qzone.qq.com/2275025?wxid='.$fromUsername;
        $descr = '之涯的空间';
        $title = '之涯的空间';
        $resultStr = sprintf($textTpl, $fromUsername, $toUsername, $time, $msgType, $title, $descr, $picurl, $url);
        echo $resultStr;
    } elseif ($keyword == '21') {
        $msgType = "news";
        $picurl = 'http://ralcenxx1.sinaapp.com/hello/img/big.jpg';
        $url = 'http://ralcenxx1.sinaapp.com/home/?wxid='.$fromUsername;
        $descr = '进入页面后，点击发送微博，登陆微博账号既可发送微博，手机用户，点击右边按钮，即可看到发送微博字样';

        $title = '发表微博';
        $resultStr = sprintf($textTpl, $fromUsername, $toUsername, $time, $msgType, $title, $descr, $picurl, $url);
        echo $resultStr;
    
    }elseif ($keyword == '31') {
        $msgType = "news";
        $picurl = 'http://ralcenxx1.sinaapp.com/hello/img/big.jpg';
        $url = 'http://user.qzone.qq.com/2275025?wxid='.$fromUsername;
        $descr = '之涯的空间
';
        $title = '之涯的空间';
        $resultStr = sprintf($textTpl, $fromUsername, $toUsername, $time, $msgType, $title, $descr, $picurl, $url);
        echo $resultStr;
        }elseif(preg_match("/天气/",$keyword)){
			        $textTpl = "
        <xml>
                            <ToUserName><![CDATA[%s]]></ToUserName>
                            <FromUserName><![CDATA[%s]]></FromUserName>
                            <CreateTime>%s</CreateTime>
                            <MsgType><![CDATA[%s]]></MsgType>
                            <Content><![CDATA[%s]]></Content>
                            <FuncFlag>0</FuncFlag>
</xml>
        ";
   $msgType = "text";
   $weatherurl="http://api.map.baidu.com/telematics/v2/weather?location={$keyword}&ak=5ff1cea3ce311abdf3a4a04676b3a18c";
    $apistr=file_get_contents($weatherurl);
    $apiobj=simplexml_load_string($apistr);
    $placeobj=$apiobj->currentCity;//读取城市
if($placeobj==""){
    $contentStr ="未查到此城市天气信息";
    
}else{
	       
    $contentStr = "{$placeobj}
	{$apiobj->results->result[0]->date}天气{$apiobj->results->result[0]->weather}，风力{$apiobj->results->result[0]->wind}，温度{$apiobj->results->result[0]->temperature}
	{$apiobj->results->result[1]->date}天气{$apiobj->results->result[1]->weather}，风力{$apiobj->results->result[1]->wind}，温度{$apiobj->results->result[1]->temperature}
	{$apiobj->results->result[2]->date}天气{$apiobj->results->result[2]->weather}，风力{$apiobj->results->result[2]->wind}，温度{$apiobj->results->result[2]->temperature}
	";
    }
    $resultStr = sprintf($textTpl, $fromUsername, $toUsername, $time, $msgType, $contentStr);
        echo $resultStr;

        
}elseif(preg_match("/笑话/",$keyword)){
			        $textTpl = "
        <xml>
                            <ToUserName><![CDATA[%s]]></ToUserName>
                            <FromUserName><![CDATA[%s]]></FromUserName>
                            <CreateTime>%s</CreateTime>
                            <MsgType><![CDATA[%s]]></MsgType>
                            <Content><![CDATA[%s]]></Content>
                            <FuncFlag>0</FuncFlag>
</xml>
        ";
   $msgType = "text";
   $jokeurl="http://brisk.eu.org/api/joke.php";
    $apistr=file_get_contents($jokeurl);       
    $contentStr = "$apistr";
    $resultStr = sprintf($textTpl, $fromUsername, $toUsername, $time, $msgType, $contentStr);
        echo $resultStr;

        
}
        else {
        $textTpl = "
        <xml>
                            <ToUserName><![CDATA[%s]]></ToUserName>
                            <FromUserName><![CDATA[%s]]></FromUserName>
                            <CreateTime>%s</CreateTime>
                            <MsgType><![CDATA[%s]]></MsgType>
                            <Content><![CDATA[%s]]></Content>
                            <FuncFlag>0</FuncFlag>
</xml>
        ";
        $msgType = "text";
        $contentStr = "回复相应数字获取信息：
[XX天气] 查询当地天气预报（如上海天气）
[XX笑话] 给你讲一则笑话（如发送笑话）
更多功能陆续开发中
祝您生活幸福每一天！";
        $resultStr = sprintf($textTpl, $fromUsername, $toUsername, $time, $msgType, $contentStr);
        echo $resultStr;
    }

}
 
