# Changelog
## 2023-10-26 v0.10.0
### Доработки:
#### Общее:
* Фронт переехал с Noodl Cloud (Amazon) на Yandex Cloud.
* Функция выхода во всех ЛК.
* Всплывающие действия в таблицах.
* Таблицы научилась включать скрол, если не входит в доступное место.
* Увеличена скорость загрузки.
* Данные подгружаются только от компании, к которой принадлежит менеджер/исполнитель.
* Фильтр по датам научился фильтровать только по дате "от" или по дате "до".
* При создании/изменении менеджера/исполнителя пароль генерируется автоматически. Пароль мнемонический. Можно менять.
* Формы проверяют вводимые данные на выполнения требования к количеству символов или на соответствие шаблону (почта, телефон, ИНН и т.д.).
* Поиск научился искать по словам.
* Верстка приведена к единому стилю. Правки.
#### Рабочее место менеджера УК:

##### Планировщик > Планирование:
* Несколько зон на уборку. Переделан процесс и интерфейс для добавления нескольких зон при создании/редактировании уборки:
  * Добавлена новая сущность в базе данных - задание уборки.
  * Создание и редактирование:
    * Добавлена таблица с заданиями. Задание = зона + результаты. 
    * Задания можно добавлять, изменять, удалять. При работе с заданием кнопка сохранить не активна. Нельзя создать уборку без заданий.
    * Добавлена сортировка по названию зон, можно менять.    
    * Добавлены проверка и сообщение о том, что все зоны были использованы для выбранного объекта.
    * Добавлена проверка изменения ЖК или объекта. Если есть созданные задания, при смене ЖК или объекта, и при случае если новый выбор не соотвествует уже созданным заданиям (их зоны от другого объекта), то появится предупреждение. При отмене ЖК/объект вернется в предыдущий выбор. При согласии задания удалятся.
    * Если в ЖК есть только один объект, он выберется автоматически.
  * Просмотр уборки. Добавлена таблица с заданиями. В отличии от таблицы при редактировании, есть столбик с фотографиями для задания.
  * Просмотр фото заданий. При нажатии на фото в таблице появляется простмотр фото этого задания. Иконка показывает есть ли фото для этого задания.
  * Таблица уборок:
    * Изменился столбик Зона. Теперь это Зоны - список названий зон, отсортированных в алфовитном порядке.    
    * Переделан фильтр по зонам с учетом новой сущности.
    * Столбик с фото больше не вызывает просмотр, но демонстрирует есть ли фото. Для просмотра фото нужно открыть уборку.
##### Объекты:
* Более удобное предупреждение при удалении ЖК.
* В удаление объектов/ЖК добавлено удаление задач уборок.
#### Рабочее место исполнителя:
* Заменена анимация загрузки уборок.
* Поиск научился учитывать включенные фильтры.
* По умолчанию, стоит фильтр по статусам "Активна", "Запланирована".
* Фильтры теперь работают через запросы к серверу, а не на фронте.
##### Выполнение уборки:
  * Переделан процесс и интерфейс для исполнения уборки по зонам: 
    * У каждой уборки может быть несколько зон. На экране уборки теперь видны зоны, их описание и результаты для каждой зоны.
    * Каждая зона имеет свою кнопку с названием зоны и статусом выполнения работы по этой зоне. Кнопка не активна, если уборка завершена или провалена.
    * В каждую зону можно зайти по нажатию. На этом экране видны описания результатов зоны и можно начать уборку.
    * Фотографии теперь прикрепляются к каждой зоне отдельно.
    * Уборка меняет свой статус на "Активна", когда была начата работа над первой зоной и на "Завершена", когда была выполнена работа над последней зоной.  
  * При загрузке фотографий, текст на кнопке показывает, что загружаются фото. Убрано всплывающее сообщение о превышении количества допустимых фото, чтобы не было дублирования с текстом на кнопке.
#### Рабочее место администратора системы:
* Добавлена блокировка на добавление баланса, если не выбран тариф.
* Добавлен фильтр по датам в подписках.

