<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{title}}</title>
  <style>
    body,li,ul{
            margin: 0;
            padding: 0;
        }
        li{
            list-style-type: none;
        }

        body {
            margin: 20px;
        }
        a{
            display: block;
            font-size: 22px;
        }
        .container{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            border-bottom: 1px solid grey;
            max-width: 800px;
            height: 40px;
            line-height: 40px;
        }</style>
</head>
<body>
    <ul>
      <li>
        <div class="container">
          <span>文件名</span>
          <span>类型</span>
        </div>
      </li>
    {{#each files}}
    <div class="container">
        <a href="{{../dir}}/{{file}}">{{@index}}-{{file}}</a>
        <span>{{icon}}</span>
    </div>
    {{/each}}
    </ul>
  </body>
</html>