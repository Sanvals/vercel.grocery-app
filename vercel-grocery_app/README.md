## Grocery App

<p align="center">
<img src="image.gif">
</p>

This app turns your notion database of grocery items into a dynamic, easy to use page. It extracts and displays the items of all the ingredients stored in the database, and displays them according to their "to buy" status.

<strong>💡 New version:</strong> Added recipe section.

## Built With

* ![Static Badge](https://img.shields.io/badge/Javascript-black?logo=javascript)
* ![Static Badge](https://img.shields.io/badge/Flask-black?logo=flask)
* ![Static Badge](https://img.shields.io/badge/HTML5-black?logo=html5)
* ![Static Badge](https://img.shields.io/badge/Notion-black?logo=notion)
* ![Static Badge](https://img.shields.io/badge/Python-black?logo=python)

## Installation

To install the app, clone the repo and run the following commands:

1. Clone the repo
```sh
git clone git@github.com:Sanvals/grocery_app.git
```
3. Get your Notion API token [here](https://developers.notion.com/docs/create-a-notion-integration)
4. Add the integration to your database
5. Add the databases ID and your token to the `.env` file
```py
TOKEN = secret_XXXX
DATABASE_ID = XXXX
DB_RECIPES_ID = XXXX
DB_BUTTONS_ID = XXXX
```
6. Run the project in Flask
```py
flask run
```