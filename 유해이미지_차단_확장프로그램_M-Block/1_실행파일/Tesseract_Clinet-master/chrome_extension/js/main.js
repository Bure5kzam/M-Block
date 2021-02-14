list_src = []
if(jQuery) {
    console.log("jQuery On")
}else {
    console.log("jQuery Fail")
}
chrome.tabs.query({ // Get active tab
    active: true,
    currentWindow: true
}, function (tabs) {
    chrome.tabs.executeScript(tabs[0].id, {
        code: 'Array.prototype.map.call(document.images, function (i) { return [i.src]; });'
    }, function(results) {
        result =""
        console.log(document.images)
        console.log("ajax start")
        $.ajax( {
            type : "POST",                               //1
            url : "http://192.168.0.105:8080/api/echo-json",                          //2
            dataType : 'json',                           //3
            contentType : 'application/json',            //4
            async : false,
            data : JSON.stringify(results),                 //5
            success : function(data){
                result = data;
                alert("전송이 완료되었습니다");
                                  },
            error : function() {
                alert("실패했습니다.")
            }
        });
        list_src = result
        console.log("list_src : " , list_src)
        console.log(list_src.length) 

        for(let i=0;i<list_src.length;i++) {
            console.log(i +":"+ list_src[i])
            Object.keys(list_src[i]).forEach(function(key) {
                console.log(key)
                chrome.tabs.executeScript(tabs[0].id, {            
                    //code: 'Array.prototype.map.call(document.querySelectorAll(\'img[src = \"'+list_src[i][0] + '\"]\'), function (i) {  console.log(i) });'
                    //native javascript 문법
                    code: 'Array.prototype.map.call(document.querySelectorAll(\'img[src = \"'+key+'\"]\'), function (i) {  return i.parentNode.parentNode.parentNode.removeChild(i.parentNode.parentNode) });'
                }, function(result) {
                    console.log("result : " , result)
                })
            })
        }
    })
});