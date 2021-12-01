# Card Service  

Infrastructure: 
![alt text](./Card-Service.png)


This application is deployed into AWS,
each one of these files

* /account,
* /goodbye,
* /hello,
* /login,
* /signup

Is a lambda and serves as an endpoint on my API,  
All of this is orchestrated by API gateway which manages my API methods  
the URL of this application is:
<https://dol4161gx7.execute-api.eu-west-1.amazonaws.com/>

If you want to run the unit tests you need to run:  

```text
npm i 
npm run test
```

Please refer to the user documentation for methods and parameters required