### Исправленные баги:
#### Общее:
* (P15.2) При простое сессия пользователя не отключалась. В некотрых случаях сессия вылетала.
#### Рабочее место исполнителя:
* Опечатка в фильтре по статусам.
* (Р14) Первый фильтр больше не включается автоматически.
* (Р10) Сортировка теперь учитывает статус и дату.
* (Р7) Заменен текст на кнопке при фотографировании. Было не очень понятно.
* Некоторые измененные данные менеджером отображались только после перезагрузки.
* Когда содержание не входило по высоте, скрол работал не верно. 
* (P5) Авторизация сохраняла предыдущий вход, несмотря на новые введенные логин/пароль.
* Опечатка при сканировании.
#### Рабочее место менеджера УК:
##### Справочни > Результаты:
* Опечатка в выбранном количестве результатов.
* Текст при удалении был от исполнителей.
* Не коректно обозначены обязательные поля.
##### Объекты:
* (P20) Не удалялись зоны.
* (P3) Не возможно было отменить редактирование зоны.
* (P1-2) Не верно считалось количество зон в таблице с объектами.
##### Планировщик > Планирование:
* Не верный формат даты в фильтре по датам.
* После загрузки не с первого раза подтягивались данные в форму редактирования уборки.
* В некоторых случаях форма редактирования показывала данные предыдущей выбранной уборки.
* Если выбрать ЖК, объект и снова изменить выбор ЖК, объект оставался от предыдущего ЖК.
* (P5) Можно было сбросить параметры длительности.
* (P8) Разница план/факт не верно отображалась, если она больше суток.
* (P5) При создании уборки время по умолчанию было не сейчас, а время старта приложения.
#### Рабочее место администратора системы:
* Если менять только пароль менеджера, система выдавала ошибку.
* При создании или редактировании компании можно было случайно закрыть сайдбар, нажав на любое место экрана.

### Известные баги:
* В состоянии работ фильтр не применяется, если сначала увеличить период, а потом уменьшить. Временное решение - перезагружать странницу.

## 2023-09-21 v0.9.0
### Новые функции:
* Экран управления подписками. Таблица с компаниями и состоянием подписки. Можно увидеть список пополнения баланса для каждой компании.
* Пополнение баланса. При добавлении баланса система фиксирует запись о пополнении и пересчитывает текующую подписку, добавляя баланс, рассчитывая дату окончания подписки.
* Автосписание с баланса. Каждый раз при запросе к компании ее подписка пересчитывает баланс и дату окончания на основе справочника цены за сотрудника и зону в день. Если оставшихся дней с текущим тарифом больше 7, то статус "Активна", если меньше или равно 7, то "Заканчивается", если 0, то "Закончилась".
* Справочник цены. В базе заведен справоxник с ценой в день за сотрудника и зону.
* Создание компании. При создании компании заводится подписка без баланса и даты окончания, со статусом "Ждет регистрации". Баланс такой подписки можно пополнять, но он не будет списываться пока тариф для подписки не будет выбран.
* Экспорт подписок в Эксель.
### Доработки:
* Улучшено поведение проверки вводимых данных в формах у админа системы.
* Обновлен бекенд Kuzzle 2.25.0 > 2.26.2
* Обработчики в бекенде (расчет статуса заданий, расчет баланса и даты окончания подписки) теперь работают асинхронно. В результате время запроса заданий и подписок упало с 300мс до 150мс.
### Исправленные баги:
* Поправлен формат даты в подписках.

## 2023-09-14 v0.8.1
### Исправленные баги:
* При активации менеджера УК не устанавливался пароль.
* Мелкие правки на экране компаний.

## 2023-09-11 v0.8.0
### Новые функции:
* Экран управления компаниями. Возможность создавать и редактировать компанию. При создании компании автоматически создается ее менеджер и случайный пароль. Пароль устанавливается на заданный при активации компании. Менеджера так же можно редактировать, меняя пароль или логин.
### Доработки:
* Введенный логин теперь запоминается.
* Более удобные фильтры в таблицах. Первый пример на экране управления компаниями.
### Исправленные баги:
* Приложение не всегда загружается после обновления версии. Добавлена функция перезагрузки приложения, если версия в браузере отличается.
* Не всегда срабатывало автоматическое выставление статуса уборки на "Провалена".
* В некоторых случаях можно было создать исполнителя с одинаковым логином.

## 2023-08-14 v0.7.0
### Новые функции:
* Автоматическое выставление статуса уборки "Провалена", если плановое время начала больше планового времени завершения.
### Исправленные баги:
* Можно было назначать уборки на прошлое.

## 2023-08-14 v0.6.1
### Доработки:
* Удаление фотографий при завершении уборки. Добавлено ограничение в 8 фотографий и соответсвующее предупреждение.
### Исправленные баги:
* При сбросе фильтров в мобильной версии не сбрасывался диапазон дат и количество выбранных фильтров.
* Не корректный размер видео при фотографировании или сканировании QR.
* Не отображались данные о ЖК и объекте при первой загрузке в мобильной версии.
* Счетчик фотографий показывал всегда 1.
* Не верно считалось время уборки.

## 2023-08-08 v0.6.0
### Новые функции:
* Архивация. Теперь можно удалять не только уборки, но и ЖК, объекты, зоны, результаты и учетные записи исполнителей. Удаленные сущности фактически не удаляются, т.к. нужны в отчетах. Они становятся архивными и исчезают со всех экранов. Для каждого удаления добавлено сообщение, поясняющее что именно будет удалено.
* Фильтры и поиск в мобильной версии.
### Доработки:
* Добавлена возможность не только редактировать зоны у объекта, но добавлять новые.
### Исправленные баги:
* Поправлена редкая ошибка авторизации.
* Ошибка при редактировании даты начала уборки.
* Система позволяла создавать учетные записи с одинаковыми логинами.
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