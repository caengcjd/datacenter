# 数据中心

## TOC
- [项目基本信息](#base_info)
- [文件结构](#project_structure)



## <a name="base_info"></a>项目基本信息
此项目为前端人员开发的多页面网站首页
运用了webpack,postcss等工作流


## 项目的启动
`npm run init`
`npm run start`

## <a name="project_structure"></a>项目文件结构
基本项目结构如下图

```asciidoc
datacenter/         项目根目录
├── src/                      源代码
├── README.md				  包含对此此项目的一些介绍，就是当前说看到的内容
├── .gitignore  		      git忽略文件
├── datacenter.nginx.conf     nginx配置文件
├── webpack.config.js  		  webpack前端工作流配置文件
├── doclets.yml  		      文档接口生成配置文件
└── package.json 		      npm依赖包配置文件
```

## 参考、使用的项目

* [Bootstrap](https://github.com/twbs/bootstrap) ([MIT License](https://github.com/twbs/bootstrap/blob/master/LICENSE))
* [jquery](http://jquery.com) ([MIT License](https://github.com/jquery/jquery/blob/master/LICENSE.txt))
