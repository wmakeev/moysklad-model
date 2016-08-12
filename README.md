moysklad-model
==============

[![npm](https://img.shields.io/npm/v/moysklad-model.svg?maxAge=2592000&style=flat-square)](https://www.npmjs.com/package/moysklad-model)

Объектная модель сервиса МойСклад

# Описание

Модель предназначена для описания преобразований сущностей возращаемых REST API сервиса МойСклад из XML в JSON и обратно.

# Установка

```
$ npm install moysklad-model
```

# Обновление модели

Заполнить логин и пароль в файл `.env` (в корне проекта) для получения последней версии [MOYsklad.xsd](https://online.moysklad.ru/exchange/schema/MOYsklad.xsd)

```
// .env
# Логин и пароль для вашего аккаунта МойСклад (необходим для получения схемы данных)
MOYSKLAD_LOGIN={login}
MOYSKLAD_PASSWORD={password}

# Для включения информационных сообщений при генерации модели
DEBUG=moysklad-model
```

обновить модель

```bash
$ npm run regenerate
```

Если схема данных изменилась, будут отображены изменения и файлы модели в папке `dist` обновятся.
