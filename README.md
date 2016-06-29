pager - 基于jQuery的分页插件
==============================================

依赖
----------------------------------------------

jQuery >= v1.2.6

怎样使用
---------------------------------------------
html
```
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>pager Test</title>
    <link href="../css/pager.css" rel="stylesheet" type="text/css" />
    <script src="jquery.min.js" type="text/javascript"></script>
    <script src="../js/pager.js" type="text/javascript"></script>
    <script type="text/javascript" language="javascript">

        $(document).ready(function() {
            $("#pager").pager({
                    pageNum: 1,
                    pageCount: 15,
                    recordCount: 100,
                    callBack: PageClick
            });
        });

        PageClick = function(pageclickednumber) {
            $("#pager").pager({
                pageNum: pageclickednumber,
                pageCount: 15,
                recordCount: 100,
                callBack: PageClick
            });
            $("#result").html("Clicked Page " + pageclickednumber);
        }

    </script>
</head>
<body>
<h1 id="result">Click the pager below.</h1>
<div id="pager"></div>
</body>
</html>
```
可以见demo.html