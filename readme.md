### Описание

RPC - сервер для обмена данными с базой данных postgresql.

#### Что такое sessionState, state, session?

Это объект для хранения информации о пользователе. В нем содержиться:
* user: any - данные из БД по пользователю
* isAuthorize: boolean - авторизован пользователь или нет

#### инициализация приложения

```
nodejs .\bin\www port=3000 virtual_dir_path=/dev connection_string=host:dev-db-v-09;port:5432;user:******;password:********;database:cic-dev-db debug=true
```

По умолчанию используется порт 3000

При указание дополнительного аргумента debug будет сохраняться отладочная информация

```
node bin/www -port=5000 --debug
```

Передача дополнительных параметров:

* connection_string: String - строка подключения к БД
* virtual_dir_path: String - виртуальный каталог
* not_remove_files: bool - запретить удалять файлы из каталога files. По умолчанию false
* download: string - путь для хранения файлов для скачивания
```
not_remove_files=true
```

#### Ручное обновление на тестовом стенде
Инструкция по обновлению написана на сайте [mobnius.ru](https://mobnius.ru/?page_id=1999)

#### соглашение об назначении версии приложения

Согласно соглашению об указании версии в корне прилоджения есть скрипт `version.js`.
Он предназначен для изменения версии приложения.

`Внимание!!!` Если изменения в версии. Из-за того что формат версии, который указывается в package.json, может содержать только 3 группы чисел.

Пример вызова:

```
node version 0.0
```
, где 0.0 - основная версия приложения

#### отправка уведомлений

Применяется модуль ./modules/socket/mailer В нем есть метод sendText

```
sendText(socket, 'login - от кого', 'login - кому', 'группа если нужно');
```
* одиночное сообщение - http://localhost:3000/vote/dev/send?to=180101&from=5&message=Hello&rpc-authorization=cm9vdDpyb290MA==
* массовая отправка - http://localhost:3000/vote/dev/send/push?rpc-authorization=cm9vdDpyb290MA==

### Внешнее API
Для запрос использовать [инструкцию](http://kes.it-serv.ru/doc/covid/release/covid-release-db.html#rpt.schema).
Запросы делаются при помощи специального пользователя, который находится в роли api. Пример запроса:

```
Token Y2FwLWFwaTpxd2UtMTIz

[{"action":"cf_rpt_count","method":"Select", "data":[{"params":[27,"2021-01-25"]}],"type":"rpc", "tid":0}]
```