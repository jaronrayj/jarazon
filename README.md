# jarazon

## Overview

There is the customer portal along with the manager portal to be able to manage the products on jarazon

## Setup

You'll need to setup a MySQL database and run the 2 different .sql files into it. The first is the jarazon_structure.sql, and then the jarazon_content.sql. The first is the framework, then second is the products to be listed.

Next you'll need to run ```npm i``` to install the inquirer.js package along with mysql npm.

Then, if you have node installed you can run ```node jarazonCustomer.js``` or ```node jarazonManager.js``` to see the different aspects.

## Customer Side

The customer side is able to upload products to jarazon along with being able to buy items with it displaying the cost of that product. Here is a video that portrays that:



## Manager Side

This allows you to be able to do 4 commands as the boss: 

* View current products for sale
* Check the low inventory products
* Add more stock to inventory
* Add a new product to the inventory

Here is a demo that shows that:
https://cl.ly/340c647f15d8
