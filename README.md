# Параметры подключения к консоли Kuzzle
1. Консоль: https://console.kuzzle.io
2. Название проекта startum-d2 (s2,p2 соответсвенно)
3. Хост: startum.kuzzle.d2.rolder.app
4. Порт: 80, SSL включен
5. Версия: 2.x

# Changelog

## 2023-08-08 v0.6.0
### Новые функции:
* Архивация. Теперь можно удалять не только уборки, но и ЖК, объекты, зоны, результаты и учетные записи исполнителей. Удаленные сущности фактически не удаляются, т.к. нужны в отчетах. Они становятся архивными и исчезают со всех экранов. Для каждого удаления добавлено сообщение, поясняющее что именно будет удалено.
* Фильтры и поиск в мобильной версии.
### Доработки:
* Добавлена возможность не только редактировать зоны у объекта, но добавлять новые.
### Исправленные баги:
* Поправлена редкая ошибка авторизации.
* Ошибка при редактировании даты начала уборки.
* Система позовляла создавать учетные записи с одинаковыми логинами.
#### Рефакторинг всего, что было наработано в этом этапе.

## 2023-08-04 v0.5.0
### Новые функции:
* Просмотр результатов теперь доступен со всех экранов, где можно открыть карточку уборки: экраны планирования, состояния и отчетов.
* В карточке задания добавленны данные о фактических дате начала, длительности и разницы план/факт.
* Добавлена возможность редактировать зоны.

### Доработки:
* Отображение длительности приведено к единому формату.
* Выбор периода в отчете "Эффективность исполнителей" стал более нагляден.

### Исправленные баги:
* Не показывались результаты при редактировании уборки.
* При создании уборки не сворачивалось окно.
* Модуль отображения фотографий результатов работал криво на большом экране.
* В некоторых случаях просмотр фотографий открывалься, где не должен.
* В некоторых случаях данные не обновлялись автоматически после изменений.
* На экране "Состояние" в загруженности персонала не отображался круг вокруг значения в ячейках.
* В некоторых случаях не работал поиск.
* Если выбрать "Месяц" в состоянии работ, показывались данные текущего месяца вместо последних 30 дней.
* Не всегда верно создавались и редактировались учетные записи исполнителей.

## 2023-07-28 v0.4.0
### Новые функции:
* Экран отчетов. Отчет "Эффективность исполнителей". Карточка просмотра уборок из отчета.

## 2023-07-28 v0.3.0
### Новые функции:
* Экран справочника "Исполнители". Можно создавать учетные записи исполнителей, редактировать их. Сразу после создания, учетной записью можно пользоваться. Поиск по имени или фамилии исполнителя.
* Экран справочника "Результаты". Можно создавать и редактировать результаты. Поиск по названию или описанию результата.