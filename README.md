#修量报数超市-云函数部分
### 部署说明
- 开发时在阿里云函数计算部署测试，函数配置如下
```
Type: 'Aliyun::Serverless::Function'
      Properties:
        Handler: index.handler
        Runtime: nodejs12
        Timeout: 19
        MemorySize: 128
        EnvironmentVariables:
          flag1: value1
      Events:
        httpTrigger:
          Type: HTTP
          Properties:
            AuthType: ANONYMOUS
            Methods:
              - GET
              - POST
```
