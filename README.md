# README

*Database creation
 last update 2019.07.23(tue)

There are 4 tables for ChatSpace application.
・groups
・users
・members
・tweets
Table details(columns and associations) are bellow. 

*I cut id for main key of each tables because they will be made by automatically.

## groups table
|Column|Type|Options|
|------|------|------|
|name|string|null:false|
### Association
- has_many :members
- has_many :users, through: :members
- has_many :messages

## users table
|Column|Type|Options|
|------|------------|------|
|name|string|null:false, index: true|
|email|string|null:false, add_index :users, :email, unique: true|
|password_digest|string|null:false|
### Association
- has_many :members
- has_many :groups, through: :members
- has_many :messages

## members table
|Column|Type|Options|
|------|------|------|
|user|references|null:false, foreign_key: true|
|group|references|null:false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

## messages table
|Column|Type|Options|
|------|------|------|
|body|text||
|img|string||
|user|references|null:false, foreign_key: true|
|group|references|null:false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group
