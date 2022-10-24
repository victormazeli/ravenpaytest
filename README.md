# express-knex-Mysql-boilerplate

##Setup - Detailed Instructions Below

1. Git clone the repo ```git clone [url]```
2. npm install
3. setup docker
4. run project setup with ```docker compose -f docker-compose.yml up --build```
5. access api endpoint at ```http://localhost:8080/api

## Postman documentation url



## Environmental Variables at Runtime if not using docker

Create a ".env" file at the root of your project and add the following for both DEV and TEST databases

```
    MYSQL_DEV_HOST=localhost
    MYSQL_DEV_PORT=3306
    MYSQL_DEV_USER=root
    MYSQL_DEV_PASSWORD= \_Insert your mysql password here*
    MYSQL_DEV_DATABASE=db-name
```

```
    MYSQL_TEST_HOST=localhost
    MYSQL_TEST_PORT=3306
    MYSQL_TEST_USER=root
    MYSQL_TEST_PASSWORD= \_Insert your mysql password here*
    MYSQL_TEST_DATABASE=db-name-test
```

## Limitation And Chanllanges

1. i was unable to make use of webhook due to the atlas dashboard, the field on the form that allows me enter the the url is not clickable, the field is disabled.
2. To initialte transfer of funds after generating a bank account number using this url ```https://integrations.getravenbank.com/v1/pwbt/generate_account``` when trying to make a transfer i should be able to select the account to be debited. but its not the case with this url for making transfer ```https://integrations.getravenbank.com/v1/transfers/create```
3. i should be able to make use of sandbox url for testing of apis rather than using live credentials. the secret keys provided on the atlas dashboard, only the live keys work with this url ```https://integrations.getravenbank.com/v1/```

As a result of the limitations above, i am unable to implement and complete my task. if theres a misunderstanding on usage of the atlas, please i kindl request a guide on how to use it and i can complete my task. Thank you
