# 木鱼功德网 前端 [uniApp]

[![zzCq7d.png](https://s1.ax1x.com/2022/12/27/zzCq7d.png)](https://imgse.com/i/zzCq7d)

## 关联后端项目
+ GitLab: https://gitlab.com/xcfstudio/woodfish-server
+ GitHub: https://github.com/xcfstudio/woodfish-server
+ Gitee: https://gitee.com/xcfstudio/woodfish-server

## 前言

本项目是作者的创作型实验项目，旨在打造干净、清爽的小而美的应用。本项目主要功能是积分制敲木鱼，并进行排行。多用户系统，卡片式数据呈现。更多功能正在开发中...

## 启动项目

+ 将项目pull至本地后，需要先安装依赖

```shell
# 使用npm
npm install

# 使用yarn
yarn install
```

+ 使用`HbuildeX`打开项目，修改配置文件

项目配置文件位于：`woodfish-app/config/appConfig.ts`

修改`baseUrl`字段的值，使其与本机IP保持一致（不建议修改为127.0.0.1或localhost，不方便真机调试），端口号与后端保持一致

查看本机IP方法：

```shell
# Mac/Linux
ifconfig | grep '192'

# Windows
ipconfig
```

+ 需要保持后端正常运行
  
  在`HbuilderX`编译运行项目

## 关于作者

Eric Xie，前端开发者与工业设计师，擅长TS全栈开发、UI设计。个人网站：[https://xiecangfeng.com](https://xiecangfeng.com)
