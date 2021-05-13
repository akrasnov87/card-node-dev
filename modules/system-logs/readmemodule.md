#### Модуль для логирования событий пользователя (безопасности)

* аудит - действия пользователя
* логирование - запросы

#### Применение

Добавляем роутинг
```
var auditRouter = require('system-logs/router/audit');
...
router.use('/audit', auditRouter(auth_type)); // по умолчанию передавать basic
```
Теперь можно по ссылке **http://localhost:3000/audit/scripts.js** получить клиентский скрипт для аудита, а на адрес **http://localhost:3000/audit/receiver** будут передаваться сообщения

Пример кода на клиенте:

```
var audit = new __audit({
    baseUrl: Utilits.getConf('remote_service_url') + Utilits.getConf('virtual_dir_path'),
    login: AuthProvider.getUserName(),
    token: AuthProvider.getToken()
});
/**
* действия 
* @param {string} type код действия
* @param {string} message текст действия. Может не указываться
*/
audit.single(type, message || '');
```