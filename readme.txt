Кратко.


В файле config.json надо ввести данные БД MySql
Cервер стартует на http://localhost:5000

Запросы:
Метод POST
1)Регистрация - http://localhost:5000/auth/registration
    Принимает JSON объект:
        {
            login: "qwerty",
            password: "123456",
            name: "qwerty"
        }

2)Авторизация - http://localhost:5000/auth/login
    Принимает JSON объект:
        {
            login: "qwerty",
            password: "123456"
        }

3)Сделать новй пост - http://localhost:5000/posts/newpost
    Принимает JSON объект:
        {
            title: "qwerty",
            content: "123456"
        }
    Требует токен авторизации, полученный в ходе авторизации. Вставленный таким образом - https://i.yapx.ru/QMaVS.png где token - тот самый токен(postman).

4)Получить пост по ид - http://localhost:5000/posts/getbyid
    Принимает JSON объект:
        {
            "id": 1
        }
    Требует токен авторизации, полученный в ходе авторизации. Вставленный таким образом - https://i.yapx.ru/QMaVS.png где token - тот самый токен(postman).

5)Удалить пост по ид - http://localhost:5000/posts/deletebyid
    Принимает JSON объект:
        {
            "id": 1
        }
    Требует токен авторизации, полученный в ходе авторизации. Вставленный таким образом - https://i.yapx.ru/QMaVS.png где token - тот самый токен(postman).
Метод GET
6)Получить все посты - http://localhost:5000/posts/getposts
    Требует токен авторизации, полученный в ходе авторизации. Вставленный таким образом - https://i.yapx.ru/QMaVS.png где token - тот самый токен(postman).